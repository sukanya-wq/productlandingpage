import { AIProduct, PlaygroundPreset, PricingTier, Testimonial } from "./types";

export const PRODUCTS: AIProduct[] = [
  {
    id: "text",
    name: "Aura-Write",
    tagline: "The Cognitive Copywriter",
    description: "Formulate breathtaking, conversion-focused content, marketing collateral, and analytical papers in seconds.",
    extendedDescription: "Powered by deep contextual embeddings and optimized for brand consistency. Aura-Write understands custom instructions, target audience personas, and strict regulatory styling requirements.",
    badge: "Most Popular",
    iconName: "FileText",
    stats: [
      { label: "Generation Speed", value: "180 words/s", change: "+45% vs v1" },
      { label: "Accuracy Rating", value: "99.2%", change: "Industry Lead" },
      { label: "Average Cost", value: "$0.0015/k tok", change: "-30% reduction" }
    ],
    features: [
      "Audience persona matching (Executive, Creative, Tech, Casual)",
      "Structured formats: Markdown, JSON schema, CSV bulk exporting",
      "Real-time semantic SEO keyword density optimization",
      "Plagiarism-free and AI-detection bypass filters built-in"
    ]
  },
  {
    id: "vision",
    name: "Vision-Sync",
    tagline: "The Aesthetic Generator",
    description: "Render hyper-realistic visual assets, stunning typography, UI layouts, and illustrations from plain text.",
    extendedDescription: "Vision-Sync uses modern diffusion networks coupled with canvas-aware upscalers. It maintains consistent brand assets and character sheets over multiple generation steps.",
    badge: "Ultra Quality",
    iconName: "Sparkles",
    stats: [
      { label: "Render Time", value: "1.4s average", change: "Instant feedback" },
      { label: "Native Resolution", value: "Up to 8K", change: "Print-ready vectors" },
      { label: "Style Presets", value: "50+ options", change: "Daily updates" }
    ],
    features: [
      "Consistent Character & Object seeds for consecutive frames",
      "Integrated vector exporter for logos and iconography",
      "Exact-fit UI screen generation with modern Tailwind colors",
      "Dynamic lighting controllers (Studio, Neon, Sunset, Volumetric)"
    ]
  },
  {
    id: "audio",
    name: "Audio-Craft",
    tagline: "The Voice Architect",
    description: "Synthesize high-fidelity voice overs, ambient background soundscapes, and expressive language translations.",
    extendedDescription: "Create bespoke voices that mirror your brand's emotional spectrum. Supporting over 45 languages with perfect native inflection, tempo adaptation, and studio noise cancellation.",
    badge: "Highly Immersive",
    iconName: "Volume2",
    stats: [
      { label: "Sample Rate", value: "48kHz Ultra", change: "Studio Grade" },
      { label: "Native Languages", value: "45+ supported", change: "Perfect inflection" },
      { label: "Inference Lag", value: "<85ms latency", change: "Real-time streaming" }
    ],
    features: [
      "Voice Cloning from brief 10-second reference files",
      "SSML tag integration for dynamic breath, emphasis, and pauses",
      "Interactive audio soundscape weaver with customized LFO filters",
      "Dynamic multi-speaker dialogues with custom speaker ratios"
    ]
  },
  {
    id: "code",
    name: "Code-Genius",
    tagline: "The Intelligent Co-Engineer",
    description: "Generate bulletproof APIs, refactor legacy scripts, write test coverage, and clear compile errors automatically.",
    extendedDescription: "A specialized system designed with direct syntax-tree validation. Code-Genius does not just generate text—it parses, compiles, and dry-runs your files before returning solutions.",
    badge: "Core Developer",
    iconName: "Code",
    stats: [
      { label: "Compilation Rate", value: "98.4% success", change: "Syntax checked" },
      { label: "Supported Stacks", value: "30+ languages", change: "Polyglot engine" },
      { label: "Test Coverage", value: "95% auto-gen", change: "Mocha/Jest/Rustc" }
    ],
    features: [
      "Automatic Redis, Postgres, and MongoDB schema builder",
      "Legacy refactoring (e.g. Cobol to Go, Python to Rust)",
      "Zero-dependency modular components styled with standard Tailwind",
      "Real-time complexity analysis and memory optimization suggestions"
    ]
  }
];

export const PLAYGROUND_PRESETS: Record<string, PlaygroundPreset[]> = {
  text: [
    {
      id: "email",
      title: "Design Newsletter",
      prompt: "Write a high-converting launch email for a sleek dark-themed productivity workspace called 'Oasis' targeting freelance developers.",
      output: "Subject: Code in perfect peace. Oasis is here. 🌴\n\nHey [Name],\n\nAs a creator, your screen isn't just a grid—it's a sanctuary. But standard productivity suites clutter your mental workspace.\n\nMeet **Oasis**—the ultra-minimalist developer workspace designed to quiet the noise.\n\n✨ **What sets Oasis apart:**\n• Zero-lag Markdown files synced via git-diff\n• Deep-focus synthesizer streaming custom binaural waves\n• Zero-cookie, local-first database keeping your notes private\n\nClaim early access today and lock in a **40% lifetime developer discount**.\n\n[Get Oasis Access Now]"
    },
    {
      id: "product",
      title: "E-Commerce Copy",
      prompt: "Create a rich product description for an ergonomic mechanical keyboard called 'Zenith Type'. Accentuate tactile feedback.",
      output: "**Zenith Type: The Symphony of Tactility.**\n\nEvery stroke is an intention. Crafted with aerospace-grade brushed aluminum and hand-lubricated linear silent switches, the Zenith Type reimagines long-term coding sessions as a tactile pleasure.\n\nIts custom 6-degree split-beveled design matches your natural wrist resting angle, reducing fatigue by 40%. The sound signature is an incredibly satisfying, muted marble 'thock' that fits perfectly into open-office environments and late-night typing storms alike."
    },
    {
      id: "startup",
      title: "SaaS Pitch Deck Intro",
      prompt: "Write a compelling, punchy elevator pitch for a cloud-native cybersecurity platform for small health startups.",
      output: "**GuardianFlow: HIPAA Compliance on Autopilot.**\n\nHealth-tech startups move fast, but medical data breaches ruin careers. GuardianFlow protects client charts with decentralized encryption keys that embed straight into your database middleware. \n\nGet enterprise-grade patient privacy, real-time threat maps, and instant HIPAA audit logs with exactly one line of code. Secure your first 1,000 patients for free."
    }
  ],
  vision: [
    {
      id: "cyberpunk",
      title: "Cinematic Vector",
      prompt: "Cinematic vector graphic of an astronaut standing over an neon cyber-city under aurora, clean gradient art, dark mode theme.",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "glass",
      title: "Glassmorphic UI",
      prompt: "Modern analytics dashboard card showcasing fluid glassmorphism widgets, glowing neon cyan data metrics, elegant 3D geometric abstract render.",
      imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "nature",
      title: "Minimalist Solar",
      prompt: "A beautiful minimal vector landscape showing a golden solar ring radiating behind clean Scandinavian style pine forests, beige and deep forest green colorway.",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    }
  ],
  audio: [
    {
      id: "narration",
      title: "Luxury Audio",
      prompt: "Warm, cinematic, deep narrative voice-over for a luxury boutique resort brand video, slow tempo, high-fidelity room sound.",
      output: "[Deep Cinematic Voice - Male Speaker]\n\n\"There is a quiet place where time surrenders its crown to the horizon... Where the noise of modern life is gently washed away by the rhythm of the tides. Welcome to the sanctuary of the uncharted. Your next great chapter awaits...\"",
      duration: "0:12",
      metadata: "Model: Audio-Wave-X | Voice: Deep Narrative Male | Pitch: -3Hz | Speed: 0.92x"
    },
    {
      id: "podcast",
      title: "Tech Podcast Intro",
      prompt: "Excited, articulate female announcer introducing a futuristic tech news show, with slight electric audio synth filters.",
      output: "[Articulate Upbeat Announcer - Female Speaker]\n\n\"What happens when the code begins to write itself? Hello and welcome to FuturePulse, your weekly download on quantum intelligence, cyber-security shifts, and the systems shaping tomorrow. I'm your host, Lyra...\"",
      duration: "0:14",
      metadata: "Model: Audio-Wave-X | Voice: Energetic Female | Accent: California (US) | Pitch: Standard"
    }
  ],
  code: [
    {
      id: "rate_limit",
      title: "Express Redis Limiter",
      prompt: "Write a high-performance Express rate-limiter middleware using Redis with a fail-safe fallback inside TypeScript.",
      output: `import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

// Instantiate localized connection
const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export const createRateLimiter = (maxRequests: number, durationSeconds: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const clientIp = req.ip || 'anonymous';
    const redisKey = \`rate_limit:\${clientIp}\`;
    
    try {
      const requestCount = await redisClient.incr(redisKey);
      
      if (requestCount === 1) {
        await redisClient.expire(redisKey, durationSeconds);
      }
      
      const timeToLive = await redisClient.ttl(redisKey);
      
      res.setHeader('X-RateLimit-Limit', maxRequests);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - requestCount));
      res.setHeader('X-RateLimit-Reset', timeToLive);
      
      if (requestCount > maxRequests) {
        return res.status(429).json({
          success: false,
          error: 'Rate Limit Exceeded',
          retryAfterSeconds: timeToLive
        });
      }
      
      return next();
    } catch (error) {
      // Fail-open strategy to protect system uptime if Redis drops
      console.error('Rate limiter Redis failure:', error);
      return next();
    }
  };
};`
    },
    {
      id: "fib_rust",
      title: "Optimized Rust Memo",
      prompt: "Provide an optimized Rust implementation of a recursive Fibonacci calculator using thread-safe lazy caching.",
      output: `use std::collections::HashMap;
use std::sync::{Arc, Mutex};

pub struct SafeFibonacci {
    cache: Arc<Mutex<HashMap<u128, u128>>>,
}

impl SafeFibonacci {
    pub fn new() -> Self {
        let mut initial_cache = HashMap::new();
        initial_cache.insert(0, 0);
        initial_cache.insert(1, 1);
        
        Self {
            cache: Arc::new(Mutex::new(initial_cache)),
        }
    }

    pub fn calculate(&self, term: u128) -> u128 {
        // Scope block to unlock Mutex prior to recursive branches
        {
            let guard = self.cache.lock().unwrap();
            if let Some(&cached_val) = guard.get(&term) {
                return cached_val;
            }
        }

        // Compute step without keeping mutex held
        let computed_value = self.calculate(term - 1) + self.calculate(term - 2);

        // Re-lock to persist calculation
        let mut guard = self.cache.lock().unwrap();
        guard.insert(term, computed_value);
        computed_value
    }
}`
    }
  ]
};

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Developer Sandbox",
    price: "$0",
    frequency: "forever",
    description: "The ideal environment to experiment, build quick proof-of-concepts, and test our API structures.",
    features: [
      "50,000 monthly text generation tokens",
      "25 high-resolution Image frames / mo",
      "5 minutes of synthesized Audio-Craft output",
      "Full access to community SDK libraries",
      "Standard routing (up to 3s typical response)"
    ],
    isPopular: false,
    ctaText: "Get Free Access"
  },
  {
    name: "Aura Professional",
    price: "$49",
    frequency: "month",
    description: "Our core commercial suite designed for startups, creators, and high-frequency production systems.",
    features: [
      "25,000,000 professional generation tokens",
      "3,000 ultra quality image exports / mo",
      "4 hours of premium brand Audio cloning",
      "Optimized GPU priority queue (typically <1s)",
      "Dedicated email and Discord engineering help",
      "Custom brand voice fine-tuning sets"
    ],
    isPopular: true,
    ctaText: "Start 14-Day Free Trial"
  },
  {
    name: "Enterprise Dedicated",
    price: "Custom",
    frequency: "scale",
    description: "Fully-scaled pipelines, private cluster networks, and bespoke model weight adjustments.",
    features: [
      "Infinite token volumes and custom rate caps",
      "Unrestricted parallel batch photo processing",
      "Dedicated single-tenant GPU node allocation",
      "Strict GDPR & HIPAA compliant cloud partitions",
      "Guaranteed 99.99% service uptime SLA",
      "Direct shared channel with our AI core team"
    ],
    isPopular: false,
    ctaText: "Contact Sales Engineering"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: "Integrating Vision-Sync into our design pipelines allowed us to present 4x more brand variations to clients during initial consultation phases. What once took us three days of rendering now happens before the first Zoom meeting wraps up.",
    author: "Elena Rostov",
    role: "Lead Creative Director",
    company: "Studio Obsidian",
    industry: "Agency",
    rating: 5
  },
  {
    id: "t2",
    quote: "As a solo developer, writing test cases and moving legacy Express servers over to Rust was a mountain I couldn't climb alone. Code-Genius didn't just write my files; it helped me understand the memory safety constraints step-by-step.",
    author: "Marcus Vance",
    role: "Founder",
    company: "Hyperion-OS",
    industry: "SaaS",
    rating: 5
  },
  {
    id: "t3",
    quote: "Our e-commerce store needs consistent visual lookbooks for new inventory launches. Vision-Sync keeps our core model assets completely stable across seasons. The results are indistinguishable from professional photo shoots.",
    author: "Sora Takahashi",
    role: "VP of E-Commerce Growth",
    company: "Elysian Threads",
    industry: "E-commerce",
    rating: 5
  },
  {
    id: "t4",
    quote: "The inflection and lifelike delivery of the Audio-Craft voices is genuinely remarkable. We generated localization tracks for our video courses in five languages, and our international enrollment numbers went up by 180% within the quarter.",
    author: "Damián Cruz",
    role: "Head of Educational Experience",
    company: "Apex Academy",
    industry: "Creator",
    rating: 5
  }
];
