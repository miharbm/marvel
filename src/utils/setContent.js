import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/errorMessage";
import React from "react";

const setContent = (process, Component, data, props) => {
    switch (process) {
        case "waiting" :
            return <Skeleton/>;
        case "loading" :
            return <Spinner/>;
        case "confirmed" :
            return <Component data={data} {...props}/>;
        case "error" :
            return <ErrorMessage/>;
        default :
            throw new Error("Unexpected process state");
    }
}

const setListContent = (process, Component, loadingNewItem) => {
    switch (process) {
        case "waiting" :
            return <Spinner/>;
        case "loading" :
            return  loadingNewItem ? <Component/> : <Spinner/>
        case "confirmed" :
            return <Component/>;
        case "error" :
            return <ErrorMessage/>;
        default :
            throw new Error("Unexpected process state");
    }
}

export {setListContent, setContent};