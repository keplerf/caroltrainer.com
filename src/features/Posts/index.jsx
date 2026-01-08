import { use, Suspense } from "react";
import { Link } from "react-router-dom";

import styles from "./Posts.module.scss";
import { getImageSrcSet } from "../../helpers/getImageSrcSet";
import { ResponsiveImage } from "@responsive-image/react";
const API_URL = "https://www.caroltrainer.com/wp-json/wp/v2/posts";

async function fetchPosts() {
  const response = await fetch(`${API_URL}?_embed&per_page=6`);
  return response.json();
}

// Cache the promise at module level - called once when module loads
const postsPromise = fetchPosts();

const fetchPost = async (slug) => {
  const response = await fetch(`${API_URL}?slug=${slug}&_embed`);
  if (!response.ok) throw new Error("Failed to fetch post");
  const data = await response.json();
  if (data.length === 0) throw new Error("Post not found");
  return data[0];
};

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

  const handlePrefetch = () => {
    fetchPost(post.slug);
  };
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
  const srcSet = getImageSrcSet(featuredImage);

  return (
    <article
      className={styles.card}
      onMouseEnter={handlePrefetch}
      onFocus={handlePrefetch}
    >
      {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
        <Link to={`/blog/${post.slug}`} className={styles.imageWrapper}>
          <img
            src={featuredImage.source_url}
            srcSet={srcSet}
            alt={
              post._embedded["wp:featuredmedia"][0].alt_text ||
              post.title.rendered
            }
            sizes="(max-width: 768px) 50vw, 200px"
            className={styles.image}
            loading="lazy"
            width={featuredImage.media_details?.width}
            height={featuredImage.media_details?.height}
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
  const data = use(postsPromise);

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
          {data.map((post) => (
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
    <Suspense fallback={<h2>Loading ....</h2>}>
      <PostsContent />
    </Suspense>
  );
}
