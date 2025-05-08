import Link from "next/link";
import React from "react";

import { getAllSpreadsheetsData, SheetItem } from "@/utils/googleSheets";
import { TitleSection } from "@/app/components/TitleSection";

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
      {/* タイトルセクション */}
      <TitleSection
        title="NEWS"
        subtitle="ニュース"
        backToTopButton={true} // TOPに戻るボタンを表示
      />

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
