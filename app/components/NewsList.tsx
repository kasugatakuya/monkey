import Link from "next/link";
import React from "react";
import { SheetItem } from "@/utils/googleSheets";

type NewsListProps = {
  newsData: SheetItem[];
  limit?: number; // 表示件数の制限（オプション）
  showViewAllButton?: boolean; // 「全てのニュース」ボタンを表示するかどうか
};

export const NewsList: React.FC<NewsListProps> = ({
  newsData,
  limit,
  showViewAllButton = false,
}) => {
  // ニュースデータを日付で新しい順にソート
  const sortedNewsData = [...newsData].sort((a, b) => {
    // 日付の値が存在するか確認し、存在しない場合は空文字列をデフォルト値として使用
    const dateStrA = typeof a["日付"] === "string" ? a["日付"] : "";
    const dateStrB = typeof b["日付"] === "string" ? b["日付"] : "";

    const dateA = new Date(dateStrA);
    const dateB = new Date(dateStrB);

    // 日付が無効な場合は比較しない
    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      return 0;
    }

    return dateB.getTime() - dateA.getTime();
  });

  // 表示するニュースデータ（limit指定がある場合は制限する）
  const displayNewsData = limit
    ? sortedNewsData.slice(0, limit)
    : sortedNewsData;

  return (
    <section id="news" className="p-2 mb-12 scroll-mt-16">
      <h2 className="text-3xl font-bold mb-6 border-b-2 border-accent pb-2">
        ニュース
      </h2>

      <div className="space-y-8">
        {displayNewsData.map((row, rowIndex) => (
          <article className="relative group" key={rowIndex}>
            {/* パンクスタイルの破れた紙風エフェクト */}
            <div className="absolute -inset-1 bg-accent/10 transform -rotate-1 group-hover:rotate-1 transition-transform"></div>

            {/* メインコンテンツ */}
            <div className="relative bg-background border-4 border-accent p-6 transition-all group-hover:transform group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_rgba(255,45,45,0.5)]">
              {/* ダメージエフェクトの装飾 */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-secondary"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-accent"></div>

              <div className="flex items-center mb-3">
                <time className="text-sm bg-accent text-background px-2 py-1 font-bold uppercase transform -skew-x-6">
                  {row["日付"]}
                </time>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight transform -skew-x-3 text-secondary -webkit-text-stroke-1 -webkit-text-stroke-black mb-3">
                {row["タイトル"]}
              </h3>
              <p className="mb-4 whitespace-pre-line font-medium">
                {row["内容"]}
              </p>
              {row["リンクURL"] && typeof row["リンクURL"] === "string" && (
                <Link
                  href={row["リンクURL"]}
                  className="inline-block bg-accent text-background px-4 py-2 font-bold uppercase transform hover:skew-x-3 hover:bg-secondary transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {typeof row["リンクテキスト"] === "string"
                    ? row["リンクテキスト"]
                    : "詳細を見る"}
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>

      {showViewAllButton && (
        <div className="text-center mt-8">
          <Link href="/news" className="btn-punk">
            全てのニュース
          </Link>
        </div>
      )}
    </section>
  );
};
