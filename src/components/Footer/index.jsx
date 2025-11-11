import { Youtube, Instagram } from "react-feather";
import styles from "./Footer.module.css";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLogo}>
          <h3>Carol Almeida</h3>
          <p>Premium personal training for downtown Vancouver.</p>
        </div>
        <div>
          <h4>Quick links</h4>
          <ul>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#about-carolina-almeida">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li>
              <a href="#1-on-1-personal-training">1-on-1 Training</a>
            </li>
            <li>
              <a href="#semi-private-training">Semi-Private</a>
            </li>
            <li>
              <a href="#custom-fitness-programs">Fitness Programs</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul className={styles.social}>
            <li>
              <a
                aria-label="Carol Almeida Personal Trainer Youtube Channel Social Media"
                href="https://www.youtube.com/@KeplerCarolFitness"
                target="_blank"
              >
                <Youtube size={35} />
              </a>
            </li>
            <li>
              <a
                aria-label="Carol Almeida Personal Trainer Instagrama Social Media"
                href="https://www.instagram.com/carol.ptrainer/"
                target="_blank"
              >
                <Instagram size={35} />
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.credit}>
          <p>© 2025 Carol Almeida. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
