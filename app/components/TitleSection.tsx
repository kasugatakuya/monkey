import Link from "next/link";
import React from "react";

interface TitleSectionProps {
  title: string;
  subtitle: string;
  backToTopButton?: boolean;
}

export function TitleSection({
  title,
  subtitle,
  backToTopButton = false,
}: TitleSectionProps) {
  return (
    <div className="title flex min-h-screen flex-col items-center justify-center relative">
      {/* 装飾要素 */}
      <div className="absolute top-1/4 left-10 w-20 h-20 border-4 border-accent opacity-30 rotate-12"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 border-4 border-secondary opacity-20 -rotate-12"></div>

      {/* 背景ノイズテクスチャ（オプション） */}
      <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay pointer-events-none"></div>

      {/* PC/タブレット用コンテンツ (md以上) */}
      <div className="absolute inset-0 hidden md:flex flex-col items-center justify-center -mt-16">
        {/* パンクスタイルのメインタイトル - 中央揃え */}
        <div className="text-5xl text-center relative z-10">{title}</div>
        <div className="flex justify-center relative z-10">
          <div className="text-xl text-center">{subtitle}</div>
        </div>

        {/* CTAボタン */}
        <div className="mt-12 z-10 flex gap-4">
          {backToTopButton ? (
            <Link href="/" className="btn-punk">
              TOPに戻る
            </Link>
          ) : (
            <Link href="/live" className="btn-punk">
              ライブスケジュール
            </Link>
          )}
        </div>
      </div>

      {/* モバイル用コンテンツ (md未満) */}
      <div className="absolute inset-0 flex md:hidden flex-col items-center justify-center -translate-y-8">
        {/* モバイル用スタイル - PCと同じデザインに */}
        <div className="text-4xl text-center relative z-10">{title}</div>
        <div className="flex justify-center relative z-10">
          <div className="text-base text-center">{subtitle}</div>
        </div>

        {/* モバイル用ボタン */}
        <div className="mt-8 z-10">
          {backToTopButton ? (
            <Link href="/" className="btn-punk text-sm">
              TOPに戻る
            </Link>
          ) : (
            <Link href="/live" className="btn-punk text-sm">
              ライブスケジュール
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
