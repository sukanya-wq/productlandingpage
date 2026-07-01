/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useMemo, FormEvent } from 'react';
import { 
  Sparkles, 
  FileText, 
  Volume2, 
  Code, 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  Calculator, 
  TrendingUp, 
  Coins, 
  Clock, 
  ArrowUpRight, 
  Menu, 
  X, 
  ChevronRight, 
  Terminal, 
  Sliders, 
  BarChart3, 
  Play, 
  Square, 
  Download, 
  RefreshCw, 
  Briefcase, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Users, 
  Star, 
  Copy, 
  CopyCheck,
  Cpu,
  Database,
  ArrowRightLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AIProduct, PlaygroundPreset, PricingTier, Testimonial } from './types';
import { PRODUCTS, PLAYGROUND_PRESETS, PRICING_TIERS, TESTIMONIALS } from './data';

// Custom dynamic response generation helper for customized playground prompts
function generateDynamicResponse(category: string, prompt: string): { output: string; imageUrl?: string; duration?: string; metadata?: string; } {
  const lowercasePrompt = prompt.trim().toLowerCase();
  const words = prompt.trim().split(/\s+/).slice(0, 4).join(" ");
  const topic = words || "your custom objective";

  if (category === "text") {
    return {
      output: `**Dynamic Generation for: "${topic}"**\n\nHere is a professionally synthesized copy block tailored specifically to your prompt guidelines:\n\n✨ **Core Value Proposition**\nReimagine how you handle ${topic}. By combining next-generation semantic models with context-aware personalization, our AI matches your brand's natural emotional spectrum.\n\n⚡ **Key Features & Benefits**\n• **Instant Resonance:** Automatically tunes sentence structures for high engagement.\n• **Context Preservation:** Retains critical brand terminology throughout the copy.\n• **Hyper-Scale Generation:** Ready to export to Markdown, CSV, or directly via our API.\n\n*Optimized by Aura-Write in 0.8s. Standard rating: 99.2% effectiveness.*`
    };
  } else if (category === "vision") {
    let imgUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"; // default wave
    if (lowercasePrompt.includes("ocean") || lowercasePrompt.includes("blue") || lowercasePrompt.includes("water") || lowercasePrompt.includes("sea")) {
      imgUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80";
    } else if (lowercasePrompt.includes("forest") || lowercasePrompt.includes("green") || lowercasePrompt.includes("nature") || lowercasePrompt.includes("tree")) {
      imgUrl = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80";
    } else if (lowercasePrompt.includes("city") || lowercasePrompt.includes("neon") || lowercasePrompt.includes("tech") || lowercasePrompt.includes("cyberpunk")) {
      imgUrl = "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80";
    } else if (lowercasePrompt.includes("gold") || lowercasePrompt.includes("light") || lowercasePrompt.includes("sun") || lowercasePrompt.includes("sunset")) {
      imgUrl = "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80";
    }
    return {
      output: `Prompt: "${prompt}"`,
      imageUrl: imgUrl
    };
  } else if (category === "audio") {
    return {
      output: `[Synthesized Audio-Craft Narration Peak Model]\n\n"[Soft breath-in] Discover the sound of perfect clarity. In a world of constant frequency clutter, we craft standard resonance. Speaking directly to the soul of '${topic}', our voice synthesizer delivers pure emotional engagement with absolute studio fidelity."`,
      duration: "0:11",
      metadata: `Model: Audio-Wave-X | Custom Synthesis for: "${topic}" | Temp: High | Pitch: Standard`
    };
  } else {
    const functionName = topic.toLowerCase().replace(/[^a-z0-9]/g, "_") || "process_data";
    return {
      output: `// Auto-generated Code-Genius function for: "${prompt}"
// Fully optimized, type-safe, and validated syntax.

interface ProcessingPayload<T> {
  id: string;
  timestamp: number;
  data: T;
}

/**
 * Executes a fully parallelized, retry-capable payload execution block.
 * Optimized for memory utilization with real-time feedback loops.
 */
export async function ${functionName}<T>(
  payload: ProcessingPayload<T>,
  retries = 3
): Promise<{ success: boolean; durationMs: number }> {
  const startTime = Date.now();
  console.log(\`Starting automated execution sequence for payload ID: \${payload.id}\`);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const outcome = await Promise.race([
        performInternalExecution(payload.data),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2500))
      ]);

      return {
        success: true,
        durationMs: Date.now() - startTime
      };
    } catch (error) {
      console.warn(\`Execution attempt \${attempt} failed. Retrying in 500ms...\`);
      if (attempt === retries) {
        throw new Error(\`Failed to resolve automated instruction after \${retries} attempts.\`);
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  return { success: false, durationMs: Date.now() - startTime };
}

async function performInternalExecution<T>(data: T): Promise<boolean> {
  return typeof data !== 'undefined';
}`
    };
  }
}

// Icon helper mapping to avoid TS index lookup errors
function ProductIcon({ name, className }: { name: string; className?: string }) {
  if (name === "FileText") return <FileText className={className} />;
  if (name === "Sparkles") return <Sparkles className={className} />;
  if (name === "Volume2") return <Volume2 className={className} />;
  if (name === "Code") return <Code className={className} />;
  return <Sparkles className={className} />;
}

export default function App() {
  // Mobile navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active product tab for product showcase and playground
  const [activeCategory, setActiveCategory] = useState<string>("text");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("email");

  // Playground prompts & parameters state
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [isPlayinggroundGenerating, setIsPlaygroundGenerating] = useState<boolean>(false);
  const [playgroundLog, setPlaygroundLog] = useState<string>("");
  const [generatedOutput, setGeneratedOutput] = useState<string>("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>("");
  const [generatedDuration, setGeneratedDuration] = useState<string>("");
  const [generatedMetadata, setGeneratedMetadata] = useState<string>("");
  
  // Audio playback simulator
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [audioBars, setAudioBars] = useState<number[]>(Array(18).fill(15));

  // Playground settings
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>("16:9");
  const [selectedVoice, setSelectedVoice] = useState<string>("narrator");
  const [temperature, setTemperature] = useState<number>(0.7);

  // Copy success indicator
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // ROI Calculator states
  const [sliderRequests, setSliderRequests] = useState<number>(120000); // 120k requests/month
  const [sliderHoursSaved, setSliderHoursSaved] = useState<number>(45); // 45 hours saved/month

  // Filter for Testimonials
  const [activeTestimonialFilter, setActiveTestimonialFilter] = useState<string>("All");

  // Lead early access form
  const [formName, setFormName] = useState<string>("");
  const [formEmail, setFormEmail] = useState<string>("");
  const [formCompany, setFormCompany] = useState<string>("");
  const [formTier, setFormTier] = useState<string>("Aura Professional");
  const [formUseCases, setFormUseCases] = useState<string>("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [generatedApiKey, setGeneratedApiKey] = useState<string>("");
  const [copiedKey, setCopiedKey] = useState<boolean>(false);

  // Toast message system
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load preset on tab or selection change
  useEffect(() => {
    const presets = PLAYGROUND_PRESETS[activeCategory] || [];
    const currentPreset = presets.find(p => p.id === selectedPresetId) || presets[0];
    if (currentPreset) {
      setCustomPrompt(currentPreset.prompt);
      // Clear generation state
      setGeneratedOutput("");
      setGeneratedImageUrl("");
      setGeneratedDuration("");
      setGeneratedMetadata("");
      setIsAudioPlaying(false);
    }
  }, [activeCategory, selectedPresetId]);

  // Audio equalizer simulator effect
  useEffect(() => {
    if (isAudioPlaying) {
      audioIntervalRef.current = setInterval(() => {
        setAudioBars(prev => prev.map(() => Math.floor(Math.random() * 45) + 5));
      }, 100);
    } else {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      setAudioBars(Array(18).fill(12));
    }
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, [isAudioPlaying]);

  // Toast helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Run the sandbox simulation
  const handlePlaygroundGenerate = () => {
    if (!customPrompt.trim()) {
      triggerToast("Please input a prompt to initiate generation.");
      return;
    }

    setIsPlaygroundGenerating(true);
    setIsAudioPlaying(false);
    setGeneratedOutput("");
    setGeneratedImageUrl("");
    
    // Simulate compilation/routing logs first
    let logs = [
      `[sys] Init routing to regional GPU cluster: us-central1-a...`,
      `[sys] Running token evaluation and safety filters...`,
      `[sys] Allocating compute partition (FP8 tensor core optimized)...`,
      `[sys] Executing neural inference path...`
    ];
    
    setPlaygroundLog(logs[0]);
    
    setTimeout(() => {
      setPlaygroundLog(prev => prev + "\n" + logs[1]);
    }, 300);

    setTimeout(() => {
      setPlaygroundLog(prev => prev + "\n" + logs[2]);
    }, 600);

    setTimeout(() => {
      setPlaygroundLog(prev => prev + "\n" + logs[3]);
    }, 900);

    setTimeout(() => {
      // Find matching preset or generate on the fly
      const presets = PLAYGROUND_PRESETS[activeCategory] || [];
      const matchingPreset = presets.find(p => p.prompt.trim().toLowerCase() === customPrompt.trim().toLowerCase());
      
      let finalResult;
      if (matchingPreset) {
        finalResult = {
          output: matchingPreset.output,
          imageUrl: matchingPreset.imageUrl,
          duration: matchingPreset.duration || "",
          metadata: matchingPreset.metadata || ""
        };
      } else {
        const dynamicRes = generateDynamicResponse(activeCategory, customPrompt);
        finalResult = {
          output: dynamicRes.output,
          imageUrl: dynamicRes.imageUrl,
          duration: activeCategory === "audio" ? "0:11" : "",
          metadata: activeCategory === "audio" ? "Model: Audio-Wave-X | Pitch: Custom" : ""
        };
      }

      setIsPlaygroundGenerating(false);
      setPlaygroundLog("");

      if (activeCategory === "vision" && finalResult.imageUrl) {
        setGeneratedImageUrl(finalResult.imageUrl);
      } else {
        // Stream text output
        let i = 0;
        const textToStream = finalResult.output;
        const interval = setInterval(() => {
          setGeneratedOutput(() => textToStream.slice(0, i));
          i += 4;
          if (i > textToStream.length) {
            clearInterval(interval);
            setGeneratedOutput(textToStream);
            if (activeCategory === "audio") {
              setGeneratedDuration(finalResult.duration);
              setGeneratedMetadata(finalResult.metadata);
              setIsAudioPlaying(true); // Auto-start equalizer animation
            }
          }
        }, 8);
      }
    }, 1300);
  };

  // ROI calculations
  const roiCalculations = useMemo(() => {
    // Standard model token consumption estimation
    // 1 prompt request averages roughly 800 input/output tokens
    const totalTokens = sliderRequests * 800;
    const rawAICost = (totalTokens / 1000) * 0.0015; // Aura pricing
    
    // Manual hours saved cost at professional rate ($65/hour)
    const hoursSavedFTEVal = sliderHoursSaved * 65;
    
    // Net saved value after substracting platform license fee (approx $49)
    const netSavings = Math.max(0, hoursSavedFTEVal - rawAICost);
    const multiplier = rawAICost > 0 ? (hoursSavedFTEVal / Math.max(1, rawAICost)).toFixed(1) : "0.0";

    return {
      tokens: totalTokens.toLocaleString(),
      aiCost: Math.ceil(rawAICost).toLocaleString(),
      hoursSavedVal: hoursSavedFTEVal.toLocaleString(),
      netSavings: Math.ceil(netSavings).toLocaleString(),
      roiMultiplier: multiplier
    };
  }, [sliderRequests, sliderHoursSaved]);

  // Filtered Testimonials
  const filteredTestimonials = useMemo(() => {
    if (activeTestimonialFilter === "All") return TESTIMONIALS;
    return TESTIMONIALS.filter(t => t.industry === activeTestimonialFilter);
  }, [activeTestimonialFilter]);

  // Lead submission handler
  const handleLeadSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formName.trim()) errors.name = "Full name is required";
    if (!formEmail.trim()) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formEmail)) {
      errors.email = "Please input a valid email address";
    }
    if (!formCompany.trim()) errors.company = "Company name is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      triggerToast("Please review form errors before proceeding.");
      return;
    }

    setFormErrors({});
    // Generate a beautiful mock key
    const prefix = formTier.toLowerCase().includes("sandbox") ? "AURA_SBOX" : 
                   formTier.toLowerCase().includes("professional") ? "AURA_PRO" : "AURA_ENT";
    const randomHex = Array.from({length: 16}, () => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase();
    const mockApiKey = `${prefix}_${randomHex}_2026`;

    setGeneratedApiKey(mockApiKey);
    setFormSubmitted(true);
    triggerToast(`Congratulations! Access granted to ${formTier}.`);

    // Persist to localStorage
    const savedLeads = JSON.parse(localStorage.getItem("aura_leads") || "[]");
    savedLeads.push({
      name: formName,
      email: formEmail,
      company: formCompany,
      tier: formTier,
      useCases: formUseCases,
      apiKey: mockApiKey,
      submittedAt: new Date().toISOString()
    });
    localStorage.setItem("aura_leads", JSON.stringify(savedLeads));
  };

  const copyToClipboard = (text: string, isKey: boolean = false) => {
    navigator.clipboard.writeText(text);
    if (isKey) {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } else {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
    triggerToast("Copied to clipboard!");
  };

  const selectProductFromCards = (id: string) => {
    setActiveCategory(id);
    const defaultPreset = PLAYGROUND_PRESETS[id]?.[0];
    if (defaultPreset) {
      setSelectedPresetId(defaultPreset.id);
    }
    // Smooth scroll to sandbox
    const element = document.getElementById("sandbox-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const selectPricingTier = (tierName: string) => {
    setFormTier(tierName);
    const element = document.getElementById("early-access-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="app-root" className="min-h-screen elegant-dark-radial text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 border border-zinc-800 text-zinc-100 px-6 py-3.5 rounded-full shadow-2xl flex items-center space-x-3 backdrop-blur-xl"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm font-medium tracking-wide">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid subtle background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Navigation Header */}
      <nav id="navbar" className="sticky top-0 z-40 border-b border-zinc-800/50 bg-[#0A0A0B]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Sparkles className="w-5 h-5 text-white stroke-[2.5px]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                AURA AI
              </span>
              <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[10px] text-emerald-400 font-mono tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block mr-1" />
                ALL SYSTEMS OPERATIONAL
              </div>
            </div>

            <div className="hidden md:flex items-center gap-10 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
              <a href="#suite-section" className="hover:text-indigo-400 transition-colors">Product Suite</a>
              <a href="#sandbox-section" className="hover:text-indigo-400 transition-colors">Interactive Sandbox</a>
              <a href="#calculator-section" className="hover:text-indigo-400 transition-colors">ROI Calculator</a>
              <a href="#specs-section" className="hover:text-indigo-400 transition-colors">Technical Specs</a>
              <a href="#pricing-section" className="hover:text-indigo-400 transition-colors">Licensing</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => {
                  const el = document.getElementById("sandbox-section");
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2.5 bg-zinc-900 border border-zinc-800 rounded-full text-sm font-semibold hover:bg-zinc-800 text-zinc-200 transition-colors flex items-center space-x-2"
              >
                <span>Launch Sandbox</span>
                <Terminal className="w-4 h-4 text-zinc-500" />
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById("early-access-section");
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2.5 bg-white text-black hover:bg-zinc-200 rounded-full text-sm font-semibold shadow-lg shadow-indigo-500/10 transition-all active:scale-95"
              >
                Early Access Key
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="md:hidden">
              <button 
                id="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="p-2.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-zinc-900 bg-zinc-950 overflow-hidden"
            >
              <div className="px-4 pt-4 pb-6 space-y-3.5">
                <a 
                  href="#suite-section" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="block px-3 py-2.5 rounded-xl text-base font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white"
                >
                  Product Suite
                </a>
                <a 
                  href="#sandbox-section" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="block px-3 py-2.5 rounded-xl text-base font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white"
                >
                  Interactive Sandbox
                </a>
                <a 
                  href="#calculator-section" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="block px-3 py-2.5 rounded-xl text-base font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white"
                >
                  ROI Calculator
                </a>
                <a 
                  href="#specs-section" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="block px-3 py-2.5 rounded-xl text-base font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white"
                >
                  Technical Specs
                </a>
                <a 
                  href="#pricing-section" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="block px-3 py-2.5 rounded-xl text-base font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white"
                >
                  Licensing
                </a>
                <div className="pt-4 border-t border-zinc-900 flex flex-col space-y-3">
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      const el = document.getElementById("sandbox-section");
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-3 rounded-xl text-center text-sm font-semibold border border-zinc-800 bg-zinc-950 text-zinc-200"
                  >
                    Launch Sandbox
                  </button>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      const el = document.getElementById("early-access-section");
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-3 rounded-xl text-center text-sm font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-zinc-950 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                  >
                    Early Access Key
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-12 pb-24 md:pt-20 md:pb-36 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-8 tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span>LATEST: MODEL-4 QUANTUM RELEASED</span>
          </div>

          {/* Heading */}
          <h1 className="text-[52px] sm:text-[72px] lg:text-[84px] leading-[1.05] font-bold tracking-tighter mb-8 max-w-5xl mx-auto bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
            The multi-model engine <br/> for next-generation products.
          </h1>

          {/* Paragraph */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-zinc-400 mb-12 leading-relaxed font-light">
            Engineered with deep semantic synthesis, sub-100ms audio latencies, robust code AST verification, and gorgeous vector-ready vision generators. One SDK, limitless creative scale.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-5 mb-20">
            <button 
              onClick={() => {
                const el = document.getElementById("sandbox-section");
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-10 py-5 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-transform active:scale-95 shadow-xl shadow-indigo-500/10 cursor-pointer"
            >
              <span>Start Deploying Free</span>
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById("calculator-section");
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-10 py-5 bg-transparent border border-zinc-700 text-white rounded-full font-bold hover:border-white transition-colors cursor-pointer"
            >
              <span>Calculate Savings</span>
            </button>
          </div>

          {/* Custom Floating UI Mockup Dashboard */}
          <div className="relative mx-auto max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4 sm:p-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Ambient gold glow in top right */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Mini window chrome header */}
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-4 sm:mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-500/60" />
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500/60" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/60" />
                <span className="text-xs text-zinc-500 font-mono tracking-wider ml-3">aura-cluster-v2.6 // dashboard</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-zinc-900/50 px-3 py-1 rounded-md border border-zinc-850">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                <span className="text-[10px] font-mono text-indigo-400 tracking-wide">99.98% GPU Uptime</span>
              </div>
            </div>

            {/* Dashboard Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left">
              {/* Stat Card 1 */}
              <div className="group bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 p-6 rounded-3xl hover:border-indigo-500/40 transition-all cursor-default flex flex-col justify-between min-h-[160px]">
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-500 font-medium uppercase tracking-widest">
                    <span>API Ingress volume</span>
                    <TrendingUp className="w-4 h-4 text-indigo-400" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 font-mono">1.2B<span className="text-xs text-indigo-400">/req</span></h3>
                </div>
                <div className="text-[11px] text-zinc-500 mt-4 flex items-center justify-between">
                  <span>Latency threshold</span>
                  <span className="text-indigo-400 font-mono">82ms avg</span>
                </div>
              </div>

              {/* Stat Card 2 */}
              <div className="group bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 p-6 rounded-3xl hover:border-emerald-500/40 transition-all cursor-default flex flex-col justify-between min-h-[160px]">
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-500 font-medium uppercase tracking-widest">
                    <span>Token Throughput</span>
                    <BarChart3 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 font-mono">4.8M<span className="text-xs text-emerald-400">/sec</span></h3>
                </div>
                <div className="text-[11px] text-zinc-500 mt-4 flex items-center justify-between">
                  <span>Global region replicas</span>
                  <span className="text-emerald-400 font-mono">12 Nodes</span>
                </div>
              </div>

              {/* Stat Card 3 */}
              <div className="group bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 p-6 rounded-3xl hover:border-violet-500/40 transition-all cursor-default flex flex-col justify-between min-h-[160px]">
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-500 font-medium uppercase tracking-widest">
                    <span>Active Clusters</span>
                    <Sliders className="w-4 h-4 text-violet-400" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 font-mono">H100.v4</h3>
                </div>
                <div className="text-[11px] text-zinc-500 mt-4 flex items-center justify-between">
                  <span>Engine allocation</span>
                  <span className="text-violet-400 font-mono">Auto-scaler</span>
                </div>
              </div>
            </div>

            {/* Simulated Live visual console diagram */}
            <div className="mt-4 sm:mt-6 p-4 rounded-xl bg-zinc-950 border border-zinc-900 flex flex-col space-y-2 text-xs font-mono text-zinc-500">
              <div className="flex items-center space-x-2 text-indigo-400">
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                <span>aura_cli init --suite --cluster=global-edge</span>
              </div>
              <div className="pl-6 text-zinc-400">✓ Connected to Aura Multi-Model routing network (Text, Vision, Audio, Code clusters)</div>
              <div className="pl-6 text-zinc-400">✓ Found regional load balancer endpoints with sub-15ms handshake</div>
              <div className="pl-6 text-zinc-500 text-[11px]">System: All active services ready. Feed prompt into Sandbox module below.</div>
            </div>
          </div>

        </div>
      </section>

      {/* Product Suite Cards Grid Section */}
      <section id="suite-section" className="py-24 border-t border-zinc-900 bg-zinc-950/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Flagship model families built for developers.
            </h2>
            <p className="text-zinc-400 text-base">
              A single unified API access protocol grants high-performance pathways to specialized neural architectures. Select an architecture to load it directly in our editor sandbox.
            </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRODUCTS.map((product) => {
              const isActive = activeCategory === product.id;
              return (
                <div 
                  key={product.id}
                  id={`card-${product.id}`}
                  className={`group relative p-8 rounded-3xl border backdrop-blur-md transition-all duration-300 flex flex-col justify-between ${
                    isActive 
                      ? 'bg-zinc-900/60 border-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.15)]' 
                      : 'bg-zinc-900/30 border-zinc-800/50 hover:border-indigo-500/30 hover:bg-zinc-900/40'
                  }`}
                >
                  <div>
                    {/* Top row */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-3.5 rounded-xl border ${
                        product.id === "text" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" :
                        product.id === "vision" ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" :
                        product.id === "audio" ? "bg-pink-500/10 border-pink-500/20 text-pink-400" :
                        "bg-violet-500/10 border-violet-500/20 text-violet-400"
                      }`}>
                        <ProductIcon name={product.iconName} className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-500 border border-zinc-850 px-2.5 py-0.5 rounded-md">
                        {product.badge}
                      </span>
                    </div>

                    {/* Meta */}
                    <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">{product.name}</h3>
                    <p className="text-xs text-indigo-400 font-mono font-medium tracking-wide uppercase mb-3">{product.tagline}</p>
                    <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{product.description}</p>
                    <p className="text-zinc-500 text-xs mb-6 border-l border-zinc-800 pl-4 italic">{product.extendedDescription}</p>

                    {/* Dynamic Mini Grid Metrics */}
                    <div className="grid grid-cols-3 gap-2 border-t border-b border-zinc-900 py-4 mb-6">
                      {product.stats.map((stat, sIdx) => (
                        <div key={sIdx} className="text-left">
                           <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono font-medium truncate">{stat.label}</p>
                           <p className="text-sm font-bold text-white font-mono mt-0.5 truncate">{stat.value}</p>
                           <p className="text-[9px] text-emerald-400 font-mono mt-0.5 truncate">{stat.change}</p>
                        </div>
                      ))}
                    </div>

                    {/* Features checklist */}
                    <ul className="space-y-2.5 text-xs text-zinc-400 mb-8">
                      {product.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start">
                          <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5 mr-2" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                    <span className="text-xs text-zinc-500">API Class: <code className="text-zinc-300 font-mono bg-zinc-950 px-1.5 py-0.5 rounded text-[10px]">Aura.{product.id.toUpperCase()}</code></span>
                    <button 
                      onClick={() => selectProductFromCards(product.id)}
                      className="px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-900 text-zinc-200 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 hover:text-white transition-all flex items-center space-x-1.5"
                    >
                      <span>Load in Sandbox</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-indigo-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>        </div>

        </div>
      </section>

      {/* Interactive AI Sandbox / Editor Section */}
      <section id="sandbox-section" className="py-24 border-t border-zinc-900 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/10 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Interactive Multi-Model Sandbox
            </h2>
            <p className="text-zinc-400 text-base">
              Synthesize live model outcomes in real-time. Toggle model families, configure inference weights, choose curated high-fidelity templates, or type your own custom instruction.
            </p>
          </div>

          {/* Editor Sandbox Container Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Controls Column (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
               {/* Product selector tabs */}
              <div className="p-1 rounded-xl bg-zinc-900/80 border border-zinc-850 grid grid-cols-4 gap-1">
                {PRODUCTS.map((prod) => {
                  const isSelected = activeCategory === prod.id;
                  return (
                    <button
                      key={prod.id}
                      onClick={() => {
                        setActiveCategory(prod.id);
                        setSelectedPresetId(PLAYGROUND_PRESETS[prod.id]?.[0]?.id || "");
                      }}
                      className={`py-2 rounded-lg text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition-all ${
                        isSelected 
                          ? 'bg-zinc-950 text-indigo-400 border border-zinc-800/80 shadow-md' 
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
                      }`}
                    >
                      <ProductIcon name={prod.iconName} className="w-4 h-4" />
                      <span>{prod.name.split("-")[1] || prod.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Presets and options config box */}
              <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-900 flex flex-col space-y-5">
                
                {/* Section title */}
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <div className="flex items-center space-x-2">
                    <Sliders className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Model Settings</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">v2.6.edge</span>
                </div>

                {/* Selected preset quick load */}
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-2">Preset Templates</label>
                  <div className="flex flex-wrap gap-2">
                    {PLAYGROUND_PRESETS[activeCategory]?.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => setSelectedPresetId(preset.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                          selectedPresetId === preset.id
                            ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium'
                            : 'bg-zinc-900 text-zinc-400 border border-zinc-850 hover:bg-zinc-850 hover:text-zinc-200'
                        }`}
                      >
                        {preset.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prompt textarea input */}
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-2">Prompt Instruction</label>
                  <textarea
                    rows={4}
                    value={customPrompt}
                    onChange={(e) => {
                      setCustomPrompt(e.target.value);
                      setSelectedPresetId(""); // Clear preset selection when custom prompt is modified
                    }}
                    placeholder={`e.g., Synthesize a customizable template for ${activeCategory === 'text' ? 'high-converting marketing copy' : activeCategory === 'vision' ? 'a beautiful vector UI' : activeCategory === 'audio' ? 'a professional podcast introductory video' : 'an optimized algorithm'}...`}
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 resize-none font-mono"
                  />
                </div>

                {/* Additional contextual parameters depending on category */}
                <div className="pt-2 border-t border-zinc-900 space-y-4">
                  {activeCategory === "vision" && (
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-2">Aspect Ratio Preset</label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {["1:1", "16:9", "4:3"].map((ratio) => (
                          <button
                            key={ratio}
                            onClick={() => setSelectedAspectRatio(ratio)}
                            className={`py-1.5 rounded-lg text-xs font-mono transition-all ${
                              selectedAspectRatio === ratio
                                ? 'bg-zinc-950 text-indigo-400 border border-indigo-500/20'
                                : 'bg-zinc-900 text-zinc-500 border border-zinc-900 hover:text-zinc-300'
                            }`}
                          >
                            {ratio} {ratio === "16:9" && "(Wide)"} {ratio === "1:1" && "(Square)"}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeCategory === "audio" && (
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-2">Speaker Persona</label>
                      <select
                        value={selectedVoice}
                        onChange={(e) => setSelectedVoice(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-200 font-mono focus:outline-none focus:border-indigo-500/50"
                      >
                        <option value="narrator">Aura Male Voice (Deep Narrator)</option>
                        <option value="lyra">Aura Female Voice (Upbeat Host)</option>
                        <option value="cloned">Cloned Custom voice (10s Reference file loaded)</option>
                      </select>
                    </div>
                  )}

                  {/* Temperature slider */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-medium text-zinc-400">Model Temperature (Creativity)</span>
                      <span className="font-mono text-indigo-400">{temperature}</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.2"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="w-full h-1 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <div className="flex justify-between text-[9px] text-zinc-650 font-mono mt-1">
                      <span>Strict & Precise</span>
                      <span>Balanced</span>
                      <span>Highly Creative</span>
                    </div>
                  </div>
                </div>

                {/* Primary CTA to trigger API sandbox generation */}
                <button
                  onClick={handlePlaygroundGenerate}
                  disabled={isPlayinggroundGenerating}
                  className={`w-full py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all flex items-center justify-center space-x-2.5 cursor-pointer ${
                    isPlayinggroundGenerating
                      ? 'bg-zinc-900 text-zinc-500 border border-zinc-850 cursor-not-allowed'
                      : 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-xl shadow-indigo-500/10 hover:scale-[1.02] transition-all'
                  }`}
                >
                  {isPlayinggroundGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-zinc-500" />
                      <span>Synthesizing Outcome...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-zinc-950 stroke-[2.5px]" />
                      <span>Run Sandbox Generation</span>
                    </>
                  )}
                </button>

              </div>
            </div>

            {/* Right Output Sandbox Screen Terminal (lg:col-span-7) */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-zinc-850 bg-zinc-950 p-5 shadow-[0_15px_40px_rgba(0,0,0,0.6)] min-h-[460px] relative overflow-hidden">
              
              {/* Background accent ambient light */}
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Header block */}
              <div>
                <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-zinc-500" />
                    <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">Live Output Sandbox</span>
                  </div>
                  
                  {/* Copy or metadata button */}
                  {generatedOutput && (
                    <button
                      onClick={() => copyToClipboard(generatedOutput)}
                      className="px-3 py-1 rounded-md border border-zinc-850 bg-zinc-900/50 hover:bg-zinc-900 text-[11px] text-zinc-400 hover:text-white transition-all flex items-center space-x-1.5"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-zinc-500" />
                          <span>Copy Response</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Content window */}
                <div className="font-mono text-xs text-zinc-300 leading-relaxed overflow-y-auto max-h-[350px] pr-2">
                  
                  {/* Initial empty helper */}
                  {!isPlayinggroundGenerating && !generatedOutput && !generatedImageUrl && !playgroundLog && (
                    <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
                      <div className="p-3.5 rounded-full border border-zinc-900 bg-zinc-900/20">
                        <Terminal className="w-7 h-7 text-zinc-600 animate-pulse" />
                      </div>
                      <p className="text-sm text-zinc-500 max-w-sm">
                        Console ready. Click the "Run Sandbox Generation" button to compile prompt guidelines.
                      </p>
                    </div>
                  )}

                  {/* Compiling Loader Status lines */}
                  {isPlayinggroundGenerating && (
                    <div className="space-y-2 py-4">
                      <div className="flex items-center space-x-2 text-zinc-500 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-indigo-400" />
                        <span>AURA AI SYSTEM EXECUTION START</span>
                      </div>
                      <p className="text-zinc-400 whitespace-pre-wrap">{playgroundLog}</p>
                    </div>
                  )}

                  {/* Text/Code Streaming Area */}
                  {!isPlayinggroundGenerating && generatedOutput && (
                    <div className="whitespace-pre-wrap py-2 text-left bg-zinc-900/10 p-4 rounded-xl border border-zinc-900/50 select-text selection:bg-indigo-500 selection:text-white">
                      {activeCategory === "code" ? (
                        <div className="relative">
                          <div className="absolute top-0 right-0 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] text-zinc-500 select-none">
                            TS / RUST
                          </div>
                          <code className="block text-[11px] text-zinc-300 leading-relaxed font-mono">
                            {generatedOutput}
                          </code>
                        </div>
                      ) : (
                        <div className="prose prose-invert max-w-none text-zinc-300 text-xs sm:text-sm">
                          {generatedOutput}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Vision Generated Image visual container */}
                  {!isPlayinggroundGenerating && generatedImageUrl && activeCategory === "vision" && (
                    <div className="flex flex-col items-center justify-center space-y-4 py-4">
                      <div className="relative rounded-xl border border-zinc-800 overflow-hidden shadow-2xl max-w-md w-full bg-zinc-900">
                        <img 
                          src={generatedImageUrl} 
                          alt="AI synthesized outcome preview" 
                          className="w-full h-auto object-cover max-h-[260px] opacity-100 transition-opacity duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex justify-between items-end">
                          <div>
                            <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest font-mono">Vision-Sync v2.6</span>
                            <p className="text-[10px] text-zinc-400 font-mono mt-0.5 truncate max-w-xs">{customPrompt}</p>
                          </div>
                          <button 
                            onClick={() => triggerToast("Direct download requested in high-resolution PNG")}
                            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-zinc-500 text-[10px] font-mono text-center">
                        Synthesized in 1.4s // Canvas preset: {selectedAspectRatio} // seed: 48920402
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Lower audio visualizer or stats toolbar */}
              <div>
                {/* Audio controls overlay when category is audio */}
                {activeCategory === "audio" && generatedOutput && (
                  <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-900/30 flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                          isAudioPlaying 
                            ? 'bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20' 
                            : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20'
                        }`}
                      >
                        {isAudioPlaying ? <Square className="w-4 h-4 fill-rose-400 stroke-[2px]" /> : <Play className="w-4 h-4 fill-indigo-400 stroke-[2px]" />}
                      </button>
                      <div>
                        <span className="text-xs font-semibold text-zinc-300">{isAudioPlaying ? "Synthesized voice playing" : "Audio synthesis paused"}</span>
                        <div className="text-[10px] font-mono text-zinc-500 mt-0.5">{generatedDuration} • {generatedMetadata}</div>
                      </div>
                    </div>

                    {/* Equalizer Wave bar animators */}
                    <div className="flex items-end space-x-1 h-12 px-2 select-none">
                      {audioBars.map((barHeight, idx) => (
                        <div 
                          key={idx} 
                          className="w-1 bg-gradient-to-t from-indigo-600 via-indigo-500 to-indigo-400 rounded-full transition-all duration-100"
                          style={{ height: `${barHeight}px` }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer specs details for sandbox */}
                <div className="border-t border-zinc-900 pt-4 mt-4 flex flex-wrap items-center justify-between text-[11px] text-zinc-500 font-mono gap-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center"><Cpu className="w-3.5 h-3.5 text-zinc-600 mr-1" /> regional_cluster=us-east1</span>
                    <span className="flex items-center"><Database className="w-3.5 h-3.5 text-zinc-600 mr-1" /> dynamic_cache=hit</span>
                  </div>
                  <span className="text-indigo-400">secure_sandbox=ssl_active</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Interactive Savings / ROI Cost Calculator */}
      <section id="calculator-section" className="py-24 border-t border-zinc-900 bg-zinc-950/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Determine your operational savings.
            </h2>
            <p className="text-zinc-400 text-base">
              Slide and configure your anticipated prompt request volumes and manual hours to calculate the ROI multiplier our serverless GPU nodes provide compared to hiring external agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left sliders pane (lg:col-span-6) */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl border border-zinc-800/50 bg-[#0A0A0B]/50 backdrop-blur-md flex flex-col justify-between">
              <div className="space-y-8">
                
                <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                  <div className="flex items-center space-x-2">
                    <Calculator className="w-5 h-5 text-indigo-400" />
                    <span className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Metrics Panel</span>
                  </div>
                  <span className="text-xs text-zinc-500">Hourly standard: $65/hr</span>
                </div>

                {/* Slider 1: Requests volume */}
                <div>
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="text-sm font-medium text-zinc-300">Anticipated Monthly API Prompts</span>
                    <span className="text-xl font-bold text-indigo-400 font-mono">
                      {sliderRequests.toLocaleString()} <span className="text-xs text-zinc-500 font-normal">reqs</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="1000000"
                    step="5000"
                    value={sliderRequests}
                    onChange={(e) => setSliderRequests(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-650 font-mono mt-1.5">
                    <span>5,000 Sandbox</span>
                    <span>500,000 Growth</span>
                    <span>1,000,000 Enterprise</span>
                  </div>
                </div>

                {/* Slider 2: Manual hours saved */}
                <div>
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="text-sm font-medium text-zinc-300">Manual Creative / Engineering Hours Saved</span>
                    <span className="text-xl font-bold text-indigo-400 font-mono">
                      {sliderHoursSaved} <span className="text-xs text-zinc-500 font-normal">hrs / mo</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="300"
                    step="5"
                    value={sliderHoursSaved}
                    onChange={(e) => setSliderHoursSaved(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-650 font-mono mt-1.5">
                    <span>5 Hours</span>
                    <span>150 Hours</span>
                    <span>300 Hours Max</span>
                  </div>
                </div>

              </div>

              {/* Footnote information */}
              <div className="mt-8 pt-6 border-t border-zinc-900 flex items-start space-x-3 text-xs text-zinc-500">
                <Coins className="w-5 h-5 text-zinc-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Calculations assume average 800 token prompt models billed at Aura-Write rates. Client side caches automatically compress duplicates, optimizing ROI multipliers by up to 2.5x dynamically.
                </p>
              </div>

            </div>

            {/* Right Results pane (lg:col-span-6) */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Savings Card 1 */}
              <div className="group bg-[#0A0A0B]/30 backdrop-blur-md border border-zinc-800/50 p-6 rounded-3xl hover:border-indigo-500/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-500 uppercase tracking-widest font-mono">
                    <span>Equivalent agency fee</span>
                    <Briefcase className="w-4 h-4 text-zinc-600" />
                  </div>
                  <h4 className="text-3xl font-extrabold text-white mt-4 font-mono">${roiCalculations.hoursSavedVal}</h4>
                  <p className="text-xs text-zinc-500 mt-2">The typical salary equivalent for creative or code hours generated.</p>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 mt-6 pt-4 border-t border-zinc-900/50">Base: {sliderHoursSaved} hours saved</span>
              </div>

              {/* Savings Card 2 */}
              <div className="group bg-[#0A0A0B]/30 backdrop-blur-md border border-zinc-800/50 p-6 rounded-3xl hover:border-indigo-500/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-500 uppercase tracking-widest font-mono">
                    <span>Aura API platform cost</span>
                    <Coins className="w-4 h-4 text-indigo-400" />
                  </div>
                  <h4 className="text-3xl font-extrabold text-indigo-400 mt-4 font-mono">${roiCalculations.aiCost}</h4>
                  <p className="text-xs text-zinc-500 mt-2">Estimated consumption rate for {sliderRequests.toLocaleString()} prompts.</p>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 mt-6 pt-4 border-t border-zinc-900/50">Average tokens: {roiCalculations.tokens}</span>
              </div>

              {/* Big double width savings overview */}
              <div className="p-6 sm:p-8 rounded-3xl border border-indigo-500/25 bg-[#0A0A0B]/40 sm:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-left space-y-2">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[10px] text-emerald-400 font-mono tracking-widest uppercase">
                    <TrendingUp className="w-3 h-3" />
                    <span>Net efficiency gain</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                    ${roiCalculations.netSavings} <span className="text-xs text-zinc-400 font-sans font-normal">saved/mo</span>
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-sm">
                    Leveraging our model suite delivers a staggering return rate, automating parallel work arrays instantly.
                  </p>
                </div>

                <div className="text-center sm:text-right shrink-0 bg-zinc-950/60 p-5 rounded-2xl border border-zinc-850 min-w-[140px] shadow-inner">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">ROI multiplier</p>
                  <p className="text-4xl font-extrabold text-indigo-400 font-mono mt-1">{roiCalculations.roiMultiplier}x</p>
                  <p className="text-[9px] text-emerald-400 font-mono mt-1">✓ Extreme efficiency</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Interactive Spec Sheet Comparison Matrix */}
      <section id="specs-section" className="py-24 border-t border-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Symmetric Technical Specifications
            </h2>
            <p className="text-zinc-400 text-base">
              A comprehensive technical evaluation of standard limits, caching rates, fine-tuning protocols, and deployment rules across our node tiers.
            </p>
          </div>

          {/* Matrix table container */}
          <div className="overflow-x-auto rounded-xl border border-zinc-900 bg-zinc-950/20">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-zinc-900 bg-zinc-900/20 font-mono text-xs uppercase tracking-widest text-zinc-500">
                  <th className="py-4.5 px-6 font-semibold">Capabilities</th>
                  <th className="py-4.5 px-6 font-semibold">Sandbox Sandbox</th>
                  <th className="py-4.5 px-6 font-semibold text-indigo-400">Professional Suite</th>
                  <th className="py-4.5 px-6 font-semibold">Enterprise Core</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-xs sm:text-sm text-zinc-400">
                <tr>
                  <td className="py-4 px-6 font-medium text-zinc-300">Context Window Length</td>
                  <td className="py-4 px-6 font-mono text-zinc-500">32,000 tokens</td>
                  <td className="py-4 px-6 font-mono text-indigo-400 font-medium">128,000 tokens</td>
                  <td className="py-4 px-6 font-mono text-white font-medium">1,000,000 tokens</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-zinc-300">Time-To-First-Token (TTFT)</td>
                  <td className="py-4 px-6 font-mono text-zinc-500">~180ms avg</td>
                  <td className="py-4 px-6 font-mono text-indigo-400 font-medium">~75ms avg</td>
                  <td className="py-4 px-6 font-mono text-white font-medium">~25ms (Dedicated)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-zinc-300">Image Rendering Core</td>
                  <td className="py-4 px-6">Vision-Sync basic</td>
                  <td className="py-4 px-6 text-indigo-400 font-medium">Vision-Sync HighRes (8K)</td>
                  <td className="py-4 px-6 text-white font-medium">Full Vector raw weights</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-zinc-300">Voice Synthesis cloning</td>
                  <td className="py-4 px-6 text-zinc-500">Preset speakers only</td>
                  <td className="py-4 px-6 text-indigo-400">1 cloned voice index</td>
                  <td className="py-4 px-6 text-white font-medium">Infinite customized cloned presets</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-zinc-300">Fine-Tuning weights</td>
                  <td className="py-4 px-6 text-zinc-500">Unavailable</td>
                  <td className="py-4 px-6 text-zinc-300">LORA adapters (Up to 3 sets)</td>
                  <td className="py-4 px-6 text-white font-medium">Full custom weights adjustments</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-zinc-300">Uptime guarantees SLA</td>
                  <td className="py-4 px-6 text-zinc-500">Best effort routing</td>
                  <td className="py-4 px-6 text-zinc-300">99.9% uptime pipeline</td>
                  <td className="py-4 px-6 text-white font-medium">99.99% contract SLA guarantee</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-zinc-300">Data compliance standard</td>
                  <td className="py-4 px-6 text-zinc-500">Standard logging</td>
                  <td className="py-4 px-6 text-zinc-300">Zero data retention (Optional)</td>
                  <td className="py-4 px-6 text-white font-medium">SOC2 Type II + HIPAA compliant</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-24 border-t border-zinc-900 bg-zinc-950/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-y-6">
            <div className="max-w-xl text-left">
              <span className="text-xs uppercase tracking-widest font-mono text-indigo-400 font-semibold mb-2 block">// Client validation reports</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Validated by builders across major industries.
              </h2>
            </div>
            
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 select-none">
              {["All", "SaaS", "E-commerce", "Agency", "Creator"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTestimonialFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    activeTestimonialFilter === cat
                      ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
                      : "bg-[#0A0A0B]/60 border-zinc-800/50 text-zinc-400 hover:text-zinc-200 hover:bg-[#0A0A0B]/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Testimonial card lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredTestimonials.map((t) => (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="p-8 rounded-3xl border border-zinc-800/50 bg-[#0A0A0B]/30 backdrop-blur-md flex flex-col justify-between items-stretch text-left hover:border-indigo-500/30 transition-colors"
                >
                  <div className="space-y-6">
                    {/* Rating stars */}
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: t.rating }).map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    {/* Quote text */}
                    <p className="text-zinc-300 text-sm leading-relaxed italic">
                      "{t.quote}"
                    </p>
                  </div>

                  {/* Profile section */}
                  <div className="pt-6 border-t border-zinc-900 mt-8 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{t.author}</h4>
                      <p className="text-[11px] text-zinc-500 mt-0.5">{t.role} • <span className="font-semibold">{t.company}</span></p>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase px-2 py-0.5 border border-zinc-900 rounded bg-zinc-950">
                      {t.industry}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Licensing / Pricing Cards Grid Section */}
      <section id="pricing-section" className="py-24 border-t border-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Predictable API pricing models.
            </h2>
            <p className="text-zinc-400 text-base">
              Get started with our free developer sandbox. Upgrade to our dedicated tiers for higher rate limit allocations and customizable adapter weights.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {PRICING_TIERS.map((tier, idx) => (
              <div 
                key={idx}
                className={`p-8 rounded-3xl border backdrop-blur-md transition-all duration-300 flex flex-col justify-between items-stretch text-left relative ${
                  tier.isPopular 
                    ? 'bg-zinc-900/60 border-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/30' 
                    : 'bg-[#0A0A0B]/30 border-zinc-800/50 hover:border-indigo-500/30 hover:bg-[#0A0A0B]/40'
                }`}
              >
                {/* Popular highlight ribbon */}
                {tier.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-white font-bold text-[10px] tracking-widest uppercase shadow-md">
                    Recommended Tier
                  </div>
                )}

                <div>
                  {/* Name & price */}
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{tier.name}</h3>
                    <div className="flex items-baseline space-x-1.5 mt-4">
                      <span className="text-4xl font-extrabold text-white font-mono">{tier.price}</span>
                      <span className="text-xs text-zinc-500 font-mono">/ {tier.frequency}</span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-4 leading-relaxed min-h-[40px]">{tier.description}</p>
                  </div>

                  {/* Checklist features */}
                  <ul className="space-y-3.5 mt-8 border-t border-zinc-900 pt-8 text-xs text-zinc-300">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5 mr-2.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing tier checkout callback */}
                <button
                  onClick={() => selectPricingTier(tier.name)}
                  className={`w-full mt-10 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    tier.isPopular
                      ? 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-xl shadow-indigo-500/10'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {tier.ctaText}
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* early access registration block */}
      <section id="early-access-section" className="py-24 border-t border-zinc-900 bg-zinc-950/40 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-[10px] text-indigo-400 font-mono tracking-widest uppercase mb-4">
              <Zap className="w-3 h-3 text-indigo-400 animate-pulse" />
              <span>Developer API Sandbox Access</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Provision early development keys.
            </h2>
            <p className="text-zinc-400 text-sm">
              Register your workspace profile below to generate an authenticated development API credentials key, allowing you to interface directly with our model route nodes.
            </p>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl border border-zinc-800/50 bg-[#0A0A0B]/80 backdrop-blur-md shadow-2xl">
            
            {!formSubmitted ? (
              <form onSubmit={handleLeadSubmit} className="space-y-6">
                
                {/* Form fields rows */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-2">Your Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Rivera"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className={`w-full bg-zinc-950 border rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder:text-zinc-650 focus:outline-none ${
                        formErrors.name ? 'border-rose-500 focus:border-rose-500' : 'border-zinc-850 focus:border-indigo-500/50'
                      }`}
                    />
                    {formErrors.name && <p className="text-rose-500 text-[10px] font-mono mt-1">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-2">Corporate Email Address</label>
                    <input
                      type="text"
                      placeholder="e.g. alex@workspace.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className={`w-full bg-zinc-950 border rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder:text-zinc-650 focus:outline-none ${
                        formErrors.email ? 'border-rose-500 focus:border-rose-500' : 'border-zinc-850 focus:border-indigo-500/50'
                      }`}
                    />
                    {formErrors.email && <p className="text-rose-500 text-[10px] font-mono mt-1">{formErrors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-2">Company / Organization Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Synapse Labs"
                      value={formCompany}
                      onChange={(e) => setFormCompany(e.target.value)}
                      className={`w-full bg-zinc-950 border rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder:text-zinc-650 focus:outline-none ${
                        formErrors.company ? 'border-rose-500 focus:border-rose-500' : 'border-zinc-850 focus:border-indigo-500/50'
                      }`}
                    />
                    {formErrors.company && <p className="text-rose-500 text-[10px] font-mono mt-1">{formErrors.company}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-2">Selected Licensing Tier</label>
                    <select
                      value={formTier}
                      onChange={(e) => setFormTier(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-3 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500/50"
                    >
                      <option value="Developer Sandbox">Developer Sandbox (Free)</option>
                      <option value="Aura Professional">Aura Professional ($49/mo)</option>
                      <option value="Enterprise Dedicated">Enterprise Dedicated (Bespoke)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-2">Tell us about your target AI use case (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Building an automated visual generation model pipeline styled around minimal aesthetics..."
                    value={formUseCases}
                    onChange={(e) => setFormUseCases(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder:text-zinc-650 focus:outline-none focus:border-indigo-500/50 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-950 bg-white hover:bg-zinc-200 shadow-xl shadow-indigo-500/10 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-zinc-950 stroke-[2.5px]" />
                  <span>Generate Auth Token API Key</span>
                </button>

              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-8 text-left"
              >
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight mt-2">Provision Complete</h3>
                  <p className="text-xs text-zinc-400 text-center max-w-sm">
                    Thank you {formName}. Your private access key has been successfully minted for the **{formTier}** pipeline.
                  </p>
                </div>

                {/* The API Key code box */}
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-850/80 font-mono text-xs flex flex-col space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-zinc-850 pb-2.5">
                    <span className="text-[10px] text-zinc-500 tracking-wider">AURA SECURE PROTOCOL KEY</span>
                    <span className="text-[9px] text-emerald-400 tracking-widest bg-emerald-400/5 border border-emerald-500/20 px-1.5 py-0.5 rounded">ACTIVE</span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-zinc-950 p-3 rounded-lg border border-zinc-900">
                    <code className="text-indigo-400 text-xs tracking-wider select-all break-all">{generatedApiKey}</code>
                    <button
                      onClick={() => copyToClipboard(generatedApiKey, true)}
                      className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white shrink-0 ml-3"
                    >
                      {copiedKey ? <CopyCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormName("");
                      setFormEmail("");
                      setFormCompany("");
                      setFormUseCases("");
                    }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4"
                  >
                    Mint another credential token key
                  </button>
                </div>

              </motion.div>
            )}

          </div>

        </div>
      </section>

      {/* Bottom Footer Section */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-16 text-zinc-500 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left mb-16">
            
            {/* Logo area */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white stroke-[2px]" />
                </div>
                <span className="text-lg font-bold text-white tracking-wider">AURA AI</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Advanced multi-modal model architectures engineered to scale content generation, audio synthesis, visual creators, and codebase automation systems instantly.
              </p>
              <div className="flex items-center space-x-2 pt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono tracking-wider text-emerald-400 uppercase">Cluster Status: Healthy</span>
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-300 mb-4">Model Suite</h4>
              <ul className="space-y-3.5 text-xs text-zinc-400">
                <li><button onClick={() => selectProductFromCards("text")} className="hover:text-indigo-400 transition-colors">Aura-Write (Copywriter)</button></li>
                <li><button onClick={() => selectProductFromCards("vision")} className="hover:text-indigo-400 transition-colors">Vision-Sync (Aesthetics)</button></li>
                <li><button onClick={() => selectProductFromCards("audio")} className="hover:text-indigo-400 transition-colors">Audio-Craft (Voices)</button></li>
                <li><button onClick={() => selectProductFromCards("code")} className="hover:text-indigo-400 transition-colors">Code-Genius (IDE Engine)</button></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-300 mb-4">Resources</h4>
              <ul className="space-y-3.5 text-xs text-zinc-400">
                <li><a href="#sandbox-section" className="hover:text-indigo-400 transition-colors">Unified Sandbox</a></li>
                <li><a href="#calculator-section" className="hover:text-indigo-400 transition-colors">Operational Savings Calculator</a></li>
                <li><a href="#specs-section" className="hover:text-indigo-400 transition-colors">Technical Comparison Sheet</a></li>
                <li><a href="#pricing-section" className="hover:text-indigo-400 transition-colors">Pricing Matrix</a></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-300 mb-4">Technical Details</h4>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Fully hosted on secure regionalized GPU nodes. Compatible with Node.js SDKs, Python HTTP wrappers, and direct REST integrations.
              </p>
              <div className="font-mono text-[10px] text-zinc-600 bg-zinc-900/40 p-2.5 rounded border border-zinc-900">
                CLUSTER_IP: 198.51.100.42<br />
                GATEWAY: aura-gw.local<br />
                VERSION: 2.6.edge
              </div>
            </div>

          </div>

          {/* Bottom attribution row */}
          <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-y-4 text-xs font-mono">
            <p>© 2026 Aura AI, Inc. All rights reserved. Provisioned for Google AI Studio.</p>
            <div className="flex space-x-6">
              <a href="#app-root" className="hover:text-zinc-300 transition-colors">Back to top ↑</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
