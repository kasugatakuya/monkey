import Link from "next/link";
import React from "react";
import { SheetItem } from "@/utils/googleSheets";

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
          <div id="music" className="p-8 scroll-mt-16">
            <h2 className="text-3xl font-bold mb-6 border-b-2 border-accent pb-2">
              楽曲
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayedMusic.map((music, index) => (
                <div
                  key={index}
                  className="border-2 border-accent p-4 rounded-lg hover:shadow-lg transition-shadow bg-base-100"
                >
                  <h3 className="text-xl font-bold mb-3">{music["曲名"]}</h3>

                  {music["音源URL"] && (
                    <div className="mb-3">
                      <iframe
                        width="100%"
                        height="120"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={
                          // 文字列型としてチェックして処理
                          typeof music["音源URL"] === "string" &&
                          music["音源URL"].includes("soundcloud.com")
                            ? `https://w.soundcloud.com/player/?url=${encodeURIComponent(
                                music["音源URL"] as string
                              )}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`
                            : (music["音源URL"] as string)
                        }
                      ></iframe>
                    </div>
                  )}

                  {music["説明"] && (
                    <div className="text-sm whitespace-pre-line mt-2">
                      {music["説明"]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {showViewAllButton && (
            <div className="text-center">
              <Link href="/music" className="btn-punk">
                全ての楽曲
              </Link>
            </div>
          )}
        </section>
      )}

      {/* 最新アルバム */}
      <section className="punk-section p-8 mb-20">
        <h2 className="text-3xl font-bold text-distressed text-accent mb-6">
          最新アルバム
        </h2>
        <div className="md:flex items-center">
          <div className="md:w-1/2 p-4">
            <div className="aspect-square bg-black relative">
              {/* アルバムアートワークのプレースホルダー */}
              <div className="absolute inset-0 border-2 border-accent transform rotate-2"></div>
              <div className="absolute inset-0 bg-black flex items-center justify-center transform -rotate-1">
                <span className="text-4xl font-bold text-distressed">
                  近日公開予定
                </span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 p-4">
            <h3 className="text-2xl font-bold text-secondary mb-2">
              タイトル未定
            </h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-accent">01. MONKEYのテーマ(仮)</span>
              </li>
              <li className="flex items-center">
                <span className="text-accent">
                  02. パンクイズノットデッド(仮)
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-accent">03. 役人ファック(仮)</span>
              </li>
              <li className="flex items-center">
                <span className="text-accent">04. はじまりの詩(仮)</span>
              </li>
              <li className="flex items-center">
                <span className="text-accent">05. あっちいけ(仮)</span>
              </li>
              <li className="flex items-center">
                <span className="text-accent">06. 激(仮)</span>
              </li>
              <li className="flex items-center">
                <span className="text-accent">07. 壊れた(仮)</span>
              </li>
              <li className="flex items-center">
                <span className="text-accent">08. 名無しのバラード(仮)</span>
              </li>
              <li className="flex items-center">
                <span className="text-accent">09. 地団駄(仮)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
