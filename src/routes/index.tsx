import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Devesh Ambekar — Technology Enthusiast & Software Developer" },
      { name: "description", content: "Devesh Ambekar is a Computer Engineering student, software developer and entrepreneur building practical digital products and AI-powered solutions in Pune." },
      { property: "og:title", content: "Devesh Ambekar — Building Ideas Into Digital Reality" },
      { property: "og:description", content: "Computer Engineering student, software developer and entrepreneur. Explore selected projects, skills and the journey behind the work." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return <><Portfolio /><Toaster position="bottom-right" richColors /></>;
}
