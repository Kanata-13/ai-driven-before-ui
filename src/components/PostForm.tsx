'use client';

import { useState } from 'react';

interface Post {
  id?: number;
  title: string;
  description: string;
}

interface PostFormProps {
  post?: Post;
  onSubmit: (post: Omit<Post, 'id'>) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function PostForm({ post, onSubmit, onCancel, isLoading }: PostFormProps) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    description: post?.description || ''
  });

  const [errors, setErrors] = useState<{title?: string; description?: string}>({});

  const validateForm = () => {
    const newErrors: {title?: string; description?: string} = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'タイトルは必須です';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = '内容は必須です';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // エラーをクリア
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {post?.id ? '投稿を編集' : '新規投稿'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* タイトル */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            タイトル *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.title ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="投稿のタイトルを入力してください"
            disabled={isLoading}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        {/* 内容 */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            内容 *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={8}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical ${
              errors.description ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="投稿の内容を入力してください"
            disabled={isLoading}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        {/* ボタン */}
        <div className="flex items-center justify-end space-x-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={isLoading}
            >
              キャンセル
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={isLoading}
          >
            {isLoading ? '処理中...' : (post?.id ? '更新' : '投稿')}
          </button>
        </div>
      </form>
    </div>
  );
}
