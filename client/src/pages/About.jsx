import React from "react";
import { motion } from "framer-motion";
import { profileImage, skills } from "../assets/asset.js";

const About = () => {
  // 🔹 Container animation (for staggered child animations)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  // 🔹 Item animation (fade & slide-up)
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-900 px-6 md:px-16 lg:px-32 flex flex-col md:flex-row items-center justify-center gap-12 py-16">
      
      {/* 🖼️ Profile Image Section */}
      <motion.div
        className="flex justify-center md:justify-end w-full md:w-1/2 relative"
        initial={{ opacity: 0, scale: 0.8, x: -50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.img
          src={profileImage}
          alt="profile"
          whileHover={{
            scale: 1.1,
            rotate: 2,
            boxShadow: "0px 0px 30px rgba(45, 212, 191, 0.5)",
          }}
          transition={{ type: "spring", stiffness: 200 }}
          className="rounded-full h-64 w-64 object-cover border-4 border-teal-400 shadow-xl"
        />

        {/* Soft teal glow ring behind the image */}
        <motion.div
          className="absolute -z-10 h-72 w-72 rounded-full bg-teal-400 blur-3xl opacity-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
      </motion.div>

      {/* 🧠 Text & Skills Section */}
      <motion.div
        className="text-white md:w-1/2 space-y-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold">
          Hello, I'm <span className="text-teal-300">Sanjay Pokhrel</span>
        </h1>

        <p className="leading-relaxed text-gray-300">
          I am a passionate web developer and UI/UX enthusiast with a knack for
          creating intuitive and beautiful digital experiences. I specialize in
          backend technologies and enjoy bringing ideas to life through clean,
          efficient code.
        </p>

        

        <h2 className="text-2xl font-semibold text-teal-200">
          Skills 
        </h2>

        {/* 💫 Animated Skills Grid */}
        <motion.div
          className="grid grid-cols-2 cursor-pointer sm:grid-cols-3  gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.1,
                rotate: 4,
                boxShadow: "0 0 30px rgba(45, 212, 191, 0.7)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="group flex flex-col items-center justify-center 
                         bg-gray-800 border border-gray-700 rounded-2xl 
                         hover:border-teal-400 transition-all duration-300 
                         p-5 text-center min-h-[120px] shadow-sm hover:shadow-lg"
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-12 h-12 mb-3 transition-transform duration-300 
                           group-hover:scale-110 group-hover:rotate-6"
              />
              <p className="text-gray-300 group-hover:text-teal-300 text-sm font-medium break-words">
                {skill.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
