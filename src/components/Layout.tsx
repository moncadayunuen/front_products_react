import {Outlet} from "react-router";

export const Layout = () => {
    return (
        <main className={"min-h-screen bg-slate-950 w-full py-8"}>
            <section className={"w-full max-w-7xl mx-auto text-white"}>
                <Outlet />
            </section>
        </main>
    )
}

export default Layout;