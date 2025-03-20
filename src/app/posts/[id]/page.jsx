import { Suspense } from "react";
import Button from "@/components/Button";
import PostDetail from "@/components/PostDetail";
import PostLoading from "./loading";
import { getPostById } from "@/lib/api";
import { unstable_cache } from "next/cache";

const cachedGetPostById = unstable_cache(
  async (id) => getPostById(id),
  ["post-detail"],
  { revalidate: 3600 }
);

export async function generateMetadata({ params }) {
  // check for client or server side fetch
  if (params.id.startsWith("local-")) return {
    title: "Draft Post",
    description: "Local draft post"
  };

  const post = await cachedGetPostById(params.id);
  return {
    title: `${post?.title || 'Post'} | Next.js Blog`,
    description: post?.body?.substring(0, 160) || 'Blog post',
    openGraph: {
      title: post?.title || 'Post',
      description: post?.body?.substring(0, 160) || 'Blog post',
      type: "article",
      publishedTime: new Date().toISOString(),
      authors: ["Blog Author"],
    },
  };
}

export default async function PostPage({ params }) {
  let post = null;
  
  if (!params.id.startsWith("local-")) {
    post = await getPostById(params.id);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Button href="/" className="mb-8">
        ← Back to Blog
      </Button>

      <Suspense fallback={<PostLoading />}>
        <PostDetail postId={params.id} serverPost={post} />
      </Suspense>
    </div>
  );
}