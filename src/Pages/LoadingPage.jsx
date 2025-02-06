import React from "react";
import { ImBooks } from "react-icons/im";
import { motion } from "framer-motion";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <motion.div
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ImBooks className="text-lilac_dark text-7xl font-bold" />
      </motion.div>
      <p className="mt-4 text-lg font-bold">Loading, Please Wait...</p>
    </div>
  );
};

export default LoadingPage;
