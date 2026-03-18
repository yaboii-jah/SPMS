import '../components/addForm.css'

export function AddForm ({setUserData, form}) {
    function handleChange (e) {
        let { name, value } = e.target
        
        if (Number(value)) {
            value = Number(value)
        }

        setUserData(prev => prev.map( f => 
            f.id === form.id ? {...f, [name] : value}  : f
        )) 
    }

    function deleteForm () {
        setUserData(prev => prev.filter(f => f.id !== form.id))
    }

    return (    
        <div className="form-container">
            <div className='exit'>
                <button onClick={deleteForm}>X</button>
            </div>
            <div className='upper'>
                <input value={form.key_perf} onChange={handleChange} type="text" className='key_perf' name='key_perf' placeholder='Key Performance Area(KPA) / Office Performance Scorecard'/>
                <select value={form.category} name="category" className='category' onChange={handleChange}>
                    <option value="strat_obj">Strategic Objectives</option>
                    <option value="core_sup">Core/Support Functions</option>
                    <option value="unplanned">Unplanned</option>
                </select>
            </div>

            <div className='middle'>
                <input value={form.succes_indic} type="text" className='succes_indic' name='succes_indic' onChange={handleChange}/>
                <input value={form.actual_accomp} type="text" className='actual_accomp' name='actual_accomp' onChange={handleChange}/>
            </div>

            <div className='bottom'>
                <div>
                    <label htmlFor="">Q</label>
                    <input value={form.quality} type="number" className='quality' name='quality' onChange={handleChange}/>
                </div>
                <div>
                   <label htmlFor="">E</label>
                   <input value={form.efficiency} type="number" className='efficiency' name='efficiency' onChange={handleChange}/>  
                </div>
                <div>
                    <label htmlFor="">T</label>
                    <input value={form.timeliness} type="number" className='timeliness' name='timeliness' onChange={handleChange} />
                </div>
            </div>
        </div>
    )
}