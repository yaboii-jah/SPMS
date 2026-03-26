import '../pages/add.css'
import { useEffect, useState } from 'react';
import { Header } from '../components/header';
import { UpdateForm } from '../components/updateForm';
import { updatePerformance } from '../api/update';

export function Update () {
    const [userData, setUserData] = useState([]);
    const [request, setRequest] = useState([]);
    const [ratings, setRatings] = useState({
        avg_rating : 4.42,
        strat_obj_weight : 0.30,
        core_sup_weight : 0.70,
        unplanned_weight : 0.00,
        strat_obj_final : 1.35,
        core_sup_final : 3.06,
        unplanned_final : 0.00,
        overall_rating : 4.41,
        adjective_rating : "VERY SATISFACTORY"
    })

    useEffect(() => {
        async function fetchUserData ()  {
            const data = await fetch('http://localhost:3005/performance/api/fetchSpms', {
            method : 'GET',
            headers : {
                "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwicm9sZSI6IklQQ1IiLCJpYXQiOjE3NzQ0MjI2NDcsImV4cCI6MTc3NDUwOTA0N30.wMcaFy_XPcf_o-23-UsmKv_jWToEivzBORklDOT4Syg`,
                "Content-Type" : "application/json"
            }
        })
        const result = await  data.json()
        console.log(result)
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
            avg_per_form : 0,
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
            avg_per_form : 0,
            id: randomUUID
        }])
    }

    function computeFormAvg(form) {
        let count = 0;
        let sum = 0;

        if (form.timeliness !== 0) {
            count++;
            sum += form.timeliness;
        }
        if (form.quality !== 0) {
            count++;
            sum += form.quality;
        }
        if (form.efficiency !== 0) {
            count++;
            sum += form.efficiency;
        }

        if (count === 0) return 0;
         
        return String(sum / count);
    }

    function computeAvg (userData) {
        let avgSum = 0
        let rowNum = 0
        userData.forEach(data => {
           data['avg_per_form'] = computeFormAvg(data)
           avgSum += Number(data['avg_per_form'])
           rowNum++
        })
    
        return avgSum / rowNum
    }

    function computeFinalRating (e) {
        let avgSum = 0
        let rowNum = 0
        let dataCopy = [...userData]

        dataCopy.forEach(data => {
            if (data.category === e.target.name) {
                data['avg_per_form'] = computeFormAvg(data)
                avgSum += Number(data['avg_per_form'])
                rowNum++
            }
        })
        
        setRatings(prevRating => { return {...prevRating, ['avg_rating'] : computeAvg([...userData]).toFixed(2),  [`${e.target.name}_final`] : Number(avgSum / rowNum) ?(avgSum / rowNum) * Number(e.target.value) : 0, [`${e.target.name}_weight`] : e.target.value}})
        setRatings(prevRating => { return {...prevRating, ['overall_rating'] : prevRating['core_sup_final'] + prevRating['strat_obj_final'] + prevRating['unplanned_final']}})
        setRatings(prevRating => { return {...prevRating, ['adjective_rating'] : prevRating.overall_rating >= 5 ? 'OUTSTANDING' : prevRating.overall_rating >= 4 ? 'VERY SATISFACTORY' : prevRating.overall_rating >= 3 ? 'SATISFACTORY' : prevRating.overall_rating >= 2 ? 'UNSATISFACTORY' : 'POOR'}})
    }

    async function updatePerformance() {
        //const result =  await updatePerformance(request)
        console.log(userData)
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
                                avg={computeFormAvg(form)}
                                setUserData={setUserData}
                                form={form}
                                setRequest={setRequest}
                                key={form.id}
                            />
                        )
                    }) || ''
                } 
                <button className='add-more-btn' onClick={addForm}>Add more</button>
                <div className='btns'> 
                    <div>
                        <p>Average Rating </p>
                        <p>{ratings.avg_rating}</p>
                    </div>
                    <button className='submit-btn' onClick={updatePerformance}>Update</button>
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
                            <td>
                                <select onChange={computeFinalRating} value={String(ratings.strat_obj_weight)} name="strat_obj" className='assigned_weight'>
                                    <option value="0.1">10%</option>
                                    <option value="0.2">20%</option>
                                    <option value="0.3">30%</option>
                                </select>
                            </td>
                            <td>{ratings.strat_obj_final.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Core/Support Functions</td>
                            <td> 
                                <select onChange={computeFinalRating} value={String(ratings.core_sup_weight)} name="core_sup" className='assigned_weight'>
                                    <option value="0.7">70%</option>
                                    <option value="0.8">80%</option>
                                    <option value="0.9">90%</option>    
                                </select>
                            </td>   
                            <td>{ratings.core_sup_final.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Unplanned Results</td>
                            <td>
                                <select onChange={computeFinalRating} value={String(ratings.unplanned_weight)} name="unplanned" className='assigned_weight'>
                                    <option value="0">0%</option>
                                    <option value="0.1">10%</option>
                                </select></td>
                            <td>{ratings.unplanned_final.toFixed(2)}</td>
                        </tr>
                    </table>

                    <table>
                        <tr>
                            <th>Total Overall Rating</th>
                            <td>{ratings.overall_rating.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th>Adjective Rating</th>
                            <td>{ratings.adjective_rating}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    )
}