import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), '_posts');

export interface PostData {
  id: string;
  title: string;
  date: string;
  slug: string;
  contentHtml?: string;
  content?: string;
}

export function getSortedPostsData(): PostData[] {
  // Check if directory exists, if not, create it
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return [];
  }

  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { title: string; date: string; slug: string }),
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  // Check if directory exists, if not, create it
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    return {
      params: {
        slug: matterResult.data.slug,
      },
    };
  });
}

export async function getPostData(slug: string): Promise<PostData> {
  // Find the file that matches the slug
  const fileNames = fs.readdirSync(postsDirectory);
  let postFile: string | undefined;
  
  for (const fileName of fileNames) {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    if (matterResult.data.slug === slug) {
      postFile = fileName;
      break;
    }
  }
  
  if (!postFile) {
    throw new Error(`Post with slug "${slug}" not found`);
  }
  
  const fullPath = path.join(postsDirectory, postFile);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  
  // Combine the data with the id and contentHtml
  return {
    id: postFile.replace(/\.md$/, ''),
    contentHtml,
    ...(matterResult.data as { title: string; date: string; slug: string }),
  };
}