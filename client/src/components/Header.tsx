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

            <nav className='header-nav'> {/* This will be the nav containing the information commented out on App.tsx, for testing purposes. This Nav information should be living inside of the header or the footer component.*/}
                <ul>
                    <li><Link to='/about'>ABOUT-US</Link></li>
                    <li><Link to='/contact'>CONTACT</Link></li>
                    <li></li>
                </ul>
            </nav>

            <div className='button-box'>
            <button className='login-button'> {/*Login button, nested in the header, this might need to be its own component to correctly handle the cases of users being logged in/out*/}
            <img className='login-icon' src='../assets/login.svg'/>
            <h3>Login</h3>
            <h3>Sign-Up</h3>
            </button>
            </div>
            
        </header>
    )
};

export default Header;