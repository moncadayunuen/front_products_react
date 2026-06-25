import type {Product} from "../types/Product.ts";

const baseURL = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
    try {
        const response = await fetch(`${baseURL}/products`, {
            method: 'GET'
        });
        const data = await response.json();
        return data.map((product: Product) => {
            return {
                ...product,
                thumbnail: `https://picsum.photos/id/${product.id}/450/300`,
            }
        });
    } catch (error) {
        console.error(error);
    }
}

export const createProduct = async (data: object) => {
    try {
        const response = await fetch(`${baseURL}/products/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

         if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    } catch (error: any) {
        throw new Error(`Error creating product: ${error.message}`);
    }
}

const updateProduct = async (data: object, id: string) => {
    try {
        const response = await fetch(`${baseURL}/products/patch/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    } catch (e) {
        console.error("error",e);
    }
}

const deleteProduct = async (id: string) => {
    try {
        const response = await fetch(`${baseURL}/products/delete/${id}`, {
            method: 'DELETE '
        })
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    } catch (e) {
        console.error("error",e);
    }
}