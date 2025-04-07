export default function Home() {
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
          <div className="text-5xl text-center relative z-10">MONKEY</div>
          <div className="flex justify-center relative z-10">
            <div className="text-xl text-center">パンクロックバンド</div>
          </div>

          {/* CTAボタン */}
          <div className="mt-12 z-10">
            <a href="/live" className="btn-punk">
              UPCOMING SHOWS
            </a>
          </div>
        </div>

        {/* モバイル用コンテンツ (md未満) */}
        <div className="absolute inset-0 flex md:hidden flex-col items-center justify-center -mt-14">
          {/* モバイル用スタイル */}
          <div className="text-4xl text-center relative z-10 text-accent font-bold transform -skew-x-6 uppercase tracking-tighter">
            MONKEY
          </div>
          <div className="flex justify-center relative z-10 mt-3">
            <div className="text-base text-center bg-secondary text-black font-bold px-3 py-1 transform rotate-2 tracking-wider shadow-md">
              パンクロックバンド
            </div>
          </div>

          {/* モバイル用ボタン */}
          <div className="mt-8 z-10">
            <a href="/live" className="btn-punk text-sm">
              UPCOMING SHOWS
            </a>
          </div>
        </div>
      </div>

      {/* 最新リリースセクション */}
      <section className="punk-section p-8 mb-20">
        <h2 className="text-3xl font-bold text-distressed text-accent mb-6">
          LATEST RELEASE
        </h2>
        <div className="md:flex items-center">
          <div className="md:w-1/2 p-4">
            <div className="aspect-square bg-black relative">
              {/* アルバムアートワークのプレースホルダー */}
              <div className="absolute inset-0 border-2 border-accent transform rotate-2"></div>
              <div className="absolute inset-0 bg-black flex items-center justify-center transform -rotate-1">
                <span className="text-4xl font-bold text-distressed">
                  NEW ALBUM
                </span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 p-4">
            <h3 className="text-2xl font-bold text-secondary mb-2">
              CHAOS THEORY
            </h3>
            <p className="mb-4">OUT NOW ON ALL PLATFORMS</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-accent mr-2">01.</span> Riot Season
              </li>
              <li className="flex items-center">
                <span className="text-accent mr-2">02.</span> Electric Anarchy
              </li>
              <li className="flex items-center">
                <span className="text-accent mr-2">03.</span> Tokyo Nights
              </li>
              <li className="flex items-center">
                <span className="text-accent mr-2">04.</span> Generation Zero
              </li>
              <li className="flex items-center">
                <span className="text-accent mr-2">05.</span> Concrete Jungle
              </li>
            </ul>
            <a href="/music" className="btn-punk">
              LISTEN NOW
            </a>
          </div>
        </div>
      </section>

      {/* ツアー日程のティーザー */}
      <section className="torn-edge bg-accent text-black p-8 mb-20">
        <h2 className="text-3xl font-bold mb-6">ON TOUR</h2>
        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="font-bold">APR 15</span>
            <span>TOKYO - LIQUIDROOM</span>
            <span className="hidden md:block">TICKETS</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">APR 22</span>
            <span>OSAKA - BIGCAT</span>
            <span className="hidden md:block">SOLD OUT</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">APR 29</span>
            <span>NAGOYA - DIAMOND HALL</span>
            <span className="hidden md:block">TICKETS</span>
          </div>
        </div>
        <div className="text-center">
          <a href="/live" className="btn-punk bg-black text-white">
            ALL DATES
          </a>
        </div>
      </section>

      {/* ニュースレター登録 */}
      <section className="punk-section p-8 mb-20">
        <h2 className="text-3xl font-bold text-distressed text-accent mb-6">
          JOIN THE RIOT
        </h2>
        <p className="mb-6">
          Get exclusive access to ticket pre-sales, new music drops, and
          behind-the-scenes chaos.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="email"
            placeholder="YOUR EMAIL"
            className="bg-black border-2 border-accent p-3 w-full md:w-2/3"
          />
          <button className="btn-punk md:w-1/3">SUBSCRIBE</button>
        </div>
      </section>
    </main>
  );
}
