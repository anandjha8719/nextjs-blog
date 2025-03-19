"use client";

import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";

export default function PostDetail({ post }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm p-8"
    >
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h1>

      <div className="flex items-center mb-6 text-gray-500 text-sm">
        <span>Published {formatDate(new Date())}</span>
        <span className="mx-2">•</span>
        <span>User {post.userId}</span>
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
