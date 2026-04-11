import '../pages/add.css'
import { Header } from '../components/header'
import { AddForm } from '../components/addForm'
import { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { addPerformance} from '../api/add'
import { initialState, reducer } from '../features/addReducer'
import { useAuth } from '../contexts/auth/useAuth'

export function Add () {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { accessToken, setAccessToken, userRole } = useAuth()
    const navigate = useNavigate()

    function addForm () {
        dispatch({ type : 'ADD FORM', payload : userRole})
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

        dispatch({ type : 'COMPUTE RATINGS', payload : {avgSum, rowNum, name : e.target.name, value : Number(e.target.value), computeRating : computeAvgRating}})
    }

    async function submitPerformance () {
        console.log(state.ratings)
        console.log(state.userData)
        if ( state.userData.length === 0) return alert('Please add a form')
        const choice = confirm(" Are you sure you want to add performance? ")

        if (choice) {
            const response = await addPerformance({
                performance : state.userData,
                ratings : state.ratings
             }, accessToken, setAccessToken)

            if (!response.success) { 
                return alert(response.message)
            }

            navigate("/view")
        }
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
                                role={userRole}
                                key={form.id}
                            />
                        )
                    }) || ''
                } 
                <button className='add-more-btn' onClick={addForm}>Add more</button>
                <div className='btns'> 
                    <div>
                        <p>Average Rating </p>
                        <p>{state.ratings['avg_rating']}</p>
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
                                    <option value="0.3">30%</option>
                                    <option value="0.2">20%</option>
                                    <option value="0.1">10%</option>
                                </select>
                            </td>
                            <td>{String(state.ratings.strat_obj_final)}</td>
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
                            <td>{String(state.ratings.core_sup_final)}</td>
                        </tr>
                        <tr>
                            <td>Unplanned Results</td>
                            <td>
                                <select onChange={computeFinalRating} name="unplanned" className='assigned_weight'>
                                    <option value="0">0%</option>
                                    <option value=".10">10%</option>
                                </select></td>
                            <td>{String(state.ratings.unplanned_final)}</td>
                        </tr>
                    </table>

                    <table>
                        <tr>
                            <th>Total Overall Rating</th>
                            <td>{String(state.ratings.overall_rating)}</td>
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