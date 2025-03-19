// app/posts/[id]/page.jsx - Updated with better error handling
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Button from "@/components/Button";
import PostDetail from "@/components/PostDetail";
import PostLoading from "./loading";
import { getPostById } from "@/lib/api";
import { unstable_cache } from "next/cache";

// Cache the post data
const cachedGetPostById = unstable_cache(
  async (id) => getPostById(id),
  ["post-detail"],
  { revalidate: 3600 }
);

export async function generateMetadata({ params }) {
  console.log("Fetching post with ID:", params.id); // Debugging line
  const post = await cachedGetPostById(params.id);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found",
    };
  }

  return {
    title: `${post.title} | Next.js Blog`,
    description: post.body.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.body.substring(0, 160),
      type: "article",
      publishedTime: new Date().toISOString(),
      authors: ["Blog Author"],
    },
  };
}

export default async function PostPage({ params }) {
  const post = await getPostById(params.id);

  if (!post) return notFound();

  return (
    <div className="max-w-3xl mx-auto">
      <Button href="/" className="mb-8">
        ← Back to Blog
      </Button>

      <Suspense fallback={<PostLoading />}>
        <PostDetail post={post} />
      </Suspense>
    </div>
  );
}
