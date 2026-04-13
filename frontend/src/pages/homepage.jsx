import { useNavigate } from "react-router-dom"
import { RiPlayListAddFill } from "react-icons/ri";
import { MdOutlineUpdate } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { BsSendCheckFill } from "react-icons/bs";
import { submitPerformance } from "../api/submit";
import '../pages/homepage.css'
import { useAuth } from '../contexts/auth/useAuth'

export function Homepage () {
    const navigate = useNavigate()
    const {accessToken} = useAuth()

    async function submit() {
        const choice = confirm('Do you want to submit your spms?')
        console.log('Test')

        if (choice) {
            const result = await submitPerformance(accessToken)

            if (!result.success) {
                alert(result.message)
            }

            alert(result.message)
        }
    }
    
    return (
        <>
            <title>Login</title>
            <div className="homepage"> 
                <div className='cards'>
                    <div onClick={() => navigate("/add")} className='btn-cards add'><RiPlayListAddFill className="homepage-icon"/>ADD</div>
                    <div onClick={() => navigate("/update")} className='btn-cards update'><MdOutlineUpdate className="homepage-icon"/>UPDATE</div>
                    <div onClick={() => navigate("/view")} className='btn-cards view'><CiViewList className="homepage-icon" />VIEW</div>
                    <div onClick={() => navigate("/profile")} className='btn-cards view'><CgProfile className='homepage-icon'/>PROFILE</div>
                    <div onClick={() => submit()} className='btn-cards'><BsSendCheckFill className='homepage-icon'/>SUBMIT</div>
                </div>
            </div>
        </>
    )
}