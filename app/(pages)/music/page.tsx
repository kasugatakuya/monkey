import Link from "next/link";
export default function Music() {
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
          <div className="text-5xl text-center relative z-10">MUSIC</div>
          <div className="flex justify-center relative z-10">
            <div className="text-xl text-center">楽曲</div>
          </div>

          {/* CTAボタン */}
          <div className="mt-12 z-10">
            <Link href="/" className="btn-punk">
              TOPへ戻る
            </Link>
          </div>
        </div>

        {/* モバイル用コンテンツ (md未満) */}
        <div className="absolute inset-0 flex md:hidden flex-col items-center justify-center -mt-14">
          {/* モバイル用スタイル - PCと同じデザインに */}
          <div className="text-4xl text-center relative z-10">MUSIC</div>
          <div className="flex justify-center relative z-10">
            <div className="text-base text-center">楽曲</div>
          </div>

          {/* モバイル用ボタン */}
          <div className="mt-8 z-10">
            <Link href="/" className="btn-punk text-sm">
              TOPへ戻る
            </Link>
          </div>
        </div>
      </div>

      {/* 最新リリース */}
      <section className="punk-section p-8 mb-20">
        <h2 className="text-3xl font-bold text-distressed text-accent mb-6">
          最新リリース
        </h2>
        <div className="md:flex items-center">
          <div className="md:w-1/2 p-4">
            <div className="aspect-square bg-black relative">
              {/* アルバムアートワークのプレースホルダー */}
              <div className="absolute inset-0 border-2 border-accent transform rotate-2"></div>
              <div className="absolute inset-0 bg-black flex items-center justify-center transform -rotate-1">
                <span className="text-4xl font-bold text-distressed">
                  近日公開予定
                </span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 p-4">
            <h3 className="text-2xl font-bold text-secondary mb-2">
              タイトル未定
            </h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-accent mr-2">01.</span> MONKEYのテーマ(仮)
              </li>
              <li className="flex items-center">
                <span className="text-accent mr-2">02.</span>
                パンクノットデッド(仮)
              </li>
              <li className="flex items-center">
                <span className="text-accent mr-2">03.</span> 役人ファック(仮)
              </li>
              <li className="flex items-center">
                <span className="text-accent mr-2">04.</span> 始まりのうた(仮)
              </li>
              <li className="flex items-center">
                <span className="text-accent mr-2">05.</span> あっちいけ(仮)
              </li>
              <li className="flex items-center">
                <span className="text-accent mr-2">06.</span> 激情(仮)
              </li>
              <li className="flex items-center">
                <span className="text-accent mr-2">07.</span> 壊れた(仮)
              </li>
              <li className="flex items-center">
                <span className="text-accent mr-2">08.</span>
                名無しのバラード(仮)
              </li>
              <li className="flex items-center">
                <span className="text-accent mr-2">09.</span> 地団駄(仮)
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
