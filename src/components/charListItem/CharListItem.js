import React from "react";

const CharListItem = (props) => {


    const {i, thumbnail, name, id, onCharSelected, focus, setRef} = props
    return (
        <li
            className="char__item"
            tabIndex={0}
            ref={setRef}
            onClick={() => {
                onCharSelected(id);
                focus(i)
            }}
            onKeyPress={e => {
                if (e.key === ' ' || e.key === "Enter") {
                    onCharSelected(id);
                    focus(i)
                }
            }}
        >
            <img src={thumbnail} alt={name} />
            <div className="char__name">{name}</div>
        </li>
    )
}

// *** PREVIOUS VERSION ON CLASSES ***
// class CharListItem extends React.Component{
//     // eslint-disable-next-line no-useless-constructor
//     constructor(props) {
//         super(props);
//
//     }
//
//
//     render() {
//         const {i, thumbnail, name, id, onCharSelected, focus, setRef} = this.props
//         return (
//             <li
//                 className="char__item"
//                 tabIndex={0}
//                 ref={setRef}
//                 onClick={() => {
//                     onCharSelected(id);
//                     focus(i)
//                 }}
//                 onKeyPress={e => {
//                     if (e.key === ' ' || e.key === "Enter") {
//                         onCharSelected(id);
//                         focus(i)
//                     }
//                 }}
//             >
//                 <img src={thumbnail} alt={name} />
//                 <div className="char__name">{name}</div>
//             </li>
//         )
//     }
// }

export default CharListItem;