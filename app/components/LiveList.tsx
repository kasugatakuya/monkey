import Link from "next/link";
import React from "react";
import { SheetItem } from "@/utils/googleSheets";

type LiveListProps = {
  liveData: SheetItem[];
  limit?: number; // 表示件数の制限（オプション）
  showViewAllButton?: boolean; // 「全てのライブスケジュール」ボタンを表示するかどうか
};

export const LiveList: React.FC<LiveListProps> = ({
  liveData,
  limit,
  showViewAllButton = false,
}) => {
  // ライブデータを日時で昇順にソート（未来のライブが先に来るように）
  const sortedLiveData = [...liveData].sort((a, b) => {
    // 日時の値が存在するか確認し、存在しない場合は空文字列をデフォルト値として使用
    const dateStrA = typeof a["日時"] === "string" ? a["日時"] : "";
    const dateStrB = typeof b["日時"] === "string" ? b["日時"] : "";

    const dateA = new Date(dateStrA);
    const dateB = new Date(dateStrB);

    // 日付が無効な場合は比較しない
    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      return 0;
    }

    return dateA.getTime() - dateB.getTime(); // 未来のライブが先に来るように昇順でソート
  });

  // 表示するライブデータ（limit指定がある場合は制限する）
  const displayLiveData = limit
    ? sortedLiveData.slice(0, limit)
    : sortedLiveData;

  return (
    <section id="live" className="p-8 mb-12 scroll-mt-16">
      <h2 className="text-3xl font-bold mb-6 border-b-2 border-accent pb-2">
        ライブ情報
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {displayLiveData.map((live, index) => (
          <div
            key={index}
            className="border-2 border-accent p-4 rounded-lg hover:shadow-lg transition-shadow bg-base-100"
          >
            <h3 className="text-xl font-bold mb-2">
              {typeof live["ライブ名"] === "string" ? live["ライブ名"] : ""}
            </h3>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="font-semibold text-accent/80">日時:</div>
              <div className="col-span-2">
                {typeof live["日時"] === "string" ? live["日時"] : ""}
              </div>

              <div className="font-semibold text-accent/80">場所:</div>
              <div className="col-span-2">
                {typeof live["場所"] === "string" ? live["場所"] : ""}
              </div>

              <div className="font-semibold text-accent/80">チケット:</div>
              <div className="col-span-2">
                {typeof live["チケット代"] === "string"
                  ? live["チケット代"]
                  : ""}
              </div>

              <div className="font-semibold text-accent/80">販売状況:</div>
              <div className="col-span-2">
                {typeof live["販売状況"] === "string" ? live["販売状況"] : ""}
              </div>
            </div>
            {live["説明"] && typeof live["説明"] === "string" && (
              <div className="mb-3">
                <p className="text-sm whitespace-pre-line">{live["説明"]}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {showViewAllButton && (
        <div className="text-center">
          <Link href="/live" className="btn-punk bg-black text-foreground">
            全てのライブスケジュール
          </Link>
        </div>
      )}
    </section>
  );
};
