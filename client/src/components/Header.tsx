import '../css/Header.css'
import { Link } from "react-router-dom";


function Header() {
    return (
        <header className="headerbody">

            <img className='header-logo' src='/brain.svg' alt='MindFlip Logo'/>

            <div>{/*  Div for main body text */}
            <h1>MindFlip</h1>
            <h3> An all in one study guide</h3>
            </div>
            
        </header>
    )
};

export default Header;