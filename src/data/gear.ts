export interface GearItem {
  slug: string;
  name: string;
  type: 'electric' | 'acoustic' | 'amplifier' | 'pedal' | 'accessory' | 'software' | 'other';
  subtitle?: string;
  featured?: string; // New field for featured text
  acquired?: string;
  specs?: string[];
  images: string[]; // public paths like /gear/les-paul/1.jpg
  story: string;
  featuredVideoIds?: string[]; // YouTube video IDs this gear was used in
}

export interface GearSection {
  id: string;
  title: string;
  subtitle?: string;
  items: GearItem[];
}

// Example data. Replace image paths with your actual photos placed under /public/gear/<slug>/
export const gearSections: GearSection[] = [
  {
    id: 'guitars',
    title: 'Guitars',
    subtitle: 'My prized axe collection.',
    items: [
      {
        slug: 'fender-stratocaster-mim-1998',
        name: 'Fender Stratocaster',
        type: 'electric',
        subtitle: '1998 · Made in Mexico',
        acquired: '2015',
        specs: ['Alder body', 'Single‑coils', 'Maple neck'],
        images: [
          '/gear/guitars/strat1.jpg',
          '/gear/guitars/strat2.jpg',
          '/gear/guitars/strat3.jpg',
        ],
        story:
          "Got a sweet deal as a young 17 year old on this one. Added black knobs at some point in time... Can't get that tone otherwise, plays like a dream and sounds fantastic.",
        featuredVideoIds: [],
      },
      {
        slug: 'gibson-les-paul-50s-tribute-2016',
        name: 'Gibson Les Paul 50\'s Tribute',
        type: 'electric',
        subtitle: '2016 · Satin Honey',
        featured: "Featured in 'Metallica\'s Creeping Death... Darker & Heavier in Eb'",
        acquired: '2017',
        specs: ['Mahogany body', 'Maple top', 'Humbuckers'],
        images: [
          '/gear/guitars/gibson1.jpg',
          '/gear/guitars/gibson2.jpg',
          '/gear/guitars/gibson3.jpg',
        ],
        story:
          "A BEAST of a guitar. It's been on most of my Metallica covers. Bought it at 17 years old at a sick price discount working at Best Buy while in highschool.",
        featuredVideoIds: ['kS0qU76oQHs'],
      },
      {
        slug: 'samick-sw115',
        name: 'Samick SW115',
        type: 'acoustic',
        subtitle: '1992 · Acoustic Guitar',
        acquired: '2013',
        specs: [''],
        images: [
          '/gear/guitars/samick1.jpg',
          '/gear/guitars/samick2.jpg',
          '/gear/guitars/samick3.jpg',
        ],
        story:
          'My first ever guitar. My uncle Roger saw I was interested in playing and gave it to me. I was 14 years old, and I was hooked immediately. With the action at a foot high, my fingers could stop a bullet. This guitar has my first good 100+ hours of playing on it.',
        featuredVideoIds: [],
      },
      {
        slug: 'yamaha-acoustic',
        name: 'Yamaha Acoustic',
        featured: "Featured in 'Battery Acoustic in C# is SOOTHING'",
        type: 'acoustic',
        subtitle: '2013 · FGX700SC',
        acquired: '2014',
        specs: [''],
        images: [
          '/gear/guitars/yamaha1.jpg',
          '/gear/guitars/yamaha2.jpg',
          '/gear/guitars/yamaha3.jpg',
          '/gear/guitars/yamaha4.jpg',
        ],
        story:
          "My second ever guitar. My uncle Phil bought me this at Steve's Music in 2014 as my 15th birthday gift. My most played acoustic guitar. It's heard every tuning, seen all types of seasons, and always sounds like I want it to. Workhorse of a guitar.",
        featuredVideoIds: [],
      },
      {
        slug: 'guild-acoustic',
        name: 'Guild Acoustic',
        type: 'acoustic',
        subtitle: 'Vintage Family Heirloom',
        acquired: '—',
        specs: ['Passed down through generations'],
        images: [
          '/gear/guitars/guild1.jpg',
          '/gear/guitars/guild2.jpg',
          '/gear/guitars/guild3.jpg',
          '/gear/guitars/guild4.jpg',
          '/gear/guitars/guild6.jpg',
          '/gear/guitars/guild7.jpg',
          '/gear/guitars/guild8.jpg',
        ],
        story:
          "This guitar his familiar with more than 10 fingers. I inherited it from my father, who inherited it from my grandfather when he passed. I'm very proud to own this guitar and play it for my family.",
        featuredVideoIds: [],
      },
    ],
  },
  {
    id: 'amplifiers',
    title: 'Amplifiers',
    subtitle: 'The power behind the tone',
    items: [
      {
        slug: 'marshall-dsl15c',
        name: 'Marshall DSL15C',
        type: 'amplifier',
        subtitle: '15W Combo',
        acquired: '—',
        specs: ['Dual channels', 'Classic/Ultra gain', 'British tone'],
        images: [
          '/gear/amps/dsl15c1.jpg',
          '/gear/amps/dsl15c2.jpg',
        ], // Add photos when available
        story:
          'Compact, loud, and very Marshall. Everyone loves a Marshall, and this one caught my eye from watching "Sound Like..." videos from the Andertons Music Co channel.',
        featuredVideoIds: [],
      },
      {
        slug: 'ignite-emissary',
        name: 'Ignite Emissary',
        type: 'amplifier',
        subtitle: 'Digital Amplifier',
        acquired: '2019',
        specs: ['Metal Tones', 'Metallica Machine', 'Customizable'],
        images: [
          '/gear/amps/ignite1.jpg',
        ], // Add photos when available
        story:
          'If you want to sound like a metal god, this is the amp for you. I use this for my metal tones and it sounds amazing. My go to for any Metallica sound.',
        featuredVideoIds: [],
      },
      {
        slug: 'fender-mustang-ii',
        name: 'Fender Mustang II',
        type: 'amplifier',
        subtitle: '20W Modeling Amp',
        acquired: '2014',
        specs: ['7+ amp types', 'multiple effects', 'USB'],
        images: [
          '/gear/amps/mustang1.jpg',
        ], // Add photos when available
        story:
          'My first "real" amp. I bought this in 2014 to replace my old practice amp. It was a big step up in tone and power. I still use it today to practice',
        featuredVideoIds: [],
      },
    ],
  },
  {
    id: 'software',
    title: 'Software & Recording',
    subtitle: 'Digital tools for modern guitarists',
    items: [
      {
        slug: 'reaper-daw',
        name: 'Reaper DAW',
        type: 'software',
        subtitle: 'Digital Audio Workstation',
        acquired: '—',
        specs: ['Professional recording', 'VST support', 'Affordable'],
        images: ['/gear/recording/reaper.jpg'], // Add icon when available
        story:
          'My main recording software. Reaper is powerful, stable, and doesn\'t break the bank. Perfect for recording guitar covers and original music.',
        featuredVideoIds: [],
      },
      {
        slug: 'iphone-16-pro',
        name: 'iPhone 16 Pro',
        type: 'software',
        subtitle: 'Mobile Recording Device',
        acquired: '—',
        specs: ['High-quality camera', 'Built-in microphone', 'Portable', 'Always ready'],
        images: [
          '/gear/recording/i16.jpg',
        ], // Add icon when available
        story:
          'Yes, really - I use my phone for most of my acoustic recordings! The iPhone 16 Pro has surprisingly good audio quality and is always ready to capture those spontaneous moments. Sometimes the best gear is the one you always have with you. Plus, it fits in my pocket!',
        featuredVideoIds: [],
      },
      {
        slug: 'steinberg-ur22c',
        name: 'Steinberg UR22C',
        type: 'accessory',
        subtitle: 'Audio Interface',
        acquired: '—',
        specs: ['24-bit/192kHz', 'USB-C', 'Clean preamps', 'DSP effects'],
        images: ['/gear/recording/ur22c.jpg'], // Add icon when available
        story:
          'My main audio interface for recording guitar and vocals. The UR22C delivers crystal clear audio with its high-quality preamps and built-in DSP effects. The USB-C connection ensures reliable, low-latency performance for both live recording and studio work.',
        featuredVideoIds: [],
      },
    ],
  },
  {
    id: 'accessories',
    title: 'Accessories & Essentials',
    subtitle: 'The little things that make a big difference',
    items: [
      {
        slug: 'dunlop-jazziii-picks',
        name: 'Dunlop Jazz III Picks',
        type: 'accessory',
        subtitle: 'Guitar Picks',
        acquired: '—',
        specs: ['Percision', 'Small', 'Great grip'],
        images: ['/gear/accessories/pick.jpg'], // Add icon when available
        story:
          'My go-to pick (get it?). Easily loseable, but worth the struggle.',
        featuredVideoIds: [],
      },
      {
        slug: 'audio-technica-ath-m50x',
        name: ' Audio Technica ATH-M50X',
        type: 'accessory',
        subtitle: 'Headphones',
        acquired: '—',
        specs: ['Balanced sound', 'Durable', 'Frequency range'],
        images: ['/gear/accessories/m50x.jpg'], // Add icon when available
        story: 'Luckily for my neighbors, I have these on my head at all times. I use them to mix anything I record. Also to hear those bone crushing Metallica tones.',
        featuredVideoIds: [],
      },
      {
        slug: 'nad-ir-impulse-responder',
        name: 'Nad IR Impulse Response Loader',
        type: 'accessory',
        subtitle: 'Virtual Cabinets',
        acquired: '—',
        specs: ['Great included IRs', 'Reliable sound', 'Easy to use'],
        images: ['/gear/accessories/nadir.jpg'], // Add icon when available
        story:
          'A great way to get a lot of different tones from any amp. I use this to shape my tone with the Emissary.',
        featuredVideoIds: [],
      },
    ],
  },
];

// Legacy export for backward compatibility
export const gearItems: GearItem[] = gearSections.flatMap(section => section.items);
