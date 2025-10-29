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
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.siteName}`, // ページごとのタイトル設定用
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords.join(", "),

  // アプリケーション名を明示的に設定
  applicationName: SITE_CONFIG.title,

  // 基本URL設定
  metadataBase: new URL(SITE_CONFIG.url),

  // Open Graph設定（強化版）
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    type: "website",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.title,
    locale: "ja_JP",
    images: [
      {
        url: `${SITE_CONFIG.url}/monkey.png`,
        width: 1200,
        height: 630,
        alt: "MONKEY パンクロックバンド",
      },
    ],
  },

  // Twitter Cards設定（強化版）
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    site: "@monkey_band",
    creator: "@monkey_band",
    images: [`${SITE_CONFIG.url}/monkey.png`],
  },

  // 正規URL設定
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      ja: SITE_CONFIG.url,
      "x-default": SITE_CONFIG.url,
    },
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

  // その他のメタタグ
  authors: [{ name: "MONKEY" }],
  creator: "MONKEY",
  publisher: "MONKEY",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "music",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <head>
        <meta name="application-name" content="MONKEY | パンクロックバンド" />
        <meta name="apple-mobile-web-app-title" content="MONKEY" />
        <link rel="canonical" href={SITE_CONFIG.url} />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>
      <body className={inter.className}>
        <Header />

        <main className="pt-16 md:pt-24">{children}</main>

        <UpButton />
        <Footer />

        {/* 構造化データ (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicGroup",
              name: "MONKEY",
              alternateName: "モンキー",
              url: "https://monkey-mauve-alpha.vercel.app",
              genre: ["パンクロック", "ロック", "Punk Rock"],
              description: "パンクロックバンドMONKEYの公式サイトです。",
              foundingDate: "2020",
              foundingLocation: {
                "@type": "Place",
                name: "日本",
              },
              member: [
                {
                  "@type": "Person",
                  name: "ギタリスト",
                  roleName: "ギター",
                },
                {
                  "@type": "Person",
                  name: "ベーシスト",
                  roleName: "ベース",
                },
                {
                  "@type": "Person",
                  name: "ドラマー",
                  roleName: "ドラム",
                },
              ],
              sameAs: [
                "https://x.com/monkey39714",
                "https://www.youtube.com/@MONKEY%E3%83%91%E3%83%B3%E3%82%AF%E3%83%90%E3%83%B3%E3%83%89",
                // "https://www.instagram.com/monkey_band",
                // "https://www.facebook.com/monkey_band",
              ],
              logo: {
                "@type": "ImageObject",
                url: "https://monkey-mauve-alpha.vercel.app/monkey.png",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
