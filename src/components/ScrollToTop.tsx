import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * On route change: scroll to top, OR — if the URL has a hash like /#contact —
 * scroll that section into view (after the new page has painted).
 */
const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            // wait a frame so the target section exists in the DOM
            requestAnimationFrame(() => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    return;
                }
                window.scrollTo(0, 0);
            });
            return;
        }
        window.scrollTo(0, 0);
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
