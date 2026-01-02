import React, { useState, useEffect, useRef } from 'react';
import { Camera, Award, Phone, Mail, MapPin, Hammer, Palette, Gem, ChevronDown, Calendar, Star, ShoppingBag, ArrowRight, Quote } from 'lucide-react';
import * as THREE from 'three';

// --- Custom CSS for Animations & Patterns ---
const GlobalStyles = () => (
  <style>{`
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
      100% { transform: translateY(0px); }
    }
    @keyframes float-delayed {
      0% { transform: translateY(0px); }
      50% { transform: translateY(15px); }
      100% { transform: translateY(0px); }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.1); }
    }

    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
    .animate-spin-slow { animation: spin-slow 60s linear infinite; }
    .animate-fade-in { animation: fade-in-up 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
    .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
    
    /* Mandana Art Backgrounds */
    .bg-mandana-dark {
      background-color: #2a0a0a;
      background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23fffbeb' stroke-width='1' opacity='0.08'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z' /%3E%3Ccircle cx='40' cy='40' r='15' /%3E%3Cpath d='M40 10 L70 40 L40 70 L10 40 Z' /%3E%3Cpath d='M0 0 L80 80 M80 0 L0 80' stroke-dasharray='2 4' /%3E%3C/g%3E%3C/svg%3E");
    }

    /* Jaipur Pink Tinted Background */
    .bg-mandana-light {
      background-color: #fff1f2; /* Rose-50 base */
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L100 50 L50 100 L0 50 Z' fill='none' stroke='%239f1239' stroke-width='0.5' opacity='0.05'/%3E%3Ccircle cx='50' cy='50' r='10' fill='none' stroke='%239f1239' stroke-width='0.5' opacity='0.1'/%3E%3C/svg%3E");
    }

    .bg-jali-border {
       background-image: 
         radial-gradient(circle, #78350f 1.5px, transparent 1.5px);
       background-size: 16px 16px;
       mask-image: linear-gradient(to bottom, black, transparent 20%, transparent 80%, black);
    }
    
    .text-jaipur-pink {
       color: #e11d48; /* Rose-600 */
    }

    /* Smooth Scroll Behavior */
    html { scroll-behavior: smooth; }
  `}</style>
);

// --- Decoration Components ---
const MandanaArtOverlay = ({ className, color = "currentColor" }) => (
  <div className={`absolute pointer-events-none opacity-10 ${className}`}>
    <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow" style={{ color }}>
      <defs>
        <pattern id="mandanaGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="20" cy="20" r="2" fill="currentColor"/>
        </pattern>
      </defs>
      <path fill="none" stroke="currentColor" strokeWidth="1" d="M100,20 L180,100 L100,180 L20,100 Z" />
      <path fill="none" stroke="currentColor" strokeWidth="1" d="M100,40 L160,100 L100,160 L40,100 Z" />
      <path fill="none" stroke="currentColor" strokeWidth="0.5" d="M100,10 L190,100 L100,190 L10,100 Z" strokeDasharray="4 4" />
      <circle cx="100" cy="100" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
         <circle key={i} cx={100 + 60 * Math.cos(angle * Math.PI / 180)} cy={100 + 60 * Math.sin(angle * Math.PI / 180)} r="2" fill="currentColor" />
      ))}
    </svg>
  </div>
);

const JaipurArch = ({ className }) => (
  <div className={`absolute w-full pointer-events-none ${className}`}>
     <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full text-red-900/10 fill-current">
        <path d="M0,120 L1440,120 L1440,60 C1400,60 1380,20 1320,20 C1260,20 1240,60 1200,60 C1160,60 1140,20 1080,20 C1020,20 1000,60 960,60 C920,60 900,20 840,20 C780,20 760,60 720,60 C680,60 660,20 600,20 C540,20 520,60 480,60 C440,60 420,20 360,20 C300,20 280,60 240,60 C200,60 180,20 120,20 C60,20 40,60 0,60 Z" />
     </svg>
  </div>
);

// --- Brand Logo Component ---
const SabnamLogo = ({ className, size = 100 }) => (
  <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fcd34d" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="48" stroke="url(#goldGradient)" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="45" stroke="#7f1d1d" strokeWidth="6" />
    <circle cx="50" cy="50" r="42" stroke="url(#goldGradient)" strokeWidth="0.5" strokeDasharray="2 2" />
    {[...Array(12)].map((_, i) => (
      <circle key={i} cx={50 + 45 * Math.cos(i * 30 * Math.PI / 180)} cy={50 + 45 * Math.sin(i * 30 * Math.PI / 180)} r="1.8" fill="#fff" stroke="#d97706" strokeWidth="0.5" />
    ))}
    <path d="M60 30 C 50 25, 35 35, 40 50 C 45 65, 65 65, 60 80 C 55 90, 40 85, 35 80" stroke="url(#goldGradient)" strokeWidth="5" strokeLinecap="round" fill="none" filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.5))" />
    <path d="M60 30 Q 65 20, 55 25 Z" fill="#fcd34d" />
  </svg>
);

// --- Components ---

const Navbar = () => (
  <nav className="bg-red-950/90 backdrop-blur-md text-amber-50 sticky top-0 z-50 shadow-2xl border-b border-amber-600/30 transition-all duration-300">
    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-24">
        <div className="flex items-center space-x-4 group cursor-pointer">
          <div className="relative hover:scale-105 transition-transform duration-500">
            <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
            <SabnamLogo className="relative z-10 w-16 h-16 drop-shadow-lg" size={64} />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-serif font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100 group-hover:text-amber-400 transition-colors drop-shadow-sm">SABNAM</span>
            <div className="flex items-center gap-2">
              <div className="h-[1px] w-4 bg-amber-500/50"></div>
              <span className="text-[10px] text-amber-400 uppercase tracking-[0.2em] font-medium">By Mohd Sabir</span>
              <div className="h-[1px] w-4 bg-amber-500/50"></div>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-8">
            {['Home', 'Artisan', 'Collection', 'The Craft', 'Workshop', 'Recognition'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className="relative group hover:text-amber-300 transition-all px-3 py-2 font-serif text-sm uppercase tracking-widest"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a href="#contact" className="bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white px-6 py-2 rounded-sm transition-all shadow-lg hover:shadow-amber-500/20 font-serif transform hover:-translate-y-0.5 border border-amber-500/30">
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <div id="home" className="relative bg-mandana-dark min-h-screen flex items-center justify-center overflow-hidden">
    <MandanaArtOverlay className="top-[-100px] left-[-100px] w-[600px] h-[600px] text-amber-500/20" />
    <MandanaArtOverlay className="bottom-[-200px] right-[-100px] w-[800px] h-[800px] text-red-500/10" />
    <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-600/20 rounded-full blur-[120px] animate-float z-0 mix-blend-screen"></div>
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] animate-float-delayed z-0 mix-blend-screen"></div>

    <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
      <div className="mb-8 inline-flex items-center gap-4 animate-fade-in opacity-0">
        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-500"></div>
        <div className="py-2 px-6 border border-amber-500/30 rounded-sm text-amber-400 text-xs tracking-[0.4em] uppercase bg-black/40 backdrop-blur-sm shadow-[0_0_20px_rgba(180,83,9,0.3)]">
          Est. Jaipur • Rajasthan
        </div>
        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-500"></div>
      </div>
      
      <h1 className="text-6xl md:text-8xl font-serif font-bold text-amber-50 mb-8 drop-shadow-2xl leading-[1.1] animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
        The Royal Art of <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 filter drop-shadow-[0_2px_10px_rgba(180,83,9,0.5)]">
          Lac Craftsmanship
        </span>
      </h1>
      
      <p className="text-xl md:text-2xl text-amber-100/90 mb-12 font-light max-w-3xl mx-auto leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
        Handcrafted with fire and passion by Master Artisan <strong className="text-amber-400 font-medium border-b border-amber-500/50 pb-1">Mohd Sabir</strong>. 
        Where tradition meets elegance in every curve.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
        <a href="#collection" className="group px-10 py-4 bg-gradient-to-b from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-serif tracking-widest rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-amber-400/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1">
          VIEW COLLECTION
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
        <a href="#workshop" className="px-10 py-4 border border-amber-500/50 text-amber-300 hover:bg-amber-500/10 font-serif tracking-widest rounded-sm transition-all backdrop-blur-sm shadow-lg hover:shadow-amber-500/10">
          JOIN WORKSHOP
        </a>
      </div>
    </div>
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce text-amber-400/50">
      <ChevronDown size={32} />
    </div>
  </div>
);

const ArtisanProfile = () => (
  <section id="artisan" className="py-24 bg-white relative overflow-hidden">
    <div className="absolute top-0 w-full"><JaipurArch /></div>
    <div className="absolute inset-0 bg-mandana-light opacity-30"></div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative">
           {/* Artisan Image Frame - Jaipur Jharokha Style */}
           <div className="relative z-10 aspect-[3/4] bg-red-950 rounded-t-full border-[8px] border-amber-100 shadow-2xl overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1566512613391-7db1262d1c63?q=80&w=800&auto=format&fit=crop" 
                alt="Mohd Sabir - Master Artisan" 
                className="w-full h-full object-cover sepia-[0.3] group-hover:sepia-0 transition-all duration-700 scale-105 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-amber-50">
                <p className="text-sm tracking-widest uppercase text-amber-400 mb-1">Master Artisan</p>
                <h3 className="text-3xl font-serif font-bold">Mohd Sabir</h3>
              </div>
           </div>
           
           {/* Decorative Backdrops */}
           <div className="absolute -top-4 -right-4 w-full h-full border-2 border-amber-500/30 rounded-t-full -z-0"></div>
           <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl"></div>
        </div>

        <div>
           <div className="inline-flex items-center gap-2 mb-4">
             <div className="w-8 h-[2px] bg-red-600"></div>
             <span className="text-red-700 font-bold uppercase tracking-widest text-sm">The Hands Behind The Art</span>
           </div>
           
           <h2 className="text-5xl font-serif font-bold text-red-950 mb-8 leading-tight">
             Preserving a 300-Year Legacy with <span className="text-jaipur-pink">Passion</span>
           </h2>
           
           <div className="grid grid-cols-2 gap-8 mb-8 border-y border-amber-200/60 py-6">
              <div>
                <span className="block text-4xl font-bold text-amber-600 mb-1">30+</span>
                <span className="text-sm text-gray-600 uppercase tracking-wide">Years of Experience</span>
              </div>
              <div>
                <span className="block text-4xl font-bold text-amber-600 mb-1">48</span>
                <span className="text-sm text-gray-600 uppercase tracking-wide">Years of Wisdom</span>
              </div>
           </div>

           <div className="space-y-6 text-lg text-gray-700 font-serif leading-relaxed">
             <p>
               For Master Artisan <strong className="text-red-900">Mohd Sabir</strong>, bangle making isn't just a profession; it's a meditative practice. Starting his journey at the tender age of 18, he has spent three decades mastering the delicate dance between heat and resin.
             </p>
             <p>
               His journey wasn't easy. From the narrow lanes of Jaipur to battling the changing tides of modernization, Sabir stood firm like the stones he embeds, ensuring the traditional <em>Lac</em> craft didn't fade away. 
             </p>
             <div className="flex items-start gap-4 mt-4 bg-amber-50 p-6 rounded-r-2xl border-l-4 border-amber-500 italic text-red-900/80">
               <Quote className="w-8 h-8 text-amber-400 flex-shrink-0" />
               <p>"Fire shapes the lac, but it is patience that shapes the artist. Every bangle I make carries a piece of my soul and the history of Jaipur."</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  </section>
);

const Products = () => {
  const products = [
    {
      title: "Royal Jadau Set",
      description: "An exquisite bridal ensemble featuring 24ct gold foil work embedded with semi-precious Kundan stones. This heirloom piece radiates the grandeur of Rajputana royalty.",
      price: "₹ 10,000",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Meenakari Kangan",
      description: "A testament to Jaipur's enamel tradition. These heavy bangles feature vibrant floral Meenakari work, hand-painted with precision on a lac base and sealed for a lifetime of luster.",
      price: "₹ 15,000",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Gulabi Nagra Bridal",
      description: "Inspired by the Pink City, this magnificent set combines rose-tinted lac with genuine freshwater pearls and intricate mirror work (abhla), creating a sophisticated shimmer.",
      price: "₹ 20,000",
      image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section id="collection" className="py-24 bg-mandana-light text-red-950 relative">
      <div className="absolute inset-0 bg-jali-border opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-amber-200/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-amber-700 font-bold tracking-widest uppercase text-sm border-b border-amber-300 pb-1">Our Masterpieces</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mt-4 mb-6 text-red-950 drop-shadow-sm">The Royal Collection</h2>
          <p className="max-w-2xl mx-auto text-gray-600 font-serif italic">"Each bangle is a whisper of history, crafted not just for ornamentation, but as a legacy."</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((item, idx) => (
            <div key={idx} className="group relative bg-white rounded-t-[10rem] rounded-b-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_50px_-10px_rgba(180,83,9,0.3)] transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-amber-100/50">
              <div className="absolute inset-0 border-[8px] border-double border-amber-100 rounded-t-[10rem] rounded-b-xl pointer-events-none z-20 group-hover:border-amber-200 transition-colors"></div>
              <div className="h-80 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-red-950/40 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-30 transition-opacity duration-500"></div>
                 <img src={item.image} alt={item.title} className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out"/>
                 <div className="absolute bottom-4 left-0 right-0 z-20 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <span className="inline-block px-4 py-1 bg-white/90 backdrop-blur text-red-900 text-xs font-bold rounded-full uppercase tracking-wider shadow-lg">View Details</span>
                 </div>
              </div>
              <div className="p-8 relative">
                <div className="absolute top-0 right-0 w-16 h-16 opacity-10"><svg viewBox="0 0 100 100" fill="currentColor" className="text-red-900"><path d="M100,0 L100,40 Q60,40 60,0 Z" /></svg></div>
                <div className="flex justify-between items-start mb-4"><h3 className="text-2xl font-serif font-bold text-red-950 group-hover:text-amber-700 transition-colors">{item.title}</h3></div>
                <p className="text-gray-600 leading-relaxed mb-6 text-sm min-h-[80px] border-l-2 border-amber-200 pl-4">{item.description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-dashed border-gray-200">
                  <div className="flex flex-col"><span className="text-[10px] text-gray-500 uppercase tracking-wide">Starting From</span><span className="font-serif font-bold text-red-900 text-2xl">{item.price}</span></div>
                  <button className="w-12 h-12 rounded-full bg-red-950 text-amber-50 flex items-center justify-center hover:bg-amber-600 hover:rotate-45 transition-all duration-300 shadow-lg"><ArrowRight size={20} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 3D Bangle Workshop Component ---
const ThreeDBangle = ({ step }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const groupRef = useRef(null);
  const frameIdRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (containerRef.current.children.length > 0) containerRef.current.innerHTML = '';
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#1a0505'); 
    scene.fog = new THREE.Fog('#1a0505', 5, 20);
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffd700, 1.5);
    dirLight.position.set(5, 5, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);
    const pointLight = new THREE.PointLight(0xff6600, 2, 10);
    pointLight.position.set(-2, 1, 2);
    scene.add(pointLight);
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;
    const animate = () => {
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.005;
        groupRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      frameIdRef.current = requestAnimationFrame(animate);
    };
    animate();
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      if (rendererRef.current) rendererRef.current.dispose();
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, []);

  useEffect(() => {
    if (!groupRef.current) return;
    const group = groupRef.current;
    while(group.children.length > 0){ 
        const child = group.children[0];
        if(child.geometry) child.geometry.dispose();
        if(child.material) {
          if(Array.isArray(child.material)) child.material.forEach(m => m.dispose());
          else child.material.dispose();
        }
        group.remove(child); 
    }
    const materials = {
        raw: new THREE.MeshStandardMaterial({ color: 0x8b0000, roughness: 0.8, metalness: 0.1 }),
        heated: new THREE.MeshStandardMaterial({ color: 0xff4500, emissive: 0x550000, roughness: 0.4 }),
        finished: new THREE.MeshStandardMaterial({ color: 0x800020, roughness: 0.2, metalness: 0.6 }),
        stone: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1, metalness: 0.9, emissive: 0x222222 }),
        gold: new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.3, metalness: 1.0 })
    };
    if (step === 0) { 
        const geo = new THREE.DodecahedronGeometry(1.2, 1);
        const mesh = new THREE.Mesh(geo, materials.raw);
        const pos = mesh.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) pos.setY(i, pos.getY(i) * 0.8 + (Math.random() - 0.5) * 0.2);
        mesh.castShadow = true;
        group.add(mesh);
    } else if (step === 1) { 
        const geo = new THREE.CylinderGeometry(0.3, 0.3, 3, 32);
        const mesh = new THREE.Mesh(geo, materials.heated);
        mesh.rotation.z = Math.PI / 2;
        mesh.castShadow = true;
        group.add(mesh);
    } else if (step === 2) { 
        const geo = new THREE.TorusGeometry(1.5, 0.25, 32, 64);
        const mesh = new THREE.Mesh(geo, materials.finished);
        mesh.castShadow = true;
        group.add(mesh);
    } else if (step === 3) { 
        const geo = new THREE.TorusGeometry(1.5, 0.25, 32, 100);
        const mesh = new THREE.Mesh(geo, materials.finished);
        mesh.castShadow = true;
        group.add(mesh);
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const stone = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), materials.stone);
            stone.position.set(Math.cos(angle)*1.75, Math.sin(angle)*1.75, 0);
            group.add(stone);
        }
    }
  }, [step]);
  return <div ref={containerRef} className="w-full h-full" />;
};

const Process = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "Raw Lac Collection", desc: "Purifying natural resin from the forests of Jharkhand.", icon: <Palette /> },
    { title: "Heating & Rolling", desc: "Molding the lac over burning coals into pliable coils.", icon: <Hammer /> },
    { title: "Shaping (Kalbut)", desc: "Using a wooden mandrel to achieve the perfect circular form.", icon: <div className="w-5 h-5 border-2 rounded-full" /> },
    { title: "Stone Embellishment", desc: "Embedding glass stones and mirrors while the lac is warm.", icon: <Gem /> }
  ];

  return (
    <section id="the-craft" className="py-24 bg-mandana-dark text-amber-50 relative overflow-hidden border-t-4 border-amber-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-bold tracking-widest uppercase text-sm">Interactive Workshop</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-2 text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">The Making of a Masterpiece</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Viewer Container */}
          <div className="h-[500px] bg-gradient-to-br from-[#1a0505] to-[#450a0a] rounded-xl border-[6px] border-[#5c1c1c] shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col group">
             {/* "Fire" effect overlay at bottom */}
             <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-orange-600/20 to-transparent mix-blend-screen pointer-events-none animate-pulse-glow"></div>
             
             <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur px-4 py-2 rounded-full text-xs text-amber-400 font-mono border border-amber-500/30 flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]"></div> Live Kiln View
             </div>
             <div className="flex-1 w-full h-full relative z-0">
               <ThreeDBangle step={activeStep} />
             </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div 
                key={index}
                onClick={() => setActiveStep(index)}
                className={`cursor-pointer relative overflow-hidden p-6 rounded-lg border transition-all duration-500 flex items-center gap-6 group ${
                  activeStep === index 
                    ? 'bg-gradient-to-r from-amber-900/90 to-amber-900/40 border-amber-500/50 translate-x-4 shadow-[0_0_30px_rgba(245,158,11,0.1)]' 
                    : 'bg-black/20 border-white/5 hover:bg-white/5 hover:border-amber-500/30'
                }`}
              >
                {/* Connector Line */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-[2.65rem] top-16 bottom-[-2rem] w-[2px] bg-white/10 z-0"></div>
                )}

                <div className={`relative z-10 p-3 rounded-full transition-all duration-500 ${activeStep === index ? 'bg-amber-500 text-red-950 scale-110 shadow-[0_0_20px_rgba(245,158,11,0.6)]' : 'bg-red-950/80 text-amber-600 border border-amber-900'}`}>
                  {step.icon}
                </div>
                <div>
                  <h3 className={`text-xl font-serif font-bold transition-colors ${activeStep === index ? 'text-amber-400' : 'text-amber-200/80 group-hover:text-amber-200'}`}>
                    {step.title}
                  </h3>
                  <p className="text-amber-100/60 text-sm mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const WorkshopCarousel = () => {
  const images = [
    "https://images.unsplash.com/photo-1590480026268-3e404be1b88e?q=80&w=800&auto=format&fit=crop", // Hands working/detail
    "https://images.unsplash.com/photo-1596541671992-807d92984639?q=80&w=800&auto=format&fit=crop", // Colorful bangles
    "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=800&auto=format&fit=crop"  // Traditional setting
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-2xl border-4 border-amber-500/30 group">
       {images.map((img, index) => (
         <div 
           key={index}
           className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
         >
           <img src={img} alt="Workshop" className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[4000ms]" />
           <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-transparent to-black/30"></div>
         </div>
       ))}
       
       <div className="absolute bottom-6 left-6 right-6 z-10 flex justify-between items-end">
          <div className="text-white">
             <div className="flex items-center gap-2 mb-2">
               <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
               <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Live Workshop</span>
             </div>
             <h3 className="text-2xl font-serif font-bold">Experience the Art</h3>
          </div>
          <div className="flex gap-2">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 transition-all duration-300 ${i === current ? 'w-8 bg-amber-500' : 'w-2 bg-white/50'}`}
              />
            ))}
          </div>
       </div>
    </div>
  );
};

const Workshop = () => (
  <section id="workshop" className="py-24 bg-red-900 relative overflow-hidden">
    {/* Artistic Background */}
    <div className="absolute inset-0 bg-mandana-dark opacity-50 mix-blend-multiply"></div>
    <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-black/50 to-transparent"></div>
    
    <div className="max-w-6xl mx-auto px-4 relative z-10">
      <div className="bg-red-950/90 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-8 md:p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] flex flex-col md:flex-row items-center gap-16 relative overflow-hidden">
        
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full border-l border-b border-amber-500/10"></div>

        <div className="flex-1 space-y-8 relative z-10">
          <div className="inline-block bg-amber-600/20 text-amber-400 px-4 py-1 rounded-sm text-xs font-bold tracking-[0.2em] border border-amber-500/30">
            PASSING THE TORCH
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-[1.1]">
            Bimonthly <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Masterclass</span>
          </h2>
          <p className="text-amber-100/80 text-lg leading-relaxed font-light border-l-2 border-amber-700 pl-6">
            Join Master Artisan Mohd Sabir for an exclusive hands-on workshop held every two months. 
            Experience the heat, the smell of melting lac, and the joy of creation.
          </p>
          
          <ul className="space-y-4 pt-2">
            {[
              "3-Day Intensive Training",
              "All materials provided (Lac, Stones, Tools)",
              "Take home your own handcrafted set",
              "Certificate of Completion"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-amber-100/90 bg-black/20 p-3 rounded-r-full border-l-4 border-amber-600">
                <Star size={18} className="text-amber-500 fill-amber-500" /> {item}
              </li>
            ))}
          </ul>

          <div className="pt-6 flex flex-wrap items-center gap-6">
             <button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-4 px-10 rounded-sm shadow-[0_10px_20px_rgba(0,0,0,0.4)] transition-all transform hover:-translate-y-1">
               Book Next Slot
             </button>
             <div className="text-sm text-amber-400 flex items-center gap-2 bg-black/30 px-4 py-2 rounded-sm border border-amber-500/20">
               <Calendar size={16} /> <span>Next Batch: <strong className="text-white">Nov 15th</strong></span>
             </div>
          </div>
        </div>
        
        {/* Carousel Visual for Workshop */}
        <div className="flex-1 relative w-full flex justify-center">
          <div className="absolute inset-0 bg-amber-500/20 blur-[60px] animate-pulse-glow"></div>
          <WorkshopCarousel />
        </div>
      </div>
    </div>
  </section>
);

const OfficialSeal = () => (
  <div className="absolute bottom-8 right-8 w-40 h-40 opacity-80 pointer-events-none transform -rotate-12 group-hover:rotate-0 transition-transform duration-700">
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
      <defs>
        <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
      </defs>
      <circle cx="100" cy="100" r="95" fill="none" stroke="#7f1d1d" strokeWidth="3" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#7f1d1d" strokeWidth="1" strokeDasharray="4 2" />
      <circle cx="100" cy="100" r="70" fill="none" stroke="#7f1d1d" strokeWidth="1" />
      
      <text fill="#7f1d1d" fontSize="13" fontWeight="bold" letterSpacing="2">
        <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
          GOVT OF RAJASTHAN • DEPARTMENT OF INDUSTRIES
        </textPath>
      </text>
      
      <g transform="translate(100, 100)">
        <path d="M0 -25 L8 -8 L25 -8 L12 5 L16 22 L0 12 L-16 22 L-12 5 L-25 -8 L-8 -8 Z" fill="#991b1b" opacity="0.15" />
        <text x="0" y="5" textAnchor="middle" fill="#7f1d1d" fontSize="12" fontWeight="bold" fontFamily="serif">OFFICIAL</text>
        <text x="0" y="18" textAnchor="middle" fill="#7f1d1d" fontSize="10" fontFamily="serif">SEAL</text>
      </g>
    </svg>
  </div>
);

const Recognition = () => (
  <section id="recognition" className="py-24 bg-mandana-light relative border-t border-amber-200">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <div className="mb-12">
        <div className="inline-block p-4 rounded-full bg-amber-100 border border-amber-300 mb-6">
           <Award className="w-12 h-12 text-amber-700" />
        </div>
        <h2 className="text-4xl font-serif font-bold mb-4 text-red-950">Government Recognition</h2>
        <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
        <p className="text-red-900/70 max-w-2xl mx-auto font-serif text-lg">
          "Honored to be the custodians of Rajasthan's heritage."
        </p>
      </div>

      <div className="group relative bg-[#fffdf5] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-amber-900/10 mx-auto max-w-3xl transform hover:scale-[1.01] transition-transform duration-500">
        {/* Frame borders */}
        <div className="absolute inset-4 border border-red-900/20 pointer-events-none"></div>
        <div className="absolute inset-3 border border-dashed border-red-900/10 pointer-events-none"></div>

        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-60 mix-blend-multiply pointer-events-none"></div>

        {/* Letterhead Header */}
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-green-700 via-white to-orange-600 opacity-90"></div>
        
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
           <span className="text-9xl font-bold font-serif rotate-[-30deg] text-red-900">GOVT</span>
        </div>

        {/* Letter Content */}
        <div className="relative z-10 text-left">
            <div className="text-center mb-10 border-b border-gray-300 pb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-red-900/5 rounded-full flex items-center justify-center border border-red-900/20">
                 <div className="w-16 h-16 border border-red-900/40 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-serif text-red-900/40">R</span>
                 </div>
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-widest text-red-900 font-serif">Government of Rajasthan</h3>
              <p className="text-sm font-bold text-gray-600 uppercase mt-2 tracking-widest">Department of Industries & Commerce</p>
              <p className="text-xs text-gray-500 mt-1 font-mono">Udyog Bhawan, Jaipur, Rajasthan</p>
            </div>

            <div className="font-serif leading-loose text-gray-800 space-y-6 px-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end font-mono text-sm text-gray-600 mb-8">
                <div>
                   <p className="font-bold text-black mb-1">To,</p>
                   <p>Mr. Mohd Sabir</p>
                   <p>Founder, Sabnam Bangles</p>
                   <p>Jaipur, Rajasthan</p>
                </div>
                <p>Date: {new Date("August 19, 2023 23:15:30").toLocaleDateString()}</p>
              </div>
              
              <p className="text-center text-xl font-bold font-serif text-red-950 my-8">
                <span className="border-b-2 border-red-900/30 pb-1">Certificate of Appreciation</span>
              </p>
              
              <p>
                Dear Mr. Sabir,
              </p>
              <p className="text-justify">
                The Department of Industries, Government of Rajasthan, is pleased to place on record its deep appreciation for your outstanding contribution towards the preservation and promotion of the traditional <strong>Lac Art (Manihari)</strong> of Rajasthan.
              </p>
              <p className="text-justify">
                Your brand, <strong>"Sabnam"</strong>, has set a benchmark in quality and design, effectively showcasing the rich cultural heritage of our state on both national and international platforms. Your dedication to training new artisans and maintaining eco-friendly practices is commendable.
              </p>
              <p>
                We wish you continued success in your endeavors to take this legacy forward.
              </p>
            </div>

            <div className="mt-16 flex justify-end px-4">
              <div className="text-center relative">
                <div className="absolute -top-12 left-0 right-0 h-20 text-blue-900 font-script text-4xl opacity-80 -rotate-6 mix-blend-multiply flex items-center justify-center">
                  Sign_Verified
                </div>
                <div className="h-px w-48 bg-gray-800 mb-2"></div>
                <p className="font-bold text-red-900 uppercase text-xs tracking-widest">Commissioner of Industries</p>
                <p className="text-[10px] text-gray-600 uppercase">Government of Rajasthan</p>
              </div>
            </div>
        </div>
        
        {/* Generated SVG Seal */}
        <OfficialSeal />
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer id="contact" className="bg-[#1a0505] text-amber-100 py-20 border-t-4 border-amber-800 relative overflow-hidden">
    <MandanaArtOverlay className="top-[-200px] left-[-200px] w-[600px] h-[600px] text-amber-900/20" />
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        <div>
          <div className="flex items-center gap-3 mb-8">
             <SabnamLogo size={60} />
             <span className="text-4xl font-serif font-bold text-white">Sabnam</span>
          </div>
          <p className="text-amber-200/60 leading-relaxed mb-8 font-light border-l border-amber-900 pl-4">
            Preserving the royal tradition of Jaipur, one bangle at a time. Authentic, Handcrafted, Timeless.
          </p>
          <div className="flex space-x-4">
             {['Facebook', 'Instagram', 'Twitter'].map(social => (
                 <div key={social} className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-amber-600 hover:text-white hover:border-amber-500 transition-all cursor-pointer group">
                    <span className="font-bold group-hover:scale-110 transition-transform">{social[0]}</span>
                 </div>
             ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-xl font-serif font-bold mb-8 text-white border-b border-amber-900 pb-4 inline-block">Contact Us</h4>
          <ul className="space-y-6">
            <li className="flex items-start space-x-4 text-amber-200/80 group">
              <MapPin className="w-6 h-6 text-amber-600 mt-1 group-hover:text-amber-400 transition-colors" />
              <span className="group-hover:text-white transition-colors">Maniharon Ka Rasta, Tripolia Bazar,<br/>Jaipur, Rajasthan 302002</span>
            </li>
            <li className="flex items-center space-x-4 text-amber-200/80 group">
              <Phone className="w-6 h-6 text-amber-600 group-hover:text-amber-400 transition-colors" />
              <span className="group-hover:text-white transition-colors font-mono tracking-wider">+91 98XXX XXXXX</span>
            </li>
            <li className="flex items-center space-x-4 text-amber-200/80 group">
              <Mail className="w-6 h-6 text-amber-600 group-hover:text-amber-400 transition-colors" />
              <span className="group-hover:text-white transition-colors">info@sabnamcrafts.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-serif font-bold mb-8 text-white border-b border-amber-900 pb-4 inline-block">Visit Our Workshop</h4>
          <p className="text-amber-200/60 leading-relaxed mb-6">
            Experience the magic of lac bangle making firsthand. Visitors are welcome by appointment.
          </p>
          <button className="w-full py-4 bg-gradient-to-r from-amber-800 to-amber-700 hover:from-amber-700 hover:to-amber-600 text-white font-serif rounded-sm transition-all shadow-lg transform hover:-translate-y-1 border border-amber-600/30">
            Book an Appointment
          </button>
        </div>
      </div>
      
      <div className="border-t border-white/5 mt-20 pt-8 text-center text-amber-200/20 text-sm font-mono flex flex-col md:flex-row justify-between items-center">
        <span>© {new Date().getFullYear()} Sabnam By Mohd Sabir. All Rights Reserved.</span>
        <span className="mt-2 md:mt-0">Designed with <span className="text-red-700 animate-pulse">♥</span> in Rajasthan</span>
      </div>
    </div>
  </footer>
);

const App = () => {
  // --- Dynamic Favicon Effect ---
  useEffect(() => {
    const setFavicon = () => {
      // 1. Create a simplified version of the logo for small sizes (favicon)
      //    We minimize details to make it readable at 16x16 or 32x32 pixels.
      const faviconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="#450a0a" stroke="#f59e0b" stroke-width="4"/>
          <path d="M60 30 C 50 25, 35 35, 40 50 C 45 65, 65 65, 60 80 C 55 90, 40 85, 35 80" stroke="#f59e0b" stroke-width="8" stroke-linecap="round" fill="none"/>
        </svg>
      `.trim().replace(/\n/g, '').replace(/\s+/g, ' ');

      // 2. Convert to Data URI
      const encodedSvg = encodeURIComponent(faviconSvg)
        .replace(/'/g, '%27')
        .replace(/"/g, '%22');
      const dataUri = `data:image/svg+xml,${encodedSvg}`;

      // 3. Find or Create Link Tag
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = dataUri;
    };

    setFavicon();
  }, []);

  return (
    <div className="min-h-screen bg-amber-50 font-sans selection:bg-amber-900 selection:text-amber-100 scroll-smooth">
      <GlobalStyles />
      <Navbar />
      <Hero />
      <ArtisanProfile />
      <Products />
      <Process />
      <Workshop />
      <Recognition />
      <Footer />
    </div>
  );
};

export default App;