import '../css/Sidebar.css'
import { Link } from 'react-router-dom';

function Sidebar () {
    return (
        <>
        <aside className='sidebar'>
            <h3>Navigation</h3>
            <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to="/flashcards">Flashcards</Link></li>
                <li><Link to="/quiz">Quiz</Link></li>
                <li><Link to="/list">List</Link></li>
            </ul>
            </nav>
        </aside>
        </>
    )
}
export default Sidebar;