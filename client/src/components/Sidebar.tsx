import '../css/Sidebar.css';
import { Link } from 'react-router-dom';
import { HiHome } from "react-icons/hi2";
import { IoSchoolOutline } from "react-icons/io5";
import { MdQuiz, MdOutlineSubject } from "react-icons/md";

function Sidebar() {
    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <aside id="mySidebar" className="sidebar">
                <h3>Navigation</h3>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>
                                <span className="icon"><HiHome /></span>
                                <span className="icon-text">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/flashcards'>
                                <span className="icon"><IoSchoolOutline /></span>
                                <span className="icon-text">Flashcards</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/quiz'>
                                <span className="icon"><MdQuiz /></span>
                                <span className="icon-text">Quiz</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/list'>
                                <span className="icon"><MdOutlineSubject /></span>
                                <span className="icon-text">Subject List</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default Sidebar;