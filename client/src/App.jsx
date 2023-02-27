import './App.css'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/home';
import Details from './pages/details';
import AuthorInfo from './pages/authorinfo';
import Category from './pages/category';
import WriteNews from './pages/writenews';



function App() {
  // const {currentUser} = useSelector(state=>state.user)
  const currentUser = false;

  const Layout = () => {
    return (
      <>
        <nav className='sticky top-0 z-50 bg-white'>
          <Navbar />
        </nav>
        <main>
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
        <div onClick={()=>window.scrollTo(0,0)} className='cursor-pointer fixed right-4 bottom-0 bg-green-500 text-white px-4 py-2'>
          <div >
            goto top
          </div>
        </div>
      </>
    )
  }

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />
    }
    return children;
  }

  const router = createBrowserRouter([
    { 
      children: [//ProtectedRoute
        // { path: "/write-news", element: <ProtectedRoute><WriteNews /></ProtectedRoute> },
        // { path: "/admin", element: <AdminLogin /> },
      ]
    },
    { //NonProtectedRoute
      element: <Layout />,
      children: [
        { path: "/write-news", element: <ProtectedRoute><WriteNews /></ProtectedRoute> },
        { path: "/", element: <Home /> },
        { path: "/news/:slug", element: <Details /> },
        { path: "/author/:id", element: <AuthorInfo /> },
        { path: "/category/:slug", element: <Category /> },
      ]
    },
  ])


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App