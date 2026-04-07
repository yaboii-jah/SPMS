import { useEffect, useRef} from 'react';
import { LogUser } from '../api/login'
import { useNavigate} from 'react-router-dom'
import { useAuth } from "../contexts/auth/useAuth";
import '../pages/login.css'
import logo from '../assets/PCGG-Logo.png'

export function Login () {
    const { accessToken, setAccessToken } = useAuth()
    const Username = useRef(null)
    const Password = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (accessToken) {
            navigate("/homepage");
        }
    }, [accessToken]);

    async function login () {
        try {
            const result = await LogUser( Username.current.value, Password.current.value, setAccessToken);

            if (!result.success) { 
                return alert(result.message)
            }

            setAccessToken(result.data)
       } catch (error) {
           console.log(error)
           return alert("Internal Server Error")
       }
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
