import { Outlet } from "react-router-dom";
import { Header, Footer, Sidebar } from './index'
import '../css/layout.css'

function Layout () {
    return (
        <>
        <div className='layout-header'>
        <Header/>
        </div>

        <div className="layout-main">
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </div>
        <Footer/>
        </>
    )
}

export default Layout;