export function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function fetchPost(slug) {
  const response = await fetch(
    `${import.meta.env.API_URL}?slug=${slug}&_embed`
  );
  if (!response.ok) throw new Error("Failed to fetch post");
  const data = await response.json();
  if (data.length === 0) throw new Error("Post not found");
  return data[0];
}

export function getPostPromise(slug) {
  if (!postPromises.has(slug)) {
    postPromises.set(slug, fetchPost(slug));
  }
  return postPromises.get(slug);
}
