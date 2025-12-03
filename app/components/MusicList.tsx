import Link from "next/link";
import React from "react";
import { SheetItem } from "@/utils/googleSheets";
import Image from "next/image";

// MusicListコンポーネントの型定義
interface MusicListProps {
  musicData: SheetItem[];
  limit?: number; // オプショナル: 表示する曲数の制限
  showViewAllButton?: boolean; // オプショナル: 「全ての楽曲」ボタンを表示するかどうか
}

export const MusicList: React.FC<MusicListProps> = ({
  musicData,
  limit,
  showViewAllButton = false,
}) => {
  // limitが指定されている場合、データを制限する
  const displayedMusic = limit ? musicData.slice(0, limit) : musicData;

  return (
    <>
      {/* 楽曲セクション */}
      {displayedMusic.length > 0 && (
        <section className="mb-12">
          <div id="music" className="p-2 scroll-mt-16">
            {/* パンクスタイルのセクションタイトル */}
            <h2 className="text-3xl font-bold mb-6 border-b-2 border-accent pb-2">
              楽曲
            </h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {displayedMusic.map((music, index) => (
                <div key={index} className="relative group">
                  {/* パンクスタイルの破れた紙風エフェクト */}
                  <div className="absolute -inset-1 bg-accent/20 transform rotate-1 group-hover:rotate-2 transition-transform"></div>

                  {/* メインカード */}
                  <div className="relative bg-background border-4 border-accent p-6 transition-all group-hover:transform group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_rgba(255,45,45,0.5)]">
                    {/* ダメージエフェクトの装飾 */}
                    <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-accent"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-secondary"></div>

                    {/* 曲名 */}
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight transform -skew-x-3 text-accent -webkit-text-stroke-1 -webkit-text-stroke-black mb-4">
                      {music["曲名"]}
                    </h3>

                    {/* 音源プレイヤー */}
                    {music["音源URL"] && (
                      <div className="mb-4 border-2 border-accent p-2 bg-black/10">
                        <iframe
                          width="100%"
                          height="120"
                          allow="autoplay"
                          src={
                            // 文字列型としてチェックして処理
                            typeof music["音源URL"] === "string" &&
                            music["音源URL"].includes("soundcloud.com")
                              ? `https://w.soundcloud.com/player/?url=${encodeURIComponent(
                                  music["音源URL"] as string
                                )}&color=%23ff2d2d&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`
                              : (music["音源URL"] as string)
                          }
                        ></iframe>
                      </div>
                    )}

                    {/* 説明 */}
                    {music["説明"] && (
                      <div className="text-base whitespace-pre-line font-medium">
                        {music["説明"]}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {showViewAllButton && (
            <div className="text-center mt-8">
              <Link href="/music" className="btn-punk">
                全ての楽曲
              </Link>
            </div>
          )}
        </section>
      )}

      {/* 最新リリース */}
      <section className="mb-12">
        <div className="p-2">
          {/* パンクスタイルのセクションタイトル */}
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-accent pb-2">
            最新リリース
          </h2>

          <div className="relative group">
            {/* パンクスタイルの破れた紙風エフェクト */}
            <div className="absolute -inset-1 bg-accent/20 transform rotate-1 group-hover:rotate-2 transition-transform"></div>

            {/* メインカード */}
            <div className="relative bg-background border-4 border-accent p-6 transition-all group-hover:transform group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_rgba(255,45,45,0.5)]">
              {/* ダメージエフェクトの装飾 */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-accent"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-secondary"></div>
              <div className="md:flex items-center">
                <div className="md:w-1/2 p-4">
                  <div className="aspect-square bg-black relative border-2 border-accent">
                    <Image
                      src="/monkey-cd.png"
                      alt="MONKEY Release Artwork"
                      width={615}
                      height={615}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 p-4 md:pl-8">
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight transform -skew-x-3 text-accent -webkit-text-stroke-1 -webkit-text-stroke-black mb-6">
                    MONKEY
                  </h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <span className="text-accent font-bold text-lg md:text-xl">
                        01. MONKEYのテーマ
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-accent font-bold text-lg md:text-xl">
                        02. PUNK IS NOT DEAD
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-accent font-bold text-lg md:text-xl">
                        03. 名無しのバラード
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-accent font-bold text-lg md:text-xl">
                        04. はじまりの詩
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-accent font-bold text-lg md:text-xl">
                        05. 激
                      </span>
                    </li>
                  </ul>

                  <div className="flex flex-col gap-3 mt-10">
                    <div>
                      <a
                        href="https://open.spotify.com/intl-ja/album/5lHx6pyGglVNXR4eCkdolw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-black bg-green-500 text-black px-3 py-1 inline-block border-2 border-black hover:bg-green-400 transition-colors cursor-pointer hover:text-black no-underline"
                        style={{ color: "black" }}
                      >
                        Spotify で配信中
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://music.apple.com/jp/album/monkey-ep/1845251363"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-black bg-red-500 text-black px-3 py-1 inline-block border-2 border-black hover:bg-red-400 transition-colors cursor-pointer hover:text-black no-underline"
                        style={{ color: "black" }}
                      >
                        Apple Music で配信中
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://music.amazon.co.jp/albums/B0FVKPKBWZ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-black bg-blue-500 text-black px-3 py-1 inline-block border-2 border-black hover:bg-blue-400 transition-colors cursor-pointer hover:text-black no-underline"
                        style={{ color: "black" }}
                      >
                        Amazon Music で配信中
                      </a>
                    </div>
                    <div>
                      <span className="inline-flex flex-wrap text-lg font-black bg-yellow-400 text-black px-3 py-1  border-2 border-black">
                        <div className="mr-3">CD販売中</div>
                        <div>定価：1000円(税込)</div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ライブ映像 */}
      <section className="mb-12">
        <div className="p-2">
          {/* パンクスタイルのセクションタイトル */}
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-accent pb-2">
            ライブ映像
          </h2>

          <div className="relative group">
            {/* パンクスタイルの破れた紙風エフェクト */}
            <div className="absolute -inset-1 bg-accent/20 transform rotate-1 group-hover:rotate-2 transition-transform"></div>

            {/* メインカード */}
            <div className="relative bg-background border-4 border-accent p-6 transition-all group-hover:transform group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_rgba(255,45,45,0.5)]">
              {/* ダメージエフェクトの装飾 */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-accent"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-secondary"></div>

              {/* YouTube iframe */}
              <div className="relative" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/p7fDKHqUZTU"
                  title="MONKEY ライブ映像"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
