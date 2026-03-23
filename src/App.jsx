import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeContextProvider } from "./hooks/useTheme";
import Hero from "./components/Hero";
import ContainerHero from "./components/Hero/Container";
import StatsBar from "./components/StatsBar";
// import { PhotoGallery } from "./components/features/LandingPage/index";

const Cards = lazy(() => import("./components/features/Cards"));
const FAQ = lazy(() => import("./components/FAQ"));
const Footer = lazy(() => import("./components/Footer"));
const ContactForm = lazy(() => import("./components/Form"));
const PostPage = lazy(() => import("./components/features/Posts/PostPage"));
const Services = lazy(() => import("./components/Services"));
const Posts = lazy(() => import("./components/features/Posts"));
const Timer = lazy(() => import("./components/features/Timer"));
const LandingPage = lazy(() => import("./components/features/LandingPage"));

function HomePage() {
  return (
    <ThemeContextProvider>
      <Hero />
      <StatsBar />
      {/* <PhotoGallery /> */}

      <ContainerHero />
      <Suspense fallback={null}>
        <Cards />
      </Suspense>
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
      <Suspense fallback={null}>
        <Posts />
      </Suspense>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </ThemeContextProvider>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/timer" element={<Timer />} />
      {/* <Route
        path="/free-session"
        element={
          <Suspense fallback={null}>
            <LandingPage />
          </Suspense>
        }
      /> */}
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
