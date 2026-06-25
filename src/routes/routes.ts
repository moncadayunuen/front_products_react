export const routes = {
    home: {
        path: "/",
    },
    products: {
        path: "/products",
        create: {
            path: "/products/nuevo-producto",
        },
    },
} as const;