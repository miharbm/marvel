import {ErrorMessage as FormikErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup"

import "./charSearchForm.scss"
import {useState} from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/errorMessage";
import {Link} from "react-router-dom";

const CharSearchForm = () => {

    const [char, setChar] = useState(null);
    const {loading, error, clearError, getCharacterByName} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
        console.log(char)
    }
    const updateChar = (name) => {
        clearError();
        getCharacterByName(name).then(onCharLoaded);
    }

    const positiveResult = (char) => (
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
    );
    const negativeResult = (
        <div className="char__search-error">
            The character was not found. Check the name and try again
        </div>
    );

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;

    const result = !char ? null :
                                char.length > 0 ? positiveResult(char[0]) : negativeResult;


    return (
        <div className={"char__search-form"}>
            <Formik initialValues={{charName: ""}}
                    validationSchema={Yup.object({
                        charName: Yup.string().required("Выберите валюту"),
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
            {errorMessage}
            {result}
        </div>
    )
}

export default CharSearchForm;