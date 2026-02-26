import { useMemo, useState } from "react";
import { useLocation } from "react-router";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useIndiaColors } from "../hooks/use-india-colors";

const PARTS = [
  { number: "I", title: "The Union and its Territory", articles: "1-4" },
  { number: "II", title: "Citizenship", articles: "5-11" },
  { number: "III", title: "Fundamental Rights", articles: "12-35" },
  { number: "IV", title: "Directive Principles of State Policy", articles: "36-51" },
  { number: "IVA", title: "Fundamental Duties", articles: "51A" },
  { number: "V", title: "The Union", articles: "52-151" },
  { number: "VI", title: "The States", articles: "152-237" },
  { number: "VII", title: "States in the B part of the First Schedule (Repealed)", articles: "-" },
  { number: "VIII", title: "The Union Territories", articles: "239-242" },
  { number: "IX", title: "The Panchayats", articles: "243-243O" },
  { number: "IXA", title: "The Municipalities", articles: "243P-243ZG" },
  { number: "IXB", title: "The Co-operative Societies", articles: "243ZH-243ZT" },
  { number: "X", title: "The Scheduled and Tribal Areas", articles: "244-244A" },
  { number: "XI", title: "Relations between the Union and the States", articles: "245-263" },
  { number: "XII", title: "Finance, Property, Contracts and Suits", articles: "264-300A" },
  { number: "XIII", title: "Trade, Commerce and Intercourse", articles: "301-307" },
  { number: "XIV", title: "Services under the Union and the States", articles: "308-323" },
  { number: "XIVA", title: "Tribunals", articles: "323A-323B" },
  { number: "XV", title: "Elections", articles: "324-329A" },
  { number: "XVI", title: "Special Provisions for Certain Classes", articles: "330-342" },
  { number: "XVII", title: "Official Language", articles: "343-351" },
  { number: "XVIII", title: "Emergency Provisions", articles: "352-360" },
  { number: "XIX", title: "Miscellaneous", articles: "361-367" },
  { number: "XX", title: "Amendment of the Constitution", articles: "368" },
  { number: "XXI", title: "Temporary, Transitional and Special Provisions", articles: "369-392" },
  { number: "XXII", title: "Short title, Commencement, Authoritative text in Hindi", articles: "393-395" }
];

const SCHEDULES = [
  "First Schedule - States and Union Territories",
  "Second Schedule - Provisions as to the President, Governors, etc.",
  "Third Schedule - Forms of Oaths or Affirmations",
  "Fourth Schedule - Allocation of seats in the Council of States",
  "Fifth Schedule - Provisions as to Administration and Control of Scheduled Areas",
  "Sixth Schedule - Provisions as to Administration of Tribal Areas",
  "Seventh Schedule - Union, State and Concurrent Lists",
  "Eighth Schedule - Languages",
  "Ninth Schedule - Validation of certain Acts and Regulations",
  "Tenth Schedule - Provisions as to Disqualification on ground of defection",
  "Eleventh Schedule - Powers, authority and responsibilities of Panchayats",
  "Twelfth Schedule - Powers, authority and responsibilities of Municipalities"
];

function ReadPage() {
  const location = useLocation();
  const [selectedSection, setSelectedSection] = useState("part-III");
  const [expandedCategory, setExpandedCategory] = useState("parts");
  const colors = useIndiaColors();

  const textColor = colors.name === "white" ? "#000080" : colors.primary;

  const searchQuery = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return (params.get("q") || "").trim().toLowerCase();
  }, [location.search]);

  const filteredParts = useMemo(() => {
    if (!searchQuery) return PARTS;

    return PARTS.filter((part) => {
      const searchable = `${part.number} ${part.title} ${part.articles}`.toLowerCase();
      return searchable.includes(searchQuery);
    });
  }, [searchQuery]);

  const filteredSchedules = useMemo(() => {
    if (!searchQuery) return SCHEDULES;

    return SCHEDULES.filter((schedule) => schedule.toLowerCase().includes(searchQuery));
  }, [searchQuery]);

  const selectedPart = useMemo(() => {
    if (!selectedSection.startsWith("part-")) return null;
    const number = selectedSection.replace("part-", "");
    return PARTS.find((part) => part.number === number) || null;
  }, [selectedSection]);

  const selectedSchedule = useMemo(() => {
    if (!selectedSection.startsWith("schedule-")) return null;
    const index = Number(selectedSection.replace("schedule-", ""));
    return SCHEDULES[index - 1] || null;
  }, [selectedSection]);

  const toggleCategory = (category) => {
    setExpandedCategory((current) => (current === category ? "parts" : category));
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[20rem_1fr] gap-6">
          <aside className="border border-gray-200 bg-white rounded-xl overflow-hidden h-fit lg:sticky lg:top-28">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl text-gray-900" style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}>
                Contents
              </h2>
              {searchQuery && (
                <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: "var(--font-body)" }}>
                  Filtered by “{searchQuery}”
                </p>
              )}
            </div>

            <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <button
                  onClick={() => toggleCategory("parts")}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-gray-900" style={{ fontFamily: "var(--font-serif)" }}>
                    Parts
                  </span>
                  {expandedCategory === "parts" ? (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  )}
                </button>

                {expandedCategory === "parts" && (
                  <div className="mt-2 space-y-1">
                    {filteredParts.length === 0 && (
                      <div className="text-sm text-gray-500 p-3" style={{ fontFamily: "var(--font-body)" }}>
                        No parts match your search.
                      </div>
                    )}
                    {filteredParts.map((part) => (
                      <button
                        key={part.number}
                        onClick={() => setSelectedSection(`part-${part.number}`)}
                        className={`w-full text-left p-3 rounded-md transition-all duration-300 ${
                          selectedSection === `part-${part.number}`
                            ? "text-white"
                            : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700"
                        }`}
                        style={{
                          backgroundColor: selectedSection === `part-${part.number}` ? textColor : undefined
                        }}
                      >
                        <div style={{ fontFamily: "var(--font-serif)" }}>
                          <div className="font-semibold text-sm">Part {part.number}</div>
                          <div className="text-sm mt-1 leading-snug">{part.title}</div>
                          <div className="text-xs mt-1 opacity-75">Articles {part.articles}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleCategory("schedules")}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-gray-900" style={{ fontFamily: "var(--font-serif)" }}>
                    Schedules
                  </span>
                  {expandedCategory === "schedules" ? (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  )}
                </button>

                {expandedCategory === "schedules" && (
                  <div className="mt-2 space-y-1">
                    {filteredSchedules.length === 0 && (
                      <div className="text-sm text-gray-500 p-3" style={{ fontFamily: "var(--font-body)" }}>
                        No schedules match your search.
                      </div>
                    )}
                    {filteredSchedules.map((schedule) => {
                      const fullIndex = SCHEDULES.indexOf(schedule) + 1;
                      return (
                        <button
                          key={schedule}
                          onClick={() => setSelectedSection(`schedule-${fullIndex}`)}
                          className={`w-full text-left p-3 rounded-md transition-all duration-300 ${
                            selectedSection === `schedule-${fullIndex}`
                              ? "text-white"
                              : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700"
                          }`}
                          style={{
                            backgroundColor: selectedSection === `schedule-${fullIndex}` ? textColor : undefined
                          }}
                        >
                          <div className="text-sm" style={{ fontFamily: "var(--font-serif)" }}>
                            {schedule}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </aside>

          <main className="border border-gray-200 bg-white rounded-xl p-6 md:p-8 min-h-[65vh]">
            {selectedPart && (
              <>
                <div className="mb-8 border-b border-gray-200 pb-6">
                  <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                    Part {selectedPart.number} • Articles {selectedPart.articles}
                  </div>
                  <h1
                    className="text-3xl md:text-4xl mb-3"
                    style={{ fontFamily: "var(--font-serif)", fontWeight: 600, color: textColor }}
                  >
                    {selectedPart.title}
                  </h1>
                  <div className="h-1 w-20" style={{ backgroundColor: textColor }} />
                </div>

                {selectedPart.number === "III" ? (
                  <div className="prose prose-lg max-w-none" style={{ fontFamily: "var(--font-body)" }}>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}>Article 14 - Equality before law</h3>
                    <p className="text-gray-700 leading-relaxed">
                      The State shall not deny to any person equality before the law or the equal protection of the laws within the
                      territory of India.
                    </p>

                    <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }} className="mt-8">
                      Article 19 - Protection of certain rights regarding freedom of speech, etc.
                    </h3>
                    <p className="text-gray-700 leading-relaxed">(1) All citizens shall have the right—</p>
                    <ol className="text-gray-700 leading-relaxed" type="a">
                      <li>to freedom of speech and expression;</li>
                      <li>to assemble peaceably and without arms;</li>
                      <li>to form associations or unions;</li>
                      <li>to move freely throughout the territory of India;</li>
                      <li>to reside and settle in any part of the territory of India; and</li>
                      <li>to practice any profession, or to carry on any occupation, trade or business.</li>
                    </ol>

                    <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }} className="mt-8">
                      Article 21 - Protection of life and personal liberty
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      No person shall be deprived of his life or personal liberty except according to procedure established by law.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5" style={{ fontFamily: "var(--font-body)" }}>
                    <p className="text-gray-700 leading-relaxed">
                      This section provides the constitutional framework for <strong>{selectedPart.title}</strong> covering Articles {selectedPart.articles}.
                    </p>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                      <h3 className="text-lg text-gray-900 mb-2" style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}>
                        Reading Guidance
                      </h3>
                      <ul className="list-disc pl-5 text-gray-700 space-y-1">
                        <li>Review definitions and scope first.</li>
                        <li>Read operative provisions article by article.</li>
                        <li>Cross-reference related Parts and Schedules where applicable.</li>
                      </ul>
                    </div>
                  </div>
                )}
              </>
            )}

            {selectedSchedule && (
              <>
                <div className="mb-8 border-b border-gray-200 pb-6">
                  <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                    Schedule Reference
                  </div>
                  <h1
                    className="text-3xl md:text-4xl mb-3"
                    style={{ fontFamily: "var(--font-serif)", fontWeight: 600, color: textColor }}
                  >
                    {selectedSchedule.split("-")[0].trim()}
                  </h1>
                  <div className="h-1 w-20" style={{ backgroundColor: textColor }} />
                </div>

                <div className="space-y-5" style={{ fontFamily: "var(--font-body)" }}>
                  <p className="text-gray-700 leading-relaxed">{selectedSchedule}</p>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                    <h3 className="text-lg text-gray-900 mb-2" style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}>
                      What this schedule contains
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Schedules contain structured constitutional details such as lists, forms, allocations, and specific administrative
                      provisions supporting the main articles.
                    </p>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export {
  ReadPage
};
