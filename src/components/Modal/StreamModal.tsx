
export default function StreamFullScreenModal() {
    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box p-0 max-w-7xl w-full bg-gray-900 text-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex flex-col items-center p-6">
                    <h3 className="font-bold text-2xl mb-4" id="modal-title">Live Stream</h3>
                    <div className="w-full flex justify-center mb-4">
                        <div className="relative w-full" style={{ aspectRatio: '16/9', maxHeight: '80vh' }} id="stream-container">
                            <iframe
                                id="modal-iframe"
                                title="Stream Player"
                                src="https://www.example.com" // ganti dengan URL stream
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '16px', background: '#000', boxShadow: '0 2px 24px rgba(0,0,0,0.3)' }}
                            />
                        </div>
                    </div>
                    <div className="w-full flex justify-end">
                        <form method="dialog">
                            <button
                                className="btn btn-primary flex items-center gap-2 px-6 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                                aria-label="Tutup Modal"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                <span>Tutup</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>
    );
}
