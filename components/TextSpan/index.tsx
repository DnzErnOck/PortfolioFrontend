"use client"
import dynamic from "next/dynamic";

// Sadece `motion.span` yükleniyor
const MotionSpan = dynamic(() => import("framer-motion").then((mod) => mod.motion.span), {
  ssr: false,
});

interface TextSpanProps {
  children: React.ReactNode;
}

const TextSpan: React.FC<TextSpanProps> = ({ children }) => {
  return (
    <MotionSpan
      whileHover={{
        scale: 1.3,
        color: "#5b5bae",
       
      }}
      className="inline-block"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      style={{ display: "inline-block" }}
    >
      {children}
    </MotionSpan>
  );
};

export default TextSpan;
