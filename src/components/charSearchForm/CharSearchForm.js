import {ErrorMessage as FormikErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup"

import "./charSearchForm.scss"
import React, {useState} from "react";
import useMarvelService from "../../services/MarvelService";
import {Link} from "react-router-dom";
import ErrorMessage from "../errorMessage/errorMessage";

const setContent = (process, Component, data) => {
    switch (process) {
        case "waiting" :
            return /*ничего*/;
        case "loading" :
            return /*Отключить кнопку*/;
        case "confirmed" :
            return <Component data={data[0]} />;
        case "error" :
            return <ErrorMsg/>;
        case "formik-error" :
            return <FormikErrorMsg/>;
        default :
            throw new Error("Unexpected process state");
    }
}

const CharSearchForm = () => {

    const [char, setChar] = useState(null);
    const {process, setProcess, clearError, getCharacterByName} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
        clearError();
        setProcess(!char ? null :
            char.length > 0 ? "confirmed" : "formik-error")
    }
    const updateChar = (name) => {
        clearError();
        getCharacterByName(name).then(onCharLoaded);
    }

    return (
        <div className={"char__search-form"}>
            <Formik initialValues={{charName: ""}}
                    validationSchema={Yup.object({
                        charName: Yup.string().required("Введите имя"),
                    })}
                    onSubmit={({charName}) => updateChar(charName)}
            >
                <Form>
                    <label htmlFor={"charName"} className={"char__search-label"}>Or find a character by name:</label>
                    <div className={"char__search-wrapper"}>
                        <Field
                            id={"charName"}
                            name={"charName"}
                            type={"text"}
                            placeholder={"Enter name"}
                        />
                        <button type={"submit"}
                                className={"button button__main"}
                        >
                            <div className={"inner"}>find</div>
                        </button>
                    </div>
                    <FormikErrorMessage name={"charName"} className={"char__search-error"} component={"div"}/>
                </Form>
            </Formik>
            {setContent(process, View, char)}
        </div>
    )
}


const ErrorMsg = () => {
    return (
        <div className="char__search-critical-error"><ErrorMessage /></div>
    )
}

const FormikErrorMsg = () => {
    return (
        <div className="char__search-error">
            The character was not found. Check the name and try again
        </div>
    )
}

const View = ({data}) => {
    const char = data;
    return (
        <div className={"char__search-wrapper"}>
            <div className={"char__search-success"}>
                There is! Visit {char.name} page
            </div>
            <Link to={`/characters/${char.id}`}
                  className={"button button__secondary"}>
                <div className={"inner"}>
                    To page
                </div>
            </Link>
        </div>
    )
}

export default CharSearchForm;