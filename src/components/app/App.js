import AppHeader from "../appHeader/AppHeader";
import React, {Suspense} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Spinner from "../spinner/Spinner";
import SingleCharPage from "../pages/SingleCharPage";

const Page404 = React.lazy(() => import("../pages/404"));
const MainPage = React.lazy(() => import("../pages/MainPage"));
const ComicsPage = React.lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = React.lazy(() => import("../pages/SingleComicPage"));

const App = () => {



    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <Suspense fallback={<Spinner/>}>
                    <main>
                        <Routes>
                            <Route path={"/"} element={<MainPage/>}/>
                            <Route path={"/characters/:charId"} element={<SingleCharPage/>}/>
                            <Route path={"/comics"} element={<ComicsPage/>}/>
                            <Route path={"/comics/:comicId"} element={<SingleComicPage/>}/>
                            <Route path={"*"} element={<Page404/>}/>
                        </Routes>
                    </main>
                </Suspense>
            </div>
        </Router>
    )
}

// *** PREVIOUS VERSION ON CLASSES ***
// class App extends React.Component {
//     state = {
//         showRandomChar: true,
//         selectedChar: null,
//     }
//
//     toggleRandomChar = () => {
//         this.setState((state) => ({
//             showRandomChar: !state.showRandomChar
//         }))
//     }
//
//     onCharSelected = (id) => {
//         this.setState({
//             selectedChar: id
//         })
//     }
//     render() {
//         return (
//             <div className="app">
//                 <AppHeader/>
//                 <main>
//                     {this.state.showRandomChar ? <RandomChar/> : null}
//                     <button onClick={this.toggleRandomChar}>Click me</button>
//                     <div className="char__content">
//                         <CharList onCharSelected={this.onCharSelected}/>
//                         <ErrorBoundary>
//                             <CharInfo charId={this.state.selectedChar}/>
//                         </ErrorBoundary>
//                     </div>
//                     <img className="bg-decoration" src={decoration} alt="vision"/>
//                 </main>
//             </div>
//         )
//     }
// }

export default App;