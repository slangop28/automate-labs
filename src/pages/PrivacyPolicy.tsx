import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Navbar Spacer */}
            <div className="h-20"></div>

            {/* Header */}
            <section className="bg-gray-50 py-12 px-6 border-b border-gray-200">
                <div className="container mx-auto max-w-4xl">
                    <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Privacy Policy</h1>
                    <p className="text-gray-600">Last updated: January 24, 2026</p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 px-6">
                <div className="container mx-auto max-w-4xl prose prose-lg">
                    <div className="space-y-8 text-gray-700">

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                            <p>
                                AutomateLabs ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Personal Information</h3>
                            <p>We may collect personal information that you voluntarily provide to us when you:</p>
                            <ul className="list-disc pl-6 space-y-2 my-4">
                                <li>Request a callback or consultation</li>
                                <li>Book a free audit</li>
                                <li>Contact us via forms on our website</li>
                                <li>Subscribe to our newsletter</li>
                            </ul>
                            <p className="mb-4">This information may include:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Name</li>
                                <li>Email address</li>
                                <li>Phone number</li>
                                <li>Company name</li>
                                <li>Business requirements and queries</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                            <p>We use the information we collect to:</p>
                            <ul className="list-disc pl-6 space-y-2 my-4">
                                <li>Respond to your inquiries and provide requested services</li>
                                <li>Schedule consultations and audits</li>
                                <li>Send you information about our services</li>
                                <li>Improve our website and services</li>
                                <li>Analyze usage patterns and trends</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Storage and Security</h2>
                            <p>
                                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely using industry-standard encryption and security protocols.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Sharing and Disclosure</h2>
                            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                            <ul className="list-disc pl-6 space-y-2 my-4">
                                <li>With your explicit consent</li>
                                <li>To comply with legal obligations or court orders</li>
                                <li>With service providers who assist in our operations (under strict confidentiality agreements)</li>
                                <li>In connection with a merger, acquisition, or sale of assets</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
                            <p>You have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2 my-4">
                                <li>Access the personal information we hold about you</li>
                                <li>Request correction of inaccurate data</li>
                                <li>Request deletion of your personal information</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Withdraw consent at any time</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
                            <p>
                                We may use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
                            <p>
                                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
                            <p>
                                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy or our data practices, please contact us through our website's contact form or reach out to our support team.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
