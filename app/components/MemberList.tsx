import React from "react";
import { SheetItem } from "@/utils/googleSheets";
// Image コンポーネントが必要な場合にコメント解除
// import Image from "next/image";

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
    sm: "w-24 h-24",
    md: "w-28 h-28",
    lg: "w-40 h-40",
  };

  return (
    <div className="border-2 border-accent p-6 rounded-lg hover:shadow-lg transition-shadow bg-base-100">
      <div className="flex flex-col items-center mb-4">
        <div
          className={`${imageSizeClasses[imageSize]} bg-accent/20 rounded-full mb-4 flex items-center justify-center`}
        >
          {/* 画像サポートの準備 - 使用するときにコメントアウトを解除 */}
          {/* {member["画像"] ? (
            <Image
              src={`/${member["画像"]}`}
              width={imageSize === "lg" ? 200 : imageSize === "md" ? 140 : 120}
              height={imageSize === "lg" ? 200 : imageSize === "md" ? 140 : 120}
              alt={`${member["名前"]}の写真`}
              className="rounded-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold">No Image</span>
          )} */}
          <span className="text-2xl font-bold">No Image</span>
        </div>
        <h3 className="text-2xl font-bold">{member["名前"]}</h3>
        <div className="text-accent mt-1">{member["担当"]}</div>
      </div>

      {member["説明"] && (
        <div className="mb-4">
          <p className="text-sm whitespace-pre-line">{member["説明"]}</p>
        </div>
      )}

      {showFullDetails && (
        <div className="grid grid-cols-1 gap-2 text-sm border-t border-accent/30 pt-4 mt-2">
          {member["使用機材"] && (
            <div className="flex flex-col">
              <span className="font-semibold text-accent/80">使用機材</span>
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
              <span className="font-semibold text-accent/80">好きな食べ物</span>
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
      )}
    </div>
  );
}

// MemberList コンポーネント
export function MemberList({
  memberData,
  title = "メンバー紹介",
}: MemberListProps) {
  if (memberData.length === 0) {
    return null;
  }

  return (
    <section id="members" className="p-8 mb-12 scroll-mt-16">
      <h2 className="text-3xl font-bold mb-6 border-b-2 border-accent pb-2">
        {title}
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {memberData.map((member, index) => (
          <MemberCard key={index} member={member} />
        ))}
      </div>
    </section>
  );
}

// デフォルトエクスポート（MemberListをデフォルトとして提供）
export default MemberList;
