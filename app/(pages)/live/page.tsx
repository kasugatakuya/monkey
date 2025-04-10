import Link from "next/link";

export default function Live() {
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
          <div className="text-5xl text-center relative z-10">LIVE</div>
          <div className="flex justify-center relative z-10">
            <div className="text-xl text-center">ライブスケジュール</div>
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
          <div className="text-4xl text-center relative z-10">LIVE</div>
          <div className="flex justify-center relative z-10">
            <div className="text-base text-center">ライブスケジュール</div>
          </div>

          {/* モバイル用ボタン */}
          <div className="mt-8 z-10">
            <Link href="/" className="btn-punk text-sm">
              TOPへ戻る
            </Link>
          </div>
        </div>
      </div>

      {/* ライブスケジュール */}
      <section className="torn-edge bg-accent p-8 mb-20 live-schedule-section">
        <h2 className="text-3xl font-bold mb-6">ライブスケジュール</h2>
        <div className="space-y-4 mb-6">
          {/* スマホでは縦表示、PCでは横表示 */}
          <div className="md:flex md:justify-between md:flex-wrap block space-y-2 md:space-y-0">
            <span className="font-bold block md:inline">2025/04/13(日)</span>
            <span className="block md:inline">
              東京 - 武蔵境STATTO 「武蔵野CITYNIGHT」
            </span>
            <span className="block md:inline">チケット発売中</span>
          </div>
          <div className="md:flex md:justify-between block space-y-2 md:space-y-0">
            <span className="font-bold block md:inline">公演日未定</span>
            <span className="block md:inline">会場未定</span>
            <span className="block md:inline">チケット未定</span>
          </div>
          <div className="md:flex md:justify-between block space-y-2 md:space-y-0">
            <span className="font-bold block md:inline">公演日未定</span>
            <span className="block md:inline">会場未定</span>
            <span className="block md:inline">チケット未定</span>
          </div>
        </div>
      </section>
    </main>
  );
}
