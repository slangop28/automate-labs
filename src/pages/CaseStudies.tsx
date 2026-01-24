import { Link } from 'react-router-dom';

interface CaseStudy {
    title: string;
    description: string;
    file: string;
    metrics: string[];
}

const CaseStudies = () => {
    const caseStudies: CaseStudy[] = [
        {
            title: "AutomateLabs - General Overview",
            description: "Comprehensive overview of our intelligent automation solutions and how we transform business operations with AI-powered systems.",
            file: "/case-studies/AutomateLabs - General Overview.pptx",
            metrics: ["Complete solution overview", "AI & Automation expertise", "24/7 intelligent agents"]
        },
        {
            title: "AutomateLabs for Influencers",
            description: "Specialized automation solutions for influencers to streamline content creation, engagement tracking, and brand partnerships.",
            file: "/case-studies/AutomateLabs for Influencers.pptx",
            metrics: ["Content automation", "Engagement tracking", "Partnership management"]
        },
        {
            title: "AutomateLabs for Scaled Influencers & Businesses",
            description: "Enterprise-grade automation for scaled influencers and businesses managing multiple workflows, teams, and revenue streams.",
            file: "/case-studies/AutomateLabs for scaled influencers and Businesses.pptx",
            metrics: ["Multi-workflow automation", "Team collaboration", "Revenue optimization"]
        },
        {
            title: "E-Commerce Automation",
            description: "Automated order processing and inventory management for a retail company, reducing processing time by 85%.",
            file: "/case-studies/ecommerce-automation.pptx",
            metrics: ["500+ hours saved/month", "85% faster processing", "Zero errors"]
        },
        {
            title: "CRM Integration & AI Agents",
            description: "Intelligent AI agents that automatically qualify leads, update CRM, and schedule follow-ups 24/7.",
            file: "/case-studies/crm-integration.pptx",
            metrics: ["3x lead conversion", "24/7 availability", "100% data accuracy"]
        },
        {
            title: "Data Processing Automation",
            description: "Automated data extraction and reporting for a financial services firm, eliminating manual spreadsheet work.",
            file: "/case-studies/data-processing.pptx",
            metrics: ["Weekly reports in 5 min", "95% cost reduction", "Real-time insights"]
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar Spacer */}
            <div className="h-20"></div>

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                        Case Studies
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl">
                        See how we've helped businesses transform their operations with custom AI automation and intelligent agents that work 24/7.
                    </p>
                </div>
            </section>

            {/* Case Studies Grid */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid gap-8 md:grid-cols-2">
                        {caseStudies.map((study, index) => (
                            <div key={index} className="group bg-white border border-gray-200 rounded-xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{study.title}</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">{study.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {study.metrics.map((metric, idx) => (
                                        <span key={idx} className="text-sm bg-blue-50 text-blue-900 px-3 py-1 rounded-full font-medium">
                                            {metric}
                                        </span>
                                    ))}
                                </div>

                                <a
                                    href={study.file}
                                    download
                                    className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all group-hover:scale-105"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Download Presentation
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gray-900 text-white py-20 px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Let's discuss how we can build custom automation solutions for your specific needs.
                    </p>
                    <Link
                        to="/"
                        className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all"
                    >
                        Get Started
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default CaseStudies;
