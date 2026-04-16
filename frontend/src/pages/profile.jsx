import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/auth/useAuth'
import { refresh } from '../api/refresh'
import { EditableField } from '../components/EditableField'
import './profile.css'

export function Profile() {
    const { accessToken, setAccessToken } = useAuth()
    const [userinfo, setUserInfo] = useState({})

    useEffect(() => {
        async function fetchUserDetails(token = accessToken) {
            const res = await fetch('http://localhost:3005/auth/api/fetchUser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const result = await res.json()

            if (result.error === 403) {
                const refreshResult = await refresh(setAccessToken)
                if (!refreshResult.success) return
                return fetchUserDetails(refreshResult.data)
            }

            setUserInfo(result.data)
        }

        fetchUserDetails()
    }, [accessToken])

    function handleChange(field, value) {
        setUserInfo(prev => ({
            ...prev,
            [field]: value
        }))
    }

    async function handleSave(field, value) {
        try {
            const res = await fetch(
                `http://localhost:3005/auth/api/update/${userinfo.user_id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({ [field]: value })
                }
            )

            const result = await res.json()
            return result.success
        } catch {
            return false
        }
    }

    return (
        <>
            <title>Profile</title>

            <div className="profile-container">
                <div className="profile-card">

                    {/* Avatar */}
                    <div className="avatar-circle">
                        {userinfo.first_name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <h2 className="profile-title">
                        {userinfo.first_name || "User"} {userinfo.last_name || ""}
                    </h2>

                    <p className="profile-subtitle">
                        Manage your personal information
                    </p>

                    <div className="section">
                        <h3>Personal Information</h3>

                        <EditableField
                            label="First Name"
                            field="first_name"
                            value={userinfo.first_name}
                            onChange={handleChange}
                            onSave={handleSave}
                        />

                        <EditableField
                            label="Last Name"
                            field="last_name"
                            value={userinfo.last_name}
                            onChange={handleChange}
                            onSave={handleSave}
                        />

                        <EditableField
                            label="Supervisor"
                            field="supervisor_division_chief"
                            value={userinfo.supervisor_division_chief}
                            onChange={handleChange}
                            onSave={handleSave}
                        />

                        <EditableField
                            label="Director"
                            field="office_director"
                            value={userinfo.office_director}
                            onChange={handleChange}
                            onSave={handleSave}
                        />

                        <EditableField
                            label="Role"
                            field="role"
                            value={userinfo.role}
                            onChange={handleChange}
                            onSave={handleSave}
                        />
                    </div>

                </div>
            </div>
        </>
    )
}