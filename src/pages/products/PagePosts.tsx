import {useEffect, useMemo, useState} from "react";
import {getProducts} from "../../services";
import type {Product} from "../../types/Product.ts";
import {Link} from "react-router";
import {Loader} from "../../components/loader/Loader.tsx";
import {userUser} from "../../contexts/UserContext.tsx";

const PagePosts = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {logout, login, user} = userUser();

    const filteredPosts = useMemo(() => {
        return posts.filter((post: Product) => {
            const value = search.toLowerCase();
            return (
                post.name.toLowerCase().includes(value)
            )
        })
    },[posts,search])

    useEffect(() => {
        setIsLoading(true);
        getProducts().then((res) => {
            setPosts(res);
            setIsLoading(false)
        });
    },[]);

    const handleLogin = () => {
        login({
            id: "1",
            name: "Yunuen",
            email: "yunuen@email.com",
        });
    };

    useEffect(() => {
        handleLogin();
    }, []);

    return (
        <>
            <div className={"flex justify-between items-center"}>
                {
                    (user) &&
                        (<div className={"text-slate-300 flex flex-col py-2 px-4 bg-slate-800 rounded-2xl w-max mb-3"}>
                            <p className={"font-bold"}>{user.name}</p>
                            <small>{user.email}</small>
                        </div>)
                }
                <button
                    onClick={() => logout()}
                    className={"bg-slate-800 rounded-2xl py-2 px-4 h-[50px] disabled:opacity-40 hover:bg-slate-800 cursor-pointer text-white mb-3"}
                >
                    Cerrar sesión
                </button>
            </div>
            <div className={"w-full max-w-7xl mx-auto flex justify-between items-center pb-5"}>
                <div>
                    <h2 className={"text-orange-500 uppercase text-2xl font-medium"}>Publicaciones</h2>
                    <small className={"text-slate-400"}>Listado y búsqueda de publicaciones</small>
                </div>
                <div className={"w-full max-w-sm flex items-center"}>
                    <label className={"text-slate-300 px-2"}>Buscar</label>
                    <input
                        type={"text"}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={"w-full bg-slate-900 rounded-2xl p-4 border border-slate-700 text-white hover:border-slade-800"}
                    />
                </div>
            </div>
            <div className={"w-full max-w-7xl mx-auto flex justify-end mb-3"}>
                <Link to={"/products/nuevo-producto"} className={"bg-orange-500 p-4 rounded-2xl text-white hover:bg-orange-600 transition cursor-pointer"}>Agregar producto</Link>
            </div>
            {(isLoading) ?
                <>
                    <Loader message={"Posts"} />
                </>
                :
                <>
                    {filteredPosts.length > 0 ?
                        <div className={"w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-8"}>
                            {filteredPosts.map((post: Product) => {
                                return (
                                    <div className={"bg-slate-700 p-4 rounded-2xl"} key={post.id}>
                                        <img src={post.thumbnail} alt={post.name} className={"rounded-2xl mb-3"} />
                                        <h3 className={"text-orange-500 text-2xl uppercase font-bold h-[100px]"}>
                                            {post.name.slice(0,50)}
                                            {(post.name.length <= 50) ? "" : "..."}
                                        </h3>
                                        <p className={"text-slate-400 py-3"}>
                                            {post.description.slice(0,120)}
                                            {(post.description.length <= 120) ? "" : "..."}
                                        </p>
                                        <Link to={`/products/${post.id}`} className={"block p-4 bg-orange-500 text-white text-center rounded-2xl mt-3"}>Ver detalle</Link>
                                    </div>
                                )
                            })}
                        </div>
                        :
                        <div className={"bg-slate-500 flex flex-col justify-center items-center p-4 rounded-2xl w-max mx-auto text-slate-300 my-8"}>
                            <h3 className={"font-bold"}>No hay publicaciones por mostrar</h3>
                            <p>Intenta más tarde</p>
                        </div>
                    }
                    {
                        (filteredPosts.length >= 10) && (
                            <div className={"w-full flex justify-center my-4 items-center gap-4"}>
                                <button
                                    disabled={(page === 1)}
                                    className={"bg-slate-700 rounded-2xl px-4 py-2 disabled:opacity-40 hover:bg-slate-800 cursor pointer"}
                                    type={"button"}>
                                    Anterior
                                </button>
                                <div>
                                    <p className={"text-slate-300"}>Página {page}</p>
                                </div>
                                <button
                                    className={"bg-slate-700 rounded-2xl px-4 py-2 disabled:opacity-40 hover:bg-slate-800 cursor pointer text-white"}
                                    type={"button"}
                                    onClick={() => setPage((prev) => prev + 1)}
                                >
                                    Siguiente
                                </button>
                            </div>
                        )
                    }
                </>
            }
        </>
    )
}

export default PagePosts