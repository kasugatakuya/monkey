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
    <section id="news" className="p-8 mb-12 scroll-mt-16">
      <h2 className="text-3xl font-bold mb-6 border-b-2 border-accent pb-2">
        ニュース
      </h2>

      {displayNewsData.map((row, rowIndex) => (
        <article className="mb-12 border-l-4 border-accent pl-4" key={rowIndex}>
          <div className="flex items-center mb-3">
            <time className="text-sm opacity-80">{row["日付"]}</time>
          </div>
          <h3 className="text-2xl font-bold mb-2">{row["タイトル"]}</h3>
          <p className="mb-4 whitespace-pre-line">{row["内容"]}</p>
          {row["リンクURL"] && typeof row["リンクURL"] === "string" && (
            <Link
              href={row["リンクURL"]}
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {typeof row["リンクテキスト"] === "string"
                ? row["リンクテキスト"]
                : "詳細を見る"}
            </Link>
          )}
        </article>
      ))}

      {showViewAllButton && (
        <div className="text-center">
          <Link href="/news" className="btn-punk">
            全てのニュース
          </Link>
        </div>
      )}
    </section>
  );
};
