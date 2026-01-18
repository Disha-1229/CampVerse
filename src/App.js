import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, MessageSquare, Users, BookOpen, 
  Calendar, Coffee, Heart, Plus, User, LogOut, Search, ArrowRight, Trash2, Moon, Sun
} from 'lucide-react';

const CommentBox = ({ onSubmit, isDark }) => {
  const [text, setText] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onSubmit(text, anonymous);
        setText('');
        setAnonymous(false);
      }}
      className="space-y-4"
    >
      <textarea
        placeholder="Share your thoughts..."
        className={`w-full ${isDark ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400' : 'bg-zinc-50 border-zinc-100'} border p-4 rounded-xl resize-none outline-none`}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex items-center justify-between">
        <label className={`flex items-center gap-2 text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
          />
          Post anonymously
        </label>

        <button
          type="submit"
          className={`${isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'} px-6 py-3 rounded-xl font-bold transition-all`}
        >
          Post Comment
        </button>
      </div>
    </form>
  );
};

const AuthModal = ({ isOpen, onClose, onLoginSuccess, isDark }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', username: '', email: '', password: '', confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateAndSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.endsWith('@stu.xim.edu.in')) {
      setError('Only @stu.xim.edu.in emails are accepted.');
      return;
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    const userId = formData.email;
    const userData = { 
      id: userId,
      name: formData.firstName || formData.username, 
      email: formData.email 
    };
    
    onLoginSuccess(userData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        className={`${isDark ? 'bg-zinc-900 text-white' : 'bg-white'} w-full max-w-md rounded-[2rem] p-8 shadow-2xl relative`}
      >
        <button onClick={onClose} className={`absolute top-6 right-6 ${isDark ? 'text-zinc-500 hover:text-white' : 'text-zinc-400 hover:text-black'}`}>✕</button>
        <h2 className="text-3xl font-bold mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p className={`${isDark ? 'text-zinc-400' : 'text-zinc-500'} mb-6 text-sm`}>Join the CampVerse community</p>

        <form onSubmit={validateAndSubmit} className="space-y-4">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="firstName" placeholder="First Name" required className={`${isDark ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500' : 'bg-zinc-50 border-zinc-100'} border p-3 rounded-xl w-full outline-none focus:ring-2 focus:ring-black/5`} onChange={handleInputChange} />
              <input type="text" name="lastName" placeholder="Last Name" required className={`${isDark ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500' : 'bg-zinc-50 border-zinc-100'} border p-3 rounded-xl w-full outline-none focus:ring-2 focus:ring-black/5`} onChange={handleInputChange} />
            </div>
          )}
          <input type="text" name="username" placeholder="Full Name" required className={`${isDark ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500' : 'bg-zinc-50 border-zinc-100'} border p-3 rounded-xl w-full outline-none focus:ring-2 focus:ring-black/5`} onChange={handleInputChange} />
          <input type="email" name="email" placeholder="College Email (@stu.xim.edu.in)" required className={`${isDark ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500' : 'bg-zinc-50 border-zinc-100'} border p-3 rounded-xl w-full outline-none focus:ring-2 focus:ring-black/5`} onChange={handleInputChange} />
          <input type="password" name="password" placeholder="Password" required className={`${isDark ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500' : 'bg-zinc-50 border-zinc-100'} border p-3 rounded-xl w-full outline-none focus:ring-2 focus:ring-black/5`} onChange={handleInputChange} />
          {!isLogin && (
            <input type="password" name="confirmPassword" placeholder="Re-enter Password" required className={`${isDark ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500' : 'bg-zinc-50 border-zinc-100'} border p-3 rounded-xl w-full outline-none focus:ring-2 focus:ring-black/5`} onChange={handleInputChange} />
          )}

          {error && <p className="text-red-500 text-xs font-medium">{error}</p>}

          <button type="submit" className={`${isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'} w-full py-4 rounded-xl font-bold transition-all shadow-lg shadow-black/10`}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className={`mt-6 text-center text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className={`${isDark ? 'text-white' : 'text-black'} font-bold underline`}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

const Navbar = ({ user, setView, onLogout, onOpenAuth, isDark, toggleTheme }) => (
  <nav className={`fixed top-0 w-full z-50 ${isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white/80 border-zinc-100'} backdrop-blur-md border-b px-6 py-4 flex justify-between items-center`}>
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
      <div className={`${isDark ? 'bg-white' : 'bg-black'} p-1.5 rounded-lg`}>
        <Bell className={`${isDark ? 'text-black' : 'text-white'} w-5 h-5`} />
      </div>
      <span className={`font-bold text-xl tracking-tight ${isDark ? 'text-white' : ''}`}>CampVerse</span>
    </div>
    <div className="flex items-center gap-6">
      <button 
        onClick={toggleTheme}
        className={`p-2 rounded-lg ${isDark ? 'bg-zinc-800 text-yellow-400 hover:bg-zinc-700' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'} transition-all`}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      {user ? (
        <>
          <button onClick={() => setView('feed')} className={`text-sm font-medium ${isDark ? 'hover:text-zinc-300' : 'hover:text-zinc-500'} transition-colors`}>Announcements</button>
          <button onClick={() => setView('profile')} className={`flex items-center gap-2 text-sm font-medium ${isDark ? 'border-zinc-700 hover:bg-zinc-800' : 'border-zinc-200 hover:bg-zinc-50'} border px-3 py-1.5 rounded-full transition-all`}>
            <User size={16} /> Profile
          </button>
          <button onClick={onLogout} className={`${isDark ? 'text-zinc-400 hover:text-red-400' : 'text-zinc-400 hover:text-red-500'} transition-colors`}>
            <LogOut size={18} />
          </button>
        </>
      ) : (
        <div className="flex gap-4 items-center">
           <button onClick={onOpenAuth} className="text-sm font-medium">Login</button>
           <button onClick={onOpenAuth} className={`${isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'} px-5 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-black/10`}>Sign Up</button>
        </div>
      )}
    </div>
  </nav>
);

const CreatePostModal = ({ isOpen, onClose, onPost, isDark }) => {
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    category: 'General',
    subcategory: 'All Levels',
    anonymous: false
  });

  const isDisabled = !postData.title || !postData.content;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDisabled) return;

    onPost(postData);

    onClose();
    setPostData({
      title: '',
      content: '',
      category: 'Academics',
      subcategory: 'All Levels',
      anonymous: false
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`${isDark ? 'bg-zinc-900 text-white' : 'bg-white'} w-full max-w-xl rounded-[2rem] p-8 shadow-2xl`}
      >
        <h2 className="text-2xl font-bold mb-8">Create Announcement</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              placeholder="What's this about?"
              className={`w-full ${isDark ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500' : 'bg-zinc-50 border-zinc-200'} border p-4 rounded-xl outline-none`}
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              placeholder="Share the details..."
              className={`w-full ${isDark ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500' : 'bg-zinc-50 border-zinc-200'} border p-4 rounded-xl h-32 resize-none outline-none`}
              value={postData.content}
              onChange={(e) =>
                setPostData({ ...postData, content: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                className={`w-full ${isDark ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-200'} border p-4 rounded-xl outline-none`}
                value={postData.category}
                onChange={(e) =>
                  setPostData({ ...postData, category: e.target.value })
                }
              >
                <option>Academics</option>
                <option>Events</option>
                <option>ChillHub</option>
                <option>Confession</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Subcategory
              </label>
              <select
                className={`w-full ${isDark ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-200'} border p-4 rounded-xl outline-none`}
                value={postData.subcategory}
                onChange={(e) =>
                  setPostData({ ...postData, subcategory: e.target.value })
                }
              >
                <option>All Levels</option>
                <option>Undergraduate</option>
                <option>Postgraduate</option>
                <option>PhD</option>
              </select>
            </div>
          </div>

          <div className={`flex items-center justify-between ${isDark ? 'bg-zinc-800' : 'bg-zinc-50'} p-4 rounded-xl`}>
            <div>
              <p className="font-medium">Post Anonymously</p>
              <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Your name won't be shown
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setPostData({ ...postData, anonymous: !postData.anonymous })
              }
              className={`w-12 h-6 rounded-full relative transition ${
                postData.anonymous ? (isDark ? 'bg-white' : 'bg-black') : 'bg-zinc-300'
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 ${isDark ? 'bg-zinc-900' : 'bg-white'} rounded-full transition ${
                  postData.anonymous ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 font-bold text-zinc-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isDisabled}
              className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 ${
                isDisabled
                  ? 'bg-zinc-400 text-white cursor-not-allowed'
                  : isDark ? 'bg-white text-black' : 'bg-black text-white'
              }`}
            >
              Post Announcement
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('landing'); 
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [isDark, setIsDark] = useState(false);

  const categories = [
    { name: 'All', icon: <Users size={16} /> },
    { name: 'Academics', icon: <BookOpen size={16} /> },
    { name: 'Events', icon: <Calendar size={16} /> },
    { name: 'ChillHub', icon: <Coffee size={16} /> },
    { name: 'Confession', icon: <Heart size={16} /> },
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem('campverse_user');
    const savedAnnouncements = localStorage.getItem('campverse_announcements');
    const savedTheme = localStorage.getItem('campverse_theme');
    
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setView('feed');
    }
    
    if (savedAnnouncements) {
      setAnnouncements(JSON.parse(savedAnnouncements));
    }

    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    if (announcements.length > 0) {
      localStorage.setItem('campverse_announcements', JSON.stringify(announcements));
    }
  }, [announcements]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('campverse_theme', newTheme ? 'dark' : 'light');
  };

  const handlePost = (data) => {
    const newEntry = { 
      ...data, 
      id: Date.now(), 
      authorId: data.anonymous ? 'anonymous' : user?.id,
      authorName: data.anonymous ? 'Anonymous' : (user?.name || 'User'), 
      time: 'Just now', 
      comments: [] 
    };
    setAnnouncements([newEntry, ...announcements]);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('campverse_user', JSON.stringify(userData));
    setIsAuthOpen(false);
    setView('feed');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('campverse_user');
    setView('landing');
    setSelectedPost(null);
  };

  const deletePost = (id) => {
    const updatedAnnouncements = announcements.filter(p => p.id !== id);
    setAnnouncements(updatedAnnouncements);
    localStorage.setItem('campverse_announcements', JSON.stringify(updatedAnnouncements));
    if (selectedPost?.id === id) setSelectedPost(null);
  };

  const addComment = (postId, text, anonymous) => {
    const updatedAnnouncements = announcements.map(p => {
      if (p.id === postId) {
        const newComment = {
          id: Date.now(),
          text,
          authorId: anonymous ? 'anonymous' : user?.id,
          authorName: anonymous ? 'Anonymous' : (user?.name || 'User'),
          time: 'Just now'
        };
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    });
    setAnnouncements(updatedAnnouncements);
    
    if (selectedPost?.id === postId) {
      const updated = updatedAnnouncements.find(p => p.id === postId);
      setSelectedPost(updated);
    }
  };

  const deleteComment = (postId, commentId) => {
    const updatedAnnouncements = announcements.map(p => {
      if (p.id === postId) {
        return { ...p, comments: p.comments.filter(c => c.id !== commentId) };
      }
      return p;
    });
    setAnnouncements(updatedAnnouncements);
    
    if (selectedPost?.id === postId) {
      const updated = updatedAnnouncements.find(p => p.id === postId);
      setSelectedPost(updated);
    }
  };
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-zinc-950 text-white' : 'bg-[#fafafa] text-[#0a0a0a]'} transition-colors duration-300`}>
      <Navbar 
        user={user} 
        setView={setView} 
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthOpen(true)}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
        isDark={isDark}
      />

      <CreatePostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onPost={handlePost}
        isDark={isDark}
      />

      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="pt-32 pb-20 px-6 max-w-6xl mx-auto text-center"
          >
            <div className={`inline-block px-4 py-1.5 mb-6 rounded-full ${isDark ? 'border-zinc-700 bg-zinc-900' : 'border-zinc-200 bg-white'} border text-xs font-medium shadow-sm`}>
              ✨ Your campus, connected
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 leading-tight">
              Campus <br />
              <span className={isDark ? 'text-zinc-500' : 'text-zinc-400'}>Announcements</span> <br />
              Reimagined
            </h1>
            <p className={`${isDark ? 'text-zinc-400' : 'text-zinc-500'} text-lg max-w-xl mx-auto mb-10 leading-relaxed`}>
              The modern platform for campus announcements, events, and interactions. 
              Stay informed, share ideas, and connect with your community.
            </p>
            <div className="flex justify-center gap-4 mb-24">
              <button onClick={() => setIsAuthOpen(true)} className={`${isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'} px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-xl shadow-black/10`}>
                Get Started <ArrowRight size={18} />
              </button>
            </div>

            <div className={`${isDark ? 'bg-zinc-900' : 'bg-black'} text-white rounded-[3rem] p-12 text-left shadow-2xl`}>
               <h2 className="text-4xl font-bold mb-4">Everything you need</h2>
               <p className="text-zinc-400 mb-12">A complete platform designed for campus life</p>
               <div className="grid md:grid-cols-3 gap-8">
                  <motion.div whileHover={{ y: -5 }} className={`${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-900 border-zinc-800'} p-8 rounded-2xl border hover:border-zinc-700 transition-all`}>
                    <Bell className="mb-4 opacity-50" />
                    <h3 className="text-xl font-bold mb-2">Announcements</h3>
                    <p className="text-zinc-500 text-sm">Share and discover updates across academics, events, and more.</p>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} className={`${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-900 border-zinc-800'} p-8 rounded-2xl border hover:border-zinc-700 transition-all`}>
                    <MessageSquare className="mb-4 opacity-50" />
                    <h3 className="text-xl font-bold mb-2">Discussions</h3>
                    <p className="text-zinc-500 text-sm">Engage in meaningful conversations with threaded comments.</p>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} className={`${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-900 border-zinc-800'} p-8 rounded-2xl border hover:border-zinc-700 transition-all`}>
                    <Users className="mb-4 opacity-50" />
                    <h3 className="text-xl font-bold mb-2">Community</h3>
                    <p className="text-zinc-500 text-sm">Connect with students, faculty, and campus organizations.</p>
                  </motion.div>
               </div>
            </div>
          </motion.div>
        )}

        {view === 'feed' && !selectedPost && (
          <motion.div
            key="feed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto px-6 pt-24 pb-12"
          >
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Announcements</h2>
                <p className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>Discover what's happening on campus</p>
              </div>

              <button
                onClick={() => setIsPostModalOpen(true)}
                className={`${isDark ? 'bg-white text-black' : 'bg-black text-white'} p-3 rounded-xl hover:scale-110 transition-transform active:scale-95 shadow-lg shadow-black/20`}
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setFilter(cat.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    filter === cat.name
                      ? isDark ? 'bg-white text-black shadow-md' : 'bg-black text-white shadow-md'
                      : isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700' : 'bg-white border border-zinc-100 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            <div className="relative mb-8">
              <Search
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}
                size={18}
              />
              <input
                type="text"
                placeholder="Search announcements..."
                className={`w-full ${isDark ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500' : 'bg-white border-zinc-100'} border py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/5 transition-all shadow-sm`}
              />
            </div>

            <div className="space-y-4">
              {announcements
                .filter(
                  (item) => filter === 'All' || item.category === filter
                )
                .map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${isDark ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700' : 'bg-white border-zinc-100 hover:border-zinc-300'} border p-6 rounded-2xl cursor-pointer transition-all shadow-sm hover:shadow-md`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div
                        className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase ${
                          item.category === 'Confession'
                            ? 'bg-pink-100 text-pink-600'
                            : isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-600'
                        }`}
                      >
                        {item.category}
                      </div>
                      
                      {user && item.authorId === user.id && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deletePost(item.id);
                          }}
                          className={`${isDark ? 'text-zinc-500 hover:text-red-400' : 'text-zinc-400 hover:text-red-500'} transition-colors`}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    <div onClick={() => setSelectedPost(item)}>
                      <h3 className="text-xl font-bold mb-2 tracking-tight">
                        {item.title}</h3>

                  <p className={`${isDark ? 'text-zinc-400' : 'text-zinc-500'} text-sm mb-4 line-clamp-2 leading-relaxed`}>
                    {item.content}
                  </p>

                  <div className={`flex justify-between items-center text-xs ${isDark ? 'text-zinc-500 border-zinc-800' : 'text-zinc-400 border-zinc-50'} font-medium pt-4 border-t`}>
                    <span className={`flex items-center gap-2 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      <div className={`w-5 h-5 ${isDark ? 'bg-zinc-800' : 'bg-zinc-100'} rounded-full`} />
                      {item.authorName} • {item.time}
                    </span>

                    <div
                      className={`flex items-center gap-1 ${isDark ? 'hover:text-white' : 'hover:text-black'} transition-colors`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPost(item);
                      }}
                    >
                      <MessageSquare size={14} />
                      {item.comments.length}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>
    )}

    {view === 'feed' && selectedPost && (
      <motion.div
        key="post-detail"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto px-6 pt-24 pb-12"
      >
        <button
          onClick={() => setSelectedPost(null)}
          className={`text-sm ${isDark ? 'text-zinc-500 hover:text-white' : 'text-zinc-400 hover:text-black'} mb-6`}
        >
          ← Back to announcements
        </button>

        <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100'} border rounded-2xl p-8 mb-8`}>
          <div className="flex justify-between items-start mb-4">
            <span className={`text-xs font-bold uppercase ${isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100'} px-2 py-1 rounded`}>
              {selectedPost.category}
            </span>
            
            {user && selectedPost.authorId === user.id && (
              <button
                onClick={() => deletePost(selectedPost.id)}
                className={`${isDark ? 'text-zinc-500 hover:text-red-400' : 'text-zinc-400 hover:text-red-500'} transition-colors`}
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>

          <h2 className="text-3xl font-extrabold mt-4 mb-2">
            {selectedPost.title}
          </h2>

          <p className={`text-sm ${isDark ? 'text-zinc-500' : 'text-zinc-400'} mb-6`}>
            {selectedPost.authorName} • {selectedPost.time}
          </p>

          <p className={`${isDark ? 'text-zinc-300' : 'text-zinc-600'} leading-relaxed`}>
            {selectedPost.content}
          </p>
        </div>

        <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100'} border rounded-2xl p-6`}>
          <h3 className="font-bold mb-4">
            Comments ({selectedPost.comments.length})
          </h3>

          <div className="space-y-4 mb-6">
            {selectedPost.comments.map((c) => (
              <div key={c.id} className={`${isDark ? 'bg-zinc-800' : 'bg-zinc-50'} p-4 rounded-xl`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs font-bold mb-1">{c.authorName}</p>
                    <p className={`text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>{c.time}</p>
                  </div>
                  
                  {user && c.authorId === user.id && (
                    <button
                      onClick={() => deleteComment(selectedPost.id, c.id)}
                      className={`${isDark ? 'text-zinc-500 hover:text-red-400' : 'text-zinc-400 hover:text-red-500'} transition-colors`}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <p className={`text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>{c.text}</p>
              </div>
            ))}
          </div>

          <CommentBox
            onSubmit={(text, anonymous) =>
              addComment(selectedPost.id, text, anonymous)
            }
            isDark={isDark}
          />
        </div>
      </motion.div>
    )}

    {view === 'profile' && (
      <motion.div 
        key="profile"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto px-6 pt-32"
      >
         <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100'} border rounded-[2.5rem] p-8 mb-8 relative overflow-hidden shadow-xl ${isDark ? 'shadow-zinc-900/50' : 'shadow-zinc-200/50'}`}>
            <div className={`absolute top-0 left-0 w-full h-32 ${isDark ? 'bg-zinc-800' : 'bg-zinc-950'}`} />
            <div className="relative pt-16 flex flex-col items-center">
              <div className={`w-28 h-28 rounded-full ${isDark ? 'bg-zinc-700' : 'bg-zinc-200'} border-4 ${isDark ? 'border-zinc-900' : 'border-white'} mb-4 shadow-md`} />
              <h2 className="text-3xl font-bold tracking-tight">{user?.name}</h2>
              <p className={`${isDark ? 'text-zinc-400' : 'text-zinc-500'} mb-8`}>{user?.email}</p>
              <div className={`flex gap-12 ${isDark ? 'border-zinc-800' : 'border-zinc-100'} border-t w-full justify-center pt-8`}>
                <div className="text-center">
                  <span className="block text-xl font-bold">
                    {announcements.filter(p => p.authorId === user?.id).length}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-400'} uppercase font-bold tracking-tighter`}>Posts</span>
                </div>
                <div className="text-center">
                  <span className="block text-xl font-bold">Jan 2026</span>
                  <span className={`text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-400'} uppercase font-bold tracking-tighter`}>Member Since</span>
                </div>
              </div>
            </div>
         </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>
);
}