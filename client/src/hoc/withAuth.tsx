import React, { ElementType, ReactNode } from "react";
import Api from "../api/api";

const withAuth = (Component: ElementType) => {
    console.log("checking auth");

    return <Component />
}

export default withAuth