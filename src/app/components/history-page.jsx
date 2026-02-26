import React from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Award, BookOpen, Scale } from "lucide-react";
import { useIndiaColors } from "../hooks/use-india-colors";

// Import president images locally
import rajendraImage from "../../assets/presidents/rajendra_prasad.jpg";
import radhakrishnanImage from "../../assets/presidents/s_radhakrishnan.jpg";
import zakirImage from "../../assets/presidents/zakir_husain.jpg";
import giriImage from "../../assets/presidents/vv_giri.jpg";
import fakhruddinImage from "../../assets/presidents/fakhruddin_ali_ahmed.jpg";
import reddyImage from "../../assets/presidents/neelam_sanjiva_reddy.jpg";

const PRESIDENTS = [
  {
    name: "Dr. Rajendra Prasad",
    term: "1950 - 1962",
    description: "First President of India, serving two full terms.",
    image: rajendraImage,
    alt: "Dr. Rajendra Prasad - First President of India"
  },
  {
    name: "Dr. S. Radhakrishnan",
    term: "1962 - 1967",
    description: "Philosopher-statesman and second President of India.",
    image: radhakrishnanImage,
    alt: "Dr. S. Radhakrishnan, 1962"
  },
  {
    name: "Dr. Zakir Husain",
    term: "1967 - 1969",
    description: "First Muslim President of India and distinguished educationist.",
    image: zakirImage,
    alt: "Dr. Zakir Husain"
  },
  {
    name: "V. V. Giri",
    term: "1969 - 1974",
    description: "First President elected as an independent candidate.",
    image: giriImage,
    alt: "Varahagiri Venkata Giri"
  },
  {
    name: "Fakhruddin Ali Ahmed",
    term: "1974 - 1977",
    description: "Served during one of the most consequential political phases.",
    image: fakhruddinImage,
    alt: "Fakhruddin Ali Ahmed"
  },
  {
    name: "Neelam Sanjiva Reddy",
    term: "1977 - 1982",
    description: "Only President elected unopposed in India’s history.",
    image: reddyImage,
    alt: "Neelam Sanjiva Reddy"
  }
];

const MILESTONES = [
  {
    year: "1950",
    title: "Constitution Comes into Force",
    description: "India became a sovereign democratic republic on 26 January 1950."
  },
  {
    year: "1951",
    title: "First General Elections",
    description: "Universal adult franchise shaped the world’s largest democratic exercise."
  },
  {
    year: "1956",
    title: "States Reorganisation Act",
    description: "State boundaries were reorganized broadly on linguistic principles."
  },
  {
    year: "1976",
    title: "42nd Amendment",
    description: "Added Socialist and Secular to the Preamble and expanded constitutional changes."
  },
  {
    year: "1992",
    title: "73rd and 74th Amendments",
    description: "Constitutional recognition for local self-government institutions."
  },
  {
    year: "2002",
    title: "86th Amendment",
    description: "Right to Education recognized under Article 21A."
  },
  {
    year: "2019",
    title: "103rd Amendment",
    description: "Reservation for economically weaker sections in specific sectors."
  }
];

function HistoryPage() {
  const colors = useIndiaColors();
  const textColor = colors.name === "white" ? "#000080" : colors.primary;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-7 md:p-10 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Scale className="w-6 h-6" style={{ color: textColor }} />
              <p className="text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
                Constitutional Development Archive
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "var(--font-serif)", fontWeight: 600, color: textColor }}>
              Constitutional History
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl" style={{ fontFamily: "var(--font-body)" }}>
              Track major constitutional developments and institutional milestones across modern India’s democratic journey.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6 gap-3">
            <BookOpen className="w-7 h-7" style={{ color: textColor }} />
            <h2 className="text-3xl text-gray-900" style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}>
              Constitutional Milestones
            </h2>
          </div>

          <div className="space-y-4">
            {MILESTONES.map((milestone) => (
              <article key={`${milestone.year}-${milestone.title}`} className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-start md:gap-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-2xl mb-4 md:mb-0"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 600,
                      backgroundColor: `${textColor}15`,
                      color: textColor
                    }}
                  >
                    {milestone.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl mb-2 text-gray-900" style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}>
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6 gap-3">
            <Award className="w-7 h-7" style={{ color: textColor }} />
            <h2 className="text-3xl text-gray-900" style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}>
              Former Presidents of India
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRESIDENTS.map((president) => (
              <article 
                key={president.name} 
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                style={{ 
                  borderTopWidth: "3px", 
                  borderTopColor: "#FF9933" // Saffron from Indian flag
                }}
              >
                <figure className="h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <ImageWithFallback 
                    src={president.image} 
                    alt={president.alt || president.name} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </figure>
                <div className="p-5">
                  <p 
                    className="text-xs sm:text-sm mb-2 uppercase tracking-wide font-semibold" 
                    style={{ 
                      fontFamily: "var(--font-body)", 
                      color: textColor,
                      letterSpacing: "0.05em"
                    }}
                  >
                    {president.term}
                  </p>
                  <h3 
                    className="text-lg sm:text-xl mb-2 text-gray-900" 
                    style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
                  >
                    {president.name}
                  </h3>
                  <p 
                    className="text-sm text-gray-600 leading-relaxed mb-3" 
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {president.description}
                  </p>
                  <p 
                    className="text-xs text-gray-400 border-t border-gray-100 pt-3" 
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Image Source: Wikimedia Commons
                  </p>
                </div>
              </article>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-6" style={{ fontFamily: "var(--font-body)" }}>
            Snapshot view shown above. India has had 15 Presidents from 1950 to present.
          </p>
        </div>
      </section>
    </div>
  );
}

export {
  HistoryPage
};
