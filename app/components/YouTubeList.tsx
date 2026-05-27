import React from "react";
import { SheetItem } from "@/utils/googleSheets";

// YouTubeListコンポーネントの型定義
interface YouTubeListProps {
  youtubeData: SheetItem[];
}

// YouTube URLから埋め込み用URLを生成する関数
function getEmbedUrl(url: string): string | null {
  if (!url) return null;

  // youtube.com/watch?v=VIDEO_ID 形式
  const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }

  // youtu.be/VIDEO_ID 形式
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  // 既に埋め込みURL形式の場合
  if (url.includes("youtube.com/embed/")) {
    return url;
  }

  return null;
}

export const YouTubeList: React.FC<YouTubeListProps> = ({ youtubeData }) => {
  if (youtubeData.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="p-2">
        {/* パンクスタイルのセクションタイトル */}
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-accent pb-2">
          ライブ映像
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {youtubeData.map((video, index) => {
            const embedUrl = getEmbedUrl(video["動画URL"] as string);
            if (!embedUrl) return null;

            return (
              <div key={index} className="relative group">
                {/* パンクスタイルの破れた紙風エフェクト */}
                <div className="absolute -inset-1 bg-accent/20 transform rotate-1 group-hover:rotate-2 transition-transform"></div>

                {/* メインカード */}
                <div className="relative bg-background border-4 border-accent p-6 transition-all group-hover:transform group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_rgba(255,45,45,0.5)]">
                  {/* ダメージエフェクトの装飾 */}
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-accent"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-secondary"></div>

                  {/* タイトル */}
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight transform -skew-x-3 text-accent -webkit-text-stroke-1 -webkit-text-stroke-black mb-4">
                    {video["タイトル"]}
                  </h3>

                  {/* YouTube iframe */}
                  <div className="relative" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={embedUrl}
                      title={video["タイトル"] as string}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
