"use client";

import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { MobileTest } from "../../components/ui/MobileTest";

export default function MobileTestPage() {
  return (
    <main className="min-h-screen bg-[#F3F7FA]">
      <Header />
      <div className="pt-16 lg:pt-20">
        <MobileTest />
      </div>
      <Footer />
    </main>
  );
} 