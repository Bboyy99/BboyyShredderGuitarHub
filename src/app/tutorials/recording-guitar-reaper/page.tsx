export default function RecordingGuitarTutorial() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent relative">
          Recording Guitar in Reaper: A Complete Guide
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 to-blue-800 rounded-full"></div>
        </h1>
        <p className="text-xl text-gray-300">
          Learn how to achieve professional-quality guitar recordings using Reaper DAW
        </p>
      </section>

      {/* Table of Contents */}
      <section className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">Table of Contents</h2>
        <ul className="space-y-2">
          <li>
            <a href="#setup" className="text-gray-300 hover:text-blue-400 transition-colors">
              1. Initial Setup and Configuration
            </a>
          </li>
          <li>
            <a href="#recording" className="text-gray-300 hover:text-blue-400 transition-colors">
              2. Recording Process
            </a>
          </li>
          <li>
            <a href="#mixing" className="text-gray-300 hover:text-blue-400 transition-colors">
              3. Mixing and Effects
            </a>
          </li>
          <li>
            <a href="#tips" className="text-gray-300 hover:text-blue-400 transition-colors">
              4. Pro Tips and Common Issues
            </a>
          </li>
        </ul>
      </section>

      {/* Main Content */}
      <section className="space-y-8">
        {/* Setup Section */}
        <div id="setup" className="scroll-mt-20">
          <h2 className="text-3xl font-semibold text-blue-400 mb-6">1. Initial Setup and Configuration</h2>
          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl text-gray-200">Audio Interface Setup</h3>
            <p className="text-gray-300">
              First, ensure your audio interface is properly connected and recognized by your computer.
              I use a Focusrite Scarlett 2i2, which provides excellent quality for guitar recording.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Install the latest drivers for your audio interface</li>
              <li>Set the sample rate to 44.1kHz or 48kHz</li>
              <li>Configure buffer size (256 or 512 samples is ideal for recording)</li>
              <li>Enable direct monitoring if available</li>
            </ul>

            <h3 className="text-xl text-gray-200 mt-6">Reaper Configuration</h3>
            <p className="text-gray-300">
              Configure Reaper for optimal guitar recording:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Set up your audio device in Preferences → Audio → Device</li>
              <li>Create a new project with appropriate sample rate</li>
              <li>Set up input monitoring</li>
              <li>Configure recording path and file format</li>
            </ul>
          </div>
        </div>

        {/* Recording Section */}
        <div id="recording" className="scroll-mt-20">
          <h2 className="text-3xl font-semibold text-blue-400 mb-6">2. Recording Process</h2>
          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl text-gray-200">Setting Up Tracks</h3>
            <p className="text-gray-300">
              Create a well-organized project structure:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Create separate tracks for rhythm and lead guitars</li>
              <li>Set up a click track for timing</li>
              <li>Create a reference track if needed</li>
              <li>Organize tracks using folders and colors</li>
            </ul>

            <h3 className="text-xl text-gray-200 mt-6">Recording Techniques</h3>
            <p className="text-gray-300">
              Best practices for recording guitar:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Use a noise gate to reduce unwanted noise</li>
              <li>Record multiple takes for each part</li>
              <li>Use punch-in recording for fixing mistakes</li>
              <li>Monitor through headphones to prevent feedback</li>
            </ul>
          </div>
        </div>

        {/* Mixing Section */}
        <div id="mixing" className="scroll-mt-20">
          <h2 className="text-3xl font-semibold text-blue-400 mb-6">3. Mixing and Effects</h2>
          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl text-gray-200">Essential Effects</h3>
            <p className="text-gray-300">
              Common effects used in guitar mixing:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>EQ: Cut low-end rumble, shape midrange</li>
              <li>Compression: Control dynamics</li>
              <li>Reverb: Add space and depth</li>
              <li>Delay: Create width and interest</li>
            </ul>

            <h3 className="text-xl text-gray-200 mt-6">Mixing Tips</h3>
            <p className="text-gray-300">
              Tips for achieving a professional mix:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Use panning to create space</li>
              <li>Balance rhythm and lead guitars</li>
              <li>Use automation for dynamic changes</li>
              <li>Reference your mix against professional tracks</li>
            </ul>
          </div>
        </div>

        {/* Tips Section */}
        <div id="tips" className="scroll-mt-20">
          <h2 className="text-3xl font-semibold text-blue-400 mb-6">4. Pro Tips and Common Issues</h2>
          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl text-gray-200">Common Issues and Solutions</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Latency issues: Adjust buffer size and use direct monitoring</li>
              <li>Noise problems: Check cables and use noise gates</li>
              <li>Phase issues: Check microphone placement</li>
              <li>CPU overload: Freeze tracks when needed</li>
            </ul>

            <h3 className="text-xl text-gray-200 mt-6">Workflow Tips</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Use keyboard shortcuts for efficiency</li>
              <li>Save different project templates</li>
              <li>Back up your projects regularly</li>
              <li>Use markers for important sections</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-blue-500/20 p-8">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Ready to Start Recording?</h2>
          <p className="text-gray-300 mb-6">
            Check out my other tutorials for more in-depth guides on specific techniques and gear.
          </p>
          <button className="px-6 py-3 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 transition-all">
            View All Tutorials
          </button>
        </div>
      </section>
    </div>
  );
} 