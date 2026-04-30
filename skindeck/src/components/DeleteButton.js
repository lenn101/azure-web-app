"use client"
import { deleteAction } from "@/actions/userAction"
import styles from "./DeleteButton.module.css"

export default function DeleteButton(props){

    function handleDelete(){
        deleteAction(props.id)
    }

    return (
        <button className={styles.delete} onClick={handleDelete}>DELETE</button>
    )
}