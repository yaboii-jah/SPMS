import './App.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Login } from './pages/login'
import { Homepage } from './pages/homepage'
import { Add } from './pages/add'
import { Profile } from './pages/profile'
import { Update } from './pages/update'
import { View } from './pages/view'
import { Notfound } from './pages/notFound'

const router = createBrowserRouter([
  {path: "/login", element: <Login/>},
  {path: "/homepage", element: <Homepage/>},
  {path: "/profile", element: <Profile/>},
  {path: "/add", element: <Add/>},
  {path: "/update", element: <Update/>},
  {path: "/view", element: <View/>},
  {path: "*", element: <Notfound/>}
])

function App() {
  return (
    <div className='app-container'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
