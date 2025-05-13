import Link from "next/link";
import React from "react";

import { getAllSpreadsheetsData, SheetItem } from "@/utils/googleSheets";
import { MemberList } from "@/app/components/MemberList";
import { TitleSection } from "@/app/components/TitleSection";
import { NewsList } from "@/app/components/NewsList";
import { LiveList } from "@/app/components/LiveList";

// キャッシュを無効化し、毎回のリクエストで再検証
export const revalidate = 0;

// サーバーコンポーネントでのデータ取得
async function getSheetData() {
  try {
    return await getAllSpreadsheetsData();
  } catch (error) {
    console.error("データ取得エラー:", error);
    return [] as SheetItem[];
  }
}

export default async function Top() {
  // 全てのスプレッドシートのデータを取得
  const allData = await getSheetData();

  // データをタイプで分類
  const newsData = allData.filter((item) => item._sheetType === "news");
  const liveData = allData.filter((item) => item._sheetType === "live");
  const memberData = allData.filter((item) => item._sheetType === "member");
  const musicData = allData.filter((item) => item._sheetType === "music");

  return (
    <main className="mx-5 md:mx-20">
      {/* タイトルセクション */}
      <TitleSection
        title="MONKEY"
        subtitle="パンクロックバンド"
        backToTopButton={false}
      />

      {/* ニュース - NewsListコンポーネントを使用 */}
      {newsData.length > 0 && (
        <NewsList
          newsData={newsData}
          limit={3} // 最大3件まで表示
          showViewAllButton={true} // 「全てのニュース」ボタンを表示
        />
      )}

      {/* 楽曲セクション */}
      {musicData.length > 0 && (
        <section id="music" className="p-8 mb-12 scroll-mt-16">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-accent pb-2">
            楽曲
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {musicData.map((music, index) => (
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
                        music["音源URL"].includes("soundcloud.com")
                          ? `https://w.soundcloud.com/player/?url=${encodeURIComponent(
                              music["音源URL"]
                            )}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`
                          : music["音源URL"]
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
                <span className="text-accent mr-2">01.</span> MONKEYのテーマ(仮)
              </li>
              <li className="flex items-center">
                <span className="text-accent mr-2">02.</span>
                パンクイズノットデッド(仮)
              </li>
              <li className="flex items-center">
                <span className="text-accent mr-2">03.</span> 役人ファック(仮)
              </li>
              <li className="flex items-center">
                <span className="text-accent mr-2">04.</span> はじまりの詩(仮)
              </li>
              <li className="flex items-center">
                <span className="text-accent mr-2">05.</span> あっちいけ(仮)
              </li>
              <li className="flex items-center">
                <span className="text-accent mr-2">06.</span> 激(仮)
              </li>
            </ul>
            <Link href="/music" className="btn-punk">
              全ての楽曲
            </Link>
          </div>
        </div>
      </section>

      {/* ライブ情報セクション - LiveListコンポーネントを使用 */}
      {liveData.length > 0 && (
        <LiveList
          liveData={liveData}
          limit={3} // 最大3件まで表示
          showViewAllButton={true} // 「全てのライブスケジュール」ボタンを表示
        />
      )}

      {/* メンバー紹介セクション - コンポーネント化 */}
      <MemberList memberData={memberData} />
    </main>
  );
}
