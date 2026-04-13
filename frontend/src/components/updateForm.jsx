import '../components/addForm.css'
import { IoClose } from "react-icons/io5";

export function UpdateForm ({computeFormAvg, computeAvgRating, dispatch, form, role}) {
    function handleChange (e) {
        let { name, value } = e.target

        if (name === 'efficiency' || name === 'quality' || name ===  'timeliness') {
            value = Number(value)
        }

        dispatch({ type : 'DYNAMIC UPDATE', payload : { id : form.id, name, value, computeAvg : computeFormAvg, computeRating : computeAvgRating, form}})
    }

    function deleteForm () {
        dispatch({ type : 'DELETE FORM', payload : {id : form.id, computeRating : computeAvgRating, form}})    
    }

    return (    
        <div className="form-container">
            <div className='exit'>
                <IoClose className='exit-btn' onClick={deleteForm}/>
            </div>
            <div className='upper'>
                <div className='input-style'>
                    <label className='input-lbl'>Key Performance</label>
                    <input value={form.key_perf} onChange={handleChange} type="text" className='key_perf' name='key_perf'/>
                </div>

                <div className='input-style'>
                    <label className='input-lbl'>Type</label>
                    <select value={form.category} name="category" className='category' onChange={handleChange}>
                        <option value="strat_obj">Strategic Objectives</option>
                        <option value="core_sup">Core/Support Functions</option>
                        <option value="unplanned">Unplanned</option>
                    </select>
                </div>
            </div>

            <div className='middle'>
                <div className='input-style'>
                    <label className='input-lbl'>Success Indicators</label>
                    <textarea value={form.succes_indic} type="text" className='succes_indic' name='succes_indic' onChange={handleChange}/>
                </div>

                <div className='input-style'>
                    <label className='input-lbl'>Actual Accomplishment</label>
                    <textarea value={form.actual_accomp} type="text" className='actual_accomp' name='actual_accomp' onChange={handleChange}/>
                </div>
            </div>
            
            <div className='additional'>
                { role === 'OPCR' || role === 'DPCR' ? 
                    <div className='optional'>
                        <div className='input-style'>
                            <label className='input-lbl'>Alloted Budget</label>
                            <input type="text" value={form.alloted_budget} className='alloted_budget' name='alloted_budget' onChange={handleChange}/>
                        </div>
                        
                        <div className='input-style'>
                            <label className='input-lbl'>Division / Individuals Accountable</label>
                            <textarea type="text" value={form.division_individuals_accountable} className='accountable' name='division_individuals_accountable' onChange={handleChange}/> 
                        </div>
                    </div> : ""
                }
    
                <div className='input-style'>
                    <label className='input-lbl'>Remarks</label>
                    <textarea name='remarks' className='remarks'></textarea>
                </div>
            </div>

            <div className='bottom'>
                <div>
                    <label htmlFor="">Q</label>
                    <input value={form.quality} type="number" className='quality' name='quality' onChange={handleChange} min={0} max={5}/>
                </div>
                <div>
                    <label htmlFor="">E</label>
                    <input value={form.efficiency} type="number" className='efficiency' name='efficiency' onChange={handleChange} min={0} max={5}/>  
                </div>  
                <div>
                    <label htmlFor="">T</label>
                    <input value={form.timeliness} type="number" className='timeliness' name='timeliness' onChange={handleChange} min={0} max={5}/>
                </div>
                <div>
                    <label htmlFor="">A</label>
                    <input value={form.avg_per_form} type="number" className='timeliness' name='avg_per_form' min={0} max={5} readOnly/>
                </div>
            </div>
        </div>
    )
}