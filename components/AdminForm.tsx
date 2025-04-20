import { useState } from 'react';

interface AdminFormProps {
  onSubmit: (title: string, content: string, slug: string) => Promise<void>;
  isSubmitting: boolean;
}

export default function AdminForm({ onSubmit, isSubmitting }: AdminFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  
  const generateSlug = (input: string) => {
    return input
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
      .trim();
  };
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!slug) {
      setSlug(generateSlug(newTitle));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !slug) {
      alert('Please fill in all fields');
      return;
    }
    
    await onSubmit(title, content, slug);
    
    // Clear form if submission was successful
    setTitle('');
    setContent('');
    setSlug('');
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          placeholder="Enter post title"
          required
        />
      </div>
      
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={(e) => setSlug(generateSlug(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          placeholder="Enter URL-friendly slug"
          required
        />
        <p className="mt-1 text-sm text-gray-500">
          URL-friendly identifier for your post. Example: my-first-post
        </p>
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content (Markdown)
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={15}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border font-mono"
          placeholder="Write your post content in Markdown format..."
          required
        />
        <p className="mt-1 text-sm text-gray-500">
          Your post content in Markdown format. # for headings, * for lists, etc.
        </p>
      </div>
      
      <button
        type="submit"
        className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
          isSubmitting
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Publishing...' : 'Publish Post'}
      </button>
    </form>
  );
}