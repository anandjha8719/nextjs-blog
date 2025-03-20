"use client";

import { motion } from "framer-motion";
import Button from "./Button";
import UserTag from "./UserTag";
import { truncateText } from "@/lib/utils";

export default function PostCard({ post }) {
  const truncatedBody = truncateText(post.body, 100);

  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-3 text-gray-800">
        {post.title}
      </h2>

      <p className="text-gray-600 mb-4">{truncatedBody}</p>
      <div className="flex justify-between">
        <UserTag userId={post.userId} />

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.85 }}>
          <Button
            href={`/posts/${post.id}${post.isLocal ? "?local=true" : ""}`}
          >
            Read More
          </Button>
        </motion.div>
      </div>
    </article>
  );
}
