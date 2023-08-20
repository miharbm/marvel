import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import React, {useState} from "react";
import CharSearchForm from "../charSearchForm/CharSearchForm";
import {Helmet} from "react-helmet";

const MainPage = () => {
    const [selectedChar, setChar] = useState(null);
    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <CharList onCharSelected={onCharSelected}/>
                <div>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm/>
                    </ErrorBoundary>
                </div>

            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>

        </>
    )
}

export default MainPage