import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface SlideViewerProps {
    presentationName: string;
    slides: string[];
    onClose: () => void;
}

const SlideViewer: React.FC<SlideViewerProps> = ({ presentationName, slides, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const previousSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Main Content */}
            <div className="w-full max-w-6xl">
                {/* Slide Display */}
                <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden mb-6">
                    {/* Slide Image */}
                    <div className="relative aspect-[16/9] bg-gray-100">
                        <img
                            src={slides[currentSlide]}
                            alt={`Slide ${currentSlide + 1}`}
                            className="w-full h-full object-contain"
                        />

                        {/* Navigation Arrows */}
                        <button
                            onClick={previousSlide}
                            disabled={slides.length <= 1}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            disabled={slides.length <= 1}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Slide Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                            {currentSlide + 1} / {slides.length}
                        </div>
                    </div>
                </div>

                {/* Thumbnails */}
                {slides.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 px-2">
                        {slides.map((slide, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${currentSlide === index
                                        ? 'border-blue-500 ring-2 ring-blue-500/50'
                                        : 'border-white/30 hover:border-white/60'
                                    }`}
                            >
                                <img
                                    src={slide}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-24 h-14 object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}

                {/* CTA Section */}
                <div className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">Ready to Automate Your Business?</h3>
                    <p className="mb-4 text-blue-100">Let's discuss how {presentationName} can transform your operations.</p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link
                            to="/"
                            onClick={onClose}
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all inline-flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Book Free Audit
                        </Link>
                        <Link
                            to="/"
                            onClick={onClose}
                            className="bg-blue-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-900 transition-all inline-flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Request Callback
                        </Link>
                    </div>
                </div>
            </div>

            {/* Keyboard navigation hint */}
            <div className="absolute bottom-4 left-4 text-white/50 text-sm">
                Use ← → arrow keys to navigate
            </div>
        </div>
    );
};

export default SlideViewer;
