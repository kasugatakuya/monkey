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

export default async function News() {
  // 全てのスプレッドシートのデータを取得
  const allData = await getSheetData();

  // データをタイプで分類
  const newsData = allData.filter((item) => item._sheetType === "news");

  // ニュースデータを日付で新しい順にソート
  const sortedNewsData = [...newsData].sort((a, b) => {
    const dateA = new Date(a["日付"] || "");
    const dateB = new Date(b["日付"] || "");

    // 日付が無効な場合は比較しない
    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      return 0;
    }

    return dateB.getTime() - dateA.getTime();
  });

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
          <div className="text-5xl text-center relative z-10">NEWS</div>
          <div className="flex justify-center relative z-10">
            <div className="text-xl text-center">ニュース</div>
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
          <div className="text-4xl text-center relative z-10">NEWS</div>
          <div className="flex justify-center relative z-10">
            <div className="text-base text-center">ニュース</div>
          </div>

          {/* モバイル用ボタン */}
          <div className="mt-8 z-10">
            <Link href="/" className="btn-punk text-sm">
              TOPへ戻る
            </Link>
          </div>
        </div>
      </div>
      {/* ニュース */}
      {sortedNewsData.length > 0 && (
        <section id="news" className="p-8 mb-12 scroll-mt-16">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-accent pb-2">
            ニュース
          </h2>

          {sortedNewsData.map((row, rowIndex) => (
            <article
              className="mb-12 border-l-4 border-accent pl-4"
              key={rowIndex}
            >
              <div className="flex items-center mb-3">
                <time className="text-sm opacity-80">{row["日付"]}</time>
              </div>
              <h3 className="text-2xl font-bold mb-2">{row["タイトル"]}</h3>
              <p className="mb-4 whitespace-pre-line">{row["内容"]}</p>
              {row["リンクURL"] && (
                <Link
                  href={row["リンクURL"]}
                  className="text-accent hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {row["リンクテキスト"] || "詳細を見る"}
                </Link>
              )}
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
