import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Hero from "./components/Hero";

import ContainerHero from "./components/Hero/Container";

// import Posts from "./features/Posts";

const FAQ = lazy(() => import("./components/FAQ"));

const Footer = lazy(() => import("./components/Footer"));
const ContactForm = lazy(() => import("./components/Form"));
const PostPage = lazy(() => import("./features/Posts/PostPage"));
const Services = lazy(() => import("./components/Services"));
// const InstagramFeed = lazy(() => import("./components/InstagramFeed"));

function HomePage() {
  return (
    <>
      <Hero />
      <ContainerHero />
      <Suspense fallback={null}>
        <Services />
      </Suspense>
      <Suspense fallback={null}>
        <FAQ />
      </Suspense>
      {/* <InstagramFeed /> */}

      <Suspense fallback={null}>
        <ContactForm />
      </Suspense>
      {/* <Posts /> */}

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/blog/:slug"
        element={
          <>
            <Suspense fallback={null}>
              <PostPage />
            </Suspense>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </>
        }
      />
    </Routes>
  );
}

export default App;
