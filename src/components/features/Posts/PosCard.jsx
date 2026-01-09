import { stripHtml, formatDate } from "../../../helpers/content";
import { getImageSrcSet } from "../../../helpers/getImageSrcSet";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import Typography from "../../Atoms/Typography";
import { fetchPost } from "../../../helpers/content";

import styles from "./Posts.module.scss";

export default function PostCard({ post }) {
  const postPromises = new Map();

  function getPostPromise(slug) {
    if (!postPromises.has(slug)) {
      postPromises.set(slug, fetchPost(slug));
    }
    return postPromises.get(slug);
  }

  async function fetchPost(slug) {
    const response = await fetch(`${API_URL}?slug=${slug}&_embed`);
    if (!response.ok) throw new Error("Failed to fetch post");
    const data = await response.json();
    if (data.length === 0) throw new Error("Post not found");
    return data[0];
  }

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
        <Typography as="h3">
          <Link to={`/blog/${post.slug}`}>{parse(post.title.rendered)}</Link>
        </Typography>
        <p className={styles.excerpt}>{excerpt}</p>
        <Link to={`/blog/${post.slug}`} className={styles.readMore}>
          Read More
        </Link>
      </div>
    </article>
  );
}
