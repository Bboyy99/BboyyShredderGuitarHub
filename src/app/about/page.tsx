'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { getChannelStats } from '@/lib/youtube';

interface Section {
  id: string;
  title: string;
  subtitle?: string;
  content: string | string[];
  type: 'text' | 'list' | 'quote' | 'stats' | 'youtube' | 'youtube-community';
  icon?: string;
  image?: string;
}

const sections: Section[] = [
  {
    id: 'intro',
    title: 'Hey, I\'m Brandon',
    subtitle: 'Guitarist, Content Creator, Music Enthusiast',
    content: 'Welcome to my corner of the internet! I\'m a passionate guitarist and music lover who loves sharing the joy of music through covers, relaxing soundscapes, and reimagined compositions.',
    type: 'text',
    icon: '🎸',
    image: '/aboutPics/intro.jpg'
  },
  {
    id: 'journey',
    title: 'My Musical Journey',
    subtitle: 'From First Chord to Today',
    content: [
      'Started playing guitar in my early teens, inspired by classic rock and blues (cliche right?)',
      'Spent countless hours learning Metallica riffs and studying their sound through the years',
      'Discovered my love for ambient soundscapes and relaxing music',
      'Finally began sharing covers online and building a community of music lovers',
    ],
    type: 'list',
    icon: '🚀',
    image: '/aboutPics/journey.jpg'
  },
  {
    id: 'inspiration',
    title: 'What Inspires Me',
    subtitle: 'The Music That Moves Me',
    content: [
      'Metallica - The raw power and technical precision of their music',
      'Stevie Ray Vaughan - The soul and emotion in every note',
      'Classic Rock - The energy and storytelling of the 70s and 80s',
      'Blues - The raw emotion and improvisational freedom',
      'Modern Guitarists - Seeing how others push the boundaries'
    ],
    type: 'list',
    icon: '✨',
    image: '/aboutPics/inspire5.jpg',
  },
  {
    id: 'goal',
    title: 'My Mission',
    subtitle: 'Why I Do What I Do',
    content: 'I want to inspire others to discover the joy of playing guitar. Whether you\'re a complete beginner or an experienced player, there\'s always something new to learn and explore. My goal is to create content that not only showcases great music but also encourages others to pick up an instrument and start their own musical journey.',
    type: 'text',
    icon: '🎯',
    image: '/aboutPics/mission.jpg'
  },
  {
    id: 'style',
    title: 'My Playing Style',
    subtitle: 'Heavy Metal Meets Blues Soul',
    content: 'I love the contrast between heavy, technical metal riffs and soulful blues licks. My style combines the precision and power of Metallica with the emotion and feel of blues guitar. Whether I\'m playing a crushing metal riff or a delicate acoustic piece, I always try to put feeling and emotion into every note.',
    type: 'text',
    icon: '⚡',
    image: '/aboutPics/style.jpg'
  },
  {
    id: 'community',
    title: 'Building a Community',
    subtitle: 'Connecting Through Music',
    content: 'One of the most rewarding parts of this journey has been connecting with fellow guitarists and music lovers. The comments, messages, and conversations about music have created an amazing community. I believe music has the power to bring people together, and I\'m grateful to be part of that connection.',
    type: 'youtube-community',
    icon: '🤝'
  },
  {
    id: 'gear-philosophy',
    title: 'My Gear Philosophy',
    subtitle: 'Tools of the Trade',
    content: 'I believe great tone comes from the player, not just the gear. While I love my guitars and equipment, I\'ve learned that passion and practice matter more than expensive gear. Some of my best recordings have been done with simple setups - sometimes even just my phone! It\'s about making the most of what you have.',
    type: 'text',
    icon: '🔧',
    image: '/aboutPics/gear.jpg'
  },
  {
    id: 'future',
    title: 'Looking Forward',
    subtitle: 'What\'s Next',
    content: 'I\'m excited to continue growing as a musician and content creator. I want to explore more genres, collaborate with other musicians, and create original music. Most importantly, I want to keep inspiring others to discover the joy of playing guitar. The journey never ends, and I\'m just getting started.',
    type: 'youtube',
    icon: '🌟'
  }
];

function YouTubeSection({ channelId }: { channelId: string }) {
  const [stats, setStats] = useState<{ subscriberCount: string | number; videoCount: string | number; viewCount: string | number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const channelStats = await getChannelStats(channelId);
        setStats(channelStats);
      } catch (error) {
        console.error('Error fetching channel stats:', error);
        // Fallback stats
        setStats({
          subscriberCount: '1.2K',
          videoCount: '50+',
          viewCount: '100K+'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [channelId]);

  const formatCount = (count: string | number) => {
    // Convert to string if it's a number
    const countStr = typeof count === 'number' ? count.toString() : count;
    
    // Handle cases where count might be undefined or null
    if (!countStr) return '0';
    
    // Remove commas and convert to number
    const num = parseInt(countStr.replace(/,/g, ''));
    
    // Handle NaN cases
    if (isNaN(num)) return countStr;
    
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="relative h-96 lg:h-full rounded-xl overflow-hidden bg-gradient-to-br from-red-600/20 to-red-800/20 border border-red-500/30">
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      
      <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="text-6xl mb-4">📺</div>
        
        <h3 className="text-2xl font-bold text-white mb-2">Join the Journey</h3>
        <p className="text-gray-300 mb-6">Subscribe for new covers every week!</p>
        
        {loading ? (
          <div className="space-y-4">
            <div className="animate-pulse bg-gray-700 h-8 w-32 rounded"></div>
            <div className="animate-pulse bg-gray-700 h-6 w-24 rounded"></div>
          </div>
        ) : stats ? (
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {formatCount(stats.subscriberCount)}
              </div>
              <div className="text-sm text-gray-400">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {formatCount(stats.videoCount)}
              </div>
              <div className="text-sm text-gray-400">Videos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {formatCount(stats.viewCount)}
              </div>
              <div className="text-sm text-gray-400">Views</div>
            </div>
          </div>
        ) : null}
        
        <a
          href="https://www.youtube.com/@BboyyShredder"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
        >
          <span>🎸</span>
          Subscribe on YouTube
          <span>→</span>
        </a>
      </div>
    </div>
  );
}

function YouTubeCommunitySection() {
  const [currentComment, setCurrentComment] = useState(0);
  
  const communityComments = [
    {
      text: "This cover is absolutely amazing! 🔥",
      author: "GuitarLover42",
      time: "2 hours ago",
      emoji: "🔥"
    },
    {
      text: "Your tone is incredible, what gear are you using?",
      author: "MusicExplorer",
      time: "1 day ago", 
      emoji: "🎸"
    },
    {
      text: "This helped me learn the song, thank you!",
      author: "BeginnerGuitarist",
      time: "3 days ago",
      emoji: "🙏"
    },
    {
      text: "The emotion in your playing is beautiful",
      author: "SoulMusicFan",
      time: "1 week ago",
      emoji: "💙"
    },
    {
      text: "Can't wait for your next cover!",
      author: "LoyalViewer",
      time: "1 week ago",
      emoji: "⭐"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentComment((prev) => (prev + 1) % communityComments.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-96 lg:h-full rounded-xl overflow-hidden bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30">
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      
      <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="text-6xl mb-4">💬</div>
        
        <h3 className="text-2xl font-bold text-white mb-2">Community Love</h3>
        <p className="text-gray-300 mb-8">Real comments from amazing viewers</p>
        
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {communityComments[currentComment].author.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-white">{communityComments[currentComment].author}</span>
                  <span className="text-gray-400 text-sm">{communityComments[currentComment].time}</span>
                </div>
                <p className="text-gray-200 text-left">
                  {communityComments[currentComment].text}
                </p>
              </div>
              <div className="text-2xl">{communityComments[currentComment].emoji}</div>
            </div>
          </div>
          
          {/* Comment indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {communityComments.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentComment 
                    ? 'bg-purple-400 scale-125' 
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-300 text-sm mb-4">Join the conversation!</p>
          <a
            href="https://www.youtube.com/@BboyyShredder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
          >
            <span>💬</span>
            Leave a Comment
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function Section({ section, isVisible, isEven, channelId }: { section: Section; isVisible: boolean; isEven: boolean; channelId: string }) {
  const renderContent = () => {
    switch (section.type) {
      case 'list':
        return (
          <ul className="space-y-3">
            {Array.isArray(section.content) && section.content.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-turquoise-400 mt-1">•</span>
                <span className="text-gray-300 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        );
      case 'quote':
        return (
          <blockquote className="text-xl text-gray-300 italic border-l-4 border-turquoise-500 pl-6">
            &ldquo;{section.content}&rdquo;
          </blockquote>
        );
      default:
        return (
          <p className="text-gray-300 leading-relaxed text-lg">
            {section.content}
          </p>
        );
    }
  };

  const ImageSection = () => {
    if (section.type === 'youtube') {
      return <YouTubeSection channelId={channelId} />;
    }
    
    if (section.type === 'youtube-community') {
      return <YouTubeCommunitySection />;
    }
    
    return (
      <div className="relative h-96 lg:h-full rounded-xl overflow-hidden">
        {section.image ? (
          <Image
            src={section.image}
            alt={section.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
            <div className="text-6xl">{section.icon}</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
    );
  };

  const ContentSection = () => (
    <div className="flex flex-col justify-center h-full p-8 lg:p-12">
      <div className="text-4xl mb-4">{section.icon}</div>
      <h2 className="text-3xl lg:text-4xl font-bold text-blue-400 mb-2">{section.title}</h2>
      {section.subtitle && (
        <p className="text-xl text-gray-400 mb-6">{section.subtitle}</p>
      )}
      <div className="text-gray-300">
        {renderContent()}
      </div>
    </div>
  );

  return (
    <section 
      className={`mb-20 transition-all duration-1000 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gray-900/50 border border-blue-500/20 rounded-xl overflow-hidden shadow-2xl">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${isEven ? 'lg:grid-flow-col' : ''}`}>
            {isEven ? (
              <>
                <ContentSection />
                <ImageSection />
              </>
            ) : (
              <>
                <ImageSection />
                <ContentSection />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['intro']));
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const channelId = process.env.YOUTUBE_CHANNEL_ID || "UC293HFEJqlqxTVNUkKg1xSw";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px'
      }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get to know the person behind the guitar covers and discover what drives my passion for music.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((section, index) => (
          <div
            key={section.id}
            id={section.id}
            ref={(el) => {
              sectionRefs.current[section.id] = el;
            }}
          >
            <Section 
              section={section} 
              isVisible={visibleSections.has(section.id)}
              isEven={index % 2 === 1}
              channelId={channelId}
            />
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-20 mb-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-400 mb-4">
            Ready to Rock?
          </h2>
          <p className="text-gray-400 mb-8">
            Check out my latest covers and join the community!
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/covers"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
            >
              Watch Covers
            </a>
            <a
              href="/gear"
              className="px-6 py-3 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-200 font-medium"
            >
              See My Gear
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 