"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="btn-punk text-sm py-1 px-3"
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
      >
        MENU
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background bg-opacity-95 pt-16">
          <div className="flex flex-col items-center justify-center h-full text-distressed">
            <Link
              href="/news"
              className="font-bold text-3xl my-4 transform hover:rotate-1 text-center"
              onClick={() => setIsOpen(false)}
            >
              <div className="text-accent">NEWS</div>
              <div className="text-sm">ニュース</div>
            </Link>
            <Link
              href="/live"
              className="font-bold text-3xl my-4 transform hover:rotate-1 text-center"
              onClick={() => setIsOpen(false)}
            >
              <div className="text-accent">LIVE</div>
              <div className="text-sm">ライブスケジュール</div>
            </Link>
            <Link
              href="/music"
              className="font-bold text-3xl my-4 transform hover:rotate-1 text-center"
              onClick={() => setIsOpen(false)}
            >
              <div className="text-accent">MUSIC</div>
              <div className="text-sm">楽曲</div>
            </Link>
            <Link
              href="/member"
              className="font-bold text-3xl my-4 transform hover:rotate-1 text-center"
              onClick={() => setIsOpen(false)}
            >
              <div className="text-accent">MEMBER</div>
              <div className="text-sm">バンドメンバー</div>
            </Link>

            <button
              onClick={toggleMenu}
              className="btn-punk mt-8 text-sm py-1 px-3"
              aria-label="Close menu"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
