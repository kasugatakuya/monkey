"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    // クライアントサイドでのみ実行される
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="text-md py-20 text-center angled-border">
      <div className="punk-section mx-auto max-w-md p-6 mb-8">
        <div className="text-2xl text-distressed text-accent mb-4">
          FOLLOW THE CHAOS
        </div>
        <div className="flex justify-center space-x-8 mb-6">
          <a href="#" className="text-2xl">
            📱
          </a>
          <a href="#" className="text-2xl">
            🎵
          </a>
          <a href="#" className="text-2xl">
            📸
          </a>
          <a href="#" className="text-2xl">
            🎬
          </a>
        </div>
      </div>
      <p>© MONKEY 2024 - {currentYear}</p>
    </footer>
  );
}
