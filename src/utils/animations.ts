
import { useEffect, useState } from "react";

export const useFadeIn = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 10);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";
};

export const useStaggeredFadeIn = (index: number, delay = 50) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, delay * index + 10);
    
    return () => clearTimeout(timeout);
  }, [index, delay]);
  
  return visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";
};

export const transitionProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3 }
};
