import {useRouteError} from "react-router-dom";

const Error = () => {
    const error = useRouteError();

    //Destructure
    const {status, statusText} = error;

    return (
       <>
            <div>OOPs...</div>
            <p>Error Page...Status: {status} and {statusText}</p>
       </>
    )
}


export default Error;