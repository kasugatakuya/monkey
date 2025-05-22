import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import UpButton from "@/app/components/UpButton";

// フォントの設定
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // フォント読み込みの最適化
});

// サイトの基本情報を定数として定義
const SITE_CONFIG = {
  title: "MONKEY | パンクロックバンド",
  description:
    "パンクロックバンドMONKEYの公式サイトです。MONKEYに関する、ニュース、ライブスケジュール、楽曲、メンバー紹介、グッズなどご覧いただけます。",
  url: "https://monkey-mauve-alpha.vercel.app",
  siteName: "MONKEY",
  keywords: [
    "MONKEY",
    "monkey",
    "monkeyband",
    "monkey_band",
    "monkey_band_official",
    "monkey_official",
    "monkey_official_website",
    "monkey_website",
    "monkey_homepage",
    "モンキー",
    "モンキー公式サイト",
    "バンド",
    "ロック",
    "パンク",
    "パンクロック",
    "ロックバンド",
    "曲",
    "LIVE",
    "作曲",
    "ギター",
    "ベース",
    "ドラム",
    "音楽",
    "アルバム",
    "ホームページ",
    "音楽バンド",
  ],
  googleVerification: "r4vs5K6kyRpFbT2eQ3xlFxlQbUmRrk_8z6irkNv4HmM",
} as const;

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords.join(", "),

  // 基本URL設定
  metadataBase: new URL(SITE_CONFIG.url),

  // Open Graph設定
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    type: "website",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.siteName,
    locale: "ja_JP",
  },

  // Twitter Cards設定
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },

  // 正規URL設定
  alternates: {
    canonical: SITE_CONFIG.url,
  },

  // SEO設定
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

  // Google Search Console認証
  verification: {
    google: SITE_CONFIG.googleVerification,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />

        <main className="pt-16 md:pt-24">{children}</main>

        <UpButton />
        <Footer />
      </body>
    </html>
  );
}
