import emblemImage from "figma:asset/3f2aee9b7deb0d39b0314a28b63fbee3c2e82c24.png";
import { useIndiaColors } from "../hooks/use-india-colors";

const VALUES = [
  {
    title: "Justice",
    description: "Social, economic, and political justice as a constitutional commitment for all citizens."
  },
  {
    title: "Liberty",
    description: "Freedom of thought, expression, belief, faith, and worship as democratic essentials."
  },
  {
    title: "Equality",
    description: "Equality of status and opportunity to uphold dignity and fairness in public life."
  },
  {
    title: "Fraternity",
    description: "Fraternity that ensures individual dignity and national unity and integrity."
  }
];

function PreamblePage() {
  const colors = useIndiaColors();
  const textColor = colors.name === "white" ? "#000080" : colors.primary;

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-8 md:p-10 text-center shadow-sm">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white ring-1 ring-gray-200 shadow-sm mb-5">
            <img src={emblemImage} alt="State Emblem of India" className="w-14 h-14 object-contain" />
          </div>
          <h1 className="text-4xl md:text-5xl mb-3" style={{ fontFamily: "var(--font-serif)", fontWeight: 600, color: textColor }}>
            The Preamble
          </h1>
          <p className="text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            Foundational statement of constitutional ideals
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 md:p-10 shadow-sm">
          <div className="max-w-4xl mx-auto">
            <div className="h-1 w-28 mx-auto mb-8" style={{ backgroundColor: textColor }} />

            <div className="text-center space-y-5" style={{ fontFamily: "var(--font-serif)" }}>
              <p className="text-2xl md:text-3xl text-gray-900" style={{ fontWeight: 600 }}>
                WE, THE PEOPLE OF INDIA,
              </p>
              <p className="text-xl md:text-2xl text-gray-800 leading-relaxed">
                having solemnly resolved to constitute India into a
              </p>
              <p className="text-2xl md:text-3xl leading-relaxed" style={{ fontWeight: 600, color: textColor }}>
                SOVEREIGN SOCIALIST SECULAR
                <br />
                DEMOCRATIC REPUBLIC
              </p>
              <p className="text-xl md:text-2xl text-gray-800">and to secure to all its citizens:</p>

              <div className="text-xl md:text-2xl text-gray-900 space-y-2">
                <p>
                  <span style={{ color: textColor, fontWeight: 600 }}>JUSTICE</span>, social, economic and political;
                </p>
                <p>
                  <span style={{ color: textColor, fontWeight: 600 }}>LIBERTY</span> of thought, expression, belief, faith and worship;
                </p>
                <p>
                  <span style={{ color: textColor, fontWeight: 600 }}>EQUALITY</span> of status and of opportunity;
                </p>
                <p>
                  and to promote among them all <span style={{ color: textColor, fontWeight: 600 }}>FRATERNITY</span>
                  assuring the dignity of the individual and the unity and integrity of the Nation;
                </p>
              </div>

              <div className="pt-3 text-xl md:text-2xl text-gray-800 leading-relaxed">
                <p>IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949,</p>
                <p>
                  do <span style={{ color: textColor, fontWeight: 600 }}>HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.</span>
                </p>
              </div>
            </div>

            <div className="h-1 w-28 mx-auto mt-8" style={{ backgroundColor: textColor }} />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {VALUES.map((value) => (
            <article key={value.title} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl mb-2" style={{ fontFamily: "var(--font-serif)", fontWeight: 600, color: textColor }}>
                {value.title}
              </h2>
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                {value.description}
              </p>
            </article>
          ))}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <article className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl mb-2" style={{ fontFamily: "var(--font-serif)", fontWeight: 600, color: textColor }}>
              Adopted
            </h3>
            <p className="text-gray-700" style={{ fontFamily: "var(--font-body)" }}>
              Adopted on 26 November 1949 and effective from 26 January 1950.
            </p>
          </article>
          <article className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl mb-2" style={{ fontFamily: "var(--font-serif)", fontWeight: 600, color: textColor }}>
              Amendment Context
            </h3>
            <p className="text-gray-700" style={{ fontFamily: "var(--font-body)" }}>
              The 42nd Amendment (1976) inserted key terms including Socialist and Secular.
            </p>
          </article>
          <article className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl mb-2" style={{ fontFamily: "var(--font-serif)", fontWeight: 600, color: textColor }}>
              Constitutional Role
            </h3>
            <p className="text-gray-700" style={{ fontFamily: "var(--font-body)" }}>
              Guides interpretation of constitutional provisions and reflects national aspirations.
            </p>
          </article>
        </section>
      </div>
    </div>
  );
}

export {
  PreamblePage
};
