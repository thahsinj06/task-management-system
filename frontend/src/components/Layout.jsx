import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import "./Layout.css";
import logo from "../assets/logo.png";

function Layout(){

    const [open,setOpen] = useState(false);


    return(

        <div className="app">


            <Sidebar open={open}/>


            {open && 
            <div 
            className="overlay"
            onClick={()=>setOpen(false)}
            />
            }


            <div className="main">


                            <header className="topbar">


                    <button
                    className="menu-btn"
                    onClick={()=>setOpen(!open)}
                    >
                        {open ? "✕" : "☰"}
                    </button>


                    <img 
                    src={logo}
                    className="app-logo"
                    />


                </header>



                <section className="page">

                    <Outlet />

                </section>


            </div>


        </div>

    )

}


export default Layout;