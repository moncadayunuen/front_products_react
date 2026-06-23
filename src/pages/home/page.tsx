import {Link} from "react-router";

const PageHome = () => {
    return (
        <div className={"w-full min-h-screen bg-slate-950"}>
            <div className={"max-w-[1560px] mx-auto flex justify-center gap-8 py-8"}>
                <Link to={"/posts"} className={"bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"}>
                    PUBLICACIONES
                </Link>
                <Link to={"/users"} className={"bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"}>
                    USUARIOS
                </Link>
            </div>
        </div>
    )
}

export default PageHome;