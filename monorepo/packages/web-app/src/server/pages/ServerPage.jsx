import React from 'react';
import ReactDOMServer from 'react-dom/server';

// eslint-disable-next-line react-refresh/only-export-components
const ServerPage = () => {
  return (
    <div>
      <h1>This Page is Server-Rendered!</h1>
      <p>Current time on server: {new Date().toLocaleString()}</p>
    </div>
  );
};

export function render() {
  const context = {};
  let didError = false;

  const stream = ReactDOMServer.renderToPipeableStream(
    <React.StrictMode>
      <ServerPage />
    </React.StrictMode>,
    {
      onShellReady() {
        // This is called when the shell is ready to be streamed.
      },
      onShellError(err) {
        // This is called if the shell cannot be rendered at all.
        console.error('onShellError', err);
        didError = true;
      },
      onAllReady() {
        // This is called after all the content is ready.
      },
      onError(err) {
        didError = true;
        console.error('onError', err);
      },
    }
  );

  return { stream, context, didError };
}