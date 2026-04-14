import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/auth/useAuth'
import { refresh } from '../api/refresh'
import { errorResponse } from "../utils/responseFormat";
import { ViewPerformance } from '../components/viewPerformance';
import './list.css'

export function List () {
    const { accessToken, setAccessToken, userRole, setUserRole} = useAuth()
    const [userPerformance, setUserPerformance] = useState({
        performance : [],
        ratings : []
    })

    
    useEffect(() => {
        async function fetchPerformance(token = accessToken) {
            try {
            const res = await fetch('http://localhost:3005/performance/api/fetchPerformance', {
                method : 'GET',
                headers : {
                    "Authorization" : `Bearer ${token}`,
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            })

            const data = await res.json()

            if (data.error === 403) {
                const result = await refresh(setAccessToken, setUserRole)
    
                if (!result.success) {
                    return new errorResponse(false, result.message)
                }
    
                const newToken = result.data;
    
                return await fetchPerformance(newToken);
            }
            
            if (!data.success) {
                alert(data.message || 'Unable to fetch performance data.')
                return
            }
  
            setUserPerformance(data.data)
            } catch (error) {
            alert('Server error. Please try again later.')
            console.error(error)
            }
        }

        fetchPerformance()
    }, [])

    function view() {

    }

    return (
        <div className="list"> 
            <div className='user-submitted'>
                <div className='card-submitted'>
                    <div className='sum-submitted'>50 / 200 employees submitted</div>
                    <button className='add-user'>Add User</button>
                    <input className='search-submitted' type="text" />
                </div>
                <div className='submitted-container'>
                    {
                        userPerformance.ratings.length !== 0
                            ? userPerformance.ratings.map((user, index) => (
                                <div className="user-details" key={index}>
                                   <p>{`${user.Users.last_name}, ${user.Users.first_name}`} </p>
                                   <p>{user.Users.role}</p>
                                   <p onClick={() => view()}>View</p>
                                </div>
                            ))
                        : null
                    }
                </div>
            </div>
        </div>
    )
}

