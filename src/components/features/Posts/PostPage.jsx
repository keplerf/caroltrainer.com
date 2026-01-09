import { use, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import parse from "html-react-parser";

import { getImageSrcSet } from "../../../helpers/getImageSrcSet";

import styles from "./PostPage.module.scss";

// Cache promises by slug to avoid refetching
const postPromises = new Map();

function getPostPromise(slug) {
  if (!postPromises.has(slug)) {
    postPromises.set(slug, fetchPost(slug));
  }
  return postPromises.get(slug);
}

async function fetchPost(slug) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}?slug=${slug}&_embed`
  );
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

function PostPageContent() {
  const { slug } = useParams();
  const post = use(getPostPromise(slug));

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
  const srcSet = getImageSrcSet(featuredImage);

  return (
    <article className={styles.wrapper}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link to="/" className={styles.backLink}>
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </nav>

        <header className={styles.header}>
          <time className={styles.date} dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <h1 className={styles.title}>{parse(post.title.rendered)}</h1>
        </header>

        {featuredImage?.source_url && (
          <div className={styles.featuredImage}>
            <img
              src={featuredImage.source_url}
              srcSet={srcSet}
              sizes="(max-width: 768px) 500vw, 200px"
              alt={featuredImage.alt_text || post.title.rendered}
              width={featuredImage.media_details?.width}
              height={featuredImage.media_details?.height}
            />
          </div>
        )}

        <div className={styles.content}>{parse(post.content.rendered)}</div>

        <footer className={styles.footer}>
          <Link to="/#blog" className={styles.backLink}>
            <ArrowLeft size={18} />
            Back to Articles
          </Link>
        </footer>
      </div>
    </article>
  );
}

function PostPageLoading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Loading article...</p>
        </div>
      </div>
    </div>
  );
}

export default function PostPage() {
  return (
    <Suspense fallback={<PostPageLoading />}>
      <PostPageContent />
    </Suspense>
  );
}
