import {useState} from "react";
import {type SubmitHandler, useForm} from "react-hook-form";
import {createProduct} from "../../services";

type Inputs = {
    name: string,
    description: string,
    price: number,
    stock: number,
}

export const PageCreateProduct = () => {
    const [isloading, setIsloading] = useState<boolean>(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            stock: 0,
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsloading(true);
        const result = await createProduct(data);
        if(result.status === 201) {
            setIsloading(false);
            reset();
        }
        console.log(result,"result");
    }

    const handleOnChange = (value: string | number, name: string) => setProduct({...product, [name]:value});

    return <div className={`bg-slate-800 min-h-[500px] rounded-2xl p-8`}>
        <h2 className={"text-4xl font-bold text-center text-orange-500"}>Nuevo producto</h2>
        <p className={"text-center text-slate-400"}>* Todos los campos son obligatorios</p>

        <form onSubmit={handleSubmit(onSubmit)} className={"w-full max-w-[800px] mx-auto bg-slate-700 mt-4 p-4 rounded-2xl"}>
            <div className="h-[50px] relative mb-3 flex items-center rounded-2xl bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                <input
                    type="text"
                    {...register("name", {required: true})}
                    onChange={(e) => handleOnChange(e.target.value,"name")}
                    placeholder="Escribe un nombre de producto"
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
                {errors.name && <span className={"text-red-100 rounded-2xl text-xs flex bg-red-500 w-max px-2 absolute top-2 right-2"}>required</span>}
            </div>
            <div className="mb-3 relative flex items-center rounded-2xl bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                <textarea
                    rows={5}
                    {...register("description", {required: true})}
                    onChange={(e) => handleOnChange(e.target.value,"description")}
                    placeholder="Escribe una descripción"
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-400 focus:outline-none sm:text-sm/6"></textarea>
                {errors.description && <span className={"text-red-100 rounded-2xl text-xs flex bg-red-500 w-max px-2 absolute top-2 right-2"}>required</span>}
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
                <div className="relative h-[50px] mb-3 flex items-center rounded-2xl bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                    <input
                        type="number"
                        {...register("price", {required: true})}
                        onChange={(e)  => handleOnChange(Number(e.target.value),"price")}
                        placeholder="Precio"
                        className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
                    {errors.price && <span className={"text-red-100 rounded-2xl text-xs flex bg-red-500 w-max px-2 absolute top-2 right-2"}>required</span>}
                </div>
                <div className="relative h-[50px] mb-3 flex items-center rounded-2xl bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                    <input
                        type="number"
                        {...register("stock", {required: true})}
                        onChange={(e) => handleOnChange(Number(e.target.value),"stock")}
                        placeholder="Stock"
                        className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
                    {errors.stock && <span className={"text-red-100 rounded-2xl text-xs flex bg-red-500 w-max px-2 absolute top-2 right-2"}>required</span>}
                </div>
            </div>
            <button
                type={"submit"}
                className={"bg-amber-400 p-4 rounded-2xl block w-full font-bold uppercase mt-3 cursor-pointer"}
                disabled={isloading}
            >
                {(isloading) ? `Enviando... <Spinner />` : "Crear producto"}

            </button>
        </form>
    </div>
}