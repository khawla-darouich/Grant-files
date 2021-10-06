import React from 'react'
import classes from './Layout.module.css';
export default function Page(props) {
    return (
        <div className={` ${classes.page}`}>
            {props.children}
        </div>
    )
}
