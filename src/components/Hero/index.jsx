import { useEffect, useRef } from "react";
import styles from "./Hero.module.scss";

export default function Hero() {
  const heroRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const background = backgroundRef.current;
    if (!hero || !background) return;

    // Parallax speed factor (0.5 = background moves at half the scroll speed)
    const parallaxSpeed = 0.3;

    function handleScroll() {
      const rect = hero.getBoundingClientRect();
      const scrolled = -rect.top;

      // Only apply parallax when hero is in view
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const yOffset = scrolled * parallaxSpeed;
        background.style.transform = `translate3d(0, ${yOffset}px, 0)`;
      }
    }

    // Use requestAnimationFrame for smooth performance
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // Initial position

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className={styles.hero} ref={heroRef}>
      <div
        className={styles.background}
        ref={backgroundRef}
        aria-hidden="true"
      />

      <div className={styles.content}>
        <div className={styles.text}>
          <h1 className={styles.title}>
            Transform Your Body, Transform Your Life
          </h1>
          <h3 className={styles.subtitle}>
            Personal training in Vancouver with Carol Almeida
          </h3>

          <div className={styles.cta}>
            <a href="#contact" className={styles.buttonPrimary}>
              Get Started
            </a>
            <a href="#services" className={styles.buttonSecondary}>
              View Services
            </a>
          </div>
        </div>

        <div className={styles.overlay}>
          <picture className={styles.overlayPicture}>
            <source
              srcSet="/src/assets/images/carol-almeida-personal-trainer-large-BMYEoKfR.webp"
              type="image/webp"
            />
            <source
              srcSet="/src/assets/images/carol-almeida-personal-trainer-large-BMYEoKfR.png"
              type="image/png"
            />
            <img
              src="/src/assets/images/carol-almeida-personal-trainer-large-BMYEoKfR.png"
              srcSet="
                /src/assets/images/carol-almeida-personal-trainer-small.png 400w,
                /src/assets/images/carol-almeida-personal-trainer-small.png 800w,
                /src/assets/images/carol-almeida-personal-trainer-large-BMYEoKfR.png 1600w
              "
              sizes="(max-width: 480px) 280px, (max-width: 968px) 300px, 500px"
              alt="Personal Trainer Carolina Almeida"
              className={styles.overlayImage}
              fetchPriority="high"
              loading="eager"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
