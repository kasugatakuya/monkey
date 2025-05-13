import React from "react";

import { getAllSpreadsheetsData, SheetItem } from "@/utils/googleSheets";
import { TitleSection } from "@/app/components/TitleSection";
import { NewsList } from "@/app/components/NewsList";

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

  return (
    <main className="mx-5 md:mx-20">
      {/* タイトルセクション */}
      <TitleSection
        title="NEWS"
        subtitle="ニュース"
        backToTopButton={true} // TOPに戻るボタンを表示
      />

      {/* ニュース - NewsListコンポーネントを使用 */}
      {newsData.length > 0 && (
        <NewsList
          newsData={newsData}
          // limit指定なし = 全件表示
          showViewAllButton={false} // 「全てのニュース」ボタンは不要
        />
      )}
    </main>
  );
}
