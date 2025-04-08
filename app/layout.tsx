import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MONKEY | パンクロックバンド",
  description:
    "パンクロックバンドMONKEYの公式サイトです。MONKEYに関する、ニュース、ライブスケジュール、楽曲、メンバー紹介、グッズなどご覧いただけます。",
  keywords:
    "MONKEY, monkey, monkeyband, monkey_band, monkey_band_official, monkey_official, monkey_official_website, monkey_website, monkey_homepage, モンキー, モンキー公式サイト, バンド, ロック, パンク, パンクロック, ロックバンド, 曲, LIVE, 作曲, ギター, ベース, ドラム, 音楽, アルバム, ホームページ, 音楽バンド",

  // metadataBaseを追加
  metadataBase: new URL("https://monkey-mauve-alpha.vercel.app/news"),

  openGraph: {
    title: "MONKEY | パンクロックバンド",
    description:
      "パンクロックバンドMONKEYの公式サイトです。MONKEYに関する、ニュース、ライブスケジュール、楽曲、メンバー紹介、グッズなどご覧いただけます。",
    type: "website",
    url: "https://monkey-mauve-alpha.vercel.app/news",
    siteName: "MONKEY", // サイト名を追加
    locale: "ja_JP", // 日本語ロケールを追加
  },

  // canonicalを追加
  alternates: {
    canonical: "https://monkey-mauve-alpha.vercel.app/news",
  },

  // robotsを追加
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Twitter Cardsを追加
  twitter: {
    card: "summary_large_image",
    title: "MONKEY | パンクロックバンド",
    description:
      "パンクロックバンドMONKEYの公式サイトです。MONKEYに関する、ニュース、ライブスケジュール、楽曲、メンバー紹介、グッズなどご覧いただけます。",
  },

  // verification を追加（Google Search Consoleを使用している場合）
  verification: {
    google: "r4vs5K6kyRpFbT2eQ3xlFxlQbUmRrk_8z6irkNv4HmM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <header className="fixed top-0 w-full z-50">
          <nav
            className="flex items-center justify-between px-6 py-3 lg:px-20 lg:py-4"
            aria-label="Global"
          >
            {/* バンド名（ロゴ）をヘッダー左側に配置 */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="header-logo font-bold text-2xl lg:text-3xl"
              >
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
              <Link
                href="/music"
                className="font-bold transform hover:rotate-1"
              >
                <div className="lg:text-xl text-accent"> MUSIC</div>
                <div className="text-xs">楽曲</div>
              </Link>
              <Link
                href="/member"
                className="px-4 font-bold lg:px-12 transform hover:rotate-1"
              >
                <div className="lg:text-xl text-accent"> MEMBER</div>
                <div className="text-xs">メンバー</div>
              </Link>
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

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="btn-punk text-sm py-1 px-3">MENU</button>
            </div>
          </nav>
        </header>

        <div className="pt-16 md:pt-24">
          {" "}
          {/* Padding to account for fixed header */}
          {children}
        </div>

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
          <p>© MONKEY 2024 - 2025</p>
        </footer>
      </body>
    </html>
  );
}
