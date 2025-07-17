import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Home, User, Code, Briefcase, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState([]);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  // Auto-slide projects every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
    }, 3000);

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

  // Enhanced sparkle system with star shapes
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });

        if (Math.random() > 0.8) {
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
      image: "/assets/images/1.png",
      skills: ["React","Tailwind", "Firebase", "Node.js"],
      github: "https://github.com/pattapu-22/talentform-LearningBuddy.git",
      demo: "https://learningbuddy-c8654.web.app/"
    },
    {
      id: 2,
      title: "Collegoim - A AI chatbot",
      image: "/assets/images/2.png",
      skills: ["React","Tailwind CSS"],
      github: "https://github.com/pattapu-22/Colllegium_bot.git",
      //demo: "https://demo-link.com"
    },
    {
      id: 3,
      title: "ArgoNXT Next-gen agriculture",
      image: "/assets/images/3.jpg",
      skills: ["Flutter", "Firebase", "Dart"],
      github: "https://github.com/pattapu-22/AgroNXT.git",
      //demo: "https://demo-link.com"
    },
    {
      id: 4,
      title: "Modern Fitness",
      image: "/assets/images/4.jpg",
      skills: ["Flutter", "Firebase", "Dart", "MongoDB"],
      github: "https://github.com/pattapu-22/modern_fitness.git",
      //demo: "https://demo-link.com"
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

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900 overflow-hidden relative"
      style={{ fontFamily: 'Lucida Calligraphy, cursive' }}
    >
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent" style={{ fontFamily: 'Arial, sans-serif' }}>
              VENKATESWARAMMA
            </div>
            <div className="flex space-x-8">
              <a href="#home" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Home size={18} />
                <span>Home</span>
              </a>
              <a href="#about" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <User size={18} />
                <span>About</span>
              </a>
              <a href="#skills" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Code size={18} />
                <span>Skills</span>
              </a>
              <a href="#projects" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Briefcase size={18} />
                <span>Projects</span>
              </a>
              <a href="#contact" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <MessageCircle size={18} />
                <span>Contact Me</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Sparkle Effects */}
      {sparkles.map(sparkle => (
        <SparkleShape key={sparkle.id} sparkle={sparkle} />
      ))}

      {/* Cursor Glow Effect */}
      <div
        className="fixed pointer-events-none z-20 mix-blend-multiply"
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(0, 0, 0, 0.05) 0%, transparent 70%)',
          transition: 'all 0.1s ease-out'
        }}
      />
      {/* hero section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative px-6 pt-20">
          <div className="text-center max-w-6xl mx-auto">
            <div 
              className={`mb-12 transition-all duration-1000 ${
                visibleSections.has('name') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              id="name"
              data-animate
            >
              <p className="text-2xl md:text-3xl text-gray-600 mb-4">
                Hi, this is
              </p>

              <h1 className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent animate-pulse" style={{ fontFamily: 'Arial, sans-serif' }}>
                Pattapu
              </h1>
              <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-gray-700 via-gray-500 to-gray-400 bg-clip-text text-transparent" style={{ fontFamily: 'Arial, sans-serif' }}>
                Venkateswaramma
              </h2>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <a 
                  href="/assets/documents/Venkateswaramma.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
                >
                  View CV
                </a>

                <Link 
                      to="/gallery"
                      className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
                    >
                      Gallery
                    </Link>
              </div>
            </div>
          </div>
        </section>

      {/* about section */}
      <section id="about" className="py-32 px-6 bg-gradient-to-r from-gray-100 to-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 
            className={`text-6xl font-bold text-center mb-20 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent transition-all duration-1000 ${
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
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              I am a passionate Full Stack Developer with a keen interest in creating innovative web and mobile applications. 
              My journey in technology began with a curiosity about how things work, which led me to explore the vast world of programming.
            </p>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              With expertise in React, Flutter, Firebase, and modern web technologies, I love building user-friendly applications 
              that solve real-world problems. I believe in continuous learning and staying updated with the latest trends in technology.
            </p>
            <p className="text-xl text-gray-700 mb-12 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
              or sharing knowledge with the developer community. I'm always excited to take on new challenges and collaborate on innovative projects.
            </p>
            
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section id="skills" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 
            className={`text-6xl font-bold text-center mb-20 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent transition-all duration-1000 ${
              visibleSections.has('tech-skills') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            id="tech-skills"
            data-animate
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Technical Skills
          </h2>
          <div className="flex flex-wrap justify-center gap-16">
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
                <div className="text-8xl mb-4 hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Soft Skills Section */}
      <section className="py-32 px-6 bg-gradient-to-r from-gray-100 to-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 
            className={`text-6xl font-bold text-center mb-20 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent transition-all duration-1000 ${
              visibleSections.has('soft-skills') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            id="soft-skills"
            data-animate
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Soft Skills
          </h2>
          <div className="flex flex-wrap justify-center gap-20">
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
                <div className="text-8xl mb-4 hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 
            className={`text-6xl font-bold text-center mb-10 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent transition-all duration-1000 ${
              visibleSections.has('projects-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            id="projects-title"
            data-animate
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Featured Projects
          </h2>

          <div className="flex justify-center items-center">
            <div className="w-full max-w-4xl flex">
              {/* Project Display Area */}
              <div className="flex-1 relative overflow-hidden">
                <div className="relative h-96">
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentProjectIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full flex">
                        {/* Image */}
                        <div className="flex-shrink-0 w-2/3 p-4">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-contain rounded-lg"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-8 flex flex-col justify-center">
                          <h3
                            className="text-3xl font-bold mb-4 text-gray-900"
                            style={{ fontFamily: 'Arial, sans-serif' }}
                          >
                            {project.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          <div className="flex space-x-4">
                            <a
                              href={project.github}
                              className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                            >
                              <Github size={18} />
                              <span>Repo</span>
                            </a>
                            <a
                              href={project.demo}
                              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <ExternalLink size={18} />
                              <span>Demo</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vertical Project Indicator Dots */}
              <div className="ml-8 flex flex-col justify-center items-center space-y-4">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProjectIndex(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
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
      <section id="contact" className="py-12 px-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
  <div className="max-w-6xl mx-auto text-center space-y-6">
    <h2
      className={`text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent transition-all duration-1000 ${
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
      <p className="text-lg text-gray-300 mb-4">
        Connect with me through
      </p>

      <div className="flex justify-center items-center space-x-8">
        <a
          href="mailto:pattapu22@gmail.com"
          className="p-4 bg-gray-700 rounded-full hover:bg-gray-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
        >
          <Mail size={24} />
        </a>
        <a
          href="https://github.com/pattapu-22"
          className="p-4 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
        >
          <Github size={28} />
        </a>
        <a
          href="https://www.linkedin.com/in/pattapu22"
          className="p-4 bg-gray-700 rounded-full hover:bg-gray-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
        >
          <Linkedin size={28} />
        </a>
      </div>
    </div>

    <p className="text-sm text-gray-400 pt-4 border-t border-gray-700 mt-4">
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
      `}</style>
    </div>
  );
};

export default Portfolio;