import React from "react";
import { SheetItem } from "@/utils/googleSheets";
import Image from "next/image";

// MemberCard のプロパティ定義
interface MemberCardProps {
  member: SheetItem;
  imageSize?: "sm" | "md" | "lg";
  showFullDetails?: boolean;
}

// MemberList のプロパティ定義
interface MemberListProps {
  memberData: SheetItem[];
  title?: string;
}

// MemberCard コンポーネント
export function MemberCard({
  member,
  imageSize = "md",
  showFullDetails = true,
}: MemberCardProps) {
  // サイズに応じたクラス名を生成
  const imageSizeClasses = {
    sm: "w-32 h-32",
    md: "w-40 h-40",
    lg: "w-48 h-48",
  };

  return (
    <div className="relative w-full group">
      {/* パンクスタイルの破れた紙風エフェクト */}
      <div className="absolute -inset-1 bg-accent/20 transform rotate-1 group-hover:rotate-2 transition-transform"></div>

      {/* メインカード */}
      <div className="relative bg-background border-4 border-accent p-6 md:p-8 transition-all group-hover:transform group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_rgba(255,45,45,0.5)]">
        {/* ダメージエフェクトの装飾 */}
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-accent"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-secondary"></div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* 画像部分 */}
          <div className="relative">
            <div
              className={`${imageSizeClasses[imageSize]} bg-accent/10 border-4 border-accent transform -rotate-3 group-hover:rotate-0 transition-transform flex items-center justify-center overflow-hidden`}
            >
              {/* ノイズテクスチャ */}
              <div className="absolute inset-0 bg-noise opacity-20"></div>

              {/* 画像サポートの準備 - 使用するときにコメントアウトを解除 */}
              {member["画像"] ? (
                <Image
                  src={`/${member["画像"]}`}
                  width={
                    imageSize === "lg" ? 240 : imageSize === "md" ? 200 : 160
                  }
                  height={
                    imageSize === "lg" ? 240 : imageSize === "md" ? 200 : 160
                  }
                  alt={`${member["名前"]}の写真`}
                  className="object-cover filter contrast-125"
                />
              ) : (
                <span className="text-3xl font-bold uppercase tracking-wider transform skew-y-6">
                  No Image
                </span>
              )}
            </div>
          </div>

          {/* テキスト情報 */}
          <div className="flex-1 text-center md:text-left">
            {/* 名前と担当 */}
            <div className="text-xl md:text-3xl font-black uppercase tracking-tight transform -skew-x-3 text-accent -webkit-text-stroke-1 -webkit-text-stroke-black leading-tight">
              {member["名前"]}
            </div>
            <div className="md:ml-1 font-black uppercase tracking-tight transform -skew-x-3 text-accent -webkit-text-stroke-1 -webkit-text-stroke-black leading-tight mt-2 mb-4">
              {member["担当"]}
            </div>

            {/* 説明文 */}
            {member["説明"] && (
              <div className="mb-7 bg-background/50 border-2 border-dashed border-accent/50 p-4 transform -rotate-1">
                <p className="text-base whitespace-pre-line font-bold">
                  {member["説明"]}
                </p>
              </div>
            )}

            {/* 詳細情報 */}
            {showFullDetails && (
              <div className="space-y-3">
                {member["使用機材"] && (
                  <div className="flex flex-col md:flex-row md:items-baseline gap-1">
                    <span className="text-secondary font-black uppercase tracking-wider text-sm">
                      使用機材:
                    </span>
                    <span className="text-base font-bold">
                      {member["使用機材"]}
                    </span>
                  </div>
                )}

                {member["好きなアーティスト"] && (
                  <div className="flex flex-col md:flex-row md:items-baseline gap-1">
                    <span className="text-secondary font-black uppercase tracking-wider text-sm">
                      好きなアーティスト:
                    </span>
                    <span className="text-base font-bold">
                      {member["好きなアーティスト"]}
                    </span>
                  </div>
                )}

                {member["好きな食べ物"] && (
                  <div className="flex flex-col md:flex-row md:items-baseline gap-1">
                    <span className="text-secondary font-black uppercase tracking-wider text-sm">
                      好きな食べ物:
                    </span>
                    <span className="text-base font-bold">
                      {member["好きな食べ物"]}
                    </span>
                  </div>
                )}

                {member["好きな場所"] && (
                  <div className="flex flex-col md:flex-row md:items-baseline gap-1">
                    <span className="text-secondary font-black uppercase tracking-wider text-sm">
                      好きな場所:
                    </span>
                    <span className="text-base font-bold">
                      {member["好きな場所"]}
                    </span>
                  </div>
                )}

                {member["趣味"] && (
                  <div className="flex flex-col md:flex-row md:items-baseline gap-1">
                    <span className="text-secondary font-black uppercase tracking-wider text-sm">
                      趣味:
                    </span>
                    <span className="text-base font-bold">
                      {member["趣味"]}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// MemberList コンポーネント
export function MemberList({ memberData }: MemberListProps) {
  if (memberData.length === 0) {
    return null;
  }

  return (
    <section id="members" className="p-8 mb-12 scroll-mt-16">
      <h2 className="text-3xl font-bold mb-6 border-b-2 border-accent pb-2">
        バンドメンバー
      </h2>
      {/* 縦並びのカードレイアウト */}
      <div className="space-y-8 md:space-y-12">
        {memberData.map((member, index) => (
          <MemberCard key={index} member={member} />
        ))}
      </div>
    </section>
  );
}

// デフォルトエクスポート（MemberListをデフォルトとして提供）
export default MemberList;
