import Button from "@/components/Button";

export const PostLoading = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <Button href="/" className="mb-8" aria-label="Go back to blog">
        ← Back to Blog
      </Button>

      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
