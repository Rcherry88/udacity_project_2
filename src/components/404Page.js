import React from 'react'
import { Link } from 'react-router-dom'
import NavigationBar from "./NavigationBar";

const NotFound = () => {
    return (
        <div>
                  <NavigationBar />

            <h2>Oops we encountered an error and the page you requested was not found. Use the link below to return home.</h2>

            <Link
            
                to="/"
                className="back-home">
                    Go Home
            </Link>
        </div>
    )
}

export default NotFound