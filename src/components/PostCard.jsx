"use client";

import { motion } from "framer-motion";
import Button from "./Button";
import Image from "next/image";

export default function PostCard({ post }) {
  const truncatedBody = post.body.split("\n")[0].slice(0, 100) + "...";

  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-3 text-gray-800">
        {post.title}
      </h2>

      <p className="text-gray-600 mb-4">{truncatedBody}</p>
      <div className="flex justify-between">
        <div className="flex items-center mb-0 text-gray-500 text-sm align-center gap-1">
          <Image
            src={"/user-avatar.png"}
            width={20}
            height={20}
            alt="user-avatar"
          />
          <span className="flex items-center justify-center h-full pt-1">
            User{post.userId}
          </span>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.85 }}>
          <Button href={`/posts/${post.id}`}>Read More</Button>
        </motion.div>
      </div>
    </article>
  );
}
