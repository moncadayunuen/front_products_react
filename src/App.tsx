import './styles/global.css'
import {BrowserRouter, Route, Routes} from "react-router";
import PageHome from "./pages/home/page.tsx";
import {routes} from "./routes/routes.ts";
import PagePosts from "./pages/posts/PagePosts.tsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routes.home.path} element={<PageHome />} />
          <Route path={routes.posts.path} element={<PagePosts />} />
          <Route path={routes.users.path} element={<PageHome />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
