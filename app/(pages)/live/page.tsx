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

export default async function Top() {
  // 全てのスプレッドシートのデータを取得
  const allData = await getSheetData();

  // データをタイプで分類
  const liveData = allData.filter((item) => item._sheetType === "live");

  // ライブデータを日時で新しい順にソート
  const sortedLiveData = [...liveData].sort((a, b) => {
    const dateA = new Date(a["日時"] || "");
    const dateB = new Date(b["日時"] || "");

    // 日付が無効な場合は比較しない
    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      return 0;
    }

    return dateA.getTime() - dateB.getTime(); // 未来のライブが先に来るように昇順でソート
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
          <div className="text-5xl text-center relative z-10">LIVE</div>
          <div className="flex justify-center relative z-10">
            <div className="text-xl text-center">ライブ情報</div>
          </div>

          {/* CTAボタン */}
          <div className="mt-12 z-10 flex gap-4">
            <Link href="/" className="btn-punk">
              TOPに戻る
            </Link>
          </div>
        </div>

        {/* モバイル用コンテンツ (md未満) */}
        <div className="absolute inset-0 flex md:hidden flex-col items-center justify-center -translate-y-8">
          {/* モバイル用スタイル - PCと同じデザインに */}
          <div className="text-4xl text-center relative z-10">LIVE</div>
          <div className="flex justify-center relative z-10">
            <div className="text-base text-center">ライブ情報</div>
          </div>

          {/* モバイル用ボタン */}
          <div className="mt-8 z-10">
            <Link href="/" className="btn-punk text-sm">
              TOPに戻る
            </Link>
          </div>
        </div>
      </div>

      {/* ライブ情報セクション */}
      {sortedLiveData.length > 0 && (
        <section id="live" className="p-8 mb-12 scroll-mt-16">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-accent pb-2">
            ライブ情報
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {sortedLiveData.map((live, index) => (
              <div
                key={index}
                className="border-2 border-accent p-4 rounded-lg hover:shadow-lg transition-shadow bg-base-100"
              >
                <h3 className="text-xl font-bold mb-2">{live["ライブ名"]}</h3>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="font-semibold text-accent/80">日時:</div>
                  <div className="col-span-2">{live["日時"]}</div>

                  <div className="font-semibold text-accent/80">場所:</div>
                  <div className="col-span-2">{live["場所"]}</div>

                  <div className="font-semibold text-accent/80">チケット:</div>
                  <div className="col-span-2">{live["チケット代"]}</div>

                  <div className="font-semibold text-accent/80">販売状況:</div>
                  <div className="col-span-2">{live["販売状況"]}</div>
                </div>
                {live["説明"] && (
                  <div className="mb-3">
                    <p className="text-sm whitespace-pre-line">
                      {live["説明"]}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
