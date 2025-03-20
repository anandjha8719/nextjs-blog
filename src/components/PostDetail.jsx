"use client";

import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import UserTag from "./UserTag";
import { useEffect, useState } from "react";
import { getLocalPost } from "@/lib/api";

export default function PostDetail({ postId, serverPost }) {
  const [post, setPost] = useState(serverPost);
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    const loadLocalPost = async () => {
      if (postId.startsWith("local-")) {
        const localPost = getLocalPost(postId);
        if (localPost) {
          setPost(localPost);
          setIsLocal(true);
        }
      }
    };

    if (!post) loadLocalPost();
  }, [postId]);

  if (!post) return <div className="text-center py-8">Post not found</div>;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm p-8"
    >
      {isLocal && (
        <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg">
          Local data (not saved to server)
        </div>
      )}
      
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h1>

      <div className="flex items-center mb-6 text-gray-500 text-sm">
        <span>Published {formatDate(new Date(post.createdAt || Date.now()))}</span>
        <span className="mx-2">•</span>
        <UserTag userId={post.userId} />
      </div>

      <div className="prose max-w-none text-gray-600">
        {post.body.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </motion.article>
  );
}