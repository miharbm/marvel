import './comicsList.scss';
import useMarvelService from "../../services/MarvelService";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {setListContent} from "../../utils/setContent";


const ComicsList = () => {
    const {process, setProcess, getAllComics} = useMarvelService();

    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loadingNewItem, setLoadingNewItem] = useState(false)
    const [comicsEnded, setComicsEnded] = useState(false)

    useEffect(() => {
        onRequest(offset, true)
    }, []);

    const onRequest = (offset, initial) => {
        setLoadingNewItem(!initial);
        getAllComics(offset)
            .then(onComicsLoaded)
            .then(() => setProcess("confirmed"))
    };

    const onComicsLoaded = (comics) => {
        const ended = comics.length < 8;
        setLoadingNewItem(false);
        setOffset(oldOffset => oldOffset + comics.length);
        setComics(oldComics => [...oldComics, ...comics]);
        setComicsEnded(ended);
    };

    const renderComics = () => {
        const items = comics.map((comic, i) => {
            return ComicItem(comic)
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    return (
        <div className="comics__list">
            {setListContent(process, () => renderComics(), loadingNewItem)}

            <button
                className="button button__main button__long"
                disabled={loadingNewItem}
                style={{"display" : comicsEnded ? "none" : "block"}}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
};

const ComicItem = (props) => {
    const {id, title, thumbnail, price} = props;
    const priceShow = price > 0 ? `${price}$` : "NOT AVAILABLE";
    return (
        <li
            className="comics__item"
            key={id}
            tabIndex={0}
        >
            <Link to={`${id}`}>
                <img src={thumbnail} alt={title} className="comics__item-img"/>
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{priceShow}</div>
            </Link>
        </li>
    )
};

export default ComicsList;