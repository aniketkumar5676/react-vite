import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import './styles/index.css';
import { ConfigProvider } from 'antd';

ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <ConfigProvider csp={{ nonce: window.__NONCE__ }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);