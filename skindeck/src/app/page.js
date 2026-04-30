import Image from "next/image";
import styles from "./page.module.css";
import Skin from "@/components/Skin"
import SkinFeedWrapper from "@/components/SkinFeedWrapper";
import FreeVbucks from "@/components/FreeVbucks";
import { verifySession } from "@/lib/session";
import UsersAPI from "@/lib/api/Users";

export default async function Home() {
  const session = await verifySession()
  let user;
  if (session){
    user = await UsersAPI.read(session.user.id, session.accessToken)
  }
  return (
    <div className={styles.page}>
      <SkinFeedWrapper />
    </div>
  );
}
