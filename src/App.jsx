import { Suspense, lazy } from "react";

import FAQ from "./components/FAQ";
import { faq } from "./content/faq";
import Services from "./components/Services";

const Footer = lazy(() => import("./components/Footer"));
const ContactForm = lazy(() => import("./components/ContactForm"));

function App() {
  return (
    <>
      <Services />
      <FAQ data={faq} />

      <Suspense>
        <ContactForm />
      </Suspense>

      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
