
// This script runs early to find the nonce from a meta tag.
// It then uses a MutationObserver to automatically apply this nonce
// to any <style> or <script> tags that are dynamically added to the <head>.
// This is a common requirement for libraries like Ant Design or Emotion that inject styles.

// Find the nonce from the meta tag injected by the server.
const nonceMeta = document.querySelector('meta[name="csp-nonce"]');
if (nonceMeta) {
  const nonce = nonceMeta.getAttribute('content');

  // Create an observer instance to watch for child additions to the <head>.
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        // If a new <style> or <script> tag is added, apply the nonce.
        if (node.tagName === 'STYLE' || node.tagName === 'SCRIPT') {
          if (!node.hasAttribute('nonce')) {
            node.setAttribute('nonce', nonce);
          }
        }
      });
    });
  });

  // Start observing the <head> for configured mutations.
  observer.observe(document.head, {
    childList: true,
    subtree: true,
  });
}
