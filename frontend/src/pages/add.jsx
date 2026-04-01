import '../pages/add.css'
import { Header } from '../components/header'
import { AddForm } from '../components/addForm'
import { useReducer } from 'react'
import { addPerformance, addRatings} from '../api/add'
import { initialState, reducer } from '../features/addReducer'

export function Add () {
    const [state, dispatch] = useReducer(reducer, initialState);

    function addForm () {
        dispatch({ type : 'ADD FORM'})
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
         
        return String((sum / count).toFixed(2));
    }

    function computeAvgRating (userData) {
        let avgSum = 0
        let rowNum = 0
        userData.forEach(data => {
           avgSum += Number(data['avg_per_form'])
           rowNum++
        })
    
        return avgSum / rowNum
    }

    function computeFinalRating (e) {
        let avgSum = 0
        let rowNum = 0
        let dataCopy = state.userData.map(data => (
            {...data}
        ))

        dataCopy.forEach(data => {
            if (data.category === e.target.name) {
                data['avg_per_form'] = computeFormAvg(data)
                avgSum += Number(data['avg_per_form'])
                rowNum++
            }
        })

        dispatch({ type : 'COMPUTE RATINGS', payload : {avgSum, rowNum, name : e.target.name, value : e.target.value, computeAvg : computeAvgRating}})
    }

    async function submitPerformance () {
        await addPerformance(state.userData)
        await addRatings(state.ratings)
    }
    
    return (
        <>
            <title>Add SPMS</title>
            
            <Header/>

            <div className="form">
                {
                    Array.isArray(state.userData) && state.userData.map(form => {
                        return (
                            <AddForm
                                computeFormAvg={computeFormAvg}
                                computeAvgRating={computeAvgRating}
                                dispatch={dispatch}
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
                        <p>{computeAvgRating(state.userData).toFixed(2)}</p>
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
                                    
                                    <option value=".30">30%</option>
                                    <option value=".20">20%</option>
                                    <option value=".10">10%</option>
                                </select>
                            </td>
                            <td>{state.ratings.strat_obj_final.toFixed(2)}</td>
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
                            <td>{state.ratings.core_sup_final.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Unplanned Results</td>
                            <td>
                                <select onChange={computeFinalRating} name="unplanned" className='assigned_weight'>
                                    <option value="0">0%</option>
                                    <option value=".10">10%</option>
                                </select></td>
                            <td>{state.ratings.unplanned_final.toFixed(2)}</td>
                        </tr>
                    </table>

                    <table>
                        <tr>
                            <th>Total Overall Rating</th>
                            <td>{state.ratings.overall_rating.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th>Adjective Rating</th>
                            <td>{state.ratings.adjective_rating}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </>

    )
}