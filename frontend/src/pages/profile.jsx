import { useEffect } from 'react'
import { Header } from '../components/header'

export function Profile () {

    useEffect(() => {
        async function fetchUserDetails () {
            const data = await fetch('http://localhost:3005/performance/api/fetchSpms', {
                method : 'GET',
                headers : {
                    "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwicm9sZSI6IklQQ1IiLCJpYXQiOjE3NzQ5MTY4OTcsImV4cCI6MTc3NTAwMzI5N30.4aQvpDrIJ-5rTJ6BNeWbDYnovZvpXciBetr8sYBa628`,
                    "Content-Type" : "application/json"
                }
            })
        }
    })

    return (
        <>
            <title>Profile</title>    
            <Header/>

            <div>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
            </div>
        </>
    )
}