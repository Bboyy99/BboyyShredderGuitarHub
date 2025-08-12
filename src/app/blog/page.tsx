export default function Blog() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent relative">
          Guitar Blog
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 to-blue-800 rounded-full"></div>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Deep dives into guitar techniques, gear reviews, and recording tips
        </p>
      </section>

      {/* Featured Post */}
      <section className="max-w-6xl mx-auto">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-blue-500/20 overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="aspect-video relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent"></div>
              <img
                src="/images/featured-post.jpg"
                alt="Featured Post"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">Gear Review</span>
                <span className="text-gray-400 text-sm">March 15, 2024</span>
              </div>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">
                The Perfect Metal Tone: Dialing in the Marshall DSL15C
              </h2>
              <p className="text-gray-300 mb-6">
                A comprehensive guide to achieving the perfect metal tone with the Marshall DSL15C,
                including detailed settings, pedal combinations, and recording techniques.
              </p>
              <button className="px-6 py-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 transition-all">
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Categories */}
      <section className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button className="px-4 py-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 transition-all">
            All Posts
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50 transition-all">
            Gear Reviews
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50 transition-all">
            Recording Tips
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50 transition-all">
            Technique
          </button>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Blog Post Card 1 */}
          <article className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-blue-500/20 overflow-hidden transform transition-all duration-300 hover:scale-105">
            <div className="aspect-video relative">
              <img
                src="/images/blog-post-1.jpg"
                alt="Recording with Reaper"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">Recording</span>
                <span className="text-gray-400 text-sm">March 10, 2024</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">
                Recording Guitar in Reaper: A Complete Guide
              </h3>
              <p className="text-gray-300 mb-4">
                Learn how to achieve professional-quality guitar recordings using Reaper DAW,
                from initial setup to final mixing.
              </p>
              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                Read More →
              </button>
            </div>
          </article>

          {/* Blog Post Card 2 */}
          <article className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-blue-500/20 overflow-hidden transform transition-all duration-300 hover:scale-105">
            <div className="aspect-video relative">
              <img
                src="/images/blog-post-2.jpg"
                alt="Metallica Techniques"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">Technique</span>
                <span className="text-gray-400 text-sm">March 5, 2024</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">
                Breaking Down Metallica&apos;s Rhythm Techniques
              </h3>
              <p className="text-gray-300 mb-4">
                An in-depth analysis of James Hetfield&apos;s iconic rhythm playing style and
                how to incorporate it into your own playing.
              </p>
              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                Read More →
              </button>
            </div>
          </article>

          {/* Blog Post Card 3 */}
          <article className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-blue-500/20 overflow-hidden transform transition-all duration-300 hover:scale-105">
            <div className="aspect-video relative">
              <img
                src="/images/blog-post-3.jpg"
                alt="Gear Setup"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">Gear</span>
                <span className="text-gray-400 text-sm">March 1, 2024</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">
                My Essential Pedalboard Setup
              </h3>
              <p className="text-gray-300 mb-4">
                A detailed look at my pedalboard setup, including signal chain, settings,
                and how each pedal contributes to my tone.
              </p>
              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                Read More →
              </button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
} 