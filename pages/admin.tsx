import { useState } from 'react';
import Layout from '../components/Layout';
import AdminForm from '../components/AdminForm';

export default function Admin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (title: string, content: string, slug: string) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          slug,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          text: data.message || 'Post published successfully!',
          type: 'success',
        });
      } else {
        setMessage({
          text: data.message || 'Error publishing post',
          type: 'error',
        });
      }
    } catch (error) {
      setMessage({
        text: 'Error connecting to server',
        type: 'error',
      });
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="Admin - Create Post">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Create New Post</h1>

        {message && (
          <div
            className={`p-4 rounded-md ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        <AdminForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h2 className="text-lg font-medium mb-2">Markdown Tips</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><code># Heading 1</code> - For main headings</li>
            <li><code>## Heading 2</code> - For section headings</li>
            <li><code>**bold text**</code> - For <strong>bold text</strong></li>
            <li><code>*italic text*</code> - For <em>italic text</em></li>
            <li><code>[link text](URL)</code> - For hyperlinks</li>
            <li><code>![alt text](image-url)</code> - For images</li>
            <li><code>- item</code> - For bullet lists</li>
            <li><code>1. item</code> - For numbered lists</li>
            <li><code>\`code\`</code> - For inline code</li>
            <li><code>\`\`\`language\ncode block\n\`\`\`</code> - For code blocks</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}