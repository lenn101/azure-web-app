import LoginForm from "@/components/LoginForm";
import { loginAction } from "@/actions/userAction";
import styles from "./register.module.css"

export default function registerPage() {
    return(
        <section>
            {/*wir geben register true damit man nicht zwei verschiedene formulare 
            machen muss sondern einfach zwei versionen wo immer mit canary operator 
            register ? x : y gemacht wird*/}
            <LoginForm register={true}/>
        </section>
    )
}