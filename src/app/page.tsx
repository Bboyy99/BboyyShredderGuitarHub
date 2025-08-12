import Image from "next/image";
import LatestCovers from "@/components/LatestCovers";
import FeaturedVideo from "@/components/FeaturedVideo";
import SubscribeCounter from "@/components/SubscribeCounter";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center transform transition-all duration-500 hover:scale-105">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent relative">
          Welcome to My Guitar Journey
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 to-blue-800 rounded-full"></div>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Exploring the ends of the guitar spectrum, from metal to blues to soundscapes and beyond.
        </p>
      </section>

      <FeaturedVideo channelId={process.env.YOUTUBE_CHANNEL_ID || "UC293HFEJqlqxTVNUkKg1xSw"} />

      <section className="max-w-2xl mx-auto text-center transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-blue-400 to-blue-800 bg-clip-text text-transparent">
          Latest Updates
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          Check out my latest covers and original music. New content uploaded regularly!
        </p>
        <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20">
          <h3 className="text-xl font-semibold mb-4 text-blue-400">Recording Setup</h3>
          <p className="text-gray-300">
            I use Reaper DAW for recording and producing my covers, allowing me to create
            professional-quality recordings with precise control over every aspect of the sound.
            From multi-track recording to advanced mixing and mastering, Reaper helps me
            achieve the perfect tone for each cover.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <LatestCovers channelId={process.env.YOUTUBE_CHANNEL_ID || "UC293HFEJqlqxTVNUkKg1xSw"} maxResults={3} />
        <SubscribeCounter channelId={process.env.YOUTUBE_CHANNEL_ID || "UC293HFEJqlqxTVNUkKg1xSw"} />
      </section>
    </div>
  );
}
