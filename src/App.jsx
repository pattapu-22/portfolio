import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Home, User, Code, Briefcase, MessageCircle, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
const Portfolio = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState([]);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  // Auto-slide projects every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Enhanced sparkle system with star shapes (only on desktop)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current && window.innerWidth > 768) { // Only on desktop
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });

        if (Math.random() > 0.85) {
          const sparkleTypes = ['star', 'diamond', 'circle', 'cross'];
          const colors = ['#333333', '#666666', '#999999', '#cccccc', '#ffffff'];
          
          const newSparkle = {
            id: Date.now() + Math.random(),
            x: x + (Math.random() - 0.5) * 80,
            y: y + (Math.random() - 0.5) * 80,
            size: Math.random() * 16 + 8,
            opacity: 1,
            rotation: Math.random() * 360,
            color: colors[Math.floor(Math.random() * colors.length)],
            type: sparkleTypes[Math.floor(Math.random() * sparkleTypes.length)],
            velocity: {
              x: (Math.random() - 0.5) * 2,
              y: (Math.random() - 0.5) * 2
            }
          };
          setSparkles(prev => [...prev.slice(-25), newSparkle]);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Animate sparkles
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles(prev => 
        prev.map(sparkle => ({
          ...sparkle,
          opacity: sparkle.opacity - 0.015,
          x: sparkle.x + sparkle.velocity.x,
          y: sparkle.y + sparkle.velocity.y,
          rotation: sparkle.rotation + 3
        })).filter(sparkle => sparkle.opacity > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const SparkleShape = ({ sparkle }) => {
    const commonStyle = {
      position: 'absolute',
      left: sparkle.x,
      top: sparkle.y,
      transform: `rotate(${sparkle.rotation}deg)`,
      opacity: sparkle.opacity,
      pointerEvents: 'none'
    };

    switch (sparkle.type) {
      case 'star':
        return (
          <div style={commonStyle}>
            <svg width={sparkle.size} height={sparkle.size} viewBox="0 0 24 24">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={sparkle.color}
                stroke={sparkle.color}
                strokeWidth="0.5"
              />
            </svg>
          </div>
        );
      case 'diamond':
        return (
          <div style={commonStyle}>
            <div
              style={{
                width: sparkle.size,
                height: sparkle.size,
                background: sparkle.color,
                transform: 'rotate(45deg)',
                borderRadius: '2px'
              }}
            />
          </div>
        );
      case 'cross':
        return (
          <div style={commonStyle}>
            <div
              style={{
                width: sparkle.size,
                height: sparkle.size / 4,
                background: sparkle.color,
                position: 'relative'
              }}
            >
              <div
                style={{
                  width: sparkle.size / 4,
                  height: sparkle.size,
                  background: sparkle.color,
                  position: 'absolute',
                  left: sparkle.size * 0.375,
                  top: -sparkle.size * 0.375
                }}
              />
            </div>
          </div>
        );
      default:
        return (
          <div
            style={{
              ...commonStyle,
              width: sparkle.size,
              height: sparkle.size,
              background: sparkle.color,
              borderRadius: '50%',
              boxShadow: `0 0 ${sparkle.size}px ${sparkle.color}40`
            }}
          />
        );
    }
  };

  const projects = [
    {
      id: 1,
      title: "Learning Buddy",
      image: "assets/images/1.png",
      skills: ["React","Tailwind", "Firebase", "Node.js"],
      github: "https://github.com/pattapu-22/talentform-LearningBuddy.git",
      demo: "https://learningbuddy-c8654.web.app/"
    },
    {
      id: 2,
      title: "Collegoim - A AI chatbot",
      image: "assets/images/2.png",
      skills: ["React","Tailwind CSS"],
      github: "https://github.com/pattapu-22/Colllegium_bot.git",
    },
    {
      id: 3,
      title: "ArgoNXT Next-gen agriculture",
      image: "assets/images/3.jpg",
      skills: ["Flutter", "Firebase", "Dart"],
      github: "https://github.com/pattapu-22/AgroNXT.git",
    },
    {
      id: 4,
      title: "Modern Fitness",
      image: "assets/images/4.jpg",
      skills: ["Flutter", "Firebase", "Dart", "MongoDB"],
      github: "https://github.com/pattapu-22/modern_fitness.git",
    }
  ];

  const technicalSkills = [
    { name: "React", icon: "⚛️" },
    { name: "Flutter", icon: "📱" },
    { name: "Firebase", icon: "🔥" },
    { name: "JavaScript", icon: "🟨" },
    { name: "Tailwind", icon: "💨" }
  ];

  const softSkills = [
    { name: "Adaptability", icon: "🔄" },
    { name: "Communication", icon: "💬" },
    { name: "Problem Solving", icon: "🧩" },
    { name: "Leadership", icon: "👑" }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900 overflow-hidden relative"
      style={{ fontFamily: 'Lucida Calligraphy, cursive' }}
    >
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent" style={{ fontFamily: 'Arial, sans-serif' }}>
              VENKATESWARAMMA
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-6 xl:space-x-8">
              <button onClick={() => scrollToSection('home')} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Home size={18} />
                <span>Home</span>
              </button>
              <button onClick={() => scrollToSection('about')} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <User size={18} />
                <span>About</span>
              </button>
              <button onClick={() => scrollToSection('skills')} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Code size={18} />
                <span>Skills</span>
              </button>
              <button onClick={() => scrollToSection('projects')} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Briefcase size={18} />
                <span>Projects</span>
              </button>
              <button onClick={() => scrollToSection('contact')} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <MessageCircle size={18} />
                <span>Contact</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
              <div className="px-4 py-2 space-y-1">
                <button onClick={() => scrollToSection('home')} className="w-full flex items-center space-x-3 px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
                  <Home size={20} />
                  <span>Home</span>
                </button>
                <button onClick={() => scrollToSection('about')} className="w-full flex items-center space-x-3 px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
                  <User size={20} />
                  <span>About</span>
                </button>
                <button onClick={() => scrollToSection('skills')} className="w-full flex items-center space-x-3 px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
                  <Code size={20} />
                  <span>Skills</span>
                </button>
                <button onClick={() => scrollToSection('projects')} className="w-full flex items-center space-x-3 px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
                  <Briefcase size={20} />
                  <span>Projects</span>
                </button>
                <button onClick={() => scrollToSection('contact')} className="w-full flex items-center space-x-3 px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
                  <MessageCircle size={20} />
                  <span>Contact</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Sparkle Effects (Desktop only) */}
      {window.innerWidth > 768 && sparkles.map(sparkle => (
        <SparkleShape key={sparkle.id} sparkle={sparkle} />
      ))}

      {/* Cursor Glow Effect (Desktop only) */}
      {window.innerWidth > 768 && (
        <div
          className="fixed pointer-events-none z-20 mix-blend-multiply hidden md:block"
          style={{
            left: mousePosition.x - 200,
            top: mousePosition.y - 200,
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(0, 0, 0, 0.05) 0%, transparent 70%)',
            transition: 'all 0.1s ease-out'
          }}
        />
      )}

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 pt-20">
        <div className="text-center max-w-6xl mx-auto">
          <div 
            className={`mb-8 sm:mb-12 transition-all duration-1000 ${
              visibleSections.has('name') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            id="name"
            data-animate
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 mb-2 sm:mb-4">
              Hi, this is
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent animate-pulse leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
              PATTAPU
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-gray-700 via-gray-500 to-gray-400 bg-clip-text text-transparent leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
              VENKATESWARAMMA
            </h2>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <a 
                href="assets/documents/Venkateswaramma.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition text-center"
              >
                View CV
              </a>
              <Link 
                      to="/gallery"
                      className="w-full sm:w-auto inline-block bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition text-center"
                    >
                      Gallery
                    </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 pt-20">
        <div className="max-w-6xl mx-auto">
          <h2 
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-10 sm:mb-16 lg:mb-20 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent transition-all duration-1000 ${
              visibleSections.has('about-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            id="about-title"
            data-animate
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            About Me
          </h2>
          <div 
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              visibleSections.has('about-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              I am a passionate Full Stack Developer with a keen interest in creating innovative web and mobile applications. 
              My journey in technology began with a curiosity about how things work, which led me to explore the vast world of programming.
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              With expertise in React, Flutter, Firebase, and modern web technologies, I love building user-friendly applications 
              that solve real-world problems. I believe in continuous learning and staying updated with the latest trends in technology.
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-8 sm:mb-12 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
              or sharing knowledge with the developer community. I'm always excited to take on new challenges and collaborate on innovative projects.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section id="skills" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 pt-20">
        <div className="max-w-6xl mx-auto">
          <h2 
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-10 sm:mb-16 lg:mb-20 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent transition-all duration-1000 ${
              visibleSections.has('tech-skills') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            id="tech-skills"
            data-animate
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16">
            {technicalSkills.map((skill, index) => (
              <div
                key={skill.name}
                className={`flex flex-col items-center transform transition-all duration-1000 ${
                  visibleSections.has('tech-skills') 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-20'
                }`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-8xl mb-2 sm:mb-4 hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <h3 className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-800 text-center">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Soft Skills Section */}
      <section className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 pt-20">
        <div className="max-w-6xl mx-auto">
          <h2 
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-10 sm:mb-16 lg:mb-20 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent transition-all duration-1000 ${
              visibleSections.has('soft-skills') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            id="soft-skills"
            data-animate
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Soft Skills
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-20">
            {softSkills.map((skill, index) => (
              <div
                key={skill.name}
                className={`flex flex-col items-center transform transition-all duration-1000 ${
                  visibleSections.has('soft-skills') 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-20'
                }`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-8xl mb-2 sm:mb-4 hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <h3 className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-800 text-center">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 sm:mb-10 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent transition-all duration-1000 ${
              visibleSections.has('projects-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            id="projects-title"
            data-animate
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Featured Projects
          </h2>

          {/* Desktop/Tablet Layout */}
          <div className="hidden md:flex justify-center items-center">
            <div className="w-full max-w-5xl flex">
              {/* Project Display Area */}
              <div className="flex-1 relative overflow-hidden">
                <div className="relative h-80 lg:h-96">
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentProjectIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full flex">
                        {/* Image */}
                        <div className="flex-shrink-0 w-3/5 p-3 lg:p-4">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-contain rounded-lg"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-4 lg:p-8 flex flex-col justify-center">
                          <h3
                            className="text-xl lg:text-3xl font-bold mb-3 lg:mb-4 text-gray-900"
                            style={{ fontFamily: 'Arial, sans-serif' }}
                          >
                            {project.title}
                          </h3>
                          <div className="flex flex-wrap gap-1 lg:gap-2 mb-4 lg:mb-6">
                            {project.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 lg:px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-xs lg:text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          <div className="flex space-x-3 lg:space-x-4">
                            <a
                              href={project.github}
                              className="flex items-center space-x-1 lg:space-x-2 px-3 lg:px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm lg:text-base"
                            >
                              <Github size={16} />
                              <span>Repo</span>
                            </a>
                            {project.demo && (
                              <a
                                href={project.demo}
                                className="flex items-center space-x-1 lg:space-x-2 px-3 lg:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base"
                              >
                                <ExternalLink size={16} />
                                <span>Demo</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vertical Project Indicator Dots */}
              <div className="ml-6 lg:ml-8 flex flex-col justify-center items-center space-y-3 lg:space-y-4">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProjectIndex(index)}
                    className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full transition-all duration-300 ${
                      index === currentProjectIndex
                        ? 'bg-gray-900 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="relative">
              {/* Current Project Card */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-6">
                <div className="p-3">
                  <img
                    src={projects[currentProjectIndex].image}
                    alt={projects[currentProjectIndex].title}
                    className="w-full h-48 object-contain rounded-lg mb-4"
                  />
                </div>
                <div className="p-4">
                  <h3
                    className="text-xl font-bold mb-3 text-gray-900"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    {projects[currentProjectIndex].title}
                  </h3>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {projects[currentProjectIndex].skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-gray-100 rounded-full text-gray-700 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <a
                      href={projects[currentProjectIndex].github}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
                    >
                      <Github size={16} />
                      <span>Repo</span>
                    </a>
                    {projects[currentProjectIndex].demo && (
                      <a
                        href={projects[currentProjectIndex].demo}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        <ExternalLink size={16} />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Horizontal Project Indicator Dots */}
              <div className="flex justify-center items-center space-x-3">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProjectIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentProjectIndex
                        ? 'bg-gray-900 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto text-center space-y-4 sm:space-y-6">
          <h2
            className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent transition-all duration-1000 ${
              visibleSections.has('contact-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            id="contact-title"
            data-animate
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Let's Connect
          </h2>

          <div
            className={`transition-all duration-1000 delay-300 ${
              visibleSections.has('contact-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-base sm:text-lg text-gray-300 mb-4">
              Connect with me through
            </p>

            <div className="flex justify-center items-center space-x-6 sm:space-x-8">
              <a
                href="mailto:pattapu22@gmail.com"
                className="p-3 sm:p-4 bg-gray-700 rounded-full hover:bg-gray-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
              >
                <Mail size={20} className="sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://github.com/pattapu-22"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 sm:p-4 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
              >
                <Github size={22} className="sm:w-7 sm:h-7" />
              </a>
              <a
                href="https://www.linkedin.com/in/pattapu22"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 sm:p-4 bg-gray-700 rounded-full hover:bg-gray-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
              >
                <Linkedin size={22} className="sm:w-7 sm:h-7" />
              </a>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-400 pt-3 sm:pt-4 border-t border-gray-700 mt-3 sm:mt-4">
            © {new Date().getFullYear()} Pattapu. All rights reserved.
          </p>
        </div>
      </section>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }

        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        /* Smooth scrolling for all browsers */
        html {
          scroll-behavior: smooth;
        }

        /* Prevent horizontal scroll on mobile */
        body {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;