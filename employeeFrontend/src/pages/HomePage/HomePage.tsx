import React from "react";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <div className={styles.pic}>
        <img src="https://images.unsplash.com/photo-1538688423619-a81d3f23454b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
        <div className={styles.picOverlay}><p>Welcome to this database</p></div>
      </div>
    </div>
  );
};

export default HomePage;
