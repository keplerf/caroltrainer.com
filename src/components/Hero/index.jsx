import { useRef } from "react";
import styles from "./Hero.module.scss";
import { ResponsiveImage } from "@responsive-image/react";
import imageLarge from "../../../src/assets/images/carol-almeida-personal-trainer-large-2x.png?responsive";
import Button from "../Atoms/Button";
import handleScrolTo from "../../helpers/handleScrollTo";

export default function Hero() {
  const heroRef = useRef(null);
  const backgroundRef = useRef(null);

  // useEffect(() => {
  //   const hero = heroRef.current;
  //   const background = backgroundRef.current;
  //   if (!hero || !background) return;

  //   // Parallax speed factor (0.5 = background moves at half the scroll speed)
  //   const parallaxSpeed = 0.3;

  //   function handleScroll() {
  //     const rect = hero.getBoundingClientRect();
  //     const scrolled = -rect.top;

  //     // Only apply parallax when hero is in view
  //     if (rect.bottom > 0 && rect.top < window.innerHeight) {
  //       const yOffset = scrolled * parallaxSpeed;
  //       background.style.transform = `translate3d(0, ${yOffset}px, 0)`;
  //     }
  //   }

  //   // Use requestAnimationFrame for smooth performance
  //   let ticking = false;
  //   function onScroll() {
  //     if (!ticking) {
  //       requestAnimationFrame(() => {
  //         handleScroll();
  //         ticking = false;
  //       });
  //       ticking = true;
  //     }
  //   }

  //   window.addEventListener("scroll", onScroll, { passive: true });
  //   handleScroll(); // Initial position

  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  return (
    <section className={styles.hero} ref={heroRef}>
      <div
        className={styles.background}
        ref={backgroundRef}
        aria-hidden="true"
      />

      <div className={styles.heroContainer}>
        <h1 className={styles.heroTag}>
          +20 years
          <br />
          of experience
        </h1>

        <h2 className={styles.h2}>
          Transform <span className="highlight">Your Life </span>with Customized
          <span>1-on-1 </span>
          <span className="highlight">Personal Training</span>.
        </h2>
        <h3 className={styles.subtitle}>
          Personal training and Fitness Couch in Vancouver.
        </h3>
        <div className={styles.cta}>
          <Button
            href="#contact"
            appearance="primary"
            onClick={(e) => handleScrolTo(e, "contact")}
          >
            Book an intro
          </Button>
          <Button
            as="button"
            appearance="outline"
            href="sms:+17783029893?body=I'm%20interested%20in%20personal%20training"
            aria-label="Text Carolina Simoes about personal training anf fitnes coach"
          >
            +1 778 302 9893
          </Button>
        </div>
        <div className={styles.heroImage}>
          <ResponsiveImage
            fetchPriority="high"
            src={imageLarge}
            alt="Personal Trainer Carolina Almeida Downtown Vancouver"
            className={styles.overlayImage}
            sizes="(min-width: 800px) 50vw, 40vw"
            loading="eager"
            width={50}
            height={50}
          />
        </div>
      </div>

      <div className={styles.heroText}>
        <p className={styles.dark}>
          Fitness.<span className={styles.outline}>Vancouver</span>
        </p>
        <p>Personal Trainer</p>
      </div>
    </section>
  );
}
