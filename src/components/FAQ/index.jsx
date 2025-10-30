import parse from "html-react-parser";
// import styles from "./FAQ.module.scss";
import { useEffect } from "react";

const FAQ = ({ data }) => {
  // useEffect(() => {
  //   console.log("kep");
  // }, []);

  return (
    <div className="container">
      <div className="faq">
        <div className="faq__title">
          <h3 className="title">FAQs</h3>
        </div>
        <section className="faq">
          {data.map((item) => (
            <details key={item.id} className="faq__dropdown">
              <summary className="faq__btn">
                <h4>{item.question}</h4>
                {/* <div className="faq__icon">
              <img
                src="./assets/images/icon-plus.svg"
                alt=""
                className="plus-icon btn-icon"
              />
              <img
                src="./assets/images/icon-minus.svg"
                alt=""
                className="minus-icon btn-icon"
              />
            </div> */}
              </summary>
              <main className="faq__body">{parse(item.answer)}</main>
            </details>
          ))}
        </section>
      </div>
    </div>
  );
};

export default FAQ;
