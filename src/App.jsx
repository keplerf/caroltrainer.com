import { useState } from "react";

// import "./App.css";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Main from "./components/main";
import Footer from "./components/footer";
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
      {/* <Header /> */}

      {/* <section className="content-wrapper">
        <Sidebar />
        <Main count={count} />
      </section>
      <Footer />

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div> */}
    </>
  );
}

export default App;
