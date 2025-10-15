'use client';

import Link from 'next/link';

interface SidebarProps {
  recentPosts?: Array<{
    id: number;
    title: string;
    date: string;
  }>;
}

export default function Sidebar({ recentPosts = [] }: SidebarProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <aside className="w-full lg:w-80 space-y-8">
      {/* プロフィール */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ブログについて</h3>
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">ブログ作者</h4>
          <p className="text-gray-600 text-sm">
            日々の出来事や考えを綴っています。
          </p>
        </div>
      </div>

      {/* 最近の投稿 */}
      {recentPosts.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">最近の投稿</h3>
          <ul className="space-y-3">
            {recentPosts.slice(0, 5).map((post) => (
              <li key={post.id}>
                <Link 
                  href={`/posts/${post.id}`}
                  className="block hover:text-blue-600 transition-colors"
                >
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                    {post.title}
                  </h4>
                  <time className="text-xs text-gray-500">
                    {formatDate(post.date)}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* カテゴリー */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">カテゴリー</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
              すべての投稿
            </Link>
          </li>
          <li>
            <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
              日常
            </Link>
          </li>
          <li>
            <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
              技術
            </Link>
          </li>
          <li>
            <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
              雑記
            </Link>
          </li>
        </ul>
      </div>

      {/* アーカイブ */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">アーカイブ</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
              2024年12月
            </Link>
          </li>
          <li>
            <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
              2024年11月
            </Link>
          </li>
          <li>
            <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
              2024年10月
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
