import './singleComic.scss';
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import {Helmet} from "react-helmet";
import {setContent} from "../../utils/setContent";

const SingleComic = () => {

    const {comicId} = useParams();
    const [comic, setComic] = useState(null);

    const {process, setProcess, getComicById, clearError} = useMarvelService();

    const updateComic = () => {
        clearError();
        getComicById(comicId)
            .then(onComicLoaded)
    }


    useEffect(() => {
        updateComic();
    }, [comicId]);

    const onComicLoaded = (comic) => {
        setComic(comic);
        setProcess("confirmed")
    }

    const title = process === "confirmed" ? comic.title : "Single comic";

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}
                />
                <title>{title}</title>
            </Helmet>
            {setContent(process, View, comic)}

        </>
    )
}

const View = ({data}) => {
    const {title, description, thumbnail, language, price, pageCount} = data;
    const priceShow = price > 0 ? `${price}$` : "NOT AVAILABLE";

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{priceShow}</div>
            </div>
            <Link  className="single-comic__back" to={"../comics"}>Back to all</Link>
        </div>
    )
}

export default SingleComic;