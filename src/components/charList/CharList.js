import './charList.scss';
import React, {useEffect, useRef, useState} from "react";
import CharListItem from "../charListItem/CharListItem";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/Spinner";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const CharList = (props) => {
    const {loading, error, getAllCharacters} = useMarvelService();

    const [characters, setCharacters] = useState([])
    const [loadingNewItem, setLoadingNewItem] = useState(false)
    const [offset, setOffset] = useState(1541)
    const [charEnded, setCharEnded] = useState(false)


    const itemsRef = useRef([]);

    useEffect(() => {
        onRequest(offset, true)
        // getCharacters();
    }, []);


    const onRequest = (offset, initial) => {

        setLoadingNewItem(!initial);
        getCharacters(offset);
    }

    const onCharactersLoaded = (characters) => {
        const ended = characters.length < 9;

        setCharacters(oldCharacters => [...oldCharacters, ...characters]);
        setLoadingNewItem(false);
        setOffset(oldOffset => oldOffset + characters.length)
        setCharEnded(ended);
    }

    const getCharacters = (offset) => {
        getAllCharacters(offset)
            .then(onCharactersLoaded)
    }

    const focusOnItem = id => {
        const activeClass = "char__item_selected";

        itemsRef.current.forEach(item => {
            if(item.classList.contains(activeClass))
                item.classList.remove(activeClass)
        });
        itemsRef.current[id].classList.add(activeClass)
        itemsRef.current[id].focus();
    }

    function renderCharacters () {
        const items = characters.map((char, i) => {
            return (
                <CSSTransition
                    timeout={1000}
                    classNames={"char__animate"}
                    key={char.id}
                    // nodeRef={nodeRef}
                >
                    <CharListItem
                        i={i}
                        setRef={el => itemsRef.current[i] = el}
                        focus={focusOnItem}
                        key={char.id}
                        {...char}
                        onCharSelected={props.onCharSelected}
                    />
                </CSSTransition>
            )
        });
        return (
            <TransitionGroup component={"ul"} className={"char__grid"}>
                {items}
            </TransitionGroup>
        )
    }


    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !loadingNewItem ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {renderCharacters()}
            <button
                className="button button__main button__long"
                disabled={loadingNewItem}
                style={{"display" : charEnded ? "none" : "block"}}
                onClick={() => onRequest(offset)}
            >
                <div className="inner" >load more</div>
            </button>
        </div>
    )

}

// *** PREVIOUS VERSION ON CLASSES ***
// class CharList extends React.Component{
//     marvelService = new MarvelService();
//
//     state = {
//         characters : [],
//         charList: [],
//         loadingNewItem: false,
//         offset: 1541,
//         charEnded: false,
//     }
//
//     itemsRef = [];
//     componentDidMount() {
//         this.getCharacters();
//     }
//
//     onRequest = (offset) => {
//         this.onCharListLoading();
//         this.getCharacters(offset);
//     }
//
//     onCharListLoading = () => {
//         this.setState({
//             loadingNewItem: true
//         })
//     }
//
//     setRef = (ref) => {
//         this.itemsRef.push(ref);
//     }
//
//     onCharactersLoaded = (characters) => {
//         const ended = characters < 9;
//         this.setState(({characters : oldCharacters, offset: oldOffset}) => ({
//             characters: [...oldCharacters, ...characters],
//             loadingNewItem: false,
//             offset: oldOffset + characters.length,
//             charEnded: ended
//         }))
//     }
//
//     getCharacters = (offset) => {
//         this.marvelService
//             .getAllCharacters(offset)
//             .then(this.onCharactersLoaded)
//             .catch()
//     }
//
//     focusOnItem = id => {
//         const activeClass = "char__item_selected";
//
//         this.itemsRef.forEach(item => {
//             console.log(item)
//             if(item.classList.contains(activeClass))
//                 item.classList.remove(activeClass)
//         });
//         this.itemsRef[id].classList.add(activeClass)
//         this.itemsRef[id].focus();
//     }
//
//     renderCharacters (characters) {
//         return  characters.map((char, i) => {
//             return (
//                 <CharListItem
//                     i={i}
//                     setRef={this.setRef}
//                     focus={this.focusOnItem}
//                     key={char.id}
//                     {...char}
//                     onCharSelected={this.props.onCharSelected}
//                 />
//             )
//         })
//     }
//
//
//     render() {
//         const {characters : charsData, loadingNewItem, offset, charEnded} = this.state
//         const characters = this.renderCharacters(charsData);
//         return (
//             <div className="char__list">
//                 <ul className="char__grid">{characters}</ul>
//                 <button
//                     className="button button__main button__long"
//                     disabled={loadingNewItem}
//                     style={{"display" : charEnded ? "none" : "block"}}
//                     onClick={() => this.onRequest(offset)}
//                 >
//                     <div className="inner" >load more</div>
//                 </button>
//             </div>
//         )
//     }
//
//
// }

export default CharList;