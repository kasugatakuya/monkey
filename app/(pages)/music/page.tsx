import React from "react";

import { getAllSpreadsheetsData, SheetItem } from "@/utils/googleSheets";
import { TitleSection } from "@/app/components/TitleSection";
import { MusicList } from "@/app/components/MusicList";

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

  return (
    <main className="mx-5 md:mx-20">
      {/* タイトルセクション */}
      <TitleSection
        title="MUSIC"
        subtitle="楽曲情報"
        backToTopButton={true} // TOPに戻るボタンを表示
      />

      {/* 楽曲セクションとアルバム - MusicListコンポーネントを使用 */}
      {musicData.length > 0 && (
        <MusicList
          musicData={musicData}
          showViewAllButton={false} // 「全ての楽曲」ボタンを非表示
        />
      )}
    </main>
  );
}
