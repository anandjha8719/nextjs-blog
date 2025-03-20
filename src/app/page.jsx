import SearchBar from "@/components/SearchBar";
import { SearchProvider } from "@/context/SearchContext";
import { getPaginatedPosts } from "@/lib/api";
import PostListWrapper from "@/components/PostListWrapper";
import NewPostForm from "@/components/NewPostForm";

const Home = async () => {
  const initialPosts = await getPaginatedPosts(1, 10);

  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Latest Blog Posts
      </h1>
      <SearchProvider initialPosts={initialPosts}>
        <NewPostForm /> 
        <SearchBar />
        <PostListWrapper />
      </SearchProvider>
    </>
  );
};

export default Home;
