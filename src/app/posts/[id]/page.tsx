'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Post {
  id: number;
  title: string;
  description: string;
  date: string;
}

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchPost(Number(params.id));
    }
  }, [params.id]);

  const fetchPost = async (id: number) => {
    try {
      const response = await fetch(`/api/blog/${id}`);
      const data = await response.json();
      
      if (response.ok) {
        setPost(data.post);
      } else {
        setError('投稿が見つかりません');
      }
    } catch (err) {
      setError('ネットワークエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!post || !confirm('この投稿を削除しますか？')) return;

    try {
      const response = await fetch(`/api/blog/${post.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/');
      } else {
        alert('削除に失敗しました');
      }
    } catch (err) {
      alert('ネットワークエラーが発生しました');
    }
  };

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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSpinner size="lg" className="py-16" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {error || '投稿が見つかりません'}
          </h3>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 戻るボタン */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          ホームに戻る
        </Link>
      </div>

      {/* 投稿詳細 */}
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          {/* タイトル */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>

          {/* メタ情報 */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
            <time dateTime={post.date} className="text-gray-600">
              {formatDate(post.date)}
            </time>
            
            <div className="flex items-center space-x-4">
              <Link
                href={`/posts/${post.id}/edit`}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                編集
              </Link>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800 font-medium transition-colors"
              >
                削除
              </button>
            </div>
          </div>

          {/* 内容 */}
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
              {post.description}
            </div>
          </div>
        </div>
      </article>

      {/* ナビゲーション */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/posts"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          投稿一覧に戻る
        </Link>
        
        <Link
          href="/create"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          新規投稿を作成
        </Link>
      </div>
    </div>
  );
}
