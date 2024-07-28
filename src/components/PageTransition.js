import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ x: '100%'}}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 40,
      }}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;