import { useState } from "react";

import FAQ from "./components/FAQ";
import { faq } from "./content/faq";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div class="faq">
        <div class="faq__title">
          <h3 class="title">FAQs</h3>
        </div>
        <FAQ data={faq} />
      </div>
    </>
  );
}

export default App;
