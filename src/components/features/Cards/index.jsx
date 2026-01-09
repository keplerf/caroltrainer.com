import { useRef, useState } from "react";
import { motion, useAnimationFrame } from "motion/react";
import { ResponsiveImage } from "@responsive-image/react";
import Button from "../../Atoms/Button";
import styles from "./Cards.module.scss";
import handleScrolTo from "../../../helpers/handleScrollTo";
import Typography from "../../Atoms/Typography";

import imageLarge from "../../../../src/assets/images/02.png?responsive";
import img01 from "../../../../src/assets/images/01.jpg?responsive";
import img03 from "../../../../src/assets/images/03.jpg?responsive";
import img04 from "../../../../src/assets/images/04.jpg?responsive";
import img05 from "../../../../src/assets/images/05.jpg?responsive";
import img06 from "../../../../src/assets/images/06.jpg?responsive";
import img07 from "../../../../src/assets/images/07.jpg?responsive";
import img08 from "../../../../src/assets/images/08.jpg?responsive";

const images = [img04, img01, img07, imageLarge, img03, img08, img06, img05];

const CARD_WIDTH = 400;
const CARD_GAP = 0;
const AUTO_SCROLL_SPEED = 0.45;

const Cards = () => {
  const containerRef = useRef(null);
  const singleSetWidth = images.length * (CARD_WIDTH + CARD_GAP);

  // Start from the middle set for seamless looping in both directions
  const xPosRef = useRef(-singleSetWidth);
  const [xPos, setXPos] = useState(-singleSetWidth);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragOffsetX = useRef(0);

  // Auto-scroll animation
  useAnimationFrame(() => {
    if (isPaused || isDragging) return;

    let newX = xPosRef.current - AUTO_SCROLL_SPEED;

    // Seamlessly wrap when scrolled past the middle set
    if (newX <= -singleSetWidth * 2) {
      newX += singleSetWidth;
    } else if (newX >= 0) {
      newX -= singleSetWidth;
    }

    xPosRef.current = newX;
    setXPos(newX);
  });

  const handleDragStart = (e) => {
    setIsDragging(true);
    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
    dragOffsetX.current = xPosRef.current;
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const diff = clientX - dragStartX.current;
    let newX = dragOffsetX.current + diff;

    // Seamlessly wrap for infinite loop
    if (newX >= 0) {
      newX -= singleSetWidth;
      dragOffsetX.current -= singleSetWidth;
    } else if (newX <= -singleSetWidth * 2) {
      newX += singleSetWidth;
      dragOffsetX.current += singleSetWidth;
    }

    xPosRef.current = newX;
    setXPos(newX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Triple the images for seamless infinite loop
  const tripleImages = [...images, ...images, ...images];

  return (
    <section className={styles.wrapper}>
      <div
        className={styles.carousel}
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={(e) => {
          setIsPaused(false);
          handleDragEnd();
        }}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <motion.div
          className={styles.cards}
          style={{
            x: xPos,
          }}
        >
          {tripleImages.map((img, index) => (
            <div key={index} className={styles.card}>
              <ResponsiveImage
                src={img}
                alt="Personal Trainer Carolina Almeida Downtown Vancouver"
                sizes="(max-width: 800px) 30vw, 200px"
              />
            </div>
          ))}
        </motion.div>
      </div>
      <div>
        <Typography as="h3" invert>
          Personal Training Built Around Your Life,
          <br /> Not the Other Way Around
        </Typography>
        <Button
          href="#contact"
          appearance="outline"
          onClick={(e) => handleScrolTo(e, "contact")}
        >
          Book an intro
        </Button>
      </div>
    </section>
  );
};

export default Cards;
