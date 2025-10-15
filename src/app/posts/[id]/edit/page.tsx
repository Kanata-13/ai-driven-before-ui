'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PostForm from '@/components/PostForm';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Post {
  id: number;
  title: string;
  description: string;
  date: string;
}

export default function EditPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (postData: { title: string; description: string }) => {
    if (!post) return;
    
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/blog/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        router.push(`/posts/${post.id}`);
      } else {
        alert('投稿の更新に失敗しました');
      }
    } catch (err) {
      alert('ネットワークエラーが発生しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (post) {
      router.push(`/posts/${post.id}`);
    } else {
      router.push('/');
    }
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
          <button
            onClick={() => router.push('/')}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            ホームに戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 戻るボタン */}
      <div className="mb-6">
        <button
          onClick={() => router.push(`/posts/${post.id}`)}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          投稿詳細に戻る
        </button>
      </div>

      <PostForm
        post={post}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isSubmitting}
      />
    </div>
  );
}
