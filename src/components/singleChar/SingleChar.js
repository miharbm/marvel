import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/Spinner";

import "./singleChar.scss"
import {Helmet} from "react-helmet";
const SingleChar = () => {
    const {charId} = useParams();
    const [char, setChar] = useState(null);

    const {loading, error, getCharacterById, clearError} = useMarvelService();

    const updateChar = () => {
        clearError();
        getCharacterById(charId)
            .then(onCharLoaded)
    }


    useEffect(() => {
        updateChar();
    }, [charId]);

    const onCharLoaded = (char) => {
        setChar(char);
    }


    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !loading && !error && char ? <View char={char}/> : null;
    const title = !loading && !error && char ? char.name : null;


    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${title} character's page`}
                />
                <title>{title}</title>
            </Helmet>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail} = char;

    console.log(char)
    return (
        <div className="single-char">
            <img src={thumbnail} alt={name} className="single-char__img"/>
            <div>
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
            <Link className="single-char__back" to={"../"}>Back to all</Link>
        </div>
    )
}
export default SingleChar;