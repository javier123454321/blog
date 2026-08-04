export function initAnalytics() {
  if (typeof window.gtag !== 'function') return;

  trackOutboundLinks();
  trackScrollDepth();
}

function trackOutboundLinks() {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link || !link.href) return;

    const url = new URL(link.href, window.location.origin);
    if (url.hostname === window.location.hostname) return;

    gtag('event', 'click', {
      event_category: 'outbound',
      event_label: url.href,
      transport_type: 'beacon',
    });
  });
}

function trackScrollDepth() {
  const thresholds = [25, 50, 75, 90, 100];
  const sent = new Set();
  let ticking = false;

  const check = () => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const depth = scrollable > 0 ? window.scrollY / scrollable : 1;

    for (const threshold of thresholds) {
      if (depth >= threshold / 100 && !sent.has(threshold)) {
        sent.add(threshold);
        gtag('event', 'scroll', { percent_scrolled: threshold });
      }
    }
  };

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        check();
        ticking = false;
      });
    },
    { passive: true },
  );

  check();
}
