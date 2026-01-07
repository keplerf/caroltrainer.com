import { useQuery, useQueryClient } from "@tanstack/react-query";

const API_URL = "https://www.caroltrainer.com/wp-json/wp/v2/posts";

async function fetchPost(slug) {
  const response = await fetch(`${API_URL}?slug=${slug}&_embed`);
  if (!response.ok) throw new Error("Failed to fetch post");
  const data = await response.json();
  if (data.length === 0) throw new Error("Post not found");
  return data[0];
}

export function usePost(slug) {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function usePrefetchPost() {
  const queryClient = useQueryClient();

  return (slug) => {
    queryClient.prefetchQuery({
      queryKey: ["post", slug],
      queryFn: () => fetchPost(slug),
      staleTime: 5 * 60 * 1000,
    });
  };
}
