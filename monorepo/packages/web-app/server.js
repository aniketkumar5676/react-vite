import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const app = express();
const port = 5000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from the 'dist' directory
app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('*', async (req, res) => {
  try {
    // Generate a secure nonce
    const nonce = crypto.randomBytes(16).toString('base64');

    // Import SSR bundles
    const { render: renderApp } = await import('./dist/server/entry-server.js');
    const { render: renderServerPage } = await import('./dist/server/ServerPage.js');

    // Read the index.html template
    let templateHtml = await fs.readFile(path.resolve(__dirname, 'dist', 'index.html'), 'utf-8');

    // Inject the nonce into a meta tag
    templateHtml = templateHtml.replace(
      '<head>',
      `<head>\n    <meta name="csp-nonce" content="${nonce}">`
    );

    // Set headers
    res.status(200).set({
      'Content-Type': 'text/html',
      'Content-Security-Policy': `script-src 'self' 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}'`
    });

    // Split the template
    const [htmlStart, htmlEnd] = templateHtml.split('<div id="root"></div>');

    let stream, context, didError;

    if (req.url === '/server-page') {
      ({ stream, context, didError } = renderServerPage(req.url));
    } else {
      ({ stream, context, didError } = renderApp(req.url));
    }

    if (context.url) {
      return res.redirect(302, context.url);
    }

    res.write(htmlStart + '<div id="root">');

    stream.pipe(res);

    stream.on('end', () => {
      res.end('</div>' + htmlEnd);
    });

    stream.on('error', (err) => {
      console.error('Stream error:', err);
      if (!res.headersSent) {
        res.status(500).end('Internal Server Error');
      }
    });

  } catch (e) {
    console.error('❌ Server error:', e);
    if (!res.headersSent) {
      res.status(500).end('Internal Server Error');
    }
  }
});

app.listen(port, () => {
  console.log(`🚀 Server listening on http://localhost:${port}`);
});
