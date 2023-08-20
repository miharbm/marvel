import './charInfo.scss';
import React, {useCallback, useEffect, useState} from "react";
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import useMarvelService from "../../services/MarvelService";
import {Link} from "react-router-dom";

const CharInfo = (props) => {
    const {loading, error, getCharacterById, clearError} = useMarvelService();

    const [char, setChar] = useState(null);
    const charId = props.charId;

    const updateChar = useCallback(() => {
        if (!charId) {
            return;
        }
        clearError();
        getCharacterById(charId)
            .then(onCharacterLoaded)
    }, [charId])

    // const updateChar = useCallback(() => {
    //     const {charId : id} = props;
    //     if (!id) {
    //         return;
    //     }
    //     setLoading(true)
    //     marvelService
    //         .getCharacterById(id)
    //         .then(res => onCharacterLoaded(res))
    //         .catch(onError)
    //
    // }, [])

    useEffect(() => {
        updateChar();

    }, [updateChar]);

    // useEffect(() => {
    //     updateChar();
    // }, [charId, updateChar]);

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.props.charId !== prevProps.charId) {
    //         this.updateChar();
    //     }
    // }


    const onCharacterLoaded = (char) => {
        setChar(char);
    }



    // const skeleton = char || loading || error ? null : <Skeleton/>
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !loading && !error && char ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {errorMessage}
            {spinner}
            {content}
            {skeleton}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char
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