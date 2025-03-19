"use client";

import { createContext, useContext, useState, useEffect } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children, initialPosts = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [posts, setPosts] = useState(initialPosts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFilteredPosts(initialPosts);
  }, [initialPosts]);

  const updateSearchResults = async (query) => {
    setIsSearching(true);

    if (!query.trim()) {
      setFilteredPosts(posts);
      setIsSearching(false);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const results = posts.filter((post) =>
      post.title.toLowerCase().includes(lowercaseQuery)
    );

    setFilteredPosts(results);
    setIsSearching(false);
  };

  const loadMorePosts = async () => {
    if (isLoading || !hasMore || searchQuery) return;

    setIsLoading(true);
    const nextPage = page + 1;

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${nextPage}&_limit=10`
      );
      const newPosts = await response.json();

      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setFilteredPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        filteredPosts,
        updateSearchResults,
        isSearching,
        loadMorePosts,
        hasMore,
        isLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
