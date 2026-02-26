import { Link } from "react-router";
import { Book, Users, Clock, FileText } from "lucide-react";
import emblemImage from "figma:asset/3f2aee9b7deb0d39b0314a28b63fbee3c2e82c24.png";
import { useIndiaColors } from "../hooks/use-india-colors";
function HomePage() {
  const colors = useIndiaColors();
  const cards = [
    {
      icon: Book,
      title: "Read",
      description: "Explore the complete text of the Constitution, organized by Parts and Schedules",
      path: "/read",
      colorIndex: 0
    },
    {
      icon: Users,
      title: "Explore",
      description: "Discover the framers, committees, and the Constituent Assembly",
      path: "/explore",
      colorIndex: 1
    },
    {
      icon: Clock,
      title: "History",
      description: "Journey through constitutional milestones and former Presidents",
      path: "/history",
      colorIndex: 2
    },
    {
      icon: FileText,
      title: "Preamble",
      description: "Read the foundational principles of our Republic",
      path: "/preamble",
      colorIndex: 0
    }
  ];
  const textColor = colors.name === "white" ? "#000080" : colors.primary;
  return (
    <div className="min-h-screen">
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-10 md:px-12 md:py-14 shadow-sm">
            <div className="text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-lg ring-1 ring-gray-200">
                  <img src={emblemImage} alt="State Emblem of India" className="w-20 h-20 object-contain" />
                </div>
              </div>
              <h1
                className="text-4xl md:text-6xl mb-6 transition-colors duration-1000"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 600, color: textColor }}
              >
                The Constitution of India
              </h1>
              <p
                className="text-lg md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Access constitutional text, historical context, and foundational principles in a structured public portal.
              </p>
              <div className="mt-8">
                <div className="text-sm text-gray-600" style={{ fontFamily: "var(--font-serif)" }}>
                  Adopted on 26th November 1949 • Came into force on 26th January 1950
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card) => (
              <Link
                key={card.path}
                to={card.path}
                className="group relative bg-white border border-gray-200 rounded-xl p-7 hover:shadow-md transition-all duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = textColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${textColor}15` }}
                  >
                    <card.icon className="w-6 h-6" style={{ color: textColor }} />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-2xl mb-2"
                      style={{ fontFamily: "var(--font-serif)", fontWeight: 600, color: textColor }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                      {card.description}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5" style={{ color: textColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm" style={{ borderLeft: `4px solid ${textColor}` }}>
            <blockquote>
              <p className="text-2xl text-gray-800 mb-4 italic leading-relaxed" style={{ fontFamily: "var(--font-serif)" }}>
                “We, the people of India, having solemnly resolved to constitute India into a Sovereign Socialist Secular Democratic Republic...”
              </p>
              <footer className="text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
                — Preamble to the Constitution of India
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
}
export {
  HomePage
};
