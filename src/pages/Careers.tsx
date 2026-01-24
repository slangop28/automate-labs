import React from 'react';
import { Link } from 'react-router-dom';

const Careers = () => {
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
                        Join Our Team
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
                        Help us build the future of intelligent automation. We're looking for passionate engineers, designers, and automation specialists.
                    </p>
                </div>
            </section>

            {/* Why Join Us */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why AutomateLabs?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 rounded-xl p-8">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Cutting-Edge Technology</h3>
                            <p className="text-gray-600">
                                Work with the latest AI and automation technologies, building systems that make a real difference.
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-8">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Collaborative Culture</h3>
                            <p className="text-gray-600">
                                Join a team of talented individuals who share knowledge and support each other's growth.
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-8">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Impactful Work</h3>
                            <p className="text-gray-600">
                                See your work directly transform businesses and save thousands of hours every month.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="bg-gray-50 py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Open Positions</h2>
                    <p className="text-center text-gray-600 mb-12">We're always looking for talented individuals to join our team.</p>

                    <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Join Our Talent Pool</h3>
                        <p className="text-gray-600 mb-6">
                            We're constantly growing. Even if you don't see a specific position listed, we'd love to hear from talented engineers, designers, and automation specialists.
                        </p>
                        <p className="text-gray-900 font-semibold mb-2">Send your resume and portfolio to:</p>
                        <a href="mailto:careers@automatelabs.in" className="text-blue-600 hover:text-blue-700 font-medium">
                            careers@automatelabs.in
                        </a>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gray-900 text-white py-20 px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to Make an Impact?</h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Join us in building the future of business automation.
                    </p>
                    <a
                        href="mailto:careers@automatelabs.in"
                        className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all"
                    >
                        Apply Now
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Careers;
