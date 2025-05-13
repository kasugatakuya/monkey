import React from "react";

import { getAllSpreadsheetsData, SheetItem } from "@/utils/googleSheets";
import { TitleSection } from "@/app/components/TitleSection";
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

export default async function Live() {
  // 全てのスプレッドシートのデータを取得
  const allData = await getSheetData();

  // データをタイプで分類
  const liveData = allData.filter((item) => item._sheetType === "live");

  return (
    <main className="mx-5 md:mx-20">
      {/* タイトルセクション */}
      <TitleSection
        title="LIVE"
        subtitle="ライブ情報"
        backToTopButton={true} // TOPに戻るボタンを表示
      />

      {/* ライブ情報セクション - LiveListコンポーネントを使用 */}
      {liveData.length > 0 && (
        <LiveList
          liveData={liveData}
          // limit指定なし = 全件表示
          showViewAllButton={false} // 「全てのライブスケジュール」ボタンは不要
        />
      )}
    </main>
  );
}
