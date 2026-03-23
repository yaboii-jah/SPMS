import '../pages/add.css'
import { useEffect, useState } from 'react';
import { Header } from '../components/header';
import { UpdateForm } from '../components/updateForm';
import { updatePerformance } from '../api/update';

export function Update () {
    const [userData, setUserData] = useState([]);
    const [request, setRequest] = useState([]);

    useEffect(() => {
        async function fetchUserData ()  {
            const data = await fetch('http://localhost:3005/performance/api/fetchSpms', {
            method : 'GET',
            headers : {
                "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwicm9sZSI6IklQQ1IiLCJpYXQiOjE3NzQyMjQ3NDksImV4cCI6MTc3NDMxMTE0OX0.x2gZD_5MLd1zMuIx5G235LL7tAEnSXcbZf64K5kBwj8`,
                "Content-Type" : "application/json"
            }
        })
        const result = await  data.json()
        setUserData(result.data.map(form => {
            return {...form, ['id'] : crypto.randomUUID() }
        }))
        }

        fetchUserData()
    }, [])


    function addForm () {
        const randomUUID = crypto.randomUUID()
        setUserData([...userData, {
            key_perf : "",
            actual_accomp : "",
            succes_indic : "",
            category : "strat_obj",
            quality : 0,
            efficiency : 0,
            timeliness : 0,
            id: randomUUID
        }])

        setRequest(prev => [...prev, {
            action : "create",
            key_perf : "",
            actual_accomp : "",
            succes_indic : "",
            category : "strat_obj",
            quality : 0,
            efficiency : 0,
            timeliness : 0,
            id: randomUUID
        }])
    }

    async function view() {
        const result =  await updatePerformance(request)
        console.log(result)
    }

    return (    
        <>
            <title>Update</title>
            <Header/>
            <div className='form'>
                {
                    Array.isArray(userData) && userData.map(form => {
                        return (
                            <UpdateForm
                                setUserData={setUserData}
                                form={form}
                                request={request}
                                setRequest={setRequest}
                                key={form.id}
                            />
                        )
                    }) || ''
                } 
                <button className='add-more-btn' onClick={addForm}>Add more</button>
                <button className='submit-btn' onClick={view}>Update</button>
            </div>
        </>
    )
}