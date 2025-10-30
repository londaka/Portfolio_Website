import React from 'react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { codingImage } from '../assets/asset';

const Hero = () => {
  const navigate = useNavigate();

  // Animation variants
  const textVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const iconVariants = { hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 10, stiffness: 100 } } };
  const buttonVariants = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } };
  const imageVariants = { hidden: { opacity: 0, x: 100 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } } };
  const statsVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } };

  return (
    <div className="min-h-screen pt-16 mt-10 bg-gray-900 text-white p-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Section */}
        <motion.div className="space-y-6 text-center p-4 md:text-left" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h3 variants={textVariants} className="text-xl text-indigo-400">Hi, I'm</motion.h3>
          <motion.h2 variants={textVariants} className="text-5xl font-bold text-indigo-300">
            Sanjaya Pokhrel
          </motion.h2>

          {/* Animated Full Stack Developer */}
          <motion.h1
            className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 animate-gradient-x"
            style={{ backgroundSize: '200% 200%' }}
          >
            Full Stack Developer
          </motion.h1>

          {/* Social Icons */}
          <motion.div className="flex justify-center md:justify-start space-x-4 mt-4" variants={containerVariants} initial="hidden" animate="visible">
            <motion.a href="#" className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 transition-all"
              variants={iconVariants} whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
              <FaInstagram size={24} />
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/sanjaya-pokhrel-9906ba285/" className="p-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-400 hover:to-cyan-400 transition-all"
              variants={iconVariants} whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
              <FaLinkedin size={24} />
            </motion.a>
            <motion.a href="https://github.com/" className="p-3 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-600 hover:to-gray-400 transition-all"
              variants={iconVariants} whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
              <FaGithub size={24} />
            </motion.a>
          </motion.div>

          {/* Action Buttons */}
          <motion.div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8" variants={containerVariants} initial="hidden" animate="visible">
            <motion.button onClick={() => navigate('/contact')}
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-lg transition-all cursor-pointer"
              variants={buttonVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Hire Me
            </motion.button>
            <motion.a
              href='/sanjaya-web-dev cv.pdf'
              download='Sanjaya_Pokhrel_CV.pdf'
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-lg transition-all cursor-pointer"
              variants={buttonVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Download CV
            </motion.a>
          </motion.div>

          {/* Stats Box */}
          <motion.div className="grid w-80 shadow-md grid-cols-2 gap-4 text-center bg-gray-800 p-6 rounded-lg mt-8 mx-auto md:mx-0"
            variants={statsVariants} initial="hidden" animate="visible">
            <div>
              <p className="text-3xl font-bold text-indigo-400">1+</p>
              <p className="text-sm text-gray-300">Experience</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-400">15+</p>
              <p className="text-sm text-gray-300">Projects Done</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Section - Image */}
        <motion.div className="p-4 flex justify-center md:justify-end" variants={imageVariants} initial="hidden" animate="visible">
          <motion.img src={codingImage} alt="Coding"
            className="w-4/5 max-w-md rounded-full object-cover shadow-lg"
            whileHover={{ scale: 1.03 }}
          />
        </motion.div>
      </div>

      {/* Tailwind CSS custom animation */}
      <style>
        {`
          @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient-x {
            animation: gradient-x 5s ease infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Hero;
