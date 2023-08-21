import './charInfo.scss';
import React, {useCallback, useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import {Link} from "react-router-dom";
import {setContent} from "../../utils/setContent";

const CharInfo = (props) => {
    const {getCharacterById, clearError, process, setProcess} = useMarvelService();

    const [char, setChar] = useState(null);
    const charId = props.charId;

    const updateChar = useCallback(() => {
        if (!charId) {
            return;
        }
        clearError();
        getCharacterById(charId)
            .then(onCharacterLoaded)
            .then(() => setProcess("confirmed"))
    }, [charId])


    useEffect(() => {
        updateChar();

    }, [updateChar]);

    const onCharacterLoaded = (char) => {
        setChar(char);
    }


    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;
    const imgObjectFit = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        ? {objectFit: "contain"} :  null
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgObjectFit}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.length > 0 ? null : "No comics"
                }
                {
                    comics.map((item, i) => {
                        if (i > 9) {
                            // eslint-disable-next-line array-callback-return
                            return ;
                        }
                        const id = item.resourceURI.match(/\d+$/ig);
                        return (
                            <li key={i} className="char__comics-item">
                                <Link to={`../comics/${id}`}>
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })
                }


            </ul>
        </>
    )
}

export default CharInfo;