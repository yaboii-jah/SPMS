import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Login } from './pages/login'
import { Homepage } from './pages/homepage'
import { Add } from './pages/add'
import { Profile } from './pages/profile'
import { Update } from './pages/update'
import { View } from './pages/view'
import { List } from './pages/list'
import { AddUser } from './pages/addUser'
import { UserList } from './pages/userList'
import { Notfound } from './pages/notFound'
import { UpdateUser } from './pages/editUser'
import ProtectedRoute from './components/protectedRoute'

function App() {
  const user = ["IPCR", "OPCR", "DPCR"]
  const admin = ["ADMIN"]
  return (
    <div className='app-container'>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/addUser" element={<ProtectedRoute children={<AddUser/>} allowedRoles={admin} />} />
          <Route path="/userList" element={<ProtectedRoute children={<UserList/>} allowedRoles={admin} />} />
          <Route path="/updateUser/:id" element={<ProtectedRoute children={<UpdateUser/>} allowedRoles={admin} />} />
          <Route path="/list" element={<ProtectedRoute children={<List/>} allowedRoles={admin} />}/>

          <Route path="/homepage" element={<ProtectedRoute children={<Homepage/>} allowedRoles={user}/>} />
          <Route path="/view" element={<ProtectedRoute children={<View />} allowedRoles={user} />}/>
          <Route path="/profile" element={<ProtectedRoute children={<Profile />} allowedRoles={user} />} />
          <Route path="/update" element={<ProtectedRoute children={<Update />} allowedRoles={user} />} />
          <Route path="/homepage" element={<ProtectedRoute children={<Homepage />} allowedRoles={user} />} />
          <Route path="/add" element={<ProtectedRoute children={<Add />}/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
