import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import parse from "html-react-parser";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import styles from "./PostPage.module.scss";
import { ResponsiveImage } from "@responsive-image/react";

const queryClient = new QueryClient();
const API_URL = "https://www.caroltrainer.com/wp-json/wp/v2/posts";

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

function PostPageContent() {
  const { slug } = useParams();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
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

  if (error || !post) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.error}>
            <h1>Article Not Found</h1>
            <p>Sorry, we couldn't find the article you're looking for.</p>
            <Link to="/" className={styles.backLink}>
              <ArrowLeft size={18} />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];

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
              alt={featuredImage.alt_text || post.title.rendered}
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

export default function PostPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostPageContent />
    </QueryClientProvider>
  );
}
