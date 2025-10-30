import { motion } from "framer-motion";
import { projects } from "../assets/asset";

const Project = () => {
  // 🌟 Parent container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  // 🌟 Individual project card animation
  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // 🌟 Title animation (cool text reveal)
  const titleVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 10 },
    },
  };

  // 🌟 Image animation (zoom-in + fade)
  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Animated Section Title */}
        <motion.h1
          className="text-5xl font-extrabold text-center text-gray-800 mb-16"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.8,
              repeat: Infinity,
              repeatType: "mirror",
              duration: 1.5,
            }}
            
            className="text-gray-300"
          >
            
            My Projects
          </motion.span>
        </motion.h1>

        {/* Project Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
            >
              {/* Project Image with animation */}
              <motion.img
                src={project.projectImage}
                alt={project.title}
                className="w-full h-52 object-cover"
                variants={imageVariants}
                whileHover={{
                  scale: 1.08,
                  filter: "brightness(1.1)",
                }}
              />

              {/* Project Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h2>
                <p className="text-gray-700 mb-4 text-base">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* GitHub Link */}
                {project.link && (
                  <div className="flex justify-between items-center mt-3">
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-semibold hover:underline"
                      whileHover={{
                        color: "#2563eb",
                        scale: 1.05,
                      }}
                    >
                      🔗 GitHub Repo
                    </motion.a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Project;
