import { Link } from "react-router";
import emblemImage from "figma:asset/3f2aee9b7deb0d39b0314a28b63fbee3c2e82c24.png";
import { useIndiaColors } from "../hooks/use-india-colors";
function NotFoundPage() {
  const colors = useIndiaColors();
  const textColor = colors.name === "white" ? "#000080" : colors.primary;
  return (
    <div className="min-h-[calc(100vh-20rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl border border-gray-200 bg-white rounded-2xl p-8 md:p-12 text-center shadow-sm">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto opacity-50">
            <img src={emblemImage} alt="State Emblem of India" className="w-full h-full object-contain" />
          </div>
        </div>

        <h1
          className="text-6xl mb-3"
          style={{ fontFamily: "var(--font-serif)", fontWeight: 600, color: textColor }}
        >
          404
        </h1>
        <h2 className="text-2xl mb-3 text-gray-800" style={{ fontFamily: "var(--font-serif)" }}>
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto" style={{ fontFamily: "var(--font-body)" }}>
          The page you are trying to access is unavailable. Please return to the home page and continue browsing.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-lg text-white transition-colors"
          style={{
            fontFamily: "var(--font-serif)",
            backgroundColor: textColor
          }}
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
export {
  NotFoundPage
};
