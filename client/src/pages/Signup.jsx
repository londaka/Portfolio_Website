import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import axios from 'axios';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState(''); // New state for verification
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [step, setStep] = useState(1); // 1 for signup, 2 for verification
  const [userEmailToVerify, setUserEmailToVerify] = useState(''); // Store email for verification step

  const API_BASE_URL = 'http://localhost:8000/auth/user';

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } } // For AnimatePresence
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsSuccess(false);

    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, {
        name,
        email,
        password,
      });

      setMessage(response.data.message);
      setIsSuccess(true);
      setUserEmailToVerify(email); // Store email for the next step
      setStep(2); // Move to verification step
      // No need to clear form fields as they might be pre-filled
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response) {
        setMessage(error.response.data.message || 'Signup failed');
      } else if (error.request) {
        setMessage('No response from server. Please check your network.');
      } else {
        setMessage('Error setting up request. Please try again.');
      }
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitVerification = async (e) => {

    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsSuccess(false);

    try {
      const response = await axios.post(`${API_BASE_URL}/verifyemail`, {
        email: userEmailToVerify, // Use the email from the signup step
        code: verificationCode,
      });
      console.log('Axios verification response:', response.data);

      setMessage(response.data.message);
      setIsSuccess(true);
      // Optionally redirect to login or show success message for a longer time
      setVerificationCode(''); // Clear verification code input
      // Ideally, you'd navigate to the login page here
      console.log("Verification successful! Now redirect to login page.");
    } catch (error) {
      console.error('Verification error:', error);
      if (error.response) {
        setMessage(error.response.data.message || 'Verification failed');
      } else if (error.request) {
        setMessage('No response from server. Please check your network.');
      } else {
        setMessage('Error setting up request. Please try again.');
      }
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <AnimatePresence mode="wait"> {/* Use AnimatePresence for exit animations */}
        {step === 1 && (
          <motion.div
            key="signup-step-1"
            className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" // Apply exit animation
          >
            <motion.h2
              className="text-4xl font-extrabold text-gray-900 mb-8 text-center"
              variants={itemVariants}
            >
              Sign Up
            </motion.h2>

            <form className="space-y-6" onSubmit={handleSubmitSignup}>
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </motion.div>

              {message && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center text-sm font-semibold ${isSuccess ? 'text-green-600' : 'text-red-600'}`}
                >
                  {message}
                </motion.p>
              )}

              <motion.button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </motion.button>
            </form>

            <motion.p
              className="mt-8 text-center text-sm text-gray-600"
              variants={itemVariants}
            >
              Already have an account?{' '}
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out">
                Login here
              </a>
            </motion.p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="signup-step-2"
            className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" // Apply exit animation
          >
            <motion.h2
              className="text-4xl font-extrabold text-gray-900 mb-8 text-center"
              variants={itemVariants}
            >
              Verify Your Email
            </motion.h2>

            <motion.p variants={itemVariants} className="text-center text-gray-700 mb-6">
              A 6-digit code has been sent to <span className="font-semibold">{userEmailToVerify}</span>.
              Please enter it below to verify your account.
            </motion.p>

            <form className="space-y-6" onSubmit={handleSubmitVerification}>
              <motion.div variants={itemVariants}>
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  name="verificationCode"
                  placeholder="e.g., 123456"
                  maxLength="6"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-center text-xl font-mono tracking-widest focus:ring-blue-500 focus:border-blue-500 sm:text-xl"
                  required
                />
              </motion.div>

              {message && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center text-sm font-semibold ${isSuccess ? 'text-green-600' : 'text-red-600'}`}
                >
                  {message}
                </motion.p>
              )}

              <motion.button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify Account'}
              </motion.button>
            </form>
            <motion.p variants={itemVariants} className="mt-4 text-center text-sm text-gray-500">
              Didn't receive a code? <a href="#" className="text-blue-600 hover:text-blue-500">Resend Code</a>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignupForm;