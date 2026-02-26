import React from "react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import emblemImage from "figma:asset/3f2aee9b7deb0d39b0314a28b63fbee3c2e82c24.png";
import { useIndiaColors } from "../hooks/use-india-colors";
function EntryScreen({ onComplete }) {
  const [isComplete, setIsComplete] = useState(false);
  const colors = useIndiaColors();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(onComplete, 500);
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);
  return /* @__PURE__ */ React.createElement(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white",
      initial: { opacity: 1 },
      animate: { opacity: isComplete ? 0 : 1 },
      transition: { duration: 0.5 }
    },
    /* @__PURE__ */ React.createElement(
      motion.div,
      {
        initial: { scale: 0.5, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.8, ease: "easeOut" },
        className: "mb-8"
      },
      /* @__PURE__ */ React.createElement("div", { className: "w-40 h-40 flex items-center justify-center" }, /* @__PURE__ */ React.createElement("img", { src: emblemImage, alt: "State Emblem of India", className: "w-full h-full object-contain" }))
    ),
    /* @__PURE__ */ React.createElement(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.8, duration: 0.8 },
        className: "text-center",
        style: { fontFamily: "var(--font-serif)" }
      },
      /* @__PURE__ */ React.createElement(
        "h1",
        {
          className: "text-4xl md:text-5xl tracking-wide transition-colors duration-1000",
          style: { fontWeight: 600, color: colors.primary }
        },
        "We, The People of India"
      )
    ),
    /* @__PURE__ */ React.createElement(
      motion.div,
      {
        initial: { scaleX: 0 },
        animate: { scaleX: 1 },
        transition: { delay: 1.5, duration: 1 },
        className: "absolute bottom-0 w-full h-2 origin-center"
      },
      /* @__PURE__ */ React.createElement("div", { className: "w-full h-full flex" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1 bg-[#FF9933]" }), /* @__PURE__ */ React.createElement("div", { className: "flex-1 bg-white border-t border-b border-gray-300" }), /* @__PURE__ */ React.createElement("div", { className: "flex-1 bg-[#138808]" }))
    )
  );
}
export {
  EntryScreen
};
