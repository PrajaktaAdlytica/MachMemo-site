import type { Metadata } from "next";
import MachMemoSite from "./MachMemoSite";

export const metadata: Metadata = {
  title: "MachMemo - Machine memory for maintenance intelligence",
  description:
    "AI maintenance intelligence for European manufacturing SMEs, machine shops, maintenance teams, and industrial suppliers.",
};

export default function Home() {
  return <MachMemoSite page="home" />;
}
