import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import { 
  Code, 
  Send, 
  ArrowRight, 
  Github, 
  Twitter, 
  Linkedin, 
  ExternalLink,
  Zap,
  BarChart3,
  Database,
  LineChart,
  Brain,
  Activity,
  PieChart,
  Waves,
  X,
  Instagram
} from "lucide-react";

/**
 * InteractiveBackground Component
 * Creates a dynamic, mouse-following glow effect in the background.
 */
const InteractiveBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse movement across the window
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary accent glow */}
      <motion.div
        animate={{
          x: mousePos.x - 250,
          y: mousePos.y - 250,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 50, mass: 0.5 }}
        className="absolute w-[500px] h-[500px] bg-accent-primary/10 blur-[120px] rounded-full"
      />
      {/* Secondary accent glow */}
      <motion.div
        animate={{
          x: mousePos.x - 150,
          y: mousePos.y - 150,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 40, mass: 0.8 }}
        className="absolute w-[300px] h-[300px] bg-accent-secondary/5 blur-[100px] rounded-full"
      />
    </div>
  );
};

/**
 * Preloader Component
 * Displays a high-tech loading screen before the main content is ready.
 */
const Preloader = () => {
  const [progress, setProgress] = useState(0);

  // Simulate a loading progress from 0 to 100
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] bg-bg-primary flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Grid for Loader */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '30px 30px' }} />
      
      <div className="relative flex flex-col items-center">
        {/* Animated Data Nodes (Floating Rings) */}
        <div className="relative w-32 h-32 mb-12">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 1, 0.3],
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear"
              }}
              className="absolute inset-0 border border-accent-primary/30 rounded-full"
              style={{ padding: `${i * 10}px` }}
            />
          ))}
          
          {/* Central Animated Icon (Waves) */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center text-accent-primary"
          >
            <Waves size={48} className="neon-text-glow" />
          </motion.div>
        </div>

        {/* Loading Text & Progress Bar */}
        <div className="text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-accent-primary font-mono text-xs tracking-[0.3em] uppercase">
              Streaming Data
            </span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-accent-primary rounded-full"
            />
          </motion.div>
          
          <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-accent-primary neon-glow"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
            {/* Wave overlay effect on progress bar */}
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
          </div>
          
          <div className="mt-4 font-mono text-[10px] text-text-secondary tracking-widest uppercase">
            Optimizing Flow... {progress}%
          </div>
        </div>
      </div>

      {/* Floating Data Particles (Background Decoration) */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: 0 
          }}
          animate={{ 
            y: [null, Math.random() * -100],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: 2 + Math.random() * 3, 
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          className="absolute w-1 h-1 bg-accent-primary rounded-full blur-[1px]"
        />
      ))}
    </motion.div>
  );
};

/**
 * Navbar Component
 * Floating navigation bar with glassmorphism effect.
 * It changes background opacity based on scroll position.
 */
const Navbar = ({ onHireMeClick }: { onHireMeClick: () => void }) => {
  const { scrollY } = useScroll();
  // Change background opacity based on scroll position: transparent at top, semi-opaque after 100px
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(13, 13, 13, 0)", "rgba(13, 13, 13, 0.8)"]
  );

  return (
    <motion.nav 
      style={{ backgroundColor }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 transition-colors duration-300"
    >
      {/* Glassmorphism container for nav links */}
      <div className="glass px-8 py-3 rounded-full flex items-center gap-8">
        <a href="#home" className="text-sm font-medium hover:text-accent-primary transition-colors">Home</a>
        <a href="#services" className="text-sm font-medium hover:text-accent-primary transition-colors">Services</a>
        <a href="#portfolio" className="text-sm font-medium hover:text-accent-primary transition-colors">Portfolio</a>
        <a href="#contact" className="text-sm font-medium hover:text-accent-primary transition-colors">Contact</a>
        {/* Hire Me CTA button */}
        <button 
          onClick={onHireMeClick}
          className="bg-accent-primary text-bg-primary px-5 py-1.5 rounded-full text-sm font-bold hover:scale-105 transition-transform active:scale-95"
        >
          Hire Me
        </button>
      </div>
    </motion.nav>
  );
};

/**
 * ProfileCard Component
 * Displays personal info and social links with hover effects.
 */
const ProfileCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50, rotate: -5 }}
      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-card-bg p-8 rounded-3xl border border-white/5 relative overflow-hidden group"
    >
      {/* Decorative glow in the corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-accent-primary/20 transition-colors" />
      
      <div className="relative z-10">
        {/* Profile Image with hover animation */}
        <motion.div 
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="w-24 h-24 rounded-2xl overflow-hidden mb-6 border-2 border-accent-primary/20 cursor-pointer"
        >
          <img 
            src="https://picsum.photos/seed/designer/400/400" 
            alt="Profile" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <h2 className="text-2xl font-display font-bold mb-1">Neaya Chalise</h2>
        <p className="text-accent-primary text-sm font-medium mb-4 uppercase tracking-wider">Founder & Mentor</p>
        
        <p className="text-text-secondary text-sm leading-relaxed mb-8">
          Crafting digital experiences that blend innovation with human-centric design. Focused on building the future of web and mobile.
        </p>
        
        {/* Social Links */}
        <div className="flex gap-4">
          <motion.a whileHover={{ y: -3 }} href="#" className="p-2 rounded-lg bg-white/5 hover:bg-accent-primary hover:text-bg-primary transition-all">
            <Twitter size={18} />
          </motion.a>
          <motion.a whileHover={{ y: -3 }} href="#" className="p-2 rounded-lg bg-white/5 hover:bg-accent-primary hover:text-bg-primary transition-all">
            <Github size={18} />
          </motion.a>
          <motion.a whileHover={{ y: -3 }} href="#" className="p-2 rounded-lg bg-white/5 hover:bg-accent-primary hover:text-bg-primary transition-all">
            <Linkedin size={18} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * ServiceCard Component
 * Displays a service offered with an icon, title, and description.
 * Uses index for staggered entrance animation.
 */
const ServiceCard = ({ icon: Icon, title, description, accent = "primary", index }: { icon: any, title: string, description: string, accent?: "primary" | "secondary", index: number }) => {
  // Determine colors based on the accent prop
  const accentColor = accent === "primary" ? "text-accent-primary" : "text-accent-secondary";
  const hoverBg = accent === "primary" ? "hover:border-accent-primary/30" : "hover:border-accent-secondary/30";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`bg-card-bg p-8 rounded-3xl border border-white/5 transition-all ${hoverBg}`}
    >
      {/* Icon with accent color */}
      <div className={`${accentColor} mb-6`}>
        <Icon size={32} />
      </div>
      <h3 className="text-xl font-display font-bold mb-3">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed mb-6">
        {description}
      </p>
      {/* Learn More link with arrow animation */}
      <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:gap-4 transition-all">
        Learn More <ArrowRight size={16} className={accentColor} />
      </button>
    </motion.div>
  );
};

/**
 * ProjectCard Component
 * Displays a project with a background image and a hover overlay showing details.
 * Uses index for staggered entrance animation.
 */
interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  index: number;
  link?: string;
  imageAlign?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, category, image, index, link = "#", imageAlign = "object-center" }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className="group relative rounded-3xl overflow-hidden aspect-[4/3] cursor-pointer"
      >
        {/* Project Image with zoom effect on hover */}
        <img 
          src={image} 
          alt={title} 
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${imageAlign}`}
          referrerPolicy="no-referrer"
        />
        {/* Hover Overlay: Shows category and title with a gradient background */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
          <p className="text-accent-primary text-xs font-bold uppercase tracking-widest mb-2">{category}</p>
          <h3 className="text-2xl font-display font-bold flex items-center justify-between">
            {title}
            <ExternalLink size={20} />
          </h3>
        </div>
      </motion.div>
    </a>
  );
};

/**
 * SkillTag Component
 * A simple pill-shaped tag for displaying skills.
 */
const SkillTag = ({ name }: { name: string, key?: string }) => (
  <motion.span 
    whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 240, 255, 0.1)" }}
    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:border-accent-primary/50 transition-colors cursor-default"
  >
    {name}
  </motion.span>
);

/**
 * ProjectModal Component
 * A full-screen modal that displays an expanded list of projects.
 */
const ProjectModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const projects = [
    { title: "F1 Simulation", category: "monte carlo simulation/python", image: "/F1sim.png", link: "https://f1-simulation-bh98.onrender.com/" },
    { title: "Market Sentiment Analysis", category: "NLP / Deep Learning", image: "https://picsum.photos/seed/data2/800/600", link: "https://example.com/project/sentiment-analysis" },
    { title: "Supply Chain Optimizer", category: "Operations Research", image: "https://picsum.photos/seed/data3/800/600", link: "https://example.com/project/supply-chain" },
    { title: "Healthcare Insights Hub", category: "Data Visualization", image: "https://picsum.photos/seed/data4/800/600", link: "https://example.com/project/healthcare" },
    { title: "Fraud Detection System", category: "FinTech / ML", image: "https://picsum.photos/seed/data5/800/600", link: "https://example.com/project/fraud-detection" },
    { title: "Recommendation Engine", category: "E-commerce / AI", image: "https://picsum.photos/seed/data6/800/600", link: "https://example.com/project/recommendation" },
    { title: "Energy Grid Monitor", category: "IoT / Analytics", image: "https://picsum.photos/seed/data7/800/600", link: "https://example.com/project/energy-grid" },
    { title: "Genomic Data Pipeline", category: "BioTech / Engineering", image: "https://picsum.photos/seed/data8/800/600", link: "https://example.com/project/genomic-data" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12"
        >
          {/* Backdrop Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg-primary/95 backdrop-blur-xl"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-card-bg border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-8 md:p-12 border-b border-white/5 flex items-center justify-between sticky top-0 bg-card-bg z-10">
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight">Project Archive</h2>
                <p className="text-text-secondary mt-2">A deep dive into my technical explorations and solutions.</p>
              </div>
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-primary hover:bg-accent-primary hover:text-bg-primary transition-colors"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Scrollable Project Grid */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, i) => (
                  <ProjectCard 
                    key={i}
                    index={i}
                    title={project.title}
                    category={project.category}
                    image={project.image}
                    link={project.link}
                    imageAlign={project.title === "F1 Simulation" ? "object-left" : undefined}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * HireMeModal Component
 * A modal that displays contact options when "Hire Me" is clicked.
 */
const HireMeModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const contactOptions = [
    { name: "Gmail", icon: Send, value: "neayac40@gmail.com", href: "https://mail.google.com/mail/?view=cm&fs=1&to=neayac40@gmail.com", color: "text-red-400" },
    { name: "LinkedIn", icon: Linkedin, value: "linkedin.com/in/neaya-chalise", href: "https://www.linkedin.com/in/neaya-chalise-2279262a7/", color: "text-blue-400" },
    { name: "Twitter", icon: Twitter, value: "@neaya_chalise", href: "https://twitter.com/neaya_chalise", color: "text-cyan-400" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-6"
        >
          {/* Backdrop Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg-primary/90 backdrop-blur-md"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-card-bg border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl p-8 md:p-10"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-display font-bold uppercase tracking-tight">Hire Me</h2>
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-primary hover:bg-accent-primary hover:text-bg-primary transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>

            <div className="space-y-6">
              {contactOptions.map((option, i) => (
                <motion.a
                  key={option.name}
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-accent-primary/30 transition-all group"
                >
                  <div className={`w-14 h-14 rounded-xl bg-bg-primary flex items-center justify-center ${option.color} group-hover:scale-110 transition-transform`}>
                    <option.icon size={28} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-1">{option.name}</p>
                    <p className="text-lg font-medium text-text-primary">{option.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <p className="mt-10 text-center text-sm text-text-secondary">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Main App Component
 * Orchestrates the entire landing page experience.
 */
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHireMeModalOpen, setIsHireMeModalOpen] = useState(false);
  const containerRef = useRef(null);

  // Initial loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll progress tracking for the top bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroRef = useRef(null);

  return (
    <div ref={containerRef} className="min-h-screen selection:bg-accent-primary selection:text-bg-primary bg-bg-primary overflow-x-hidden">
      {/* Full-screen Project Modal */}
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Interactive Mouse-following Background */}
            <InteractiveBackground />
            
            {/* Top Sticky Scroll Progress Bar */}
            <motion.div
              className="fixed top-0 left-0 right-0 h-1 bg-accent-primary z-[60] origin-left"
              style={{ scaleX }}
            />

      {/* Navigation Bar */}
      <Navbar onHireMeClick={() => setIsHireMeModalOpen(true)} />
      
      {/* Hire Me Modal: Displays contact options when "Hire Me" is clicked */}
      <HireMeModal isOpen={isHireMeModalOpen} onClose={() => setIsHireMeModalOpen(false)} />
      
      {/* Hero Section: The first thing users see */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
        {/* Dynamic Background Grid & Glows */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-primary/20 blur-[120px] rounded-full" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent-secondary/10 blur-[150px] rounded-full" 
          />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent-primary text-xs font-bold uppercase tracking-[0.3em] mb-8">
              <Zap size={14} fill="currentColor" /> Available for new projects
            </div>
            
            {/* Main Hero Title */}
            <h1 className="text-7xl md:text-[10rem] font-display font-black leading-[0.8] uppercase tracking-tighter mb-12">
              <motion.span 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="block"
              >
                Data
              </motion.span>
              <motion.span 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="block text-accent-primary neon-text-glow"
              >
                Scientist
              </motion.span>
            </h1>

            {/* Hero Subtitle */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
            >
              Neaya Chalise — transforming complex data into actionable insights through machine learning and advanced analytics.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col md:flex-row items-center justify-center gap-6"
            >
              <motion.button 
                onClick={() => setIsHireMeModalOpen(true)}
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent-primary text-bg-primary px-12 py-6 rounded-2xl font-bold text-xl neon-glow flex items-center gap-3 shadow-2xl shadow-accent-primary/20"
              >
                Start a Project <Send size={24} />
              </motion.button>
              
              {/* Social Proof / Experience Badge */}
              <div className="flex items-center gap-6 px-8 py-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-primary overflow-hidden">
                      <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="Avatar" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-text-primary">10+ Forage Simulations</p>
                  <p className="text-[10px] text-text-secondary uppercase tracking-widest">Job Simulation Experience</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section: Detailed breakdown of expertise */}
      <section id="services" className="py-32 px-6 bg-bg-secondary relative overflow-hidden">
        {/* Background Text Marquee Effect: Large decorative text in the background */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full whitespace-nowrap opacity-[0.02] font-display font-black text-[20vw] pointer-events-none select-none">
          EXPERTISE • STRATEGY • DESIGN • CODE • MOTION • 
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-xl"
            >
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 uppercase tracking-tight">
                Turning Data <br /> Into <span className="text-accent-secondary">Impact</span>
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                Specializing in building predictive models, designing interactive dashboards, and architecting data pipelines that drive business growth.
              </p>
            </motion.div>
            {/* Skill Tags Cloud */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-3 max-w-md justify-end"
            >
              {["Python", "SQL", "PyTorch", "Tableau", "Power BI", "Scikit-Learn", "R", "Pandas"].map((skill) => (
                <SkillTag key={skill} name={skill} />
              ))}
            </motion.div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard 
              index={0}
              icon={Brain}
              title="Machine Learning"
              description="Developing custom predictive models and neural networks to solve complex business challenges."
              accent="primary"
            />
            <ServiceCard 
              index={1}
              icon={LineChart}
              title="Forecasting"
              description="Building predictive models to forecast trends and anticipate future outcomes with accuracy."
              accent="secondary"
            />
            <ServiceCard 
              index={2}
              icon={BarChart3}
              title="Visualization"
              description="Creating interactive dashboards that translate raw numbers into compelling stories."
              accent="secondary"
            />
            <ServiceCard 
              index={3}
              icon={Activity}
              title="Statistical Analysis"
              description="Applying rigorous statistical methods to validate hypotheses and identify trends."
              accent="primary"
            />
          </div>
        </div>
      </section>

      {/* Portfolio Section: Showcasing selected technical projects */}
      <section id="portfolio" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 uppercase tracking-tight">Selected Work</h2>
            <p className="text-text-secondary max-w-xl">
              A collection of projects where design meets technology to solve real-world problems.
            </p>
          </motion.div>
          {/* Trigger for the Project Archive Modal */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="border border-white/10 px-8 py-4 rounded-2xl font-bold hover:bg-white/5 transition-colors"
          >
            View All Projects
          </motion.button>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          <ProjectCard 
            index={0}
            title="F1 Simulation"
            category="monte carlo simulation/python"
            image="/F1sim.png"
            link="https://f1-simulation-bh98.onrender.com/"
            imageAlign="object-left"
          />
          <ProjectCard 
            index={1}
            title="Market Sentiment Analysis"
            category="NLP / Deep Learning"
            image="https://picsum.photos/seed/data2/800/600"
            link="https://example.com/project/sentiment-analysis"
          />
          <ProjectCard 
            index={2}
            title="Supply Chain Optimizer"
            category="Operations Research"
            image="https://picsum.photos/seed/data3/800/600"
            link="https://example.com/project/supply-chain"
          />
          <ProjectCard 
            index={3}
            title="Healthcare Insights Hub"
            category="Data Visualization / Tableau"
            image="https://picsum.photos/seed/data4/800/600"
            link="https://example.com/project/healthcare"
          />
        </div>
      </section>

      {/* Contact Section: Final call to action */}
      <section id="contact" className="py-40 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-accent-primary p-12 md:p-32 rounded-[4rem] text-bg-primary relative overflow-hidden group"
        >
          {/* Decorative background shapes for contact section */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <motion.div 
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute top-0 left-0 w-96 h-96 border-[20px] border-bg-primary rounded-full -ml-48 -mt-48" 
            />
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: [0, -90, 0] }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute bottom-0 right-0 w-[500px] h-[500px] border-[20px] border-bg-primary rounded-full -mr-64 -mb-64" 
            />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-display font-extrabold mb-10 uppercase tracking-tighter leading-[0.85]">
              Let's build <br /> something <span className="italic font-light">extraordinary</span>
            </h2>
            <p className="text-xl md:text-2xl font-medium mb-16 max-w-2xl mx-auto opacity-80">
              Ready to take your project to the next level? I'm currently accepting new projects and collaborations.
            </p>
            <motion.button 
              onClick={() => setIsHireMeModalOpen(true)}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-bg-primary text-text-primary px-12 py-6 rounded-3xl font-bold text-2xl flex items-center gap-4 mx-auto transition-all"
            >
              Get In Touch <ArrowRight size={32} />
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer: Social links and copyright */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-20">
            <div className="flex items-center gap-3">
              {/* Brand Logo with Profile Picture */}
              <img 
                src="/profile.png" 
                alt="Neaya Chalise" 
                className="w-12 h-12 rounded-2xl object-cover shadow-lg shadow-accent-primary/20"
              />
              <span className="font-display font-bold text-3xl tracking-tighter">NEAYA CHALISE</span>
            </div>
            
            {/* Social Links List */}
            <div className="flex flex-wrap gap-10 text-lg font-medium text-text-secondary">
              {[
                { name: "Twitter", url: "https://x.com/neaya_chalise" },
                { name: "LinkedIn", url: "https://www.linkedin.com/in/neaya-chalise-2279262a7/" },
                { name: "GitHub", url: "https://github.com/Lokherke" }
              ].map((social) => (
                <motion.a 
                  key={social.name}
                  whileHover={{ y: -5, color: "var(--color-accent-primary)" }}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                >
                  {social.name}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Bottom Footer Info */}
          <div className="flex flex-col items-center justify-center gap-6 pt-10 border-t border-white/5 text-sm text-text-secondary text-center">
            <p>© 2026 Neaya Chalise. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
