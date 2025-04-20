# GitHub Blog MVP

A Minimum Viable Product (MVP) for a blog website using GitHub as a CMS and Next.js for Static Site Generation (SSG).

## Core Concept

This blog uses a GitHub repository as the Content Management System (CMS), managed via the GitHub REST API. It leverages Next.js Static Site Generation (SSG) to build the public-facing site from Markdown files stored in the repository.

## Features

- Unauthenticated admin interface for writing blog posts
- "Publish" button that uses GitHub REST API to commit Markdown files to the repository
- Public-facing blog pages built using Next.js SSG
- Ready for easy deployment to Vercel

## Project Structure

```
github-blog-mvp/
├── _posts/                # Directory where blog posts are stored as markdown files
├── components/            # React components
│   ├── AdminForm.tsx      # Form for creating new posts
│   ├── Layout.tsx         # Layout wrapper with header and footer
│   └── PostList.tsx       # Component to display list of posts
├── lib/                   # Utility functions
│   ├── github.ts          # GitHub API integration
│   └── posts.ts           # Functions to work with markdown files
├── pages/                 # Next.js pages
│   ├── _app.tsx           # Custom App component
│   ├── admin.tsx          # Admin interface for writing posts
│   ├── blog/
│   │   └── [slug].tsx     # Dynamic route for individual blog posts
│   ├── api/
│   │   └── publish.ts     # API endpoint for publishing posts to GitHub
│   └── index.tsx          # Blog home page / post listing
├── styles/                # CSS styles
│   └── globals.css        # Global styles and Tailwind imports
├── .env.example           # Example environment variables
├── .gitignore             # Git ignore file
├── next.config.js         # Next.js configuration
├── package.json           # Project dependencies and scripts
├── postcss.config.js      # PostCSS configuration for Tailwind
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 14+ and npm
- A GitHub account with a repository for storing blog posts

### Installation

1. Clone this repository:
   ```
   git clone https://github.com/your-username/github-blog-mvp.git
   cd github-blog-mvp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Edit the GitHub configuration in `lib/github.ts`:
   ```typescript
   // Replace these with your own values
   const GITHUB_TOKEN = 'your_github_personal_access_token';
   const GITHUB_REPO_OWNER = 'your_github_username';
   const GITHUB_REPO_NAME = 'github-blog-mvp';
   const GITHUB_FILE_PATH = '_posts';
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Usage

1. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin interface.
2. Create a new post by filling out the form and clicking "Publish".
3. The post will be committed to your GitHub repository.
4. When deployed on Vercel, trigger a new build to generate the static pages including your new post.

## Deployment

This project is ready for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure the necessary environment variables
4. Deploy!

## Notes

- This is a test/MVP project with an unauthenticated admin interface. In a production environment, you would want to add authentication.
- The admin interface publishes posts directly to your GitHub repository.
- To see new posts on the live site after publishing, you need to trigger a new build on Vercel.
