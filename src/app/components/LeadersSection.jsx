import React from "react";
import { Users } from "lucide-react";
import { LeaderCard } from "./LeaderCard";
import ambedkarImage from "../../assets/leaders/dr-br-ambedkar.jpg";
import patelImage from "../../assets/leaders/sardar-vallabhbhai-patel.jpg";
import rajendraPrasadImage from "../../assets/leaders/dr-rajendra-prasad.jpg";
import nehruImage from "../../assets/leaders/jawaharlal-nehru-1947.jpg";

const LEADERS = [
  {
    name: "Dr. B. R. Ambedkar",
    role: "Chairman, Drafting Committee",
    description:
      "Principal architect of the Indian Constitution, known for his contributions to constitutional law and social justice.",
    image: ambedkarImage,
    alt: "Dr. B. R. Ambedkar portrait from Wikimedia Commons",
    objectPosition: "center 16%"
  },
  {
    name: "Dr. Rajendra Prasad",
    role: "President, Constituent Assembly",
    description:
      "Presided over Constituent Assembly sessions and played a key role in shaping deliberative constitutional processes.",
    image: rajendraPrasadImage,
    alt: "Dr. Rajendra Prasad historical photograph from Wikimedia Commons",
    objectPosition: "center 20%"
  },
  {
    name: "Sardar Vallabhbhai Patel",
    role: "Member, Constituent Assembly",
    description:
      "Influential national leader who contributed to constitutional institution-building and federal integration.",
    image: patelImage,
    alt: "Sardar Vallabhbhai Patel historical photograph from Wikimedia Commons",
    objectPosition: "center 15%"
  },
  {
    name: "Jawaharlal Nehru",
    role: "Member, Constituent Assembly",
    description:
      "Introduced the Objectives Resolution and helped articulate the democratic vision underlying the Constitution.",
    image: nehruImage,
    alt: "Jawaharlal Nehru 1947 historical photograph from Wikimedia Commons",
    objectPosition: "center 12%"
  }
];

function LeadersSection({ accentColor = "#000080" }) {
  return (
    <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-center sm:justify-start mb-6 gap-3">
          <div 
            className="p-2 rounded-lg" 
            style={{ backgroundColor: `${accentColor}15` }}
          >
            <Users className="w-6 h-6" style={{ color: accentColor }} />
          </div>
          <h2 
            className="text-2xl sm:text-3xl text-gray-900 font-semibold" 
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Constitution Framers
          </h2>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {LEADERS.map((leader) => (
            <LeaderCard key={leader.name} leader={leader} accentColor={accentColor} />
          ))}
        </div>

        {/* Optional decorative element */}
        <div className="mt-6 flex justify-center">
          <div className="h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 via-white to-green-600"></div>
        </div>
      </div>
    </section>
  );
}

export { LeadersSection };
