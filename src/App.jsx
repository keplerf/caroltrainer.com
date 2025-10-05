import { useState } from "react";

import "./App.css";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Main from "./components/main";
import Footer from "./components/footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Header />

      <section className="content-wrapper">
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
