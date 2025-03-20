"use client";

import dynamic from "next/dynamic";
import LoadingPosts from "@/components/LoadingPosts";

const PostList = dynamic(() => import("@/components/PostList"), {
  ssr: false,
  loading: () => <LoadingPosts />,
});

export default function PostListWrapper() {
  return <PostList />;
}
