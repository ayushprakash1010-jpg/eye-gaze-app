import EyeGazeApp from "./pages/EyeGazeApp";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 relative ">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Header / Hero Section */}
      <header className="flex flex-col items-center justify-center flex-1 text-center text-white px-4 relative z-10">
        <div className="backdrop-blur-sm bg-white/5 rounded-3xl p-12 border border-white/10 shadow-2xl">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
            EyeGazer
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto mb-6 rounded-full"></div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-pink-200 drop-shadow-lg">
            By Ayush, Aditya & Ronak
          </h2>
          
          <p className="text-xl md:text-2xl max-w-3xl leading-relaxed text-white/90 font-light mb-8">
            Control your browser and interact with UI using just your eyes and blinks. 
            <span className="block mt-2 text-pink-200 font-medium">Experience hands-free navigation!</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#eye-gaze-app"
              className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-pink-500/25 hover:scale-105 transition-all duration-300 border-2 border-white/20 hover:border-white/40"
            >
              <span className="flex items-center gap-2">
                Try Demo
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>AI-Powered Eye Tracking</span>
            </div>
          </div>
        </div>
      </header>

      {/* Demo / App Section */}
      <section
        id="eye-gaze-app"
        className="flex flex-col items-center justify-center w-full flex-1 bg-gradient-to-t from-gray-50 to-white rounded-t-[3rem] shadow-2xl py-16 px-4 relative z-10 border-t border-gray-200/50"
      >
        <div className="w-full max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-2 rounded-full text-sm font-semibold mb-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
              Live Demo
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
              EyeGazer in Action
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Your eyes are the ultimate controller! 
              <span className="block mt-2 text-purple-600 font-semibold">
                👁️ Move your gaze to navigate • 👀 Blink to click • ✨ Experience the future
              </span>
            </p>
          </div>

          {/* Enhanced Demo Container */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 p-8 backdrop-blur-sm">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200/30">
              <EyeGazeApp className="w-full" />
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-white/50 rounded-2xl border border-gray-200/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-600">Real-time eye tracking with minimal latency</p>
            </div>
            
            <div className="text-center p-6 bg-white/50 rounded-2xl border border-gray-200/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Precise Control</h3>
              <p className="text-sm text-gray-600">Accurate cursor positioning and click detection</p>
            </div>
            
            <div className="text-center p-6 bg-white/50 rounded-2xl border border-gray-200/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">User Friendly</h3>
              <p className="text-sm text-gray-600">Intuitive interface designed for everyone</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="w-full py-8 text-center relative z-10 bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm border-t border-white/10">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-white/90">
            <span className="text-lg">Made with</span>
            <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-sm">💜</span>
            </div>
            <span className="text-lg">by</span>
            <span className="font-bold bg-gradient-to-r from-pink-200 to-purple-200 bg-clip-text text-transparent">
              Ayush Prakash
            </span>
          </div>
          <p className="text-white/60 text-sm">© 2025 EyeGazer. Revolutionizing accessibility through eye tracking technology.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
