import React from "react"
//import ReactDOM from "react-dom/client"
import ReactDOM from "react-dom/client"
import "./index.css"	
import Root from "./routes/Root"
import About from "./routes/About"
import FrontPage from "./routes/FrontPage"
import { RouterProvider, createHashRouter } from "react-router-dom"

const router = createHashRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <FrontPage />,
            },
            {
                path: "/about/:id",
                element: <About/>,
            },
        ],
    },
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>


)
