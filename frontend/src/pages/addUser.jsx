import { useState } from 'react'
import '../pages/addUser.css'
import { register } from '../api/register'
import { useAuth } from '../contexts/auth/useAuth'
import { refresh } from "../api/refresh";
import { successResponse, errorResponse } from "../utils/responseFormat";

export function AddUser() {
  const { accessToken, setAccessToken, userRole, setUserRole} = useAuth()
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    department: '',
    username: '',
    password: '',
    role: ''
  })

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function submit() {
    let data = await register(accessToken, form)

    if (data.error === 403) {
        const result = await refresh(setAccessToken, setUserRole)

        if (!result.success) {
            return new errorResponse(false, result.message)
        }

        const newToken = result.data;

        data = await register(newToken, form)
    }

    if (!data.success) {
        alert(data.message)
    }

    alert(data.message)
  }

  return (
        <div className="add-form-container">
    <h2>Add User</h2>

    <div className="form-group">
        <label>First_name</label>
        <input name="first_name" onChange={handleChange} />
    </div>

    <div className="form-group">
        <label>Last_name</label>
        <input name="last_name" onChange={handleChange} />
    </div>

    <div className="form-group">
        <label>Middle_name</label>
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
        </select>
    </div>

    {/* Conditional Section */}
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

    <button className="submit-btn" onClick={() => submit()}>Add User</button>
    </div>
  )
}