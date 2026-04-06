import { useEffect, useState } from 'react'
import { Header } from '../components/header'

export function Profile () {
    const [userinfo, setUserInfo] = useState({})

    useEffect(() => {
        async function fetchUserDetails () {    
            const data = await fetch('http://localhost:3005/auth/api/fetchUser', {
                method : 'GET',
                headers : {
                    "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoiSVBDUiIsImlhdCI6MTc3NTMwNjExNSwiZXhwIjoxNzc1MzkyNTE1fQ.q_GsLU5NGzWgzT_dqX84wgIGHRcv_MyZBthaTjgS-do`,
                    "Content-Type" : "application/json"
                }
            })

            const result = await data.json()
            setUserInfo(result.data)
        }

        fetchUserDetails()
    }, [])

    return (
        <>
            <title>Profile</title>    
            <Header/>

            <div>
                <p>{userinfo.first_name}</p>
                <p>{userinfo.last_name}</p>
                <p>{userinfo.middle_name}</p>
                <p>{userinfo.supervisor_division_chief}</p>
                <p>{userinfo.office_director}</p>
                <p>{userinfo.role}</p>
                <button>Update Information</button>
            </div>
        </>
    )
}