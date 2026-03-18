import '../pages/add.css'
import { useEffect, useState } from 'react';
import { Header } from '../components/header';
import { UpdateForm } from '../components/updateForm';

export function Update () {
    const [userData, setUserData] = useState([]);
    const [request, setRequest] = useState([]);

    useEffect(() => {
        async function fetchUserData ()  {
            const data = await fetch('http://localhost:3005/performance/api/fetchSpms', {
            method : 'GET',
            headers : {
                "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwicm9sZSI6IklQQ1IiLCJpYXQiOjE3NzM4MzIwNTksImV4cCI6MTc3MzgzNTY1OX0.oAzoEfYGafT14yS_IpyX377fzBdyu-YPCfem_Y_6LOg`,
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

    function view() {
        console.log(request)
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