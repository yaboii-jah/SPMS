import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import '../pages/addUser.css'
import { updateUser } from '../api/updateUser';
import { useAuth } from '../contexts/auth/useAuth'
import { refresh } from "../api/refresh";
import AdminSidebar from '../components/adminSidebar'

export function UpdateUser() {
  const { accessToken, setAccessToken, setUserRole} = useAuth()
  const [user, setUser] = useState({})
  const [toUpdate, setToUpdate] = useState({})
  const { id } = useParams()

  useEffect(() => {
    async function fetchUser(token = accessToken) {
      try {
        const response = await fetch(`http://localhost:3005/auth/api/fetchUserByParamsID/${id}`, {
            method : 'GET',
            headers: {
              "Authorization" : `Bearer ${token}`,
              "Content-Type" : "application/json"
            },
            credentials : "include"
        });
    
        const result = await response.json();

        if (result.error === 403) {
          const result = await refresh(setAccessToken, setUserRole)
         
          if (!result.success) {
            alert(result.message)
          }
  
          const newToken = result.data;
  
          await fetchUser(newToken)
        }
        
        if (!result.success) {
          alert(result.message)
        }
    
        setUser(result.data)
        setToUpdate(prev => ( {...prev, ['user_id'] : result.data.user_id, ['role'] : result.data.role}))

      } catch (error) {
        console.error("Internal Server Error", error)
        alert("Internal Server Error")
      }
    }

    fetchUser()
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
  
    setUser(prev => ({
      ...prev,
      [name]: value
    }))

    setToUpdate(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function update () {
    const choice = confirm("Are you sure you want to update this user?")

    if (choice) {
      let data = await updateUser(toUpdate, toUpdate.user_id, accessToken, setAccessToken, setUserRole)
    
      if (data.error === 403) {
          const result = await refresh(setAccessToken, setUserRole)
          
          if (!result.success) {
              return alert(result.message)
          }

          const newToken = result.data;

          data = await updateUser(toUpdate, newToken, setAccessToken, setUserRole)
      }

      if (!data.success) {
          alert(data.message)
      }

      alert(data.message)
    }
  }

  return (
     <div className='page'>
      <AdminSidebar/>
      <div className="content">
        <div className="add-form-container">
      <h2>Update User</h2>

      <div className="form-group">
          <label>First_name</label>
          <input name="first_name"  value={user.first_name || ""} onChange={handleChange} />
      </div>

      <div className="form-group">
          <label>Last_name</label>
          <input name="last_name" value={user.last_name || ""} onChange={handleChange} />
      </div>

      <div className="form-group">
          <label>Middle_name</label>
          <input name="middle_name" value={user.middle_name || ""} onChange={handleChange} />
      </div>

      <div className="form-group">
          <label>Department</label>
          <input name="department" value={user.department || ""} onChange={handleChange} />
      </div>

      <div className="form-group">
          <label>Username</label>
          <input name="username" value={user.username|| ""} onChange={handleChange} />
      </div>
  
      <div className="form-group">
          <label>Status</label>
          <select value={user.status || ""} name="status" onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          </select>
      </div>

      <div className="form-group">
          <label>Role</label>
          <select value={user.role || ""} name="role" onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="IPCR">IPCR</option>
          <option value="OPCR">OPCR</option>
          <option value="DPCR">DPCR</option>
          <option value="ADMIN">ADMIN</option>
          </select>
      </div>

      {/* Conditional Section */}
      <div className="conditional-section">
          {user.role === 'IPCR' && (
          <>
              <div className="form-group">
              <label>Supervisor / Division Chief</label>
              <input name="supervisor_division_chief" value={user.supervisor_division_chief || ""} onChange={handleChange} />
              </div>

              <div className="form-group">
              <label>Office Director</label>
              <input name="office_director" value={user.office_director || ""} onChange={handleChange} />
              </div>
          </>
          )}

          {user.role === 'DPCR' && (
          <>
              <div className="form-group">
              <label>Office Director</label>
              <input name="office_director" value={user.office_director || ""} onChange={handleChange} />
              </div>

              <div className="form-group">
              <label>Commissioner</label>
              <input name="commissioner" value={user.commissioner || ""} onChange={handleChange} />
              </div>
          </>
          )}

          {user.role === 'OPCR' && (
          <>
              <div className="form-group">
              <label>Commissioner</label>
              <input name="commissioner" value={user.commissioner || ""} onChange={handleChange} />
              </div>

              <div className="form-group">
              <label>Chairperson</label>
              <input name="chairperson" value={user.chairperson || ""} onChange={handleChange} />
              </div>
          </>
          )}
      </div>

      <button className="submit-user-btn" onClick={() => update()}>Update User</button>
    </div>
    </div>
    </div>
  )
}