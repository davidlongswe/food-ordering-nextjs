import React from "react";
import styles from "../styles/MealList.module.css";
import MealCard from "./MealCard";

const MealList = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST THAI IN TOWN</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur rem
        corrupti aperiam quod sit. Recusandae debitis voluptatem iure sunt esse
        fugit consequatur saepe quam! Architecto sint nesciunt blanditiis
        eveniet! Explicabo.
      </p>
      <div className={styles.wrapper}>
        <MealCard />
        <MealCard />
        <MealCard />
        <MealCard />
        <MealCard />
        <MealCard />
        <MealCard />
        <MealCard />
        <MealCard />
        <MealCard />
        <MealCard />
        <MealCard />
      </div>
    </div>
  );
};

export default MealList;
