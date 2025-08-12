export default function Gallery() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent relative">
          Gear Gallery
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 to-blue-800 rounded-full"></div>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          A visual showcase of my guitar gear, pedalboard, and recording setup
        </p>
      </section>

      {/* Filter Buttons */}
      <section className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button className="px-4 py-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 transition-all">
            All Gear
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50 transition-all">
            Guitars
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50 transition-all">
            Amps
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50 transition-all">
            Pedals
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50 transition-all">
            Recording Setup
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gallery Item 1 */}
          <div className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-gray-900/80 backdrop-blur-sm">
            <div className="aspect-square relative">
              <img
                src="/images/gallery/guitar-1.jpg"
                alt="ESP LTD EC-1000"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">ESP LTD EC-1000</h3>
                  <p className="text-gray-300 text-sm">
                    My main guitar for metal covers, featuring EMG 81/60 pickups
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Item 2 */}
          <div className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-gray-900/80 backdrop-blur-sm">
            <div className="aspect-square relative">
              <img
                src="/images/gallery/amp-1.jpg"
                alt="Marshall DSL15C"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Marshall DSL15C</h3>
                  <p className="text-gray-300 text-sm">
                    My go-to amp for recording, perfect for metal tones
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Item 3 */}
          <div className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-gray-900/80 backdrop-blur-sm">
            <div className="aspect-square relative">
              <img
                src="/images/gallery/pedalboard.jpg"
                alt="Pedalboard Setup"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Pedalboard Setup</h3>
                  <p className="text-gray-300 text-sm">
                    Complete pedalboard with noise gate, overdrive, and delay
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Item 4 */}
          <div className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-gray-900/80 backdrop-blur-sm">
            <div className="aspect-square relative">
              <img
                src="/images/gallery/recording-setup.jpg"
                alt="Recording Setup"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Recording Setup</h3>
                  <p className="text-gray-300 text-sm">
                    Home studio setup with Reaper DAW and Focusrite interface
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Item 5 */}
          <div className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-gray-900/80 backdrop-blur-sm">
            <div className="aspect-square relative">
              <img
                src="/images/gallery/guitar-2.jpg"
                alt="Ibanez RG450DX"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Ibanez RG450DX</h3>
                  <p className="text-gray-300 text-sm">
                    Versatile guitar for various playing styles
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Item 6 */}
          <div className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-gray-900/80 backdrop-blur-sm">
            <div className="aspect-square relative">
              <img
                src="/images/gallery/microphone.jpg"
                alt="Recording Microphone"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Shure SM57</h3>
                  <p className="text-gray-300 text-sm">
                    Industry standard microphone for recording guitar amps
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 