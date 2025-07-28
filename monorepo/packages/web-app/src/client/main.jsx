import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import './styles/index.css';
import { ConfigProvider } from 'antd';

// Redirect to root on reload if not already there
if (window.location.pathname !== '/' && window.location.pathname !== '/server-page') {
  window.location.href = '/';
}

// ✅ Read nonce from server-injected script
const nonce = window.__NONCE__;

// ✅ Patch appendChild to inject nonce into dynamically added tags
if (nonce) {
  const originalAppendChild = document.head.appendChild;

  document.head.appendChild = function (element) {
    const tagName = element.tagName?.toUpperCase();

    if (
      (tagName === 'SCRIPT' || tagName === 'STYLE' || tagName === 'LINK') &&
      !element.hasAttribute('nonce')
    ) {
      element.setAttribute('nonce', nonce);
    }

    return originalAppendChild.call(this, element);
  };
}

// ✅ Hydrate app with Ant Design's CSP support
ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <ConfigProvider csp={{ nonce: typeof window !== 'undefined' ? window.__NONCE__ : '' }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
