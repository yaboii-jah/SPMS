import '../pages/add.css'
import { useEffect, useReducer} from 'react';
import { Header } from '../components/header';
import { UpdateForm } from '../components/updateForm';
import { updatePerformance, updateRatings } from '../api/update';
import { initialState, reducer } from '../features/updateReducer'

export function Update () {
  
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function fetchUserData ()  {
            let data = await fetch('http://localhost:3005/performance/api/fetchSpms', {
                method : 'GET',
                headers : {
                    "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwicm9sZSI6IklQQ1IiLCJpYXQiOjE3NzQ5MTY4OTcsImV4cCI6MTc3NTAwMzI5N30.4aQvpDrIJ-5rTJ6BNeWbDYnovZvpXciBetr8sYBa628`,
                    "Content-Type" : "application/json"
                }
            })

            const result = await  data.json()

            const updatedSpms = result.data.map(form => {
                return {...form, ['id'] : crypto.randomUUID() }
            })

            data = await fetch('http://localhost:3005/performance/api/fetchRatings', {
                method : 'GET',
                headers : {
                    "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwicm9sZSI6IklQQ1IiLCJpYXQiOjE3NzQ5MTY4OTcsImV4cCI6MTc3NTAwMzI5N30.4aQvpDrIJ-5rTJ6BNeWbDYnovZvpXciBetr8sYBa628`,
                    "Content-Type" : "application/json"
                }
            })  
            
            const ratings = await  data.json()
            
            for (const rate of Object.keys(ratings.data[0])) {
                if (rate !== 'adjective_rating' && typeof ratings.data[0][rate] === 'string' ) {
                    console.log(parseFloat(ratings.data[0][rate]))
                    ratings.data[0][rate] = parseFloat(ratings.data[0][rate])
                }
            }

            dispatch({ type : 'FETCH DATA', payload : {spms : updatedSpms, ratings : ratings.data[0] }})
        }

        fetchUserData()
    }, [])


    function addForm () {
        dispatch({ type : 'ADD FORM', payload : crypto.randomUUID()})
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
        
        console.log(String(sum / count))
        return String(sum / count);
    }

    function computeAvgRating (userData) {
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

    async function update() {
        //await updatePerformance(state.request)
        //await updateRatings(state.ratings)
        console.log(state.request)
        console.log(state.ratings)
        
    }

    return (    
        <>
            <title>Update</title>
            <Header/>
            <div className='form'>
                {
                    Array.isArray(state.userData) && state.userData.map(form => {
                        return (
                            <UpdateForm
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
                        <p>{state.ratings.avg_rating}</p>
                    </div>
                    <button className='submit-btn' onClick={update}>Update</button>
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
                                <select onChange={computeFinalRating} value={String(state.ratings.strat_obj_weight)} name="strat_obj" className='assigned_weight'>
                                    <option value="0.1">10%</option>
                                    <option value="0.2">20%</option>
                                    <option value="0.3">30%</option>
                                </select>
                            </td>
                            <td>{state.ratings.strat_obj_final.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Core/Support Functions</td>
                            <td> 
                                <select onChange={computeFinalRating} value={String(state.ratings.core_sup_weight)} name="core_sup" className='assigned_weight'>
                                    <option value="0.7">70%</option>
                                    <option value="0.8">80%</option>
                                    <option value="0.9">90%</option>    
                                </select>
                            </td>   
                            <td>{state.ratings.core_sup_final.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Unplanned Results</td>
                            <td>
                                <select onChange={computeFinalRating} value={String(state.ratings.unplanned_weight)} name="unplanned" className='assigned_weight'>
                                    <option value="0">0%</option>
                                    <option value="0.1">10%</option>
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