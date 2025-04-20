// GitHub API integration
export interface GitHubFile {
  title: string;
  content: string;
  slug: string;
}

// Using hardcoded values as requested in the PRD
// Replace this with your actual token when running locally
const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN';
const GITHUB_REPO_OWNER = 'visionaryaa'; // Repository owner
const GITHUB_REPO_NAME = 'github-blog-mvp';
const GITHUB_FILE_PATH = '_posts';

// Function to publish a post to GitHub
export async function publishPostToGitHub(file: GitHubFile): Promise<{ success: boolean; message: string }> {
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const fileName = `${date}-${file.slug}.md`;
  
  // Create frontmatter
  const fileContent = `---
title: "${file.title}"
date: "${date}"
slug: "${file.slug}"
---

${file.content}`;

  // Encode content to base64
  const contentEncoded = Buffer.from(fileContent).toString('base64');
  
  try {
    // Use GitHub API to create file
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_FILE_PATH}/${fileName}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Add post: ${file.title}`,
          content: contentEncoded,
        }),
      }
    );

    const responseData = await response.json();

    if (response.status >= 400) {
      return {
        success: false,
        message: `Error: ${responseData.message || 'Unknown error'}`,
      };
    }

    return {
      success: true,
      message: 'Post published successfully!',
    };
  } catch (error) {
    console.error('Error publishing post:', error);
    return {
      success: false,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}