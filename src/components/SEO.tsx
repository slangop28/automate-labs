import { useEffect } from 'react';

interface SEOProps {
    title?: string;
    description?: string;
    canonicalPath?: string;
    ogType?: string;
}

const DEFAULT_TITLE = "SmartVyapari — We don't sell AI slop. We build systems that save revenue.";
const DEFAULT_DESCRIPTION = "SmartVyapari builds custom AI automation systems, voice & WhatsApp agents, AI filmmaking, and enterprise workflow automations that replace repetitive work and save revenue.";
const SITE_URL = "https://smartvyapari.online";

export const SEO = ({
    title,
    description = DEFAULT_DESCRIPTION,
    canonicalPath = '',
    ogType = 'website',
}: SEOProps) => {
    useEffect(() => {
        // Set Document Title
        const fullTitle = title ? `${title} | SmartVyapari` : DEFAULT_TITLE;
        document.title = fullTitle;

        // Helper to update or create meta tags
        const setMetaTag = (attribute: 'name' | 'property', name: string, content: string) => {
            let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null;
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // Standard SEO Meta
        setMetaTag('name', 'description', description);
        setMetaTag('name', 'robots', 'index, follow');

        // OpenGraph Meta
        const canonicalUrl = `${SITE_URL}${canonicalPath}`;
        setMetaTag('property', 'og:title', fullTitle);
        setMetaTag('property', 'og:description', description);
        setMetaTag('property', 'og:url', canonicalUrl);
        setMetaTag('property', 'og:type', ogType);
        setMetaTag('property', 'og:site_name', 'SmartVyapari');

        // Twitter Card Meta
        setMetaTag('name', 'twitter:card', 'summary_large_image');
        setMetaTag('name', 'twitter:title', fullTitle);
        setMetaTag('name', 'twitter:description', description);

        // Canonical link tag
        let canonicalElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
        if (!canonicalElement) {
            canonicalElement = document.createElement('link');
            canonicalElement.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalElement);
        }
        canonicalElement.setAttribute('href', canonicalUrl);
    }, [title, description, canonicalPath, ogType]);

    return null;
};

export default SEO;
