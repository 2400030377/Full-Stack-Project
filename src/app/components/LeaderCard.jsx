import React from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

function LeaderCard({ leader, accentColor = "#000080" }) {
  return (
    <article
      className="group h-full rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden hover:scale-[1.02]"
      style={{ 
        borderTopWidth: "3px", 
        borderTopColor: "#FF9933", // Saffron color from Indian flag
        minHeight: "160px",
        maxHeight: "180px"
      }}
    >
      <div className="h-full flex flex-row items-stretch">
        {/* Image Section - Left Side */}
        <figure className="flex-shrink-0 w-32 sm:w-36 border-r border-gray-100 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <ImageWithFallback
            src={leader.image}
            alt={leader.alt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            style={{ objectPosition: leader.objectPosition || "center top" }}
          />
        </figure>

        {/* Content Section - Right Side */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-center gap-2">
          <h3 
            className="text-base sm:text-lg font-semibold text-gray-900 leading-tight" 
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {leader.name}
          </h3>
          
          <p 
            className="text-xs sm:text-sm font-semibold uppercase tracking-wide" 
            style={{ 
              fontFamily: "var(--font-body)", 
              color: accentColor,
              letterSpacing: "0.05em"
            }}
          >
            {leader.role}
          </p>
          
          <p 
            className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2" 
            style={{ fontFamily: "var(--font-body)" }}
          >
            {leader.description}
          </p>
          
          {/* Subtle credit line */}
          <p className="text-[10px] text-gray-400 mt-auto" style={{ fontFamily: "var(--font-body)" }}>
            Source: Wikimedia Commons
          </p>
        </div>
      </div>
    </article>
  );
}

export { LeaderCard };
