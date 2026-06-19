import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Terminal Resume",
  description: "Browse Purnabrata Dey's interactive terminal resume. Execute shell-like commands, play mini-games (Snake), check skills, projects, and educational details from a developer console.",
};

export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
