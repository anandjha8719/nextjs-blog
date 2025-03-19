"use client";

import { useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";
import { useSearch } from "@/context/SearchContext";

export default function SearchBar() {
  const { searchQuery, setSearchQuery, updateSearchResults, isSearching } =
    useSearch();

  const debouncedSearch = useDebouncedCallback((value) => {
    updateSearchResults(value);
  }, 400);

  useEffect(() => {
    if (searchQuery) {
      updateSearchResults(searchQuery);
    }
  }, []);

  return (
    <div className="relative mb-8 max-w-2xl mx-auto">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          debouncedSearch(e.target.value);
        }}
        placeholder="Search posts..."
        className="w-full px-4 py-3 pl-12 rounded-lg shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        aria-label="Search blog posts"
      />
      <MagnifyingGlassIcon className="h-5 w-5 absolute left-4 top-4 text-gray-400" />

      {isSearching && (
        <div className="absolute right-4 top-4">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}
