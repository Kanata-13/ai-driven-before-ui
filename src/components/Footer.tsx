export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ブログ情報 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Blog</h3>
            <p className="text-gray-600 text-sm">
              日々の出来事や考えを綴るブログです。
            </p>
          </div>

          {/* リンク */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">リンク</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  ホーム
                </a>
              </li>
              <li>
                <a href="/posts" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  投稿一覧
                </a>
              </li>
              <li>
                <a href="/create" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  新規投稿
                </a>
              </li>
            </ul>
          </div>

          {/* 連絡先 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">お問い合わせ</h3>
            <p className="text-gray-600 text-sm">
              ご質問やご意見がございましたら、お気軽にお声かけください。
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © 2024 My Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
