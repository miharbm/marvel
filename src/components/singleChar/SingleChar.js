import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";

import "./singleChar.scss"
import {Helmet} from "react-helmet";
import {setContent} from "../../utils/setContent";
const SingleChar = () => {
    const {charId} = useParams();
    const [char, setChar] = useState(null);

    const {process, setProcess, getCharacterById, clearError} = useMarvelService();

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
        setProcess("confirmed");
    }

    const title = process === "confirmed" ? char.name : null;

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${title} character's page`}
                />
                <title>{title}</title>
            </Helmet>
            {setContent(process, View, char)}
        </>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail} = data;

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