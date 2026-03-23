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
            avg_per_form : 0,
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
            avg_per_form : 0,
            id: crypto.randomUUID()
        }])
    }

    function submitPerformance () {
        console.log(userData)
       // addPerformance(userData)
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
                <div className='btns'> 
                    <div>
                        <p>Average Rating </p>
                        <p>4.42</p>
                    </div>
                    <button className='submit-btn' onClick={submitPerformance}>Submit</button>
                </div>
            
            <div className='rating-tables'>  
                <table className='rating'>
                    <tr>
                        <th>Category</th>
                        <th>ASSIGNED WEIGHT</th>
                        <th>FINAL RATING</th>
                    </tr>
                    <tr>
                        <td>Strategic Priority</td>
                        <td>30%</td>
                        <td>1.35</td>
                    </tr>
                    <tr>
                        <td>Core/Suppoert Functions</td>
                        <td>70%</td>
                        <td>3.06</td>
                    </tr>
                    <tr>
                        <td>Unplanned Results</td>
                        <td></td>
                        <td>0.00</td>
                    </tr>
                </table>

                <table>
                    <tr>
                        <th>Total Overall Rating</th>
                        <td>4.41</td>
                    </tr>
                    <tr>
                        <th>Adjective Rating</th>
                        <td>VERY SATISFACTORY</td>
                    </tr>
                </table>
            </div>


            </div>
        </>

    )
}