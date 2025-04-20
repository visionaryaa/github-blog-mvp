import type { NextApiRequest, NextApiResponse } from 'next';
import { publishPostToGitHub } from '../../lib/github';

interface PublishRequestData {
  title: string;
  content: string;
  slug: string;
}

interface PublishResponseData {
  success: boolean;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PublishResponseData>
) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { title, content, slug } = req.body as PublishRequestData;

    // Validate input
    if (!title || !content || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, content, or slug',
      });
    }

    // Validate slug format
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slug)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid slug format. Use only lowercase letters, numbers, and hyphens.',
      });
    }

    // Publish post to GitHub
    const result = await publishPostToGitHub({
      title,
      content,
      slug,
    });

    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(result);
    }
  } catch (error) {
    console.error('Error in publish API:', error);
    return res.status(500).json({
      success: false,
      message: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
}