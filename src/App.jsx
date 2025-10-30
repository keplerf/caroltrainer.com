import { useState, Suspense, lazy } from "react";

import FAQ from "./components/FAQ";
import { faq } from "./content/faq";

const Footer = lazy(() => import("./components/Footer"));

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <FAQ data={faq} />
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
