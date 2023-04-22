import React from "react"
//import ReactDOM from "react-dom/client"
import ReactDOM from "react-dom/client"
import "./css/index.css"	
import Root from "./routes/Root"
import About from "./routes/About"
import FrontPage from "./routes/FrontPage"
import {createHashRouter , Outlet, RouterProvider } from "react-router-dom"

const router = createHashRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <FrontPage key={1}/>,
            },
            {
                path: "/gen1",
                element: <FrontPage key={1}/>,
            },
            {
                path: "/gen2",
                element: <FrontPage key={2}/>,
            },
            {
                path: "/gen3",
                element: <FrontPage key={3}/>,
            },
            {
                path: "/gen4",
                element: <FrontPage key={4}/>,
            },
            {
                path: "/gen5",
                element: <FrontPage key={5}/>,
            },
            {
                path: "/gen6",
                element: <FrontPage key={6}/>,
            },
            {
                path: "/gen7",
                element: <FrontPage key={7}/>,
            },
            {
                path: "/gen8",
                element: <FrontPage key={8}/>,
            },
            {
                path: "/gen9",
                element: <FrontPage key={9}/>,
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
    <React.StrictMode><RouterProvider router={router}><Outlet/></RouterProvider></React.StrictMode>
        
)
