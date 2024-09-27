import React from "react";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <div className={styles.pic}>
        <img src="https://images.unsplash.com/photo-1538688423619-a81d3f23454b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
        <div className={styles.picOverlay}><p>Welcome to Employee DB, your central database for managing your employees. To search for an Employee please check out the "Employee" link above. To enter in a new employee please you the "Enter a new employee" link above. </p><br/>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores, quibusdam aut laborum error nihil exercitationem voluptatibus! Dolore, fuga praesentium! Autem saepe aliquid soluta necessitatibus alias adipisci explicabo maiores voluptate sequi?</p></div>
      </div>
      <p>Image by <a href="https://unsplash.com/@campaign_creators">Campaign Creators</a></p>
    </div>
  );
};

export default HomePage;
