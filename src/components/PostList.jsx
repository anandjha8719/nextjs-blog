"use client";

import { useSearch } from "@/context/SearchContext";
import PostCard from "@/components/PostCard";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useCallback } from "react";

export default function PostList() {
  const { filteredPosts, searchQuery, loadMorePosts, hasMore, isLoading } =
    useSearch();
  const observer = useRef();

  const lastPostRef = useCallback(
    (node) => {
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, loadMorePosts]
  );

  return (
    <>
      {searchQuery && filteredPosts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <p className="text-gray-600">
            No posts found matching "{searchQuery}"
          </p>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-4">
          <AnimatePresence initial={false}>
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                ref={index === filteredPosts.length - 1 ? lastPostRef : null}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
