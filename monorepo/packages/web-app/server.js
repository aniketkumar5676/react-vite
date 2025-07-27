import { JSDOM } from 'jsdom';
import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

const app = express();
const port = 5000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from the 'dist' directory
app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('*', async (req, res) => {
  // Redirect all non-root requests to the root URL on refresh
  if (req.url !== '/') {
    return res.redirect('/');
  }

  try {
    const nonce = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);

    // Import the server-side render function
    const { render } = await import('./dist/server/entry-server.js');

    const { html: appHtml } = await render(req.url);

    let html = await fs.readFile(path.resolve(__dirname, 'dist', 'index.html'), 'utf-8');

    // Inject rendered app and nonce script
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>\n    <script nonce="${nonce}">window.__NONCE__ = '${nonce}';</script>`
    );

    // Use JSDOM to inject nonce into all script, link, and style tags
    const dom = new JSDOM(html);
    const { document } = dom.window;

    const elements = document.querySelectorAll('script, link, style');
    elements.forEach(element => {
      if (!element.hasAttribute('nonce')) {
        element.setAttribute('nonce', nonce);
      }
    });

    html = dom.serialize();

    // Set CSP header
    res.setHeader(
      'Content-Security-Policy',
      `script-src 'self' 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}'`
    );

    console.log('Response Headers:', res.getHeaders());
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (e) {
    console.error(e);
    res.status(500).end('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`🚀 Server listening on http://localhost:${port}`);
});
