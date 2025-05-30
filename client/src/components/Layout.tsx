import { Outlet, Link } from "react-router-dom";
import { Header, Footer } from './index'
import { useState } from "react";
import { HiHome } from "react-icons/hi2";
import { IoSchoolOutline } from "react-icons/io5";
import { MdQuiz, MdOutlineSubject } from "react-icons/md";
import '../css/layout.css'

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = (open: boolean) => {
    setSidebarOpen(open);
  };

  return (
    <>
      <div className='layout-header'>
        <Header />
      </div>

      <div className="layout-main">
        <div
          id="mySidebar"
          className={`sidebar ${sidebarOpen ? "open" : ""}`}
          onMouseOver={() => toggleSidebar(true)}
          onMouseOut={() => toggleSidebar(false)}
        >
          <Link to='/'>
            <span className="icon"><HiHome /></span>
            <span className="icon-text">Home</span>
          </Link>
          <Link to='/flashcards'>
            <span className="icon"><IoSchoolOutline /></span>
            <span className="icon-text">Flashcards</span>
          </Link>
          <Link to='/quiz'>
            <span className="icon"><MdQuiz /></span>
            <span className="icon-text">Quiz</span>
          </Link>
          <Link to='/list'>
            <span className="icon"><MdOutlineSubject /></span>
            <span className="icon-text">Subject List</span>
          </Link>
        </div>

        <main id="main">
          <Outlet />
        </main>
      </div>

      <Footer />
    </>
  );
}

export default Layout;
