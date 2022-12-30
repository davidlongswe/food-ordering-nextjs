import React from "react";
import styles from "../styles/MealCard.module.css";
import Image from "next/image";
import Link from "next/link";

const MealCard = ({ meal }) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${meal._id}`}>
        <Image src={meal.img} alt="" width={200} height={200} />
        <h1 className={styles.title}>{meal.title}</h1>
        <span className={styles.price}>${meal.prices[0]}</span>
        <p className={styles.desc}>{meal.desc}</p>
      </Link>
    </div>
  );
};

export default MealCard;
