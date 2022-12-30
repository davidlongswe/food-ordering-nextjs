import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import Featured from "../components/Featured";
import MealList from "../components/MealList";

export default function Home({ mealList, admin }) {
  const [close, setClose] = useState(true);
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
      {admin && <AddButton setClose={setClose} />}
      <MealList mealList={mealList} />
      {!close && <Add setClose={setClose} />}
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      mealList: res.data,
      admin,
    },
  };
};
