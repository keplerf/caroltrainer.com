import { useCallback } from "react";
import { Link } from "react-router-dom";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import styles from "./Posts.module.scss";

const queryClient = new QueryClient();
const API_URL = "https://www.caroltrainer.com/wp-json/wp/v2/posts";

async function fetchPosts() {
  const response = await fetch(`${API_URL}?_embed&per_page=6`);
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
}

async function fetchPost(slug) {
  const response = await fetch(`${API_URL}?slug=${slug}&_embed`);
  if (!response.ok) throw new Error("Failed to fetch post");
  const data = await response.json();
  if (data.length === 0) throw new Error("Post not found");
  return data[0];
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

function PostCard({ post }) {
  const queryClient = useQueryClient();
  const excerpt = stripHtml(post.excerpt.rendered).slice(0, 150) + "...";

  const handlePrefetch = useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: ["post", post.slug],
      queryFn: () => fetchPost(post.slug),
      staleTime: 5 * 60 * 1000,
    });
  }, [queryClient, post.slug]);

  return (
    <article
      className={styles.card}
      onMouseEnter={handlePrefetch}
      onFocus={handlePrefetch}
    >
      {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
        <Link to={`/blog/${post.slug}`} className={styles.imageWrapper}>
          <img
            src={post._embedded["wp:featuredmedia"][0].source_url}
            alt={
              post._embedded["wp:featuredmedia"][0].alt_text ||
              post.title.rendered
            }
            className={styles.image}
            loading="lazy"
          />
        </Link>
      )}
      <div className={styles.content}>
        <time className={styles.date} dateTime={post.date}>
          {formatDate(post.date)}
        </time>
        <h3 className={styles.cardTitle}>
          <Link to={`/blog/${post.slug}`}>{post.title.rendered}</Link>
        </h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <Link to={`/blog/${post.slug}`} className={styles.readMore}>
          Read More
        </Link>
      </div>
    </article>
  );
}

function PostsContent() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <section className={styles.wrapper} id="blog">
        <div className={styles.container}>
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Loading posts...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.wrapper} id="blog">
        <div className={styles.container}>
          <div className={styles.error}>
            <p>Unable to load posts. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section
      className={styles.wrapper}
      id="blog"
      aria-labelledby="blog-heading"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="blog-heading" className={styles.title}>
            Latest Articles
          </h2>
          <p className={styles.subtitle}>
            Tips, insights, and updates from Carol Trainer
          </p>
        </header>

        <div className={styles.grid}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div className={styles.cta}>
          <a
            href="https://www.caroltrainer.com/blog"
            className={styles.viewAll}
            target="_blank"
            rel="noopener noreferrer"
          >
            View All Articles
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Posts() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostsContent />
    </QueryClientProvider>
  );
}
