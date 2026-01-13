import PropTypes from "prop-types";
import styles from "./Main.module.css";
import Inline from "../Inline";

const Main = ({ count }) => {
  return (
    <>
      <div className={styles.main}>
        <p> Main: {count}</p>
        <h2>dsdsd</h2>
      </div>
      <Inline>
        <p> Main: {count}</p>
        <h2>dsdsd</h2>
      </Inline>
    </>
  );
};

Main.propTypes = {
  count: PropTypes.number,
};

export default Main;
