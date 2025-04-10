import Link from "next/link";
import { getAllSheetData, formatSheetData } from "@/utils/googleSheets";

// キャッシュを無効化し、毎回のリクエストで再検証
export const revalidate = 0;

// サーバーコンポーネントでのデータ取得
async function getSheetData() {
  try {
    console.log("シートデータを取得中..."); // デバッグログ
    const timestamp = new Date().toISOString(); // タイムスタンプを追加
    console.log("データ取得開始時間:", timestamp);

    const sheetData = await getAllSheetData();
    console.log(
      "取得したデータ:",
      JSON.stringify(sheetData).substring(0, 200) + "..."
    ); // 一部を表示

    return formatSheetData(sheetData);
  } catch (error) {
    console.error("データ取得エラー:", error);
    return [];
  }
}

export default async function Test() {
  // スプレッドシートのデータを取得
  const data = await getSheetData();

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
          <div className="text-5xl text-center relative z-10">TEST</div>
          <div className="flex justify-center relative z-10">
            <div className="text-xl text-center">テスト</div>
          </div>

          {/* CTAボタン */}
          <div className="mt-12 z-10">
            <Link href="/" className="btn-punk">
              TOPへ戻る
            </Link>
          </div>
        </div>

        {/* モバイル用コンテンツ (md未満) */}
        <div className="absolute inset-0 flex md:hidden flex-col items-center justify-center -translate-y-8">
          {/* モバイル用スタイル - PCと同じデザインに */}
          <div className="text-4xl text-center relative z-10">TEST</div>
          <div className="flex justify-center relative z-10">
            <div className="text-base text-center">テスト</div>
          </div>

          {/* モバイル用ボタン */}
          <div className="mt-8 z-10">
            <Link href="/" className="btn-punk text-sm">
              TOPへ戻る
            </Link>
          </div>
        </div>
      </div>

      {/* スプレッドシートデータ表示セクション */}
      <section className="p-8 mb-12">
        <h2 className="text-3xl font-bold mb-6">Google Sheetsのデータ</h2>
        <p className="text-sm text-gray-500 mb-4">
          最終更新: {new Date().toLocaleString()}
        </p>

        {data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <thead>
                <tr>
                  {Object.keys(data[0]).map((header, index) => (
                    <th
                      key={index}
                      className="px-4 py-2 border-b border-r border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-left"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-4 py-2 border-b border-r border-gray-200 dark:border-gray-700"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 p-4 rounded-md">
            <p className="text-yellow-700 dark:text-yellow-400">
              スプレッドシートからデータを取得できませんでした。設定を確認してください。
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
