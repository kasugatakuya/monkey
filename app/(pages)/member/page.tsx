import React from "react";

import { getAllSpreadsheetsData, SheetItem } from "@/utils/googleSheets";
import { MemberList } from "@/app/components/MemberList";
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

export default async function Member() {
  // 全てのスプレッドシートのデータを取得
  const allData = await getSheetData();

  // データをタイプで分類
  const memberData = allData.filter((item) => item._sheetType === "member");

  return (
    <main className="mx-5 md:mx-20">
      {/* タイトルセクション */}
      <TitleSection
        title="MEMBER"
        subtitle="バンドメンバー"
        backToTopButton={true} // TOPに戻るボタンを表示
      />

      {/* メンバー紹介セクション - コンポーネント化 */}
      <MemberList memberData={memberData} title="バンドメンバー" />
    </main>
  );
}
