import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import React, {useEffect, useState} from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import useMarvelService from "../../services/MarvelService";

const RandomChar = () => {

    const {loading, error, getCharacterById, clearError} = useMarvelService();

    const [char, setChar] = useState({
        name: null,
        description: "",
        thumbnail: null,
        homepage: null,
        wiki: null,
    });



    useEffect(() => {
        updateCharacter();
    }, []);


    const onCharacterLoaded = (char) => {
        setChar(char);
    }


    const updateCharacter = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacterById(id)
            .then(onCharacterLoaded)
    }


    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char} maxLengthDescr={220}/> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner" onClick={updateCharacter}>try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}, maxLengthDescr = 220) => {
    const {name, description, thumbnail, homepage, wiki} = char;


    let descriptionVisible;
    if (description.length < 1) {
        descriptionVisible = "This character has no description";
    } else if (description.length < maxLengthDescr) {
        descriptionVisible = description
    } else {
        descriptionVisible = `${description.slice(0, maxLengthDescr)}...`
    }


    const imgObjectFit = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        ? {objectFit: "contain"} :  null
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgObjectFit}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{descriptionVisible}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

// *** PREVIOUS VERSION ON CLASSES ***
// class RandomChar extends React.Component{
//
//     marvelService = new MarvelService();
//
//     // constructor(props) {
//     //     super(props);
//     // }
//
//     state = {
//         char: {
//             name: null,
//             description: "",
//             thumbnail: null,
//             homepage: null,
//             wiki: null,
//         },
//         loading: true,
//         error: false,
//     }
//
//     componentDidMount() {
//         this.updateCharacter();
//         // this.timerId = setInterval(this.updateCharacter, 3000)
//     }
//
//     componentWillUnmount() {
//         // clearInterval(this.timerId)
//     }
//
//     onCharacterLoaded = (char) => {
//         this.setState({
//             char: char,
//             loading: false,
//             error: false,
//         })
//     }
//
//     onError = () => {
//         this.setState({
//             error: true,
//             loading: false,
//         })
//     }
//
//     updateCharacter = () => {
//         this.setState({loading: true})
//         const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
//         this.marvelService
//             .getCharacterById(id)
//             .then(res => this.onCharacterLoaded(res))
//             .catch(this.onError)
//     }
//
//     render() {
//         const {char, loading, error} = this.state;
//
//         const errorMessage = error ? <ErrorMessage/> : null;
//         const spinner = loading ? <Spinner/> : null;
//         const content = !(loading || error) ? <View char={char} maxLengthDescr={220}/> : null;
//
//         return (
//             <div className="randomchar">
//                 {errorMessage}
//                 {spinner}
//                 {content}
//                 <div className="randomchar__static">
//                     <p className="randomchar__title">
//                         Random character for today!<br/>
//                         Do you want to get to know him better?
//                     </p>
//                     <p className="randomchar__title">
//                         Or choose another one
//                     </p>
//                     <button className="button button__main">
//                         <div className="inner" onClick={this.updateCharacter}>try it</div>
//                     </button>
//                     <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
//                 </div>
//             </div>
//         )
//     }
// }
//
// const View = ({char}, maxLengthDescr = 220) => {
//     const {name, description, thumbnail, homepage, wiki} = char;
//
//
//     let descriptionVisible;
//     if (description.length < 1) {
//         descriptionVisible = "This character has no description";
//     } else if (description.length < maxLengthDescr) {
//         descriptionVisible = description
//     } else {
//         descriptionVisible = `${description.slice(0, maxLengthDescr)}...`
//     }
//
//
//     const imgObjectFit = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
//         ? {objectFit: "contain"} :  null
//     return (
//         <div className="randomchar__block">
//             <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgObjectFit}/>
//             <div className="randomchar__info">
//                 <p className="randomchar__name">{name}</p>
//                 <p className="randomchar__descr">{descriptionVisible}</p>
//                 <div className="randomchar__btns">
//                     <a href={homepage} className="button button__main">
//                         <div className="inner">homepage</div>
//                     </a>
//                     <a href={wiki} className="button button__secondary">
//                         <div className="inner">Wiki</div>
//                     </a>
//                 </div>
//             </div>
//         </div>
//     )
// }

export default RandomChar;