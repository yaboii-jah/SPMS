import { useRef} from 'react';
import { LogUser } from '../api/login'
import { useNavigate} from 'react-router-dom'
import '../pages/login.css'
import logo from '../assets/PCGG-Logo.png'

export function Login () {
    const Username = useRef(null)
    const Password = useRef(null)
    const navigate = useNavigate()

    async function login () {
        const result = await LogUser( Username.current.value, Password.current.value );

        if (!result.success) { 
        return alert('Invalid Credentials')
        }

        navigate("/homepage")
    }

    return (
        <>
            <title>Login</title>

            <div className="login">
                <div className='background'>
                    <div className='dim'></div>
                    <img src={logo} alt="pcgg_logo" className='pcgg-logo'/>
                </div>
                <div className="login-container">
                    <h2>Login</h2>
                    <input ref={Username} type="text" placeholder='Username' className='login-input username'/>
                    <input ref={Password} type="password" placeholder='Password' className='login-input password'/>
                    <button className='login-btn' onClick={login}>Login</button>
                </div>
            </div>
        </>
    )
}
