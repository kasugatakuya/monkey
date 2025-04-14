import Link from "next/link";
import React from "react";
// import Image from "next/image";

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
  const memberData = allData.filter((item) => item._sheetType === "member");

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
          <div className="text-5xl text-center relative z-10">MEMBER</div>
          <div className="flex justify-center relative z-10">
            <div className="text-xl text-center">バンドメンバー</div>
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
          <div className="text-4xl text-center relative z-10">MEMBER</div>
          <div className="flex justify-center relative z-10">
            <div className="text-base text-center">バンドメンバー</div>
          </div>

          {/* モバイル用ボタン */}
          <div className="mt-8 z-10">
            <Link href="/" className="btn-punk text-sm">
              TOPに戻る
            </Link>
          </div>
        </div>
      </div>

      {/* バンドメンバーセクション */}
      {memberData.length > 0 && (
        <section id="members" className="p-8 mb-12 scroll-mt-16">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-accent pb-2">
            バンドメンバー
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {memberData.map((member, index) => (
              <div
                key={index}
                className="border-2 border-accent p-6 rounded-lg hover:shadow-lg transition-shadow bg-base-100"
              >
                <div className="flex flex-col items-center mb-4">
                  <div className="w-40 h-40 bg-accent/20 rounded-full mb-4 flex items-center justify-center">
                    {/* <Image
                      src={`/${member["画像"]}`}
                      width={200}
                      height={200}
                      alt="X"
                    /> */}
                    {/* メンバーの頭文字をアバター代わりに表示 */}
                    {/* <span className="text-4xl font-bold">
                      {member["名前"]?.charAt(0) || "?"}
                    </span> */}
                    <span className="text-2xl font-bold">No Image</span>
                  </div>
                  <h3 className="text-2xl font-bold">{member["名前"]}</h3>
                  <div className="text-accent mt-1">{member["担当"]}</div>
                </div>

                {member["説明"] && (
                  <div className="mb-4">
                    <p className="text-sm whitespace-pre-line">
                      {member["説明"]}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-2 text-sm border-t border-accent/30 pt-4 mt-2">
                  {member["使用機材"] && (
                    <div className="flex flex-col">
                      <span className="font-semibold text-accent/80">
                        使用機材
                      </span>
                      <span>{member["使用機材"]}</span>
                    </div>
                  )}

                  {member["好きなアーティスト"] && (
                    <div className="flex flex-col">
                      <span className="font-semibold text-accent/80">
                        好きなアーティスト
                      </span>
                      <span>{member["好きなアーティスト"]}</span>
                    </div>
                  )}

                  {member["好きな食べ物"] && (
                    <div className="flex flex-col">
                      <span className="font-semibold text-accent/80">
                        好きな食べ物
                      </span>
                      <span>{member["好きな食べ物"]}</span>
                    </div>
                  )}

                  {member["趣味"] && (
                    <div className="flex flex-col">
                      <span className="font-semibold text-accent/80">趣味</span>
                      <span>{member["趣味"]}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

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
