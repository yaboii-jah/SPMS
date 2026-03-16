import { useRef } from 'react';
import { LogUser } from '../api/login'
import './LoginContainer.css'

export function LoginContainer () {
    const Username = useRef(null)
    const Password = useRef(null)

    async function login () {
       const result = await LogUser( Username.current.value, Password.current.value );

      if (result.success) { 
        alert('User Successfuly Logged in')
      } else {
        alert('Invalid Credentials')
      }
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input ref={Username} type="text" placeholder='Username' className='login-input username'/>
            <input ref={Password} type="text" placeholder='Password' className='login-input password'/>
            <button className='login-btn' onClick={login}>Login</button>
        </div>
    )
}

