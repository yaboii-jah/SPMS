import { useState } from 'react'
import '../pages/addUser.css'
import { register } from '../api/register'
import { useAuth } from '../contexts/auth/useAuth'
import { refresh } from "../api/refresh";
import AdminSidebar from '../components/adminSidebar'

export function AddUser() {
  const { accessToken, setAccessToken, setUserRole } = useAuth()

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    middle_name: '',
    department: '',
    username: '',
    password: '',
    role: ''
  })

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function submit() {
    let data = await register(accessToken, form)

    if (data.error === 403) {
      const result = await refresh(setAccessToken, setUserRole)

      if (!result.success) return alert(result.message)

      const newToken = result.data
      data = await register(newToken, form)
    }

    alert(data.message)
  }

  return (
    <div className="page">
      <AdminSidebar />

      <div className="content">
        <div className="add-form-container">

          <h2>Add User</h2>

          <div className="form-group">
            <label>First Name</label>
            <input name="first_name" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input name="last_name" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Middle Name</label>
            <input name="middle_name" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input name="department" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input name="username" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select name="role" onChange={handleChange}>
              <option value="">Select Role</option>
              <option value="IPCR">IPCR</option>
              <option value="OPCR">OPCR</option>
              <option value="DPCR">DPCR</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <div className="conditional-section">
            {form.role === 'IPCR' && (
              <>
                <div className="form-group">
                  <label>Supervisor / Division Chief</label>
                  <input name="supervisor_division_chief" onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Office Director</label>
                  <input name="office_director" onChange={handleChange} />
                </div>
              </>
            )}

            {form.role === 'DPCR' && (
              <>
                <div className="form-group">
                  <label>Office Director</label>
                  <input name="office_director" onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Commissioner</label>
                  <input name="commissioner" onChange={handleChange} />
                </div>
              </>
            )}

            {form.role === 'OPCR' && (
              <>
                <div className="form-group">
                  <label>Commissioner</label>
                  <input name="commissioner" onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Chairperson</label>
                  <input name="chairperson" onChange={handleChange} />
                </div>
              </>
            )}
          </div>

          <button className="submit-user-btn" onClick={submit}>
            Add User
          </button>

        </div>
      </div>
    </div>
  )
}