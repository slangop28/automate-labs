import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * On route change: scroll to top, OR — if the URL has a hash like /#ecosystem or /#about —
 * smoothly scroll that section into view.
 * Polls up to 60 × 50ms (3 seconds) to give the target page time to mount.
 */
const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            let attempts = 0;
            const maxAttempts = 60; // 3 seconds total

            const tryScroll = () => {
                const el = document.getElementById(id);
                if (el) {
                    setTimeout(() => {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 80);
                    return;
                }
                if (attempts < maxAttempts) {
                    attempts++;
                    setTimeout(tryScroll, 50);
                }
                // If still not found after 3s, do nothing (stay at top of page)
            };

            // Small grace period lets the new page begin rendering before the first probe
            setTimeout(tryScroll, 100);
            return;
        }

        window.scrollTo(0, 0);
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
