"use client";

import Link from "next/link";
import MobileMenu from "@/app/components/MobileMenu";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50">
      <nav
        className="flex items-center justify-between px-6 py-3 lg:px-20 lg:py-4"
        aria-label="Global"
      >
        {/* バンド名（ロゴ）をヘッダー左側に配置 */}
        <div className="flex-shrink-0">
          <Link href="/" className="header-logo font-bold text-2xl lg:text-3xl">
            MONKEY
          </Link>
        </div>
        {/* ナビゲーションメニューは右側に配置 */}
        <div className="hidden md:flex text-distressed">
          <Link href="/news" className="font-bold transform hover:rotate-1">
            <div className="lg:text-xl text-accent"> NEWS</div>
            <div className="text-xs">ニュース</div>
          </Link>
          <Link
            href="/live"
            className="px-4 font-bold lg:px-12 transform hover:rotate-1"
          >
            <div className="lg:text-xl text-accent"> LIVE</div>
            <div className="text-xs">ライブスケジュール</div>
          </Link>
          <Link href="/music" className="font-bold transform hover:rotate-1">
            <div className="lg:text-xl text-accent"> MUSIC</div>
            <div className="text-xs">楽曲</div>
          </Link>
          <Link
            href="/member"
            className="px-4 font-bold lg:px-12 transform hover:rotate-1"
          >
            <div className="lg:text-xl text-accent"> MEMBER</div>
            <div className="text-xs">バンドメンバー</div>
          </Link>
          {/* <Link
            href="/test"
            className="px-4 font-bold transform hover:rotate-1"
          >
            <div className="lg:text-xl text-accent"> TEST</div>
            <div className="text-xs">テスト</div>
          </Link> */}
          {/* <Link
            href="/merch"
            className="font-bold transform hover:rotate-1"
          >
            <div className="lg:text-xl text-accent"> MERCH</div>
            <div className="text-xs">グッズ</div>
          </Link> */}
          {/* <Link
            href="/merch"
            className="font-bold transform hover:rotate-1"
          >
            <div className="lg:text-xl text-accent"> CONTACT</div>
            <div className="text-xs">問い合わせ</div>
          </Link> */}
        </div>

        {/* Mobile menu component */}
        <MobileMenu />
      </nav>
    </header>
  );
}
