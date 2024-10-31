import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link to={"/home"} className="flex items-center gap-3">
            <img src="/logo.png" height={60} width={60} alt="logo" />
            <img src="/logo-texto.png" width={230} height={0} alt="logo" />
        </Link>
    )
}
