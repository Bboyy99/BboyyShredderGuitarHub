export default function Tutorials() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent relative">
          Guitar Tutorials (Coming Soon)
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 to-blue-800 rounded-full"></div>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Learn from my experience with detailed tutorials and guides
        </p>
      </section>

      {/* Tutorial Categories */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Technique Tutorials */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 transform transition-all duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Technique Tutorials</h2>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <span className="text-blue-500 mt-1">→</span>
              <div>
                <h3 className="text-lg font-medium text-gray-200">Alternate Picking</h3>
                <p className="text-gray-400 text-sm">Master the foundation of metal guitar playing</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-500 mt-1">→</span>
              <div>
                <h3 className="text-lg font-medium text-gray-200">Bending Techniques</h3>
                <p className="text-gray-400 text-sm">Learn SRV-style bends and vibrato</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-500 mt-1">→</span>
              <div>
                <h3 className="text-lg font-medium text-gray-200">Rhythm Patterns</h3>
                <p className="text-gray-400 text-sm">Essential patterns for metal and blues</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Recording Tutorials */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 transform transition-all duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Recording with Reaper</h2>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <span className="text-blue-500 mt-1">→</span>
              <div>
                <h3 className="text-lg font-medium text-gray-200">Basic Setup</h3>
                <p className="text-gray-400 text-sm">Getting started with Reaper DAW</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-500 mt-1">→</span>
              <div>
                <h3 className="text-lg font-medium text-gray-200">Multi-track Recording</h3>
                <p className="text-gray-400 text-sm">Recording multiple guitar parts</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-500 mt-1">→</span>
              <div>
                <h3 className="text-lg font-medium text-gray-200">Mixing & Mastering</h3>
                <p className="text-gray-400 text-sm">Getting the perfect guitar tone</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Gear Setup */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 transform transition-all duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Gear Setup Guides</h2>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <span className="text-blue-500 mt-1">→</span>
              <div>
                <h3 className="text-lg font-medium text-gray-200">Amp Settings</h3>
                <p className="text-gray-400 text-sm">Dialing in the perfect tone</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-500 mt-1">→</span>
              <div>
                <h3 className="text-lg font-medium text-gray-200">Pedal Chain</h3>
                <p className="text-gray-400 text-sm">Optimal pedal order and settings</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-500 mt-1">→</span>
              <div>
                <h3 className="text-lg font-medium text-gray-200">Recording Setup</h3>
                <p className="text-gray-400 text-sm">Microphone placement and DI recording</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Featured Tutorial */}
      <section className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-400">Featured Tutorial</h2>
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/REPLACE_WITH_TUTORIAL_VIDEO_ID"
                title="Featured Tutorial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-blue-400">Recording Guitar in Reaper</h3>
              <p className="text-gray-300">
                A comprehensive guide to recording guitar in Reaper DAW, covering everything
                from initial setup to final mixing. Learn how to achieve professional-quality
                recordings with your home setup.
              </p>
              <div className="space-y-2">
                <h4 className="text-lg font-medium text-blue-400">What You'll Learn:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Setting up your audio interface</li>
                  <li>Configuring Reaper for guitar recording</li>
                  <li>Using amp simulators and effects</li>
                  <li>Basic mixing techniques</li>
                </ul>
              </div>
              <div className="pt-4">
                <button className="px-6 py-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 transition-all">
                  Watch Tutorial
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 