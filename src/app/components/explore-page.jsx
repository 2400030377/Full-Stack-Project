import { Building, Calendar, Landmark } from "lucide-react";
import { LeadersSection } from "./LeadersSection";
import emblemImage from "figma:asset/3f2aee9b7deb0d39b0314a28b63fbee3c2e82c24.png";
import { useIndiaColors } from "../hooks/use-india-colors";

const COMMITTEES = [
  { name: "Drafting Committee", chairman: "Dr. B.R. Ambedkar", members: 7 },
  { name: "Union Powers Committee", chairman: "Jawaharlal Nehru", members: 15 },
  { name: "Union Constitution Committee", chairman: "Jawaharlal Nehru", members: 15 },
  { name: "Provincial Constitution Committee", chairman: "Sardar Patel", members: 25 },
  { name: "Advisory Committee on Fundamental Rights", chairman: "Sardar Patel", members: 51 },
  { name: "Committee on the Functions of the Constituent Assembly", chairman: "G.V. Mavalankar", members: 15 }
];

const TIMELINE = [
  { date: "9 December 1946", event: "Constituent Assembly first convened" },
  { date: "11 December 1946", event: "Dr. Rajendra Prasad elected as President" },
  { date: "13 December 1946", event: "Objectives Resolution introduced" },
  { date: "22 January 1947", event: "Objectives Resolution adopted" },
  { date: "29 August 1947", event: "Drafting Committee appointed" },
  { date: "4 November 1947", event: "Draft Constitution submitted" },
  { date: "26 November 1949", event: "Constitution adopted by the Assembly" },
  { date: "26 January 1950", event: "Constitution came into force" }
];

function ExplorePage() {
  const colors = useIndiaColors();
  const textColor = colors.name === "white" ? "#000080" : colors.primary;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="text-center mt-8">
        <img src={emblemImage} alt="State Emblem" className="w-16 h-16 mx-auto" />
      </div>
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-7 md:p-10 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Landmark className="w-6 h-6" style={{ color: textColor }} />
              <p className="text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
                Constitution Learning Portal
              </p>
            </div>
            <h1
              className="text-4xl md:text-5xl mb-4"
              style={{ fontFamily: "var(--font-serif)", fontWeight: 600, color: textColor }}
            >
              Explore the Making of the Constitution
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl" style={{ fontFamily: "var(--font-body)" }}>
              Learn about the framers, committees, and constitutional milestones that shaped India’s democratic framework.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="text-4xl mb-2" style={{ fontFamily: "var(--font-serif)", fontWeight: 600, color: textColor }}>299</div>
              <div className="text-gray-600" style={{ fontFamily: "var(--font-body)" }}>Members in Constituent Assembly</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="text-4xl mb-2" style={{ fontFamily: "var(--font-serif)", fontWeight: 600, color: textColor }}>2Y 11M</div>
              <div className="text-gray-600" style={{ fontFamily: "var(--font-body)" }}>Constitution drafting duration</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="text-4xl mb-2" style={{ fontFamily: "var(--font-serif)", fontWeight: 600, color: textColor }}>165</div>
              <div className="text-gray-600" style={{ fontFamily: "var(--font-body)" }}>Assembly sittings held</div>
            </div>
          </div>
        </div>
      </section>

      <LeadersSection accentColor={textColor} />

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6 gap-3">
            <Building className="w-7 h-7" style={{ color: textColor }} />
            <h2 className="text-3xl text-gray-900" style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}>
              Key Committees
            </h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700" style={{ fontFamily: "var(--font-body)" }}>
              <div className="col-span-6">Committee</div>
              <div className="col-span-4">Chairman</div>
              <div className="col-span-2 text-right">Members</div>
            </div>
            {COMMITTEES.map((committee) => (
              <div key={committee.name} className="grid grid-cols-12 px-5 py-3 border-b border-gray-100 last:border-b-0 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                <div className="col-span-6 text-gray-900">{committee.name}</div>
                <div className="col-span-4 text-gray-700">{committee.chairman}</div>
                <div className="col-span-2 text-right" style={{ color: textColor, fontWeight: 600 }}>{committee.members}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6 gap-3">
            <Calendar className="w-7 h-7" style={{ color: textColor }} />
            <h2 className="text-3xl text-gray-900" style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}>
              Timeline of Events
            </h2>
          </div>

          <div className="relative pl-6 md:pl-8">
            <div className="absolute left-2 md:left-3 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-4">
              {TIMELINE.map((item) => (
                <article key={`${item.date}-${item.event}`} className="relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <span className="absolute -left-6 md:-left-7 top-6 w-3 h-3 rounded-full" style={{ backgroundColor: textColor }} />
                  <p className="text-sm mb-1" style={{ fontFamily: "var(--font-body)", color: textColor, fontWeight: 600 }}>{item.date}</p>
                  <p className="text-gray-800" style={{ fontFamily: "var(--font-serif)" }}>{item.event}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export {
  ExplorePage
};
