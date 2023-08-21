import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {

    const {request, clearError, process, setProcess} = useHttp();
    const publicKey = "e074a0a536212d03b82dd93902dbdca7"
    // const privateKey = "271e8f399a298f10445a71563011b2edba4c6c54"

    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = `apikey=${publicKey}`;

    const _baseOffset = 210;

    // getResource = async (url) => {
    //     const res = await fetch(url);
    //
    //     if (!res.ok) {
    //         throw new Error(`Could nor fetch ${url}, status ${res.status}`)
    //     }
    //
    //     return await res.json();
    // };

    const getAllCharacters = async (offset = _baseOffset) => {
         const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
         return res.data.results.map(_transformCharacter)
    }
    const getCharacterById = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return res.data.results.map(_transformCharacter)[0];
    }
    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async  (offset) => {
        const res = await request(`${_apiBase}comics?limit=8&${_apiKey}`);
        return res.data.results.map(_transformComic);
    }

    const getComicById = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return res.data.results.map(_transformComic)[0];
    }

    const _transformComic = (comic) => ({
        id: comic.id,
        homepage: comic.urls[0].url,
        title: comic.title,
        thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
        price: comic.prices[0].price,
        description: comic.description,
        language: comic.textObjects.language || "en-us",

    })

    const _transformCharacter = (character) => ({
        id: character.id,
        name: character.name,
        description: character.description,
        thumbnail: character.thumbnail.path + "." + character.thumbnail.extension,
        homepage: character.urls[0].url,
        wiki: character.urls[1].url,
        comics: character.comics.items,
    })

    return {
        clearError, process, setProcess,
        getCharacterById, getAllCharacters, getCharacterByName,
        getAllComics, getComicById
    };
}

export default useMarvelService;

