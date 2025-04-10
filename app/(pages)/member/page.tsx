import Link from "next/link";
export default function Member() {
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
          <div className="text-5xl text-center relative z-10">MEMBER</div>
          <div className="flex justify-center relative z-10">
            <div className="text-xl text-center">バンドメンバー</div>
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
          <div className="text-4xl text-center relative z-10">MEMBER</div>
          <div className="flex justify-center relative z-10">
            <div className="text-base text-center">バンドメンバー</div>
          </div>

          {/* モバイル用ボタン */}
          <div className="mt-8 z-10">
            <Link href="/" className="btn-punk text-sm">
              TOPへ戻る
            </Link>
          </div>
        </div>
      </div>
      {/* メンバー紹介セクション */}
      <div className="relative py-20 px-4 md:px-10 bg-base-200">
        {/* 装飾要素 */}
        <div className="absolute top-10 right-5 w-16 h-16 border-4 border-accent opacity-20 rotate-45"></div>
        <div className="absolute bottom-10 left-5 w-24 h-24 border-4 border-primary opacity-15 -rotate-12"></div>

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 relative">
          <span className="relative inline-block">
            BAND MEMBERS
            <div className="absolute -bottom-3 left-0 w-full h-1 bg-accent"></div>
          </span>
        </h2>

        <div className="flex flex-col gap-12 max-w-4xl mx-auto">
          {/* ギターボーカル：りゅうじ */}
          <div className="member-section bg-base-100 relative overflow-hidden transform transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-gray-800 relative">
                {/* メンバー画像のプレースホルダー */}
                <div className="aspect-square md:h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                  <span className="text-6xl opacity-30">🎸</span>
                </div>
              </div>
              <div className="md:w-2/3 p-6 relative">
                {/* 役割 */}
                <div className="inline-block pl-1 py-1 bg-accent text-accent-content text-sm font-semibold mb-3">
                  GUITAR & VOCAL
                </div>

                {/* 名前 */}
                <h3 className="text-2xl font-bold mb-4">りゅうじ</h3>

                {/* 説明文（必要に応じて追加） */}
                <p className="text-base-content/80 md:text-lg">
                  {/* バンドのフロントマン。エネルギッシュでワイルドな歌声で観客を魅了する。 */}
                </p>

                {/* 装飾要素 */}
                <div className="absolute bottom-3 right-3 w-10 h-10 border-2 border-accent/30 rotate-12"></div>
              </div>
            </div>
          </div>

          {/* ドラム：じゅん */}
          <div className="member-section bg-base-100 relative overflow-hidden transform transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-gray-800 relative">
                {/* メンバー画像のプレースホルダー */}
                <div className="aspect-square md:h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                  <span className="text-6xl opacity-30">🥁</span>
                </div>
              </div>
              <div className="md:w-2/3 p-6 relative">
                {/* 役割 */}
                <div className="inline-block pl-1 py-1 bg-secondary text-secondary-content text-sm font-semibold mb-3">
                  DRUMS
                </div>

                {/* 名前 */}
                <h3 className="text-2xl font-bold mb-4">じゅん</h3>

                {/* 説明文（必要に応じて追加） */}
                <p className="text-base-content/80 md:text-lg">
                  {/* 精密なリズムと力強いビートでバンドを支える。ライブでのエネルギッシュな演奏が持ち味。 */}
                </p>

                {/* 装飾要素 */}
                <div className="absolute bottom-3 right-3 w-10 h-10 border-2 border-secondary/30 -rotate-12"></div>
              </div>
            </div>
          </div>

          {/* ベース：たくや */}
          <div className="member-section bg-base-100 relative overflow-hidden transform transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-gray-800 relative">
                {/* メンバー画像のプレースホルダー */}
                <div className="aspect-square md:h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                  <span className="text-6xl opacity-30">🎸</span>
                </div>
              </div>
              <div className="md:w-2/3 p-6 relative">
                {/* 役割 */}
                <div className="inline-block pl-1 py-1 bg-primary text-primary-content text-sm font-semibold mb-3">
                  BASS
                </div>

                {/* 名前 */}
                <h3 className="text-2xl font-bold mb-4">たくや</h3>

                {/* 説明文（必要に応じて追加） */}
                <p className="text-base-content/80 md:text-lg">
                  {/* 重厚なベースラインと確かな技術力でバンドサウンドの基盤を作る。 */}
                </p>

                {/* 装飾要素 */}
                <div className="absolute bottom-3 right-3 w-10 h-10 border-2 border-primary/30 rotate-6"></div>
              </div>
            </div>
          </div>
        </div>

        {/* セクション下部の装飾 */}
        <div className="flex justify-center mt-16">
          <div className="w-16 h-1 bg-accent/50"></div>
        </div>
      </div>
    </main>
  );
}
