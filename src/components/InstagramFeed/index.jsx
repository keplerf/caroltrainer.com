import { useEffect } from "react";
import styles from "./InstagramFeed.module.scss";

// Add your Instagram post URLs here
const INSTAGRAM_POSTS = [
  "https://www.instagram.com/p/DSz0CszAdUo/",
  "https://www.instagram.com/p/C1hR54xN8pe/",
  "https://www.instagram.com/p/C1czJTRyG0n/",
];

export default function InstagramFeed() {
  useEffect(() => {
    // Load Instagram embed script
    if (!window.instgrm) {
      const script = document.createElement("script");
      script.src = "/public/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      window.instgrm.Embeds.process();
    }
  }, []);

  return (
    <section className={styles.section} id="instagram">
      <h3 className={styles.title}>Follow Along</h3>
      <p className={styles.subtitle}>
        <a
          href="https://www.instagram.com/carol.ptrainer/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.handle}
        >
          @carol.ptrainer
        </a>
      </p>

      <div className={styles.grid}>
        {INSTAGRAM_POSTS.map((postUrl, index) => (
          <div key={index} className={styles.post}>
            <blockquote
              className="instagram-media"
              data-instgrm-captioned={false}
              data-instgrm-permalink={postUrl}
              data-instgrm-version="14"
              style={{
                background: "#FFF",
                border: 0,
                borderRadius: "3px",
                boxShadow: "none",
                margin: 0,
                maxWidth: "100%",
                minWidth: "280px",
                padding: 0,
                width: "100%",
              }}
            />
          </div>
        ))}
      </div>

      <div className={styles.cta}>
        <a
          href="https://www.instagram.com/carol.ptrainer/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.followButton}
        >
          Follow on Instagram
        </a>
      </div>
    </section>
  );
}
