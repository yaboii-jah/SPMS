import '../pages/add.css'
import { Header } from '../components/header'
import { AddForm } from '../components/addForm'
import { useState} from 'react'
import { addPerformance } from '../api/add'

export function Add () {
    const [ratings, setRatings] = useState({
        avg_rating : 0,
        strat_obj_weight : 0,
        core_sup_weight : 0,
        unplanned_weight : 0,
        strat_obj_final : 0,
        core_sup_final : 0,
        unplanned_final : 0,
        overall_rating : 0,
        adjective_rating : ""
    })

    const [userData, setUserData] = useState([
        {
            key_perf : "",
            actual_accomp : "",
            succes_indic : "",
            category : 'strat_obj',
            quality : 0,
            efficiency : 0,
            timeliness : 0,
            avg_per_form : "",
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

    async function submitPerformance () {
        await addPerformance(userData)
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
                                avg={computeFormAvg(form)}
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
                        <p>{computeAvg([...userData]).toFixed(2)}</p>
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
                            <td>
                                <select onChange={computeFinalRating} name="strat_obj" className='assigned_weight'>
                                    
                                    <option value=".10">10%</option>
                                    <option value=".20">20%</option>
                                    <option value=".30">30%</option>
                                </select>
                            </td>
                            <td>{ratings.strat_obj_final.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Core/Support Functions</td>
                            <td> 
                                <select onChange={computeFinalRating} name="core_sup" className='assigned_weight'>
                                    <option value=".70">70%</option>
                                    <option value=".80">80%</option>
                                    <option value=".90">90%</option>    
                                </select>
                            </td>   
                            <td>{ratings.core_sup_final.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Unplanned Results</td>
                            <td>
                                <select onChange={computeFinalRating} name="unplanned" className='assigned_weight'>
                                    <option value="0">0%</option>
                                    <option value=".10">10%</option>
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