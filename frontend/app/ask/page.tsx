import type { Metadata } from "next";
import { AskVraj } from "@/components/ask-vraj/ask-vraj";

export const metadata: Metadata = {
  title: "Ask Vraj — Grounded Interactive AI Console",
  description:
    "Ask anything about Vraj Goti's software engineering projects, technical stack, architecture decisions, and availability.",
};

export default function AskPage() {
  return (
    <div className="w-full">
      <AskVraj isStandalonePage={true} />
    </div>
  );
}
