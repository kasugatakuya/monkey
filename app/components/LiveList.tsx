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
    <section id="live" className="p-2 mb-12 scroll-mt-16">
      {/* パンクスタイルのセクションタイトル */}
      <h2 className="text-3xl font-bold mb-6 border-b-2 border-accent pb-2">
        ライブ情報
      </h2>

      {/* 縦並びのカードレイアウト */}
      <div className="space-y-8 md:space-y-12 mb-12">
        {displayLiveData.map((live, index) => (
          <div key={index} className="relative w-full group">
            {/* パンクスタイルの破れた紙風エフェクト */}
            <div className="absolute -inset-1 bg-accent/20 transform rotate-1 group-hover:rotate-2 transition-transform"></div>

            {/* メインカード */}
            <div className="relative bg-background border-4 border-accent p-6 md:p-8 transition-all group-hover:transform group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_rgba(255,45,45,0.5)]">
              {/* ダメージエフェクトの装飾 */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-accent"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-secondary"></div>

              {/* ライブ名 */}
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight transform -skew-x-3 text-accent -webkit-text-stroke-1 -webkit-text-stroke-black mb-4">
                {typeof live["ライブ名"] === "string" ? live["ライブ名"] : ""}
              </h3>

              {/* ライブ情報 */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  {/* 日時 */}
                  <div className="mb-3">
                    <span className="text-secondary font-black uppercase tracking-wider text-sm block mb-1">
                      日時:
                    </span>
                    <span className="text-lg font-bold block bg-black/20 p-2 border-l-4 border-accent">
                      {typeof live["日時"] === "string" ? live["日時"] : ""}
                    </span>
                  </div>

                  {/* 場所 */}
                  <div className="mb-3">
                    <span className="text-secondary font-black uppercase tracking-wider text-sm block mb-1">
                      場所:
                    </span>
                    <span className="text-lg font-bold block bg-black/20 p-2 border-l-4 border-accent">
                      {typeof live["場所"] === "string" ? live["場所"] : ""}
                    </span>
                  </div>
                </div>

                <div>
                  {/* チケット */}
                  <div className="mb-3">
                    <span className="text-secondary font-black uppercase tracking-wider text-sm block mb-1">
                      チケット:
                    </span>
                    <span className="text-lg font-bold block bg-black/20 p-2 border-l-4 border-accent">
                      {typeof live["チケット代"] === "string"
                        ? live["チケット代"]
                        : ""}
                    </span>
                  </div>

                  {/* 販売状況 */}
                  <div className="mb-3">
                    <span className="text-secondary font-black uppercase tracking-wider text-sm block mb-1">
                      販売状況:
                    </span>
                    <span className="text-lg font-bold block bg-black/20 p-2 border-l-4 border-accent">
                      {typeof live["販売状況"] === "string"
                        ? live["販売状況"]
                        : ""}
                    </span>
                  </div>
                </div>
                {/* 詳細 */}
                <div>
                  <span className="text-secondary font-black uppercase tracking-wider text-sm block mb-1">
                    詳細:
                  </span>
                  {live["説明"] && typeof live["説明"] === "string" && (
                    <div>
                      <p className="text-base font-bold whitespace-pre-line bg-black/20 p-2 border-l-4">
                        {typeof live["説明"] === "string" ? live["説明"] : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
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
