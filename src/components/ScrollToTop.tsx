'use client';

export default function ScrollToTop() {
  const handleScrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-8 right-8">
      <button
        onClick={handleScrollToTop}
        className="bg-blue-400 text-white p-3 rounded-full shadow-lg hover:bg-blue-500 transition-colors"
        aria-label="回到頂部"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>
      </button>
    </div>
  );
}