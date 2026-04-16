import { useEffect, useState, useMemo } from 'react'
import { useAuth } from '../contexts/auth/useAuth'
import { refresh } from '../api/refresh'
import AdminSidebar from '../components/adminSidebar'
import './list.css'

export function List () {
    const { accessToken, setAccessToken, setUserRole } = useAuth()
    const [ users, setUsers ] = useState()
    const [userPerformance, setUserPerformance] = useState({
        performance: [],
        ratings: []
    })

    console.log(users)

    const [search, setSearch] = useState('')

    useEffect(() => {
        async function fetchPerformance(token = accessToken) {
            try {
                const res = await fetch('http://localhost:3005/performance/api/fetchPerformance', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },  
                    credentials: "include"
                })

                const data = await res.json()

                if (data.error === 403) {
                    const result = await refresh(setAccessToken, setUserRole)
                    if (!result.success) return
                    return await fetchPerformance(result.data)
                }

                if (!data.success) {
                    alert(data.message || 'Unable to fetch performance data.')
                    return
                }

                setUserPerformance(data.data)

            } catch (err) {
                console.error(err)
                alert('Server error. Please try again later.')
            }

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
                
                        return await fetchPerformance(newToken)
                    }
                
        
                if (!result.success) {
                     alert(result.message)
                }

                const filteredUsers = result.data.filter(u => u.role !== 'ADMIN')
            
                setUsers(filteredUsers)

                } catch (error) {
                    console.error("Internal Server Error", error)
                    alert("Internal Server Error")
            }
        }

        fetchPerformance()
    }, [])

    // 🔍 SEARCH FILTER (IMPORTANT PART)
    const filteredRatings = useMemo(() => {
        return userPerformance.ratings.filter(user => {
            const fullName = `${user.users.first_name} ${user.users.last_name}`.toLowerCase()
            const role = user.users.role.toLowerCase()
            const query = search.toLowerCase()

            return fullName.includes(query) || role.includes(query)
        })
    }, [search, userPerformance.ratings])

    function view(user) {
        console.log("View user:", user)
        // later: navigate(`/user/${user.id}`)
    }

    return (
        <div className='dashboard'>
            <AdminSidebar />
            <div className="list">
                <div className="user-submitted">

                    {/* TOP BAR */}
                    <div className="card-submitted">

                    {/* ✅ NEW: TOTAL USERS */}
                    <div className="total-users">
                        {Array.isArray(users) ? users.length : 0} total users
                    </div>

                    {/* EXISTING */}
                    <div className="sum-submitted">
                        {userPerformance.ratings.length} users submitted
                    </div>

                    <div className="year-submitted">
                        {new Date().getFullYear()}
                    </div>

                    <input
                        className="search-submitted"
                        type="text"
                        placeholder="Search by name or role..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    </div>

                    {/* LIST */}
                    <div className="submitted-container">
                        {filteredRatings.length > 0 ? (
                            filteredRatings.map((user, index) => (
                                <div className="user-details" key={index}>

                                    <div className="user-left">
                                        <p className="name">
                                            {user.users.last_name}, {user.users.first_name}
                                        </p>
                                        <p className="role">
                                            {user.users.role}
                                        </p>
                                    </div>

                                    <button
                                        className="view-btn"
                                        onClick={() => view(user)}
                                    >
                                        View
                                    </button>

                                </div>
                            ))
                        ) : (
                            <div className="empty">
                                No users submitted
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}