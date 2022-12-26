import Head from "next/head";
import Image from "next/image";
import Featured from "../components/Featured";
import MealList from "../components/MealList";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Asien Take Away</title>
        <meta
          name="description"
          content="Thai Restaurang Domsjö Asiatisk mat när den är som bäst"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="Domsjö, Örnsköldsvik, Restaurang, Thai, Kina, Ta med, Takeaway"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <MealList />
    </>
  );
}
