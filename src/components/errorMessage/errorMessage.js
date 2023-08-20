import gif from "./error.gif"
const ErrorMessage = () => {
    return (
        <img
            src={gif}
            alt="error"
            style={{
                display: "block",
                width: "250px",
                height: "250px",
                objectFit: "contain",
                margin: "0 auto",
            }}
        />
    )
}
// process.env.PUBLIC_URL + "/error.gif"
export default ErrorMessage;