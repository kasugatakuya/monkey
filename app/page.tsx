import React from "react";

import { getAllSpreadsheetsData, SheetItem } from "@/utils/googleSheets";
import { MemberList } from "@/app/components/MemberList";
import { TitleSection } from "@/app/components/TitleSection";
import { NewsList } from "@/app/components/NewsList";
import { LiveList } from "@/app/components/LiveList";
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

      {/* 楽曲セクションとアルバム - MusicListコンポーネントを使用 */}
      {musicData.length > 0 && (
        <MusicList
          musicData={musicData}
          limit={3} // 最大3件まで表示
          showViewAllButton={true} // 「全ての楽曲」ボタンを表示
        />
      )}

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
