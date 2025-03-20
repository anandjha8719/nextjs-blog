export const getPostById = async (id) => {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        next: { tags: [`post-${id}`] },
      }
    );

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
};

export const getPaginatedPosts = async (page = 1, limit = 10) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
    {
      next: { tags: ["posts"] },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};
