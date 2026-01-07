import styles from "./Container.module.scss";

const ContainerHero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.intro}>
        <h3>
          Achieve your fitness goals with a personalized plan tailored to your
          needs and limitations.
          <br />
          Prioritize your health, build confidence, and live life to the
          fullest.
        </h3>
        <p>
          Transform your fitness journey with personalized training sessions
          designed just for you! Our tailored workouts ensure efficient
          progress, and our meticulous progress tracking keeps you on the path
          to success. Ready to take the first step? Schedule your free
          consultation now and let's achieve your fitness goals together.
        </p>
      </div>

      <div className={styles.about}>
        <div className={styles.aboutContent}>
          <h2 id="about-carolina-almeida">About Me - Carol Almeida</h2>
          <p>
            Hi, I'm Carol Almeida, a results-driven personal trainer with over
            20 years of experience helping people transform their lives through
            fitness. I specialize in 1-on-1 personal training and customized
            fitness programs for individuals who value their time and want real,
            lasting results.
          </p>
          <p>
            My approach combines deep expertise with genuine care. Every client
            is unique, so I design programs around your goals, fitness level,
            mobility, and lifestyle—ensuring that you not only look better but
            also move, feel, and live better.
          </p>
          <p>
            I hold a Master's in Sport Training and a Bachelor's in Physical
            Education, and I'm an ACE Certified Personal Trainer and Fitness
            Nutrition Specialist. With certifications in CrossFit Level 1 and
            years of experience coaching both in-person and online, I blend
            science with proven coaching strategies to deliver measurable,
            lasting change.
          </p>
        </div>

        <div className={styles.expertise}>
          <h2>Expertise & Specialties</h2>
          <ul>
            <li>1-on-1 Personal Training</li>
            <li>Customized Fitness Programming</li>
            <li>Weight Loss & Body Composition</li>
            <li>Strength & Conditioning</li>
            <li>Exercise Selection & Modification for Aging Athletes</li>
            <li>Mobility & Movement Quality</li>
            <li>Nutrition Guidance for Performance & Longevity</li>
          </ul>
        </div>
      </div>

      <article className={styles.services}>
        <h2 id="personal-training-dowtown-vancouver">
          Personal Training Services
        </h2>
        <p>
          Whether your goal is weight loss, improved performance, or simply
          feeling great again, every session is tailored to your needs —
          combining expert coaching, accountability, and motivation. Train in
          person in Vancouver or with online support that fits your schedule.
        </p>
      </article>
    </section>
  );
};

export default ContainerHero;
