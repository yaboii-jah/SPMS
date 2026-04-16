import { useState, useMemo, useEffect } from 'react'
import { UserCard } from '../components/UserCard'
import { refresh } from "../api/refresh";
import { useAuth } from '../contexts/auth/useAuth'
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/adminSidebar'
import './UserList.css'

export function UserList() {
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    const { accessToken, setAccessToken, setUserRole} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchAllUsers(token = accessToken) {
            try {
                const response = await fetch('http://localhost:3005/auth/api/fetchAllUsers', {
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
                
                        await fetchAllUsers(newToken)
                    }
                
        
                if (!result.success) {
                     alert(result.message)
                }
            
                setUsers(result.data)

                } catch (error) {
                    console.error("Internal Server Error", error)
                    alert("Internal Server Error")
            }
        }

        fetchAllUsers()
    }, [])

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            `${user.last_name} ${user.first_name}`
                .toLowerCase()
                .includes(search.toLowerCase())
        )
    }, [search, users])



    const activeCount = users.filter(u => u.status === 'Active').length

    function handleEdit(id) {
        navigate(`/updateUser/${id}`)
    }

    return (
        <div className='userlist'>  
            <AdminSidebar/>
            <div className="userlist-container">
                <div className="top-bar">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                    />

                    <div className="active-count">
                        Active Users: {activeCount}
                    </div>
                </div>

                <div className="list-container">
                    {filteredUsers.map(user => (
                        <UserCard
                            key={user.user_id}
                            user={user}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}