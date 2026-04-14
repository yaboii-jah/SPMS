import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Login } from './pages/login'
import { Homepage } from './pages/homepage'
import { Add } from './pages/add'
import { Profile } from './pages/profile'
import { Update } from './pages/update'
import { View } from './pages/view'
import { List } from './pages/list'
import { AddUser } from './pages/addUser'
import { Notfound } from './pages/notFound'
import ProtectedRoute from './components/protectedRoute'

function App() {
  return (
    <div className='app-container'>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/list" element={<ProtectedRoute children={<List/>}/>} />
          <Route path="/addUser" element={<ProtectedRoute children={<AddUser/>}/>} />
          <Route path="/homepage" element={<ProtectedRoute children={<Homepage/>}/>} />
          <Route path="/view" element={<ProtectedRoute children={<View />}/>} />
          <Route path="/profile" element={<ProtectedRoute children={<Profile />}/>} />
          <Route path="/update" element={<ProtectedRoute children={<Update />}/>} />
          <Route path="/homepage" element={<ProtectedRoute children={<Homepage />}/>} />
          <Route path="/add" element={<ProtectedRoute children={<Add />}/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
