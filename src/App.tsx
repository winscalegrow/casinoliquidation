/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  ArrowRight, 
  Wind, 
  Utensils, 
  Zap,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';

// --- Types ---

interface Asset {
  id: string;
  lotNumber: string;
  title: string;
  category: string;
  image: string;
  yield?: string;
  value?: string;
  type?: 'power' | 'kitchen' | 'surveillance';
}

// --- Mock Data ---

const ELITE_ASSETS: Asset[] = [
  {
    id: '1',
    lotNumber: 'CAS-102',
    title: 'Professional 4K Projection Array',
    category: 'High-yield smaller assets',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2nHA3BXZyBeOL_y_Ke9dU3aPygQufXGYTp76QJz3Ar_MU8jpCa9IRK2aQMwOFxOJ9e_w10oCXTa-rDpy7Vge92lc9N5bFSPO9ru3g7Hl60NvOi8BMVN6TF13WV5s6zDcXgwV4x-yVRogvep1SqZPDV9GUruEOlh0vfm-tTLgg5idW9czX1c6FAJ_AlDmo9Tc790anO_FtsUDXQ0b5RdBCuRJRHZzCNkX9juHbr_O1tglz_vsRglejiB8wiNusJezTqoJUlSyTK165',
  },
  {
    id: '2',
    lotNumber: 'CAS-088',
    title: 'High-Speed Currency Counters',
    category: 'High-yield smaller assets',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXHmH3_R9jutIsawBvs-P0t2XARbH6YLPHsfigHUTn_9kMkVHP60nQHkd-C4c6mEvNwfqsCNUnk7JlkGpuiZeIpFVJlbfTizvs9yohn_GeSyQMYLvAIXbQHXOrP82LzWTRZ10zrj5XGGd-sdlsxnMfkXJ63cEACsO1V0k5YyiBk7exh6a9HX71_qv3usCuXJEWUyZeerOC9EiEhlTaww7Lp3zdcGLlHLeJdkYyqNvfAne0kQvRevh5_JJ6nLoh5mi-LChaVCpzcXMT',
  },
  {
    id: '3',
    lotNumber: 'FUR-902',
    title: 'Premium Unopened Playing Decks',
    category: 'High-yield smaller assets',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiTOpsVzlHqT9uh7XePNm-lJ260ZdsT8mQkX44lkCiziZ7iGsT388vhVWbW-gkvLLBPBSdQNKeAziMtyiGIEWRmHi8zAsA7dWtZqJnmtMQDEJaTM79ujtaYfuNjwpN5Y9_SnGbgSrOEM6GoSPu9nBLqzbufK8k-FtZp3hfMKYuhobb0F3AzXg5TipabzptVYARwHS5TSJFgP4z9NsZ8T86j93IdUZ5T6EktNQytWiCZ1ECQYK5ob3FI2-OIRM3lv2WacrMT_v6AlA1',
  },
  {
    id: '4',
    lotNumber: 'DEC-401',
    title: 'Pro-Grade Line Array Speakers',
    category: 'High-yield smaller assets',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuQz9cCCom1_rdCu-yEnKOXdh5jGX_MnW2jkjtAJn1028m9djzYwxPtTP4Sb7W6dadFcLwVQNmwRDZMGbCMXVsMqEf2BHNdLsLOnPGWDpcS27AxlssNHSoTuDAu3zlh0Q18AU9B0syuIBq4pou7emk1K1uS_-G05HOrkAbyEA_fjstjHHdlpA43NJLC7n3WsEMFKfwTiSyllBu8omvP5oSEcpsuCE488TdfEGVW8-Iwr1SFpW9RUc1QR0GWIi4RPemtF4p7IdoZ7S4',
  }
];

const INDUSTRIAL_ASSETS: Asset[] = [
  {
    id: 'i1',
    lotNumber: 'HVAC-50',
    title: 'Resort-Scale HVAC Chiller System',
    category: 'Est. Yield: High',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKEe6F5DAQ5gqO-b31wxbl1FbmunFAJkRmzvB1GcbXI27XhALAE7TLxeI2Lk0efYc5YRG5Cpau4cX-JiZNDdL0ASou1o-chAtiNTK2siOzXMfL6Mgmqytk7czXX48yNIR47f7jiY4QJPytvM2FIO_mQZEdJL6e9k-Pa9KT06XCB1p64V9Z0B4JYiyvkNlfqQs7uZ2AgVo568-1PpQ8FAGoaRSvIm56UrC6go2RzMMtIbFoXXGGvDe6bhjkyHOtiXQf6vD9OhS6jC2c',
    type: 'power'
  },
  {
    id: 'i2',
    lotNumber: 'KIT-99',
    title: 'Master Banquet Kitchen Suite (Full Stainless)',
    category: 'Liquid Value: $120k',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4pjJyPT9OGcAmWOlOn3A6wdmCeHnF9eYJkLybS_Be3I_6s7kjIn4Fsv23CpHQ708DKagDt0VKhlKPVP6KNBWx8FppPpRWRdP4EEU-0kVCR3zAMVbp4Fn6vtXGBBYye7Adq2lTopj_VrLWPQ8YsOJ31G3X8yXEAlz_XlEoPgTKdtzgBNo0hyKQ4fnmOf4RpEfHwLABwyUkVUuXF0A_Bpzji60F4yWny06Tx6ftpF9L7nUx14c8DdmFxUNde0QSptrSkgXsh1foKCvy',
    type: 'kitchen'
  },
  {
    id: 'i3',
    lotNumber: 'PWR-12',
    title: 'Triple-Grid Redundant Power Hub',
    category: 'Industrial Grade',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhkjGn7sHSVN5WOMkyaTS-l0U2Usg8gAwKAfsa_tEj_o5OGqpAghcQN2vuxxSab6JG71ArbzaMTFRo1eXfH2Xd9UnL5B3hVtxeoo3NkAuoNIT68j3eItTQvM80ovy7c83tDSOGQyHLYo99yWnKJ_qdUTzQQZYYckzMrBHdQ1l4MpopxOZsAAcgdDpT_zfcobTMMwvbVD9J0Q0XokR9RAbGLcy9fN2Zr6jGDgwGBl30qc7-BSQ2C5z0gqf90FaINm3qyBfmnS66egmT',
    type: 'power'
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md py-3 shadow-2xl' : 'bg-transparent py-5'}`}>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="text-xl md:text-2xl font-headline font-bold tracking-tighter uppercase text-on-background">
          CASINO <span className="text-primary">LIQUIDATOR</span>
        </div>
        
        <div className="hidden md:flex gap-10 items-center font-headline text-xs font-bold tracking-widest uppercase">
          <a href="#" className="text-primary border-b-2 border-primary pb-1">Inventory</a>
          <a href="#" className="text-on-background/60 hover:text-primary transition-colors">Featured Lots</a>
          <a href="#" className="text-on-background/60 hover:text-primary transition-colors">Auction Details</a>
        </div>

        <button className="bg-gradient-to-br from-primary to-on-primary-container text-on-primary-fixed px-6 py-2.5 rounded-md font-headline font-bold text-xs tracking-widest uppercase hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/10">
          GET ACCESS
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 px-6 md:px-12 max-w-screen-2xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div className="inline-flex items-center gap-2.5 bg-tertiary text-on-tertiary px-4 py-1.5 rounded-md font-headline font-bold text-[10px] tracking-widest uppercase">
            <Star size={14} fill="currentColor" />
            Exclusive: High-Yield Casino Assets
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-headline font-bold leading-[0.85] tracking-tighter uppercase">
            THE <span className="text-primary italic">CASINO</span><br />FLIP.
          </h1>
          
          <p className="text-on-surface-variant text-lg md:text-xl max-w-lg leading-relaxed font-body">
            Secure elite gaming floor inventory and high-capacity back-of-house infrastructure via casinoliquidation.com. RSVP for early manifest access.
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-background bg-surface-container overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/user${i}/100/100`} 
                    alt="User" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-2 border-background bg-primary flex items-center justify-center text-on-primary text-xs font-bold font-headline">
                +422
              </div>
            </div>
            <div className="font-headline tracking-tight">
              <span className="text-tertiary block font-bold text-sm uppercase">HIDDEN OPPORTUNITY</span>
              <span className="text-on-surface/50 text-[10px] uppercase tracking-widest">Join the registered syndicates</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-10 bg-primary/5 blur-[100px] rounded-full" />
          <div className="relative bg-surface-container-low p-8 md:p-12 rounded-2xl border-l border-primary/20 shadow-2xl">
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-tight">Reserve Your Access</h2>
              <p className="text-on-surface-variant text-sm mt-2 font-body">Free digital valuation guide for all early RSVPs.</p>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="block text-[10px] font-headline font-bold uppercase tracking-[0.2em] text-primary">Legal Identity</label>
                <input 
                  type="text" 
                  placeholder="Full Name"
                  className="w-full bg-surface-container-highest border-none focus:ring-0 focus:border-primary border-b-2 border-transparent transition-all px-5 py-4 text-on-surface placeholder:text-on-surface/20 rounded-t-md"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-headline font-bold uppercase tracking-[0.2em] text-primary">Corporate Email</label>
                <input 
                  type="email" 
                  placeholder="buyer@syndicate.com"
                  className="w-full bg-surface-container-highest border-none focus:ring-0 focus:border-primary border-b-2 border-transparent transition-all px-5 py-4 text-on-surface placeholder:text-on-surface/20 rounded-t-md"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-headline font-bold uppercase tracking-[0.2em] text-primary">Direct Secure Line</label>
                <input 
                  type="tel" 
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-surface-container-highest border-none focus:ring-0 focus:border-primary border-b-2 border-transparent transition-all px-5 py-4 text-on-surface placeholder:text-on-surface/20 rounded-t-md"
                />
              </div>
              
              <button className="w-full bg-gradient-to-r from-primary to-on-primary-container text-on-primary-fixed py-5 rounded-md font-headline font-extrabold tracking-[0.2em] uppercase text-xs mt-4 hover:shadow-[0_0_40px_rgba(255,181,156,0.3)] transition-all active:scale-[0.98]">
                CONFIRM RSVP + CLAIM GUIDE
              </button>
              
              <div className="flex items-center justify-center gap-2 pt-6 opacity-30">
                <ShieldCheck size={12} />
                <p className="text-[9px] text-center uppercase tracking-[0.3em] font-headline">Data secured via casinoliquidation.com protocols</p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const EliteAssets = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-32 bg-surface-container-lowest overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <h3 className="text-secondary font-headline font-bold text-4xl md:text-5xl tracking-tighter uppercase leading-none">
            ELITE TECH & GAMING ASSETS
          </h3>
          <p className="text-on-surface-variant font-body text-lg">
            Specialty tech, precision currency tools, and factory-sealed gaming essentials.
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => scroll('left')}
            className="w-14 h-14 flex items-center justify-center rounded-md border border-outline-variant/20 hover:border-primary hover:text-primary transition-all active:scale-90"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-14 h-14 flex items-center justify-center rounded-md border border-outline-variant/20 hover:border-primary hover:text-primary transition-all active:scale-90"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-8 px-6 md:px-12 overflow-x-auto hide-scrollbar snap-x"
      >
        {ELITE_ASSETS.map((asset) => (
          <motion.div 
            key={asset.id}
            whileHover={{ y: -10 }}
            className="flex-none w-[320px] md:w-[420px] snap-start group cursor-pointer"
          >
            <div className="relative h-[560px] bg-surface-container-high rounded-xl overflow-hidden mb-6 shadow-2xl">
              <div className="absolute inset-0 bg-background/40 group-hover:bg-background/10 transition-all duration-500" />
              <img 
                src={asset.image} 
                alt={asset.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-tertiary text-on-tertiary font-headline font-bold text-[10px] px-3 py-1.5 tracking-widest uppercase rounded-sm">
                  Lot #{asset.lotNumber}
                </span>
              </div>
            </div>
            <h4 className="font-headline font-bold text-xl md:text-2xl uppercase tracking-tight text-on-surface group-hover:text-primary transition-colors">
              {asset.title}
            </h4>
            <p className="text-primary/60 text-xs font-bold mt-2 uppercase tracking-[0.2em] font-headline">
              {asset.category}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const IndustrialAssets = () => {
  const [activeTab, setActiveTab] = useState('power');

  return (
    <section className="py-32 bg-surface-container-low">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="space-y-4">
            <h3 className="text-tertiary font-headline font-bold text-4xl md:text-5xl tracking-tighter uppercase leading-none">
              Back-of-House Industrial
            </h3>
            <p className="text-on-surface-variant font-body text-lg max-w-xl">
              High-yield industrial assets: Commercial HVAC, pro-kitchen gear, and power units from resort facilities.
            </p>
          </div>
          
          <div className="bg-surface-container-highest/50 p-1.5 rounded-xl flex items-center self-start lg:self-auto overflow-x-auto hide-scrollbar">
            {['power', 'kitchen', 'surveillance'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-lg font-headline text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab === 'power' ? 'Power/HVAC' : tab === 'kitchen' ? 'Commercial Kitchen' : 'Surveillance'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {INDUSTRIAL_ASSETS.map((asset) => (
            <motion.div 
              key={asset.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface-container group overflow-hidden rounded-2xl border-l-2 border-tertiary/30 hover:border-primary transition-all duration-500 shadow-xl"
            >
              <div className="h-72 relative overflow-hidden">
                <img 
                  src={asset.image} 
                  alt={asset.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent opacity-80" />
              </div>
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-tertiary/10 rounded-lg text-tertiary">
                    {asset.type === 'power' ? <Zap size={20} /> : <Utensils size={20} />}
                  </div>
                  <span className="text-[10px] font-headline font-bold uppercase tracking-widest text-on-surface/30">
                    Lot #{asset.lotNumber}
                  </span>
                </div>
                
                <h5 className="font-headline font-bold text-xl text-on-surface uppercase leading-tight min-h-[3.5rem]">
                  {asset.title}
                </h5>
                
                <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                  <div className="text-[10px] uppercase font-headline font-bold tracking-[0.2em] text-on-surface-variant">
                    {asset.category}
                  </div>
                  <button className="text-tertiary group-hover:text-primary group-hover:translate-x-2 transition-all">
                    <ArrowRight size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-40 bg-surface-container-lowest relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full" />
      
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-8xl font-headline font-extrabold text-primary tracking-tighter uppercase leading-[0.9]"
        >
          ACQUIRE THE <br />MANIFEST
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-on-background/70 text-lg md:text-2xl font-body max-w-2xl mx-auto leading-relaxed"
        >
          The private registration for the Casino Liquidation event closes in 48 hours. Access hidden asset opportunities today.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center pt-6"
        >
          <button className="bg-primary text-on-primary-fixed px-14 py-6 rounded-md font-headline font-bold tracking-[0.2em] uppercase text-xs hover:shadow-[0_0_50px_rgba(255,181,156,0.4)] transition-all active:scale-95">
            RSVP NOW
          </button>
          <button className="border border-primary/20 text-primary px-14 py-6 rounded-md font-headline font-bold tracking-[0.2em] uppercase text-xs hover:bg-primary/5 transition-all active:scale-95">
            VIEW ASSET PREVIEW
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-surface-container-lowest py-20 border-t border-outline-variant/10">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
          <div className="space-y-4">
            <div className="text-2xl font-bold text-on-background font-headline tracking-tighter uppercase">
              CASINO <span className="text-primary">LIQUIDATOR</span>
            </div>
            <p className="text-on-surface-variant/50 text-[10px] uppercase tracking-[0.3em] font-headline">
              © 2024 CASINO LIQUIDATOR. ALL RIGHTS RESERVED.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 font-headline text-[10px] font-bold tracking-widest uppercase">
            <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors">Terms of Sale</a>
            <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors">Contact Support</a>
            <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors">Liquidation FAQ</a>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-outline-variant/5 text-center">
          <p className="text-on-surface-variant/30 text-[9px] uppercase tracking-[0.5em] font-headline">
            HIGH-YIELD ASSET ACQUISITION PROTOCOLS ENABLED
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-primary selection:text-on-primary">
      <Navbar />
      <main>
        <Hero />
        <EliteAssets />
        <IndustrialAssets />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
