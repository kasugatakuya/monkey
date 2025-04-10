import Link from "next/link";

export default function News() {
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
          <div className="text-5xl text-center relative z-10">NEWS</div>
          <div className="flex justify-center relative z-10">
            <div className="text-xl text-center">ニュース</div>
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
          <div className="text-4xl text-center relative z-10">NEWS</div>
          <div className="flex justify-center relative z-10">
            <div className="text-base text-center">ニュース</div>
          </div>

          {/* モバイル用ボタン */}
          <div className="mt-8 z-10">
            <Link href="/" className="btn-punk text-sm">
              TOPへ戻る
            </Link>
          </div>
        </div>
      </div>

      {/* ニュース */}
      <section className=" p-8 mb-12">
        <h2 className="text-3xl font-bold mb-6">ニュース</h2>

        <article className="mb-12 border-l-4 border-accent pl-4">
          <div className="flex items-center mb-3">
            <time className="text-sm opacity-80">2025/04/10</time>
          </div>
          <h3 className="text-2xl font-bold mb-2">
            武蔵野CITYNIGHTに出演決定!
          </h3>
          <p className="mb-4">
            2025年4月13日(日)に東京都のライブハウス武蔵境STATTOで行われる「武蔵野CITYNIGHT」に出演します。
          </p>
          <ul>
            <li className="mb-2">
              日時: 2025年4月13日(日) open18:00/start18:30
            </li>
            <li className="mb-2">場所: 武蔵境STATTO</li>
            <li className="mb-2">チケット: 前売り2400/ 当日2900 (+drink600)</li>
            <li className="mb-2">
              出演バンド: ①THE TELEPASHITS ②谷 洋平(SHAPEEN!!) ③えんぴつ2本
              ④MONKEY ⑤きよ川 ⑥The.BLUE MOON
            </li>
          </ul>
          <p className="mb-4">詳細は公式サイトをご覧ください。</p>
          <Link
            href="https://www5.hp-ez.com/hp/statto/page176"
            className="text-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            武蔵境STATTO公式サイト
          </Link>
        </article>

        <article className="mb-12 border-l-4 border-accent pl-4">
          <div className="flex items-center mb-3">
            <time className="text-sm opacity-80">2025/04/09</time>
          </div>
          <h3 className="text-2xl font-bold mb-2">
            公式ホームページがオープンしました!
          </h3>
          <p className="mb-4">
            MONKEYの公式ホームページがオープンしました。今後ともよろしくお願いいたします。
          </p>
        </article>
      </section>
    </main>
  );
}
