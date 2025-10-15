'use client';

import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  description: string;
  date: string;
}

interface PostCardProps {
  post: Post;
  onDelete?: (id: number) => void;
}

export default function PostCard({ post, onDelete }: PostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* タイトル */}
        <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          <Link 
            href={`/posts/${post.id}`}
            className="hover:text-blue-600 transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        {/* 内容プレビュー */}
        <p className="text-gray-600 mb-4 leading-relaxed">
          {truncateText(post.description)}
        </p>

        {/* メタ情報 */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <time dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          
          <div className="flex items-center space-x-3">
            <Link 
              href={`/posts/${post.id}/edit`}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              編集
            </Link>
            {onDelete && (
              <button
                onClick={() => onDelete(post.id)}
                className="text-red-600 hover:text-red-800 font-medium transition-colors"
              >
                削除
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
