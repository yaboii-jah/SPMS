import { Header } from "../components/header"
import { useNavigate } from "react-router-dom"
import '../pages/homepage.css'

export function Homepage () {
    const navigate = useNavigate()
    
    return (
        <>
            <title>Login</title>
            <div className="homepage"> 
                <Header/>
                <div className='cards'>
                    <div onClick={() => navigate("/add")} className='btn-cards add'></div>
                    <div onClick={() => navigate("/update")} className='btn-cards update'></div>
                    <div onClick={() => navigate("/view")} className='btn-cards view'></div>
                </div>
            </div>
        </>
    )
}