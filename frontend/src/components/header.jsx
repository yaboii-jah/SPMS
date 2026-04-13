import '../components/header.css'
import { CgProfile } from "react-icons/cg";

export function Header () {
    return (
        <div className="header">
            <CgProfile className='profile-icon'/>
        </div>
    )
}