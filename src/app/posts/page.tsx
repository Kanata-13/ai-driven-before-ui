'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Post {
  id: number;
  title: string;
  description: string;
  date: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      
      if (response.ok) {
        setPosts(data.posts || []);
      } else {
        setError('投稿の取得に失敗しました');
      }
    } catch (err) {
      setError('ネットワークエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm('この投稿を削除しますか？')) return;

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter(post => post.id !== id));
      } else {
        alert('削除に失敗しました');
      }
    } catch (err) {
      alert('ネットワークエラーが発生しました');
    }
  };

  const recentPosts = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSpinner size="lg" className="py-16" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* メインコンテンツ */}
        <div className="lg:col-span-3">
          {/* ページヘッダー */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">投稿一覧</h1>
              <Link
                href="/create"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                新規投稿
              </Link>
            </div>
            <p className="text-gray-600">
              すべての投稿を表示しています（{posts.length}件）
            </p>
          </div>

          {/* エラー表示 */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* 投稿一覧 */}
          {posts.length === 0 ? (
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                まだ投稿がありません
              </h3>
              <p className="text-gray-600 mb-4">
                最初の投稿を作成してみましょう
              </p>
              <Link
                href="/create"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                新規投稿を作成
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {posts
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onDelete={handleDeletePost}
                  />
                ))}
            </div>
          )}
        </div>

        {/* サイドバー */}
        <div className="lg:col-span-1">
          <Sidebar recentPosts={recentPosts} />
        </div>
      </div>
    </div>
  );
}
