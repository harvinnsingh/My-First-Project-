const { useState, useEffect, useRef } = React;

// Inline SVG Icons for reliability and premium look
const Icons = {
  Activity: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
  Sun: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>,
  Moon: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>,
  Settings: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
  User: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  Camera: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>,
  Upload: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>,
  Search: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Menu: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
  X: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  CheckCircle: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
  AlertTriangle: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
  Info: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
  ArrowRight: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>,
  ChevronRight: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="9 18 15 12 9 6"></polyline></svg>,
  Phone: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
  MessageCircle: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
};

// UI Components
const Button = ({ children, primary, onClick, className = '', icon: IconCmp }) => (
  <button 
    onClick={onClick}
    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${primary ? 'bg-medical-emerald text-white hover:bg-medical-green shadow-lg shadow-medical-emerald/30' : 'liquid-glass hover:bg-white/30 dark:hover:bg-white/10'} ${className}`}
  >
    {IconCmp && <IconCmp size={20} />}
    {children}
  </button>
);

const GlassCard = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={`liquid-glass p-6 ${onClick ? 'cursor-pointer hover:ring-2 hover:ring-medical-emerald/50' : ''} ${className}`}
  >
    {children}
  </div>
);

// Navbar Component
const Navbar = ({ darkMode, setDarkMode, setView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [glassOpacity, setGlassOpacity] = useState(55);

  const updateGlass = (val) => {
    setGlassOpacity(val);
    document.documentElement.style.setProperty('--glass-opacity', val / 100);
  };

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div className="container mx-auto liquid-glass-navbar px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
          <div className="bg-gradient-to-tr from-medical-emerald to-medical-cyan p-2 rounded-full text-white shadow-lg">
            <Icons.Activity size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-medical-emerald to-medical-cyan">
            MedTroubleshoot AI
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          <a href="#" onClick={() => setView('home')} className="hover:text-medical-emerald transition-colors">Home</a>
          <a href="#" onClick={() => setView('scanning')} className="hover:text-medical-emerald transition-colors">Troubleshoot</a>
          <a href="#" className="hover:text-medical-emerald transition-colors">Equipment</a>
          <a href="#" className="hover:text-medical-emerald transition-colors">History</a>
        </div>

        <div className="flex items-center gap-4 relative">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            {darkMode ? <Icons.Sun size={20} /> : <Icons.Moon size={20} />}
          </button>
          
          <div className="relative">
            <button onClick={() => setSettingsOpen(!settingsOpen)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <Icons.Settings size={20} />
            </button>
            {settingsOpen && (
              <div className="absolute right-0 top-12 liquid-glass p-4 w-64 flex flex-col gap-4 z-50">
                <h4 className="font-semibold text-sm">Glass Transparency</h4>
                <div className="flex items-center justify-between text-xs opacity-70">
                  <span>Clear</span>
                  <span>Tinted</span>
                </div>
                <input 
                  type="range" 
                  min="10" max="100" 
                  value={glassOpacity} 
                  onChange={(e) => updateGlass(e.target.value)}
                  className="w-full accent-medical-emerald"
                />
              </div>
            )}
          </div>
          
          <button className="hidden sm:block p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <Icons.User size={20} />
          </button>

          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 liquid-glass p-4 flex flex-col gap-4">
          <a href="#" onClick={() => {setView('home'); setMobileMenuOpen(false);}} className="font-medium p-2 hover:bg-black/5 rounded">Home</a>
          <a href="#" onClick={() => {setView('scanning'); setMobileMenuOpen(false);}} className="font-medium p-2 hover:bg-black/5 rounded">Troubleshoot</a>
          <a href="#" className="font-medium p-2 hover:bg-black/5 rounded">Equipment</a>
        </div>
      )}
    </nav>
  );
};

// Hero Component
const Hero = ({ setView }) => (
  <div className="flex flex-col lg:flex-row items-center gap-12 pt-12 pb-24">
    <div className="flex-1 space-y-8 animate-fade-in-up">
      <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
        Troubleshoot Medical Equipment <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-emerald to-medical-cyan">Smarter</span>
      </h1>
      <p className="text-lg lg:text-xl opacity-80 leading-relaxed max-w-2xl">
        Identify laboratory and medical equipment with your camera and get safe, step-by-step first-level troubleshooting guidance.
      </p>
      <div className="flex flex-wrap gap-4 pt-4">
        <Button primary icon={Icons.Camera} onClick={() => setView('scanning')}>
          Scan Equipment
        </Button>
        <Button icon={Icons.Search} onClick={() => {}}>
          Browse Equipment
        </Button>
      </div>
    </div>
    
    <div className="flex-1 relative w-full max-w-lg perspective-1000">
      <div className="relative transform rotate-y-[-10deg] rotate-x-[5deg] transition-transform duration-700 hover:rotate-0">
        <GlassCard className="aspect-[4/3] flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
          <div className="flex-1"></div>
          <div className="relative z-10 scanner-line"></div>
          <div className="relative z-10 flex justify-between items-end">
            <div>
              <div className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full mb-2">
                <div className="w-2 h-2 rounded-full bg-medical-green animate-pulse"></div>
                AI Vision Ready
              </div>
              <h3 className="font-semibold text-lg text-white">Centrifuge Detected</h3>
            </div>
          </div>
          {/* Scanner corners */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-medical-emerald rounded-tl-lg"></div>
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-medical-emerald rounded-tr-lg"></div>
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-medical-emerald rounded-bl-lg"></div>
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-medical-emerald rounded-br-lg"></div>
        </GlassCard>
      </div>
    </div>
  </div>
);

// Equipment Scanner Component
const EquipmentScanner = ({ setView }) => {
  const [scanning, setScanning] = useState(false);

  const startScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setView('identified');
    }, 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Identify Equipment</h2>
        <p className="opacity-70">Point your camera at a medical or laboratory device.</p>
      </div>
      
      <GlassCard className="relative aspect-video flex flex-col items-center justify-center overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-medical-emerald transition-colors">
        {!scanning ? (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Icons.Camera size={40} className="opacity-50" />
            </div>
            <p className="font-medium">Camera ready</p>
            <p className="text-sm opacity-60">Allow camera access or drag and drop an image</p>
          </div>
        ) : (
          <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"}}>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="scanner-line"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/60 text-white px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-3">
                <Icons.Activity className="animate-spin-slow" />
                Scanning...
              </div>
            </div>
          </div>
        )}
      </GlassCard>

      <div className="flex justify-center gap-4">
        <Button primary icon={Icons.Camera} onClick={startScan} className={scanning ? 'opacity-50 pointer-events-none' : ''}>
          {scanning ? 'Analyzing...' : 'Scan Equipment'}
        </Button>
        <Button icon={Icons.Upload} className={scanning ? 'opacity-50 pointer-events-none' : ''}>
          Upload Photo
        </Button>
      </div>
      
      <div className="text-center pt-8">
        <button onClick={() => setView('home')} className="text-sm opacity-60 hover:opacity-100 underline underline-offset-4">Cancel</button>
      </div>
    </div>
  );
};

// Equipment Identification Component
const EquipmentIdentification = ({ setView }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Equipment Detected</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <GlassCard className="flex flex-col items-center justify-center text-center p-8 space-y-6 relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-medical-green/20 text-medical-green px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 backdrop-blur-md border border-medical-green/30">
            <Icons.CheckCircle size={16} /> 94% Confidence
          </div>
          <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Centrifuge" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Centrifuge</h3>
            <p className="text-medical-emerald font-medium mt-1">Laboratory Equipment</p>
          </div>
          <p className="opacity-80 text-sm leading-relaxed">
            Used to separate components of a sample using centrifugal force based on density.
          </p>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Icons.Info size={20} className="text-medical-cyan" />
              Why we think this is a centrifuge
            </h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-start gap-2"><Icons.CheckCircle size={16} className="text-medical-emerald mt-0.5 shrink-0" /> Circular rotor chamber</li>
              <li className="flex items-start gap-2"><Icons.CheckCircle size={16} className="text-medical-emerald mt-0.5 shrink-0" /> Hinged safety lid</li>
              <li className="flex items-start gap-2"><Icons.CheckCircle size={16} className="text-medical-emerald mt-0.5 shrink-0" /> Control/display layout</li>
              <li className="flex items-start gap-2"><Icons.CheckCircle size={16} className="text-medical-emerald mt-0.5 shrink-0" /> Typical laboratory form factor</li>
            </ul>
          </GlassCard>

          <GlassCard className="bg-medical-emerald/5 border-medical-emerald/20">
            <h4 className="font-semibold mb-4">What's wrong with your equipment?</h4>
            <div className="space-y-2">
              <button onClick={() => setView('troubleshooting')} className="w-full text-left p-3 rounded-lg bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-white/10 transition-colors border border-transparent hover:border-medical-emerald/30 text-sm flex justify-between items-center group">
                Centrifuge isn't starting
                <Icons.ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-white/10 transition-colors border border-transparent hover:border-medical-emerald/30 text-sm flex justify-between items-center group">
                Not reaching required speed
                <Icons.ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-white/10 transition-colors border border-transparent hover:border-medical-emerald/30 text-sm flex justify-between items-center group">
                Unusual noise or vibration
                <Icons.ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/50">
              <label className="text-xs font-medium opacity-70 mb-2 block">Describe the problem manually</label>
              <div className="flex gap-2">
                <input type="text" placeholder="e.g. The rotor doesn't start." className="flex-1 liquid-glass-input rounded-lg px-3 py-2 text-sm bg-transparent outline-none focus:ring-2 focus:ring-medical-emerald/50" />
                <button onClick={() => setView('troubleshooting')} className="bg-medical-emerald text-white p-2 rounded-lg hover:bg-medical-green transition-colors">
                  <Icons.ArrowRight size={20} />
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
      
      <div className="text-center flex justify-center gap-4">
        <button onClick={() => setView('scanning')} className="opacity-60 hover:opacity-100 underline underline-offset-4 text-sm py-2">Scan Again</button>
        <button className="opacity-60 hover:opacity-100 underline underline-offset-4 text-sm py-2">Select Equipment Manually</button>
      </div>
    </div>
  );
};

// Troubleshooting Dashboard Component
const TroubleshootingDashboard = ({ setView }) => {
  const [analyzing, setAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState('Analyzing equipment...');

  useEffect(() => {
    if (analyzing) {
      const timer1 = setTimeout(() => { setProgress(30); setStep('Identifying components...'); }, 800);
      const timer2 = setTimeout(() => { setProgress(60); setStep('Analyzing reported problem...'); }, 1600);
      const timer3 = setTimeout(() => { setProgress(90); setStep('Preparing safe troubleshooting guidance...'); }, 2400);
      const timer4 = setTimeout(() => { setAnalyzing(false); }, 3200);
      
      return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); clearTimeout(timer4); };
    }
  }, [analyzing]);

  if (analyzing) {
    return (
      <div className="max-w-xl mx-auto mt-20 animate-fade-in">
        <GlassCard className="text-center p-12 space-y-8">
          <div className="relative w-24 h-24 mx-auto">
            <svg className="animate-spin w-full h-full text-medical-emerald/20" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-medical-emerald">
              <Icons.Activity size={32} />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{step}</h3>
            <div className="w-full bg-black/5 dark:bg-white/10 rounded-full h-2 overflow-hidden">
              <div className="bg-medical-emerald h-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-700/50 pb-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-medical-emerald mb-2">First-Level Troubleshooting</div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            Centrifuge isn't starting
          </h2>
        </div>
        <Button icon={Icons.ArrowRight} onClick={() => setView('identified')} className="text-sm py-2 px-4 self-start md:self-auto">
          Back to Equipment
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          <GlassCard className="border-l-4 border-l-yellow-500 bg-yellow-500/5">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
              <Icons.AlertTriangle size={24} /> Safety First
            </h3>
            <ul className="space-y-3 opacity-90 text-sm font-medium">
              <li className="flex items-start gap-2"><span className="text-yellow-500">•</span> Do not open electrical panels.</li>
              <li className="flex items-start gap-2"><span className="text-yellow-500">•</span> Do not bypass safety interlocks.</li>
              <li className="flex items-start gap-2"><span className="text-yellow-500">•</span> Do not operate damaged equipment.</li>
              <li className="flex items-start gap-2"><span className="text-yellow-500">•</span> Follow the manufacturer's operating and maintenance manual.</li>
              <li className="flex items-start gap-2"><span className="text-yellow-500">•</span> If biological, chemical, radioactive or hazardous material may be involved, stop and follow lab safety procedures.</li>
            </ul>
          </GlassCard>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Things to Check</h3>
            <div className="space-y-4">
              {[
                { title: "Power Connection", desc: "Confirm the equipment is connected to the correct power source and the switch is ON." },
                { title: "Display/Indicators", desc: "Check whether the power indicator or display is active. If blank, check the outlet." },
                { title: "Safety Interlock", desc: "Make sure the lid/door is properly closed. The centrifuge will not start if the lid sensor is not engaged." },
                { title: "Error Codes", desc: "Check whether an error message or code is displayed on the screen." },
                { title: "Operating Mode", desc: "Verify that parameters (speed, time, temp) are set correctly and within limits for the installed rotor." }
              ].map((item, i) => (
                <GlassCard key={i} className="flex gap-4 p-5 hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-medical-emerald/20 text-medical-emerald flex items-center justify-center shrink-0 font-bold font-mono text-sm">
                    {i+1}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="opacity-80 text-sm">{item.desc}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <GlassCard>
            <h3 className="font-bold text-lg mb-4">Possible Basic Causes</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-start gap-2"><Icons.ArrowRight size={16} className="shrink-0 text-medical-cyan mt-0.5" /> Power connection issue</li>
              <li className="flex items-start gap-2"><Icons.ArrowRight size={16} className="shrink-0 text-medical-cyan mt-0.5" /> Door/lid safety interlock not engaged</li>
              <li className="flex items-start gap-2"><Icons.ArrowRight size={16} className="shrink-0 text-medical-cyan mt-0.5" /> Incorrect operating mode</li>
              <li className="flex items-start gap-2"><Icons.ArrowRight size={16} className="shrink-0 text-medical-cyan mt-0.5" /> Blown external fuse</li>
              <li className="flex items-start gap-2"><Icons.ArrowRight size={16} className="shrink-0 text-medical-cyan mt-0.5" /> Internal fault requiring service</li>
            </ul>
          </GlassCard>

          <GlassCard className="bg-red-500/5 border-red-500/20">
            <h3 className="font-bold text-lg text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
              <Icons.Activity size={20} /> Call a Technician If:
            </h3>
            <ul className="space-y-3 text-sm opacity-80 mb-6">
              <li className="flex gap-2"><span>-</span> The equipment has no power after basic checks.</li>
              <li className="flex gap-2"><span>-</span> An internal fault is suspected.</li>
              <li className="flex gap-2"><span>-</span> There is burning smell, smoke, sparking or visible damage.</li>
              <li className="flex gap-2"><span>-</span> Safety mechanisms appear defective.</li>
              <li className="flex gap-2"><span>-</span> The device requires opening or internal component replacement.</li>
            </ul>
            <div className="space-y-3">
              <Button primary className="w-full text-sm bg-red-600 hover:bg-red-700 shadow-red-600/30">Find Service / Technician</Button>
              <Button className="w-full text-sm py-2">View Manufacturer Manual</Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

// AI Assistant Component
const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am MedTroubleshoot AI. Do you have any questions about safety or manufacturer documentation for your equipment?' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    const userMsg = input;
    setInput('');
    
    setTimeout(() => {
      let reply = "I can help with educational, first-level troubleshooting. Please refer to your manufacturer's manual for specific technical specifications. Avoid opening any hazardous equipment panels.";
      if (userMsg.toLowerCase().includes("error code")) {
        reply = "Please refer to the manufacturer manual for exact error code meanings. Often, common errors indicate a lid that isn't fully closed or an imbalanced rotor. However, persistent codes require a qualified biomedical technician.";
      }
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    }, 1000);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`p-4 rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95 ${isOpen ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900' : 'bg-gradient-to-r from-medical-emerald to-medical-cyan text-white'}`}
        >
          {isOpen ? <Icons.X size={24} /> : <Icons.MessageCircle size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] max-h-[70vh] z-40 animate-fade-in-up">
          <GlassCard className="w-full h-full flex flex-col p-0 overflow-hidden shadow-2xl">
            <div className="p-4 bg-medical-emerald/10 border-b border-medical-emerald/20 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-medical-emerald to-medical-cyan flex items-center justify-center text-white">
                <Icons.Activity size={16} />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Ask MedAI</h4>
                <p className="text-xs opacity-70">Safety & Documentation</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${m.role === 'user' ? 'bg-medical-emerald text-white rounded-br-none' : 'bg-white/50 dark:bg-black/30 backdrop-blur-md rounded-bl-none border border-slate-200 dark:border-slate-700'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-slate-200 dark:border-slate-700/50 bg-white/30 dark:bg-black/30 backdrop-blur-md">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask a question..." 
                  className="flex-1 liquid-glass-input rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-medical-emerald/50"
                />
                <button type="submit" className="p-2 rounded-full bg-medical-emerald text-white hover:bg-medical-green transition-colors">
                  <Icons.ArrowRight size={20} />
                </button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </>
  );
};

// Footer Component
const Footer = () => (
  <footer className="mt-auto py-12 relative z-10 border-t border-slate-200 dark:border-slate-800">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Icons.Activity size={20} className="text-medical-emerald" />
          <span className="font-semibold text-lg tracking-tight">MedTroubleshoot AI</span>
        </div>
        <div className="flex gap-6 text-sm opacity-70">
          <a href="#" className="hover:opacity-100 hover:text-medical-emerald transition-colors">About</a>
          <a href="#" className="hover:opacity-100 hover:text-medical-emerald transition-colors">Safety</a>
          <a href="#" className="hover:opacity-100 hover:text-medical-emerald transition-colors">Privacy</a>
          <a href="#" className="hover:opacity-100 hover:text-medical-emerald transition-colors">Terms</a>
        </div>
      </div>
      <div className="mt-8 text-center text-xs opacity-50 max-w-3xl mx-auto leading-relaxed">
        This tool provides educational, first-level troubleshooting guidance and does not replace qualified biomedical equipment technicians, manufacturer manuals, laboratory safety procedures, or professional service.
      </div>
    </div>
  </footer>
);

// Main App Container
const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState('home');

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-500">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} setView={setView} />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-24">
        {view === 'home' && <Hero setView={setView} />}
        {view === 'scanning' && <EquipmentScanner setView={setView} />}
        {view === 'identified' && <EquipmentIdentification setView={setView} />}
        {view === 'troubleshooting' && <TroubleshootingDashboard setView={setView} />}
      </main>

      <AIAssistant />
      <Footer />
    </div>
  );
};

// Add some global animation utilities using Tailwind's arbitrary values in the style tag or dynamic styles.
// Since we used tailwind CDN, we can just inject these into a custom style tag if needed.
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease forwards;
  }
  .animate-spin-slow {
    animation: spin 3s linear infinite;
  }
`;
document.head.appendChild(style);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
