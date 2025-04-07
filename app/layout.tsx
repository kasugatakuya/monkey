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
  // TODO: URLを追加
  // metadataBase: new URL("https://portfolio-rose-tau-96.vercel.app"),

  openGraph: {
    title: "MONKEY | パンクロックバンド",
    description:
      "パンクロックバンドMONKEYの公式サイトです。MONKEYに関する、ニュース、ライブスケジュール、楽曲、メンバー紹介、グッズなどご覧いただけます。",
    type: "website",
    // TODO: URLを追加
    // url: "https://portfolio-rose-tau-96.vercel.app",
    siteName: "MONKEY", // サイト名を追加
    locale: "ja_JP", // 日本語ロケールを追加
  },

  // canonicalを追加
  alternates: {
    // TODO: URLを追加
    // canonical: "https://portfolio-rose-tau-96.vercel.app",
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
  // Google Search Console の設定→所有権の確認→HTMLタグのコードのcontent属性の値を指定
  // TODO:  Google Search Console の設定を追加
  // verification: {
  //   google: "r4vs5K6kyRpFbT2eQ3xlFxlQbUmRrk_8z6irkNv4HmM",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <header className="fixed top-0 w-full">
          <nav
            className="flex items-center justify-between px-6 py-2 lg:px-20 lg:py-6"
            aria-label="Global"
          >
            {/* バンド名（ロゴ）をヘッダー左側に配置 */}
            <div className="flex-shrink-0">
              <Link href="/" className="font-bold text-xl lg:text-2xl">
                MONKEY
              </Link>
            </div>
            {/* ナビゲーションメニューは右側に配置 */}
            <div className="flex">
              <Link href="/news" className="font-bold">
                <div className="lg:text-xl"> NEWS</div>
                <div className="text-xs">ニュース</div>
              </Link>
              <Link href="/live" className="px-4 font-bold lg:px-12">
                <div className="lg:text-xl"> LIVE</div>
                <div className="text-xs">ライブスケジュール</div>
              </Link>
              <Link href="/music" className="font-bold">
                <div className="lg:text-xl"> MUSIC</div>
                <div className="text-xs">楽曲</div>
              </Link>
              <Link href="/member" className="px-4 font-bold lg:px-12">
                <div className="lg:text-xl"> MEMBER</div>
                <div className="text-xs">メンバー</div>
              </Link>
              {/* <Link href="/contact" className="font-bold">
                <div className="lg:text-xl"> MERCHANDISE</div>
                <div className="text-xs">グッズ</div>
              </Link> */}
              {/* <Link href="/contact" className="font-bold lg:pl-12">
                <div className="lg:text-xl"> CONTACT</div>
                <div className="text-xs">お問合せ</div>
              </Link> */}
            </div>
          </nav>
        </header>

        {children}

        <footer className="text-md py-20 text-center">
          <p>© MONKEY 2024-{new Date().getFullYear()}</p>
        </footer>
      </body>
    </html>
  );
}
