import React from "react"
import classes from "./MenuTogle.module.css"

const MenuTogle = (props) => {
    const cls = [
        classes.MenuTogle, "fa",

    ]
    if (props.isOpen) {
        cls.push('fa-times')
        cls.push(classes.open)
    } else {
        cls.push("fa-bars")
    }
    return (
        <i className={cls.join(" ")}
            onClick={props.onToggle} />
    )
}

export default MenuTogle