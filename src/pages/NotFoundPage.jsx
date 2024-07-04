import { Link } from "react-router-dom";
import React from "react";

class NotFoundPage extends React.Component {
    render() {
        return (
            <div className="full-container">
                <div className="text-center m-y">
                    <div className="error-template">
                        <h1>Oops!</h1>
                        <h2>404 Not Found</h2>
                        <div className="error-details">Sorry, an error has occured, Requested page not found!</div>
                        <div className="error-actions">
                            <Link to="/" className="btn btn-dark">Take Me Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default NotFoundPage;
