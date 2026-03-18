import '../pages/add.css'
import { Header } from '../components/header'
import { AddForm } from '../components/addForm'
import { useState} from 'react'
import { addPerformance } from '../api/add'

export function Add () {
    const [userData, setUserData] = useState([
        {
            key_perf : "",
            actual_accomp : "",
            succes_indic : "",
            category : 'strat_obj',
            quality : 0,
            efficiency : 0,
            timeliness : 0,
            id: crypto.randomUUID()
        }
    ])

    function addForm () {
        setUserData([...userData, {
            key_perf : "",
            actual_accomp : "",
            succes_indic : "",
            category : "strat_obj",
            quality : 0,
            efficiency : 0,
            timeliness : 0,
            id: crypto.randomUUID()
        }])
    }

    function submitPerformance () {
        addPerformance(userData)
    }
    
    return (
        <>
            <title>Add SPMS</title>
            
            <Header/>

            <div className="form">
                {
                    Array.isArray(userData) && userData.map(form => {
                        return (
                            <AddForm 
                                setUserData={setUserData}
                                form={form}
                                key={form.id}
                            />
                        )
                    }) || ''
                } 
                <button className='add-more-btn' onClick={addForm}>Add more</button>
                <button className='submit-btn' onClick={submitPerformance}>Submit</button>
            </div>


            
        </>

    )
}