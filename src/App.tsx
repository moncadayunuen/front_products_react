import './styles/global.css'
import {BrowserRouter, Route, Routes} from "react-router";
import PageHome from "./pages/home/page.tsx";
import {routes} from "./routes/routes.ts";
import PagePosts from "./pages/products/PagePosts.tsx";
import {PageCreateProduct} from "./pages/products/CreateProduct.tsx";
import Layout from "./components/Layout.tsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path={routes.home.path} element={<PageHome />} />
                <Route path={routes.products.path} element={<PagePosts />} />
                <Route path={routes.products.create.path} element={<PageCreateProduct />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
