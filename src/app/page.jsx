import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import PostList from "@/components/PostList";
import LoadingPosts from "@/components/LoadingPosts";
import { SearchProvider } from "@/context/SearchContext";
import { getPaginatedPosts } from "@/lib/api";

const Home = async () => {
  const initialPosts = await getPaginatedPosts(1, 10);

  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Latest Blog Posts
      </h1>

      <SearchProvider initialPosts={initialPosts}>
        <SearchBar />
        <Suspense fallback={<LoadingPosts />}>
          <PostList initialPosts={initialPosts} />
        </Suspense>
      </SearchProvider>
    </>
  );
};

export default Home;
