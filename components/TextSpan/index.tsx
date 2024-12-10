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
    >
      {children}
    </MotionSpan>
  );
};

export default TextSpan;
