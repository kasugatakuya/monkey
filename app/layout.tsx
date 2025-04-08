import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

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
        {/* ヘッダーコンポーネント */}
        <Header />

        <div className="pt-16 md:pt-24">
          {/* Padding to account for fixed header */}
          {children}
        </div>

        {/* フッターコンポーネント */}
        <Footer />
      </body>
    </html>
  );
}
