import { Outlet } from "react-router"
import HomeFooter from "./HomeComponents/homeFooter.component"

function Layout() {

    return (
        <div>
            <main>
                <Outlet />
            </main>
            <HomeFooter />
        </div>
    )
}

export default Layout