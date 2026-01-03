import { Suspense, lazy } from "react";

import FAQ from "./components/FAQ";
import { faq } from "./content/faq";
import Services from "./components/Services";
import Posts from "./features/Posts";
// import Hero from "./components/Hero";

const Footer = lazy(() => import("./components/Footer"));
const ContactForm = lazy(() => import("./components/Form"));
// const InstagramFeed = lazy(() => import("./components/InstagramFeed"));

function App() {
  return (
    <>
      {/* <Hero /> */}
      <Services />
      <FAQ data={faq} />
      {/* <InstagramFeed /> */}

      <Suspense fallback={null}>
        <ContactForm />
      </Suspense>
      <Posts />

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
