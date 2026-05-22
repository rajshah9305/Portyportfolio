import React from 'react';
import { motion } from 'framer-motion';
import { useDecrypt } from '../hooks/useDecrypt';

export const DecryptText = ({ text, className = '' }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const decrypted = useDecrypt(text, isVisible);

  return (
    <motion.span
      onViewportEnter={() => setIsVisible(true)}
      className={className}
    >
      {decrypted}
    </motion.span>
  );
};
