import { useState, useEffect } from "react";
import styles from "./Posts.module.scss";

const API_URL = "https://www.caroltrainer.com/wp-json/wp/v2/posts";

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
  const excerpt = stripHtml(post.excerpt.rendered).slice(0, 150) + "...";

  return (
    <article className={styles.card}>
      {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
        <div className={styles.imageWrapper}>
          <img
            src={post._embedded["wp:featuredmedia"][0].source_url}
            alt={post._embedded["wp:featuredmedia"][0].alt_text || post.title.rendered}
            className={styles.image}
            loading="lazy"
          />
        </div>
      )}
      <div className={styles.content}>
        <time className={styles.date} dateTime={post.date}>
          {formatDate(post.date)}
        </time>
        <h3 className={styles.cardTitle}>
          <a href={post.link} target="_blank" rel="noopener noreferrer">
            {post.title.rendered}
          </a>
        </h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <a
          href={post.link}
          className={styles.readMore}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More
        </a>
      </div>
    </article>
  );
}

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`${API_URL}?_embed&per_page=6`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
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

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className={styles.wrapper} id="blog" aria-labelledby="blog-heading">
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
