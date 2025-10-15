'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PostForm from '@/components/PostForm';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function CreatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (postData: { title: string; description: string }) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        router.push('/');
      } else {
        alert('投稿の作成に失敗しました');
      }
    } catch (err) {
      alert('ネットワークエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PostForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  );
}
