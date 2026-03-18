import { Header } from "../components/header"
import '../pages/homepage.css'

export function Homepage () {
    return (
        <>
            <title>Login</title>
            <div className="homepage">
                <Header/>
                <div className='cards'>
                    <div className='btn-cards add'></div>
                    <div className='btn-cards update'></div>
                    <div className='btn-cards view'></div>
                </div>
            </div>
        </>
    )
}