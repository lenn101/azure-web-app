import LoginForm from "@/components/LoginForm";
import { loginAction } from "@/actions/userAction";
import styles from "./login.module.css"

export default function loginPage() {
    return(
        <section>
            <LoginForm />
        </section>
    )
}