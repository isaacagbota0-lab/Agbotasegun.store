import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Home, ShoppingBag, MessageCircle, User, 
  Settings, LogOut, CheckCircle, Upload, Image as ImageIcon, 
  Mic, Search, FileText, ChevronRight, Lock, Loader2, Send,
  ShieldCheck, ArrowRight, Play, DollarSign, Clock, Check, AlertCircle,
  HelpCircle, BookOpen, Layers, CheckSquare, XCircle, Mail, Key, Shield,
  Share2, Award, Star, Compass, Download, RefreshCw, SendHorizonal, Paperclip, CheckCheck
} from 'lucide-react';

const ADMIN_EMAIL = 'agbotasegun.outreach@gmail.com';
const ADMIN_PASSWORD = 'Ecomexpert001';
const BTC_ADDRESS = '1KbyAebAkdcvwd6wKjN6dyz16CoHpKrah1';

const SEED_PRODUCTS = [
  { id: 'p1', name: 'YouTube Growth Strategy', category: 'individual', price: 30, platform: 'YouTube', coverBg: 'from-red-600 to-rose-900', description: 'Practical marketing strategy blueprint for building organic YouTube reach.' },
  { id: 'p2', name: 'Twitch Growth Strategy', category: 'individual', price: 30, platform: 'Twitch', coverBg: 'from-purple-600 to-indigo-900', description: 'Actionable blueprint for streamer discovery, community building, and retention on Twitch.' },
  { id: 'p3', name: 'TikTok Growth Strategy', category: 'individual', price: 30, platform: 'TikTok', coverBg: 'from-pink-600 to-slate-900', description: 'Short-form discovery framework and consistency system for TikTok creators.' },
  { id: 'p4', name: 'Instagram Growth Strategy', category: 'individual', price: 30, platform: 'Instagram', coverBg: 'from-amber-500 to-purple-900', description: 'Visual branding and Reels outreach growth strategy for Instagram.' },
  { id: 'p5', name: 'Facebook Growth Strategy', category: 'individual', price: 30, platform: 'Facebook', coverBg: 'from-blue-600 to-blue-950', description: 'Group community building and page reach expansion strategy for Facebook.' },
  { id: 'p6', name: 'Discord Growth Strategy', category: 'individual', price: 30, platform: 'Discord', coverBg: 'from-indigo-600 to-slate-900', description: 'Community architecture and engagement retention blueprint for Discord servers.' },
  { id: 'p7', name: 'X/Twitter Growth Strategy', category: 'individual', price: 30, platform: 'X/Twitter', coverBg: 'from-slate-700 to-slate-950', description: 'Thread creation and network building framework for X.' },
  { id: 'p8', name: 'LinkedIn Growth Strategy', category: 'individual', price: 30, platform: 'LinkedIn', coverBg: 'from-blue-700 to-slate-900', description: 'Professional creator positioning and thought leadership strategy on LinkedIn.' },
  { id: 'p9', name: 'Pinterest Growth Strategy', category: 'individual', price: 30, platform: 'Pinterest', coverBg: 'from-red-700 to-slate-900', description: 'Visual search engine traffic and pin optimization strategy.' },
  { id: 'p10', name: 'Reddit Growth Strategy', category: 'individual', price: 30, platform: 'Reddit', coverBg: 'from-orange-600 to-stone-900', description: 'Authentic community engagement and organic discovery framework for Reddit.' },
  { id: 'p11', name: 'Telegram Growth Strategy', category: 'individual', price: 30, platform: 'Telegram', coverBg: 'from-sky-500 to-blue-900', description: 'Channel broadcast and subscriber retention blueprint for Telegram.' },
  { id: 'p12', name: 'WhatsApp Growth Strategy', category: 'individual', price: 30, platform: 'WhatsApp', coverBg: 'from-emerald-600 to-teal-950', description: 'Direct community broadcast and audience nurturing strategy via WhatsApp.' },
  { id: 'p13', name: 'Snapchat Growth Strategy', category: 'individual', price: 30, platform: 'Snapchat', coverBg: 'from-yellow-500 to-amber-800', description: 'Spotlight discovery and direct viewer engagement system for Snapchat.' },
  { id: 'p14', name: 'Kick Growth Strategy', category: 'individual', price: 30, platform: 'Kick', coverBg: 'from-emerald-500 to-slate-950', description: 'Live streaming audience acquisition and cross-platform funnel blueprint for Kick.' },
  { id: 'p15', name: 'Custom Social Media Strategy', category: 'individual', price: 30, platform: 'Custom', coverBg: 'from-violet-600 to-slate-950', description: 'Bespoke social media marketing blueprint tailored to your unique creator niche.' },

  { id: 'b1', name: 'YouTube + Twitch Strategy', category: 'bundle', price: 50, platform: 'Multi', coverBg: 'from-red-700 to-purple-900', description: 'Combined long-form video and live streaming discovery funnel.' },
  { id: 'b2', name: 'TikTok + Instagram Strategy', category: 'bundle', price: 55, platform: 'Multi', coverBg: 'from-pink-600 to-amber-700', description: 'Dual short-form vertical video growth and cross-posting system.' },
  { id: 'b3', name: 'YouTube + TikTok Strategy', category: 'bundle', price: 60, platform: 'Multi', coverBg: 'from-red-600 to-pink-900', description: 'Long-form anchor content combined with short-form viral discovery.' },
  { id: 'b4', name: 'Twitch + Discord Strategy', category: 'bundle', price: 60, platform: 'Multi', coverBg: 'from-purple-600 to-indigo-950', description: 'Live streaming audience conversion into a loyal community server.' },
  { id: 'b5', name: 'YouTube + Instagram + TikTok Strategy', category: 'bundle', price: 80, platform: 'Multi', coverBg: 'from-rose-600 to-purple-950', description: 'Comprehensive video creator triple-threat marketing blueprint.' },
  { id: 'b6', name: 'Twitch + TikTok + Discord Strategy', category: 'bundle', price: 85, platform: 'Multi', coverBg: 'from-indigo-600 to-pink-950', description: 'Live streamer growth loop across discovery and community platforms.' },
  { id: 'b7', name: 'YouTube + Twitch + TikTok Strategy', category: 'bundle', price: 95, platform: 'Multi', coverBg: 'from-red-700 to-indigo-950', description: 'The ultimate multi-platform creator strategy package for video and live.' },
  { id: 'b8', name: 'YouTube + Twitch + TikTok + Discord Strategy', category: 'bundle', price: 120, platform: 'Multi', coverBg: 'from-violet-700 to-slate-950', description: 'Complete ecosystem growth strategy for professional content creators.' },
  { id: 'b9', name: 'Custom Multi-Platform Strategy', category: 'bundle', price: 150, platform: 'Multi', coverBg: 'from-indigo-900 to-slate-950', description: 'Fully bespoke multi-channel growth plan designed by Agbota Segun.' }
];

const Logo = ({ size = 'md', className = '' }) => {
  const dims = size === 'lg' ? 'w-14 h-14 text-2xl' : size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-base';
  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      <div className={`${dims} bg-gradient-to-tr from-indigo-700 via-indigo-600 to-purple-700 rounded-xl flex items-center justify-center font-black text-white shadow-[0_0_25px_rgba(79,70,229,0.5)] border border-indigo-400/40 group-hover:scale-105 transition-transform`}>
        AS
      </div>
      <div className="flex flex-col">
        <span className="font-extrabold text-white tracking-tight leading-none text-base md:text-lg">AGBOTA SEGUN</span>
        <span className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase mt-0.5">Strategy Store</span>
      </div>
    </div>
  );
};

const compressMedia = (file, callback) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    if (file.type.startsWith('image/')) {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_W = 1000; const MAX_H = 1000;
        let w = img.width; let h = img.height;
        if (w > h) { if (w > MAX_W) { h *= MAX_W / w; w = MAX_W; } }
        else { if (h > MAX_H) { w *= MAX_H / h; h = MAX_H; } }
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        callback(canvas.toDataURL('image/jpeg', 0.85), 'image');
      };
    } else {
      callback(event.target.result, 'file', file.name);
    }
  };
};

const Modal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80 z-[150] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-300 mb-6 text-sm leading-relaxed">{message}</p>
        <button onClick={onClose} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg">
          Understood
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('as_session_v7');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState(SEED_PRODUCTS);
  
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('as_orders_v7');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [chats, setChats] = useState(() => {
    try {
      const saved = localStorage.getItem('as_chats_v7');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('as_messages_v7');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', message: '' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const showAlert = (title, message) => setModalConfig({ isOpen: true, title, message });

  useEffect(() => {
    try {
      localStorage.setItem('as_orders_v7', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('as_chats_v7', JSON.stringify(chats));
    } catch (e) {
      console.error(e);
    }
  }, [chats]);

  useEffect(() => {
    try {
      localStorage.setItem('as_messages_v7', JSON.stringify(messages));
    } catch (e) {
      console.error(e);
    }
  }, [messages]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('as_session_v7', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('as_session_v7');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const isAdmin = currentUser?.role === 'OWNER' || currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const myOrders = orders.filter(o => o.streamerEmail?.toLowerCase() === currentUser?.email?.toLowerCase());
  const myChats = chats.filter(c => c.streamerEmail?.toLowerCase() === currentUser?.email?.toLowerCase());

  const unreadCount = isAdmin
    ? chats.reduce((acc, c) => acc + (c.unreadAdmin || 0), 0)
    : myChats.reduce((acc, c) => acc + (c.unreadStreamer || 0), 0);

  const confirmedPaidOrderCount = orders.filter(o => o.paymentStatus === 'Paid' || o.paymentStatus === 'Confirmed').length;

  const navigateTo = (view, product = null) => {
    if (view === 'admin' && !isAdmin) {
      showAlert("Access Denied", "Unauthorized. Owner authentication required.");
      setCurrentView('auth');
      return;
    }
    if (product) setSelectedProduct(product);
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const ensureChatExists = (email, name = '') => {
    if (!email || email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) return;
    const chatId = 'chat_' + email.toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    setChats(prev => {
      const exists = prev.find(c => c.id === chatId);
      if (exists) return prev;
      return [...prev, {
        id: chatId,
        streamerEmail: email.toLowerCase(),
        streamerName: name || email.split('@')[0],
        lastMessage: 'Chat initialized with Agbota Segun',
        timestamp: Date.now(),
        unreadAdmin: 1,
        unreadStreamer: 0,
        paymentStatus: 'None'
      }];
    });
    return chatId;
  };

  const AuthScreen = () => {
    const [authType, setAuthType] = useState('streamer');
    const [mode, setMode] = useState('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleOwnerLogin = (e) => {
      e.preventDefault();
      const cleanEmail = email.trim().toLowerCase();
      
      if (cleanEmail === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
        const ownerUser = { uid: 'owner_uid', email: ADMIN_EMAIL, role: 'OWNER', name: 'Agbota Segun' };
        setCurrentUser(ownerUser);
        showAlert("Success", "Owner authentication successful. Welcome to the Admin Portal.");
        navigateTo('admin');
        return;
      }
      
      showAlert("Authentication Failed", "Incorrect owner credentials. Please verify your email and password.");
    };

    const handleStreamerLogin = (e) => {
      e.preventDefault();
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail || !password) return showAlert("Error", "Please provide both email and password.");

      const streamerSession = { 
        uid: 'user_' + Date.now(), 
        email: cleanEmail, 
        role: 'STREAMER', 
        name: cleanEmail.split('@')[0] 
      };
      setCurrentUser(streamerSession);
      ensureChatExists(cleanEmail, streamerSession.name);
      showAlert("Success", "Successfully logged in as Streamer.");
      navigateTo('dashboard');
    };

    const handleRegister = (e) => {
      e.preventDefault();
      const cleanEmail = email.trim().toLowerCase();
      const cleanName = name.trim();

      if (!cleanName || !cleanEmail || password.length < 6) {
        return showAlert("Error", "Please provide a valid name, email, and a password of at least 6 characters.");
      }

      if (cleanEmail === ADMIN_EMAIL.toLowerCase()) {
        return showAlert("Error", "Owner email cannot be registered as a streamer account. Please use Owner Login.");
      }

      const streamerSession = { 
        uid: 'user_' + Date.now(), 
        email: cleanEmail, 
        role: 'STREAMER', 
        name: cleanName 
      };
      setCurrentUser(streamerSession);
      ensureChatExists(cleanEmail, cleanName);

      showAlert("Account Created", "Account created successfully! Automatically logged in.");
      navigateTo('dashboard');
    };

    return (
      <div className="py-16 px-4 max-w-md mx-auto">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="text-center mb-6">
            <div className="inline-flex mb-3"><Logo size="lg"/></div>
            <h2 className="text-2xl font-black text-white">
              {authType === 'owner' ? 'Owner Admin Login' : (mode === 'login' ? 'Streamer Login' : 'Register Streamer Account')}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {authType === 'owner' ? 'Secure authentication for Agbota Segun (Owner).' : 'Manage your streamer orders and communications.'}
            </p>
          </div>

          <div className="flex bg-slate-950 p-1.5 rounded-2xl mb-6 border border-slate-800">
            <button 
              type="button" 
              onClick={() => { setAuthType('streamer'); setMode('login'); setEmail(''); setPassword(''); setName(''); }} 
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${authType === 'streamer' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Streamer Portal
            </button>
            <button 
              type="button" 
              onClick={() => { setAuthType('owner'); setEmail(''); setPassword(''); setName(''); }} 
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${authType === 'owner' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Owner Admin Portal
            </button>
          </div>

          {authType === 'owner' && (
            <form onSubmit={handleOwnerLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Owner Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                  placeholder="agbotasegun.outreach@gmail.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Owner Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                Authenticate Owner Session
              </button>
            </form>
          )}

          {authType === 'streamer' && mode === 'login' && (
            <form onSubmit={handleStreamerLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Streamer Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                  placeholder="name@example.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                Log In as Streamer
              </button>
              <div className="text-center pt-2">
                <button type="button" onClick={() => setMode('register')} className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
                  Don't have an account? Register here
                </button>
              </div>
            </form>
          )}

          {authType === 'streamer' && mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Your Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  required 
                  placeholder="John Doe"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Streamer Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                  placeholder="name@example.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password (min 6 chars)</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                Register & Log In Immediately
              </button>
              <div className="text-center pt-2">
                <button type="button" onClick={() => setMode('login')} className="text-slate-400 hover:text-white text-sm font-medium">
                  Already have an account? Log In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  };

  const Navigation = () => (
    <nav className="bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div onClick={() => navigateTo('home')}>
            <Logo />
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            <button onClick={() => navigateTo('home')} className={`text-sm font-medium transition-colors ${currentView === 'home' ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`}>Home</button>
            <button onClick={() => navigateTo('shop')} className={`text-sm font-medium transition-colors ${currentView === 'shop' || currentView === 'product' ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`}>Strategies & Bundles</button>
            <button onClick={() => {
              if (!currentUser) { navigateTo('auth'); }
              else { navigateTo('messages'); }
            }} className={`relative text-sm font-medium flex items-center gap-2 px-3.5 py-2 rounded-xl transition-colors ${currentView === 'messages' ? 'bg-indigo-900/40 text-indigo-400 border border-indigo-500/30' : 'text-slate-300 hover:bg-slate-900 hover:text-white'}`}>
              <MessageCircle size={18} /> Messages
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center border-2 border-slate-950 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {currentUser ? (
              <div className="flex items-center gap-4 pl-4 border-l border-slate-800">
                {isAdmin ? (
                  <button onClick={() => navigateTo('admin')} className={`text-sm font-medium flex items-center gap-2 px-3.5 py-2 rounded-xl transition-colors ${currentView === 'admin' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                    <Settings size={16} /> Admin Portal ({confirmedPaidOrderCount} Paid)
                  </button>
                ) : (
                  <button onClick={() => navigateTo('dashboard')} className={`text-sm font-medium flex items-center gap-2 px-3.5 py-2 rounded-xl transition-colors ${currentView === 'dashboard' ? 'bg-indigo-900/40 text-indigo-400 border border-indigo-500/30' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                    <User size={16} /> Dashboard
                  </button>
                )}
                <button onClick={() => { 
                  setCurrentUser(null); 
                  localStorage.removeItem('as_session_v7'); 
                  navigateTo('home'); 
                }} className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-900 transition-colors" title="Log Out">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 pl-4 border-l border-slate-800">
                <button onClick={() => navigateTo('auth')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                  Log In / Register
                </button>
              </div>
            )}
          </div>
          
          <div className="lg:hidden flex items-center">
            {currentUser && unreadCount > 0 && !mobileMenuOpen && <div className="mr-3 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-300 hover:text-white p-2 bg-slate-900 rounded-xl border border-slate-800">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-6 py-6 space-y-3 absolute w-full shadow-2xl z-50">
          <button onClick={() => navigateTo('home')} className="block w-full text-left px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 font-medium">Home</button>
          <button onClick={() => navigateTo('shop')} className="block w-full text-left px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 font-medium">Strategies & Bundles</button>
          <button onClick={() => {
            if (!currentUser) navigateTo('auth');
            else navigateTo('messages');
          }} className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 font-medium">
            Messages {unreadCount > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>}
          </button>
          {currentUser ? (
            <div className="pt-4 border-t border-slate-800 space-y-2">
              {isAdmin ? (
                <button onClick={() => navigateTo('admin')} className="block w-full text-left px-4 py-3 rounded-xl text-emerald-400 bg-slate-800 font-medium">Admin Portal</button>
              ) : (
                <button onClick={() => navigateTo('dashboard')} className="block w-full text-left px-4 py-3 rounded-xl text-indigo-400 bg-slate-800 font-medium">My Dashboard</button>
              )}
              <button onClick={() => { 
                setCurrentUser(null); 
                localStorage.removeItem('as_session_v7'); 
                setMobileMenuOpen(false); 
                navigateTo('home'); 
              }} className="block w-full text-left px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 font-medium">Log Out</button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-800">
              <button onClick={() => navigateTo('auth')} className="block w-full text-center py-3 bg-indigo-600 rounded-xl text-white font-semibold">Sign In / Register</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );

  const HomeView = () => (
    <div className="space-y-20 pb-20">
      <section className="relative overflow-hidden pt-20 pb-24 px-4 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 shadow-lg">
            <ShieldCheck size={14} className="text-indigo-400" /> Top Rated Creator Strategy Store by Agbota Segun
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Build a Smarter Growth Strategy for Your Channel
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            Practical marketing strategy blueprints designed to help creators and streamers understand their platforms, build better strategies, and work toward growth on their own. Learn the strategy. Implement it yourself.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigateTo('shop')} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-[0_0_25px_rgba(79,70,229,0.5)] flex items-center justify-center gap-3 text-base">
              Explore Strategies <ArrowRight size={18} />
            </button>
            <button onClick={() => {
              if (!currentUser) { navigateTo('auth'); return; }
              ensureChatExists(currentUser.email, currentUser.name);
              navigateTo('messages');
            }} className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-2xl border border-slate-700 transition-all flex items-center justify-center gap-3 text-base">
              <MessageCircle size={18} className="text-indigo-400" /> Message Agbota Segun
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Featured Growth Blueprints</h2>
            <p className="text-slate-400 text-sm mt-1">Platform-specific strategic roadmaps crafted for creators.</p>
          </div>
          <button onClick={() => navigateTo('shop')} className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold flex items-center gap-1">
            View All ({products.length}) <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.slice(0, 3).map(product => (
            <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-indigo-500/50 transition-all group shadow-xl">
              <div>
                <div className={`h-40 rounded-2xl bg-gradient-to-br ${product.coverBg} p-6 flex flex-col justify-between mb-6 shadow-inner relative overflow-hidden group-hover:scale-[1.02] transition-transform`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full w-max z-10">
                    {product.platform}
                  </span>
                  <div className="z-10">
                    <span className="text-2xl font-black text-white">${product.price}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{product.name}</h3>
                <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed mb-6">{product.description}</p>
              </div>
              <button onClick={() => navigateTo('product', product)} className="w-full bg-slate-950 hover:bg-indigo-600 text-white font-semibold py-3 rounded-xl border border-slate-800 transition-all text-sm flex items-center justify-center gap-2">
                View Strategy Details <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900/50 border-y border-slate-800/80 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">How It Works</h2>
            <p className="text-slate-400 text-sm">A secure, transparent step-by-step process from strategy selection to personal delivery.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Choose Strategy', desc: 'Select an individual platform blueprint or multi-platform bundle.' },
              { step: '02', title: 'Message Agbota', desc: 'Open Chat to review payment instructions (Bitcoin BTC or PayPal).' },
              { step: '03', title: 'Manual Review', desc: 'Send payment receipt screenshot in chat and press Payment Made.' },
              { step: '04', title: 'Receive Blueprint', desc: 'Get your professional strategy document delivered securely in chat once confirmed.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative">
                <span className="text-3xl font-black text-indigo-500/40 block mb-4">{item.step}</span>
                <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const ShopView = () => {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = products.filter(p => {
      const matchFilter = filter === 'all' || p.category === filter;
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.platform.toLowerCase().includes(searchTerm.toLowerCase());
      return matchFilter && matchSearch;
    });

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
          <div>
            <h1 className="text-3xl font-black text-white mb-2">Strategies & Multi-Platform Bundles</h1>
            <p className="text-slate-400 text-sm">Professional growth blueprints designed for creators and streamers.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search strategy..." 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 w-64"
              />
            </div>
            <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1">
              <button onClick={() => setFilter('all')} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>All</button>
              <button onClick={() => setFilter('individual')} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === 'individual' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>Individual</button>
              <button onClick={() => setFilter('bundle')} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === 'bundle' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>Bundles</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map(product => (
            <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-indigo-500/50 transition-all group shadow-xl">
              <div>
                <div className={`h-40 rounded-2xl bg-gradient-to-br ${product.coverBg} p-6 flex flex-col justify-between mb-6 shadow-inner relative overflow-hidden group-hover:scale-[1.02] transition-transform`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="flex justify-between items-center z-10">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full">
                      {product.platform}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-white/90 bg-black/30 px-2.5 py-0.5 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <div className="z-10">
                    <span className="text-2xl font-black text-white">${product.price}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{product.name}</h3>
                <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed mb-6">{product.description}</p>
              </div>
              <button onClick={() => navigateTo('product', product)} className="w-full bg-slate-950 hover:bg-indigo-600 text-white font-semibold py-3 rounded-xl border border-slate-800 transition-all text-sm flex items-center justify-center gap-2">
                View Strategy Details <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ProductView = () => {
    if (!selectedProduct) return <ShopView />;

    const handleBuyNow = () => {
      if (!currentUser || isAdmin) {
        showAlert("Streamer Authentication Required", "Please log in with a Streamer account before purchasing and messaging Agbota Segun.");
        navigateTo('auth');
        return;
      }
      const chatId = ensureChatExists(currentUser.email, currentUser.name);
      
      const msgId = 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2,7);
      const newMsg = {
        id: msgId,
        chatId: chatId,
        sender: currentUser.email,
        text: `Hello Agbota Segun, I am interested in purchasing [ ${selectedProduct.name} ] for $${selectedProduct.price}. Please provide Bitcoin BTC payment instructions.`,
        timestamp: Date.now(),
        type: 'text'
      };

      setMessages(prev => [...prev, newMsg]);
      setChats(prev => prev.map(c => c.id === chatId ? { ...c, lastMessage: `Inquiry: ${selectedProduct.name}`, timestamp: Date.now(), unreadAdmin: (c.unreadAdmin || 0) + 1 } : c));

      navigateTo('messages');
    };

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <button onClick={() => navigateTo('shop')} className="text-slate-400 hover:text-white text-sm font-semibold flex items-center gap-2">
          ← Back to Strategies
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className={`h-80 sm:h-96 rounded-3xl bg-gradient-to-br ${selectedProduct.coverBg} p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden border border-white/10`}>
            <div className="absolute inset-0 bg-black/15"></div>
            <span className="text-xs font-black uppercase tracking-widest bg-black/40 backdrop-blur-md text-white px-4 py-1.5 rounded-full w-max z-10">
              {selectedProduct.platform} Blueprint
            </span>
            <div className="z-10">
              <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">{selectedProduct.name}</h1>
              <span className="text-3xl font-black text-indigo-200">${selectedProduct.price} USD</span>
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
                <BookOpen size={14} /> Digital Strategy Blueprint
              </div>
              <h2 className="text-2xl font-black text-white mb-4">{selectedProduct.name}</h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">{selectedProduct.description}</p>
              
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bitcoin Payment Instructions:</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
                  BTC Address: <span className="text-emerald-400">{BTC_ADDRESS}</span>
                </p>
                <p className="text-xs text-slate-400">Send exact amount, then click "Payment Made" in Chat and attach your receipt.</p>
              </div>
            </div>

            <div className="space-y-3">
              <button onClick={handleBuyNow} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center justify-center gap-3 text-base">
                <ShoppingBag size={18} /> Buy Now / Order via Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StreamerDashboard = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950 px-3 py-1 rounded-full">Streamer Portal</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">Welcome, {currentUser?.name || currentUser?.email}</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your growth strategy orders, payment proofs, and direct chat with Agbota Segun.</p>
        </div>
        <button onClick={() => navigateTo('messages')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg flex items-center gap-2 text-sm">
          <MessageCircle size={16} /> Open Messages ({unreadCount})
        </button>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white">Your Orders</h2>
        {myOrders.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
            <ShoppingBag size={40} className="mx-auto text-slate-600" />
            <p className="text-slate-400 text-sm">You have not placed any orders yet.</p>
            <button onClick={() => navigateTo('shop')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm">
              Explore Strategy Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {myOrders.map(order => (
              <div key={order.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-white text-base">Order #{order.id}</span>
                    <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                      order.paymentStatus === 'Paid' || order.paymentStatus === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      order.paymentStatus === 'Awaiting Confirmation' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'
                    }`}>
                      Payment: {order.paymentStatus}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                      Status: {order.status}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm font-semibold">{order.productName} — ${order.price} USD</p>
                  <p className="text-slate-500 text-xs mt-1">Ordered on {new Date(order.timestamp).toLocaleDateString()}</p>
                </div>
                <button onClick={() => navigateTo('messages')} className="bg-slate-950 hover:bg-slate-800 text-white px-4 py-2 rounded-xl border border-slate-700 text-xs font-semibold flex items-center gap-2">
                  <MessageCircle size={14} className="text-indigo-400" /> View in Chat
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const ChatEngine = () => {
    if (!currentUser) {
      return (
        <div className="py-24 text-center max-w-md mx-auto px-4">
          <MessageCircle size={48} className="mx-auto text-indigo-500 mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-white mb-2">Authentication Required for Messages</h2>
          <p className="text-slate-400 text-sm mb-6">Please log in to communicate directly with Agbota Segun.</p>
          <button onClick={() => navigateTo('auth')} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg">
            Log In / Register
          </button>
        </div>
      );
    }

    const defaultChatId = isAdmin ? (chats[0]?.id || '') : ('chat_' + currentUser.email.toLowerCase().replace(/[^a-z0-9]/g, '_'));
    const [selectedChatId, setSelectedChatId] = useState(defaultChatId);
    const [inputText, setInputText] = useState('');
    const chatScrollRef = useRef(null);

    useEffect(() => {
      if (isAdmin && chats.length > 0 && !chats.find(c => c.id === selectedChatId)) {
        setSelectedChatId(chats[0].id);
      }
    }, [chats, isAdmin, selectedChatId]);

    useEffect(() => {
      if (!selectedChatId) return;
      setChats(prev => prev.map(c => {
        if (c.id === selectedChatId) {
          return isAdmin ? { ...c, unreadAdmin: 0 } : { ...c, unreadStreamer: 0 };
        }
        return c;
      }));
    }, [selectedChatId, isAdmin]);

    useEffect(() => {
      if (chatScrollRef.current) {
        chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
      }
    }, [messages]);

    const activeChat = chats.find(c => c.id === selectedChatId);
    const currentMessages = messages.filter(m => m.chatId === selectedChatId);

    const handleSendMessage = (e, customType = 'text', customPayload = null, fileName = '') => {
      if (e) e.preventDefault();
      if (!inputText.trim() && customType === 'text') return;
      if (!selectedChatId) return;

      const msgId = 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2,7);
      const textContent = customType === 'text' ? inputText : (customType === 'image' ? '[Payment Receipt / Image]' : customType === 'file' ? `[File: ${fileName}]` : '[Voice Message]');
      
      const newMsg = {
        id: msgId,
        chatId: selectedChatId,
        sender: currentUser.email,
        text: textContent,
        fileUrl: customPayload,
        fileName: fileName,
        timestamp: Date.now(),
        type: customType
      };

      setMessages(prev => [...prev, newMsg]);

      setChats(prev => prev.map(c => {
        if (c.id === selectedChatId) {
          return {
            ...c,
            lastMessage: textContent,
            timestamp: Date.now(),
            unreadAdmin: isAdmin ? 0 : ((c.unreadAdmin || 0) + 1),
            unreadStreamer: isAdmin ? ((c.unreadStreamer || 0) + 1) : 0
          };
        }
        return c;
      }));

      setInputText('');
    };

    const handleFileUpload = (e, type) => {
      const file = e.target.files[0];
      if (!file) return;
      compressMedia(file, (base64, mediaType, name) => {
        handleSendMessage(null, type === 'image' ? 'image' : 'file', base64, file.name);
      });
    };

    const handlePaymentMade = () => {
      if (!activeChat) return;
      const streamerEmail = activeChat.streamerEmail;

      setChats(prev => prev.map(c => c.id === selectedChatId ? { ...c, paymentStatus: 'Awaiting Confirmation' } : c));

      setOrders(prev => {
        const existing = prev.find(o => o.streamerEmail?.toLowerCase() === streamerEmail.toLowerCase());
        if (existing) {
          return prev.map(o => o.id === existing.id ? { ...o, paymentStatus: 'Awaiting Confirmation', status: 'Payment Review' } : o);
        } else {
          return [...prev, {
            id: Math.floor(1000 + Math.random() * 9000).toString(),
            streamerEmail: streamerEmail,
            productName: 'Growth Strategy Blueprint',
            price: 30,
            paymentStatus: 'Awaiting Confirmation',
            status: 'Payment Review',
            timestamp: Date.now(),
            chatId: selectedChatId
          }];
        }
      });

      const msgId = 'msg_' + Date.now();
      const newMsg = {
        id: msgId,
        chatId: selectedChatId,
        sender: currentUser.email,
        text: `🔔 [PAYMENT MADE DOORBELL]: Streamer has submitted payment notification. Please review receipt and confirm.`,
        timestamp: Date.now(),
        type: 'system'
      };
      setMessages(prev => [...prev, newMsg]);

      showAlert("Payment Submitted", "Your payment notification has been sent instantly to Agbota Segun.");
    };

    const handleConfirmPayment = () => {
      if (!isAdmin || !activeChat) return;
      const streamerEmail = activeChat.streamerEmail;

      setChats(prev => prev.map(c => c.id === selectedChatId ? { ...c, paymentStatus: 'Confirmed' } : c));

      setOrders(prev => prev.map(o => o.streamerEmail?.toLowerCase() === streamerEmail.toLowerCase() ? { ...o, paymentStatus: 'Confirmed', status: 'In Progress' } : o));

      const msgId = 'msg_' + Date.now();
      const newMsg = {
        id: msgId,
        chatId: selectedChatId,
        sender: ADMIN_EMAIL,
        text: `✅ PAYMENT CONFIRMED\nAgbota Segun has confirmed your payment! Your strategy blueprint is now In Progress and being delivered.`,
        timestamp: Date.now(),
        type: 'system'
      };
      setMessages(prev => [...prev, newMsg]);

      showAlert("Payment Confirmed", "Payment confirmed successfully in real-time.");
    };

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-80px)] flex flex-col">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex-grow flex overflow-hidden">
          {isAdmin && (
            <div className="w-80 border-r border-slate-800 flex flex-col bg-slate-950/60">
              <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-white text-sm">Customer Conversations</h3>
                  <p className="text-xs text-slate-400">Live storage sync</p>
                </div>
                {chats.some(c => c.paymentStatus === 'Awaiting Confirmation') && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">🔔 Payment</span>
                )}
              </div>
              <div className="overflow-y-auto flex-grow divide-y divide-slate-800/60">
                {chats.length === 0 ? (
                  <div className="p-6 text-center text-slate-500 text-xs">No active conversations yet.</div>
                ) : (
                  chats.map(chat => (
                    <div 
                      key={chat.id} 
                      onClick={() => setSelectedChatId(chat.id)}
                      className={`p-4 cursor-pointer transition-colors ${selectedChatId === chat.id ? 'bg-indigo-950/50 border-l-4 border-indigo-500' : 'hover:bg-slate-900/50'}`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-white text-xs truncate">{chat.streamerEmail}</span>
                        {chat.paymentStatus === 'Awaiting Confirmation' && <span className="bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">Awaiting</span>}
                      </div>
                      <p className="text-slate-400 text-xs truncate">{chat.lastMessage}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="flex-grow flex flex-col bg-slate-900">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
              <div>
                <h3 className="font-bold text-white text-sm">
                  {isAdmin ? `Chat with ${activeChat?.streamerEmail || 'Streamer'}` : 'Chat with Agbota Segun (Owner)'}
                </h3>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Real-time storage sync active
                </p>
              </div>

              {!isAdmin && (
                <div className="flex items-center gap-3">
                  <button onClick={handlePaymentMade} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg transition-all flex items-center gap-1.5">
                    <DollarSign size={14} /> Payment Made
                  </button>
                </div>
              )}
            </div>

            {isAdmin && activeChat?.paymentStatus === 'Awaiting Confirmation' && (
              <div className="bg-amber-950/80 border-b border-amber-500/40 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-in fade-in">
                <div>
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider mb-1">
                    <AlertCircle size={16} /> 🔔 Payment Awaiting Confirmation
                  </div>
                  <p className="text-white text-xs">Customer has submitted payment. Review receipt in chat below.</p>
                </div>
                <button onClick={handleConfirmPayment} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all">
                  [ CONFIRM PAYMENT ]
                </button>
              </div>
            )}

            {isAdmin && activeChat?.paymentStatus === 'Confirmed' && (
              <div className="bg-emerald-950/60 border-b border-emerald-500/30 px-4 py-2 flex items-center justify-between text-xs text-emerald-300">
                <span>✅ Payment Confirmed. Order in progress.</span>
              </div>
            )}

            {!isAdmin && activeChat?.paymentStatus === 'Awaiting Confirmation' && (
              <div className="bg-amber-950/60 border-b border-amber-500/30 px-4 py-3 text-xs text-amber-300">
                ⏳ PAYMENT AWAITING CONFIRMATION: Agbota Segun is reviewing your payment and receipt.
              </div>
            )}

            {!isAdmin && activeChat?.paymentStatus === 'Confirmed' && (
              <div className="bg-emerald-950/60 border-b border-emerald-500/30 px-4 py-3 text-xs text-emerald-300 font-semibold">
                ✅ PAYMENT CONFIRMED: Agbota Segun has confirmed your payment. Your strategy blueprint is ready!
              </div>
            )}

            <div ref={chatScrollRef} className="flex-grow overflow-y-auto p-6 space-y-4">
              {currentMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 space-y-2">
                  <MessageCircle size={32} className="text-slate-700" />
                  <p className="text-sm">No messages in this conversation yet. Send a message below.</p>
                </div>
              ) : (
                currentMessages.map(msg => {
                  const isMe = msg.sender === currentUser.email;
                  return (
                    <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-md sm:max-w-lg rounded-2xl px-4 py-3 text-sm ${
                        msg.type === 'system' ? 'bg-amber-950/80 border border-amber-500/40 text-amber-200 w-full font-medium' :
                        isMe ? 'bg-indigo-600 text-white rounded-br-none shadow-lg' : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                      }`}>
                        {msg.type === 'image' && msg.fileUrl ? (
                          <div className="space-y-2">
                            <img src={msg.fileUrl} alt="Receipt" className="rounded-xl max-h-64 object-cover border border-white/20" />
                            <p className="text-xs italic opacity-90">{msg.text}</p>
                          </div>
                        ) : msg.type === 'file' ? (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-xl border border-white/10">
                              <FileText size={20} className="text-indigo-400" />
                              <span className="text-xs font-semibold truncate text-white">{msg.fileName || 'Strategy Document'}</span>
                            </div>
                            <p className="text-xs">{msg.text}</p>
                          </div>
                        ) : (
                          <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        )}
                        <span className={`text-[10px] block mt-1 text-right ${isMe ? 'text-indigo-200' : 'text-slate-400'}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950/40">
              <form onSubmit={e => handleSendMessage(e, 'text')} className="flex items-center gap-2 sm:gap-3">
                <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-300 p-2.5 rounded-xl transition-colors" title="Upload Image / Receipt">
                  <ImageIcon size={18} />
                  <input type="file" accept="image/*" onChange={e => handleFileUpload(e, 'image')} className="hidden" />
                </label>
                <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-300 p-2.5 rounded-xl transition-colors" title="Upload File / Document">
                  <Paperclip size={18} />
                  <input type="file" onChange={e => handleFileUpload(e, 'file')} className="hidden" />
                </label>
                <input 
                  type="text" 
                  placeholder={isAdmin ? "Type reply to streamer..." : "Type your message or attach receipt..."} 
                  value={inputText} 
                  onChange={e => setInputText(e.target.value)}
                  className="flex-grow bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition-all shadow-lg flex items-center gap-2">
                  <SendHorizonal size={18} /> Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AdminPortal = () => {
    if (!isAdmin) {
      return (
        <div className="py-24 text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-2">Access Denied</h2>
          <p className="text-slate-400">Please authenticate with Owner credentials to view this portal.</p>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full">Owner Portal — Agbota Segun Verified</span>
            <h1 className="text-3xl font-black text-white mt-2">Admin Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">Review manual Bitcoin payments, manage orders, and communicate directly with streamers.</p>
          </div>
          <button onClick={() => navigateTo('messages')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg flex items-center gap-2 text-sm">
            <MessageCircle size={16} /> Messages Inbox ({unreadCount})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Orders</span>
            <h3 className="text-3xl font-black text-white mt-2">{orders.length}</h3>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Confirmed Paid Orders</span>
            <h3 className="text-3xl font-black text-emerald-400 mt-2">{confirmedPaidOrderCount}</h3>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Awaiting Confirmations</span>
            <h3 className="text-3xl font-black text-amber-400 mt-2">{orders.filter(o => o.paymentStatus === 'Awaiting Confirmation').length}</h3>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Active Conversations</span>
            <h3 className="text-slate-300 text-3xl font-black mt-2">{chats.length}</h3>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Manual Payment Reviews & Orders</h2>
          {orders.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-sm">No orders recorded yet.</div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-xs font-semibold uppercase tracking-wider bg-slate-950/40">
                      <th className="p-4">Order #</th>
                      <th className="p-4">Streamer</th>
                      <th className="p-4">Product</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-sm">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-slate-800/40">
                        <td className="p-4 font-bold text-white">#{order.id}</td>
                        <td className="p-4 text-slate-300">{order.streamerEmail}</td>
                        <td className="p-4 text-slate-300">{order.productName}</td>
                        <td className="p-4 text-white font-semibold">${order.price}</td>
                        <td className="p-4">
                          <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                            order.paymentStatus === 'Paid' || order.paymentStatus === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            order.paymentStatus === 'Awaiting Confirmation' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="p-4 flex items-center gap-2">
                          {order.paymentStatus !== 'Paid' && order.paymentStatus !== 'Confirmed' && (
                            <button onClick={() => {
                              setOrders(prev => prev.map(o => o.id === order.id ? { ...o, paymentStatus: 'Confirmed', status: 'In Progress' } : o));
                              if (order.chatId) {
                                setChats(prev => prev.map(c => c.id === order.chatId ? { ...c, paymentStatus: 'Confirmed' } : c));
                              }
                              showAlert("Payment Confirmed", `Order #${order.id} marked as Confirmed!`);
                            }} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow">
                              Confirm Payment
                            </button>
                          )}
                          <button onClick={() => navigateTo('messages')} className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-3 py-1.5 rounded-lg">
                            Open Chat
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 flex flex-col selection:bg-indigo-500/30">
      <Navigation />
      <main className="flex-grow">
        {currentView === 'home' && <HomeView />}
        {currentView === 'shop' && <ShopView />}
        {currentView === 'product' && <ProductView />}
        {currentView === 'dashboard' && (currentUser && !isAdmin ? <StreamerDashboard /> : <AuthScreen />)}
        {currentView === 'messages' && <ChatEngine />}
        {currentView === 'admin' && (isAdmin ? <AdminPortal /> : <AuthScreen />)}
        {currentView === 'auth' && <AuthScreen />}
      </main>

      {currentView !== 'messages' && (
        <footer className="bg-slate-950 border-t border-slate-900 py-16 px-4">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <Logo size="lg" className="mb-6"/>
            <p className="text-slate-400 mb-6 max-w-md text-sm">Professional creator & streamer marketing strategy store by Agbota Segun.</p>
            <div className="text-slate-600 text-xs font-semibold uppercase tracking-wider">
              &copy; {new Date().getFullYear()} Agbota Segun. All Rights Reserved.
            </div>
          </div>
        </footer>
      )}
      <Modal {...modalConfig} onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} />
    </div>
  );
}
