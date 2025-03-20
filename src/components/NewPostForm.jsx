"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useSearch } from "@/context/SearchContext";
import Button from "./Button";

export default function NewPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { addLocalPost } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: `local-${Date.now()}`,
      title,
      body: content,
      createdAt: new Date().toISOString(),
      userId: "local",
    };
    addLocalPost(newPost);
    setTitle("");
    setContent("");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Add Your Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post headline"
          className="w-full px-4 py-2 rounded-lg shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post content"
          className="w-full px-4 py-2 rounded-lg shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-24"
          required
        />

        <motion.div>
          <Button>Add post</Button>
        </motion.div>
      </form>
    </div>
  );
}
