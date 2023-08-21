import {useCallback, useState} from "react";

export const useHttp = () => {
    const [process, setProcess] = useState("waiting")

    const request = useCallback(async (url,
                                       method = "GET",
                                       body = null,
                                       headers = {
                                            "Content-Type": "application/json",
                                       }) => {
        setProcess("loading");

        try {
            const response = await fetch(url, {method, body, headers});
            if (!response.ok) {
                throw new Error(`Could nor fetch ${url}, status ${response.status}`)
            }
            const data = await response.json();

            // setProcess("confirmed"); /*Potential error because of async code*/
            return data

        } catch (e) {
            setProcess("error");
            throw e;
        }
    }, [])

    const clearError = useCallback(() => {
        setProcess("loading");
    }, [])

    const setProcessConfirmed = () => setProcess("confirmed");

    return {request, clearError, process, setProcess, setProcessConfirmed};
}