import Link from "next/link";
import React from "react";

import { getAllSpreadsheetsData, SheetItem } from "@/utils/googleSheets";

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

export default async function Music() {
  // 全てのスプレッドシートのデータを取得
  const allData = await getSheetData();

  // データをタイプで分類
  const musicData = allData.filter((item) => item._sheetType === "music");
  const otherData = allData.filter((item) => item._sheetType === "unknown");

  return (
    <main className="mx-5 md:mx-20">
      {/* ダメージ効果のあるヒーローセクション - ヘッダーを考慮して中央に配置 */}
      <div className="title flex min-h-screen flex-col items-center justify-center relative">
        {/* 装飾要素 */}
        <div className="absolute top-1/4 left-10 w-20 h-20 border-4 border-accent opacity-30 rotate-12"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 border-4 border-secondary opacity-20 -rotate-12"></div>

        {/* 背景ノイズテクスチャ（オプション） */}
        <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay pointer-events-none"></div>

        {/* PC/タブレット用コンテンツ (md以上) */}
        <div className="absolute inset-0 hidden md:flex flex-col items-center justify-center -mt-16">
          {/* パンクスタイルのメインタイトル - 中央揃え */}
          <div className="text-5xl text-center relative z-10">MUSIC</div>
          <div className="flex justify-center relative z-10">
            <div className="text-xl text-center">楽曲</div>
          </div>

          {/* CTAボタン */}
          <div className="mt-12 z-10 flex gap-4">
            <Link href="/" className="btn-punk">
              TOPへ戻る
            </Link>
          </div>
        </div>

        {/* モバイル用コンテンツ (md未満) */}
        <div className="absolute inset-0 flex md:hidden flex-col items-center justify-center -translate-y-8">
          {/* モバイル用スタイル - PCと同じデザインに */}
          <div className="text-4xl text-center relative z-10">MUSIC</div>
          <div className="flex justify-center relative z-10">
            <div className="text-base text-center">楽曲</div>
          </div>

          {/* モバイル用ボタン */}
          <div className="mt-8 z-10">
            <Link href="/" className="btn-punk text-sm">
              TOPへ戻る
            </Link>
          </div>
        </div>
      </div>

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
              <li className="flex items-center">
                <span className="text-accent mr-2">07.</span> 壊れた(仮)
              </li>
              <li className="flex items-center">
                <span className="text-accent mr-2">08.</span>
                名無しのバラード(仮)
              </li>
              <li className="flex items-center">
                <span className="text-accent mr-2">09.</span> 地団駄(仮)
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* その他のデータ（不明なフォーマット）があれば表示 */}
      {otherData.length > 0 && (
        <section id="other" className="p-8 mb-12 scroll-mt-16">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-accent pb-2">
            その他の情報
          </h2>

          <div className="grid gap-6">
            {otherData.map((item, index) => (
              <div key={index} className="border p-4 rounded">
                <h3 className="text-xl font-bold mb-2">項目 {index + 1}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(item)
                    .filter(([key]) => !key.startsWith("_")) // 内部使用のフィールドは除外
                    .map(([key, value]) => (
                      <React.Fragment key={key}>
                        <div className="font-semibold">{key}:</div>
                        <div>{String(value)}</div>
                      </React.Fragment>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
