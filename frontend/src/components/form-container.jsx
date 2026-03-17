import '../components/form-container.css'

export function FormContainer ({setUserData, form}) {
    function handleChange(e) {
        const { name, value } = e.target

        setUserData(prev => prev.map( f => 
            f.id === form.id ? {...f, [name] : value}  : f
        )) 

}
    return (    
        <div className="form-container">
            <div className='upper'>
                <input value={form.key_perf} onChange={handleChange} type="text" className='key_perf' placeholder='Key Performance Area(KPA) / Office Performance Scorecard'/>
                <select value={form.category} name="category" className='category' onChange={handleChange}>
                    <option value="strat_obj">Strategic Objectives</option>
                    <option value="core_sup">Core/Support Functions</option>
                    <option value="unplanned">Unplanned</option>
                </select>
            </div>

            <div className='middle'>
                <input value={form.success_indic} type="text" className='success_indic' onChange={handleChange}/>
                <input value={form.actual_accomp} type="text" className='actual_accomp' onChange={handleChange}/>
            </div>

            <div className='bottom'>
                <div>
                    <label htmlFor="">Q</label>
                    <input value={form.quality} type="number" className='quality' onChange={handleChange}/>
                </div>
                <div>
                   <label htmlFor="">E</label>
                   <input value={form.efficiency} type="number" className='efficiency' onChange={handleChange}/>  
                </div>
                <div>
                    <label htmlFor="">T</label>
                    <input value={form.timeliness} type="number" className='timeliness' onChange={handleChange} />
                </div>
            </div>
        </div>
    )
}