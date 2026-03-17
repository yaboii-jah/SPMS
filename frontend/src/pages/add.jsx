import '../pages/add.css'
import { Header } from '../components/header'
import { FormContainer } from '../components/form-container'
import { useState} from 'react'

export function Add () {
    const [userData, setUserData] = useState([
            {
            key_pref : '',
            actual_accomp : '',
            success_indic : '',
            category : '',
            quality : 0,
            efficiency : 0,
            timeliness : 0,
            id: crypto.randomUUID()
        }
    ])

    function saveInputText () {
        setUserData([...userData, {
            key_pref : '',
            actual_accomp : '',
            success_indic : '',
            category : '',
            quality : 0,
            efficiency : 0,
            timeliness : 0,
            id: crypto.randomUUID()
        }])
    }

    function getUser() {
        console.log(userData)
    }
    
    return (
        <>
            <title>Add SPMS</title>
            
            <Header/>

            <div className="form">
                {
                    userData.map(form => {
                        return (
                            <FormContainer 
                                setUserData={setUserData}
                                form={form}
                                key={form.id}
                            />
                        )
                    })
                } 
                <button className='add-more-btn' onClick={saveInputText}>Add more</button>
                <button className='submit-btn' onClick={getUser}>Submit</button>
            </div>


            
        </>

    )
}