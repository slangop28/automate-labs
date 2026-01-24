import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
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
                        About AutomateLabs
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
                        We build intelligent automation systems that transform how businesses operate.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-6 border-b border-gray-200">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
                            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                                At AutomateLabs, we believe that repetitive tasks shouldn't consume valuable human time. Our mission is to empower businesses with intelligent automation that works 24/7, allowing teams to focus on what truly matters—innovation and growth.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We don't just build software; we architect strategic automation systems that solve real business problems and deliver measurable results.
                            </p>
                        </div>
                        <div className="bg-gray-100 rounded-2xl p-8">
                            <div className="space-y-6">
                                <div>
                                    <div className="text-4xl font-black text-gray-900 mb-2">500+</div>
                                    <div className="text-gray-600 font-medium">Hours Saved Monthly</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black text-gray-900 mb-2">85%</div>
                                    <div className="text-gray-600 font-medium">Cost Reduction</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black text-gray-900 mb-2">24/7</div>
                                    <div className="text-gray-600 font-medium">AI Agents Working</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Approach */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Approach</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Deep Analysis</h3>
                            <p className="text-gray-600">
                                We thoroughly analyze your workflows to identify the highest-impact automation opportunities.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Solutions</h3>
                            <p className="text-gray-600">
                                Every automation is tailored to your specific business needs—no cookie-cutter solutions.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Continuous Improvement</h3>
                            <p className="text-gray-600">
                                We monitor performance and iterate to ensure your ROI keeps climbing over time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gray-900 text-white py-20 px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl font-bold mb-6">Let's Build Something Amazing</h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Ready to transform your business with intelligent automation?
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

export default AboutUs;
