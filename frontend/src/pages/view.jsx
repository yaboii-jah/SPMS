import './view.css'
import { useEffect, useState} from 'react'
import logo from '../assets/PCGG-Logo.png'
import { UserPerformance } from '../components/userPerformance'
import { useAuth } from '../contexts/auth/useAuth'
import { refresh } from '../api/refresh'
import { errorResponse } from "../utils/responseFormat";
import { formatDate } from '../utils/formatDate.js'

// --- needed todo ---
//  - date form was added
//  - period 
//  - conditional process that check the user role after initial rendering that
//    will dynamically render fields
//  - resize the form, because i think it looks too long
//  - make it responsive

export function View() {
    let [strat_obj, setStrat] = useState([])
    let [core_sup, setCore] = useState([])
    let [unplanned, setUnplanned] = useState([])
    let [userRatings, setRatings] = useState({})
    let [user, setUser] = useState({})
    const { accessToken, setAccessToken, userRole } = useAuth()
    
    console.log(user)
    useEffect(() => {
        async function fetchUserData (token = accessToken)  {
            let stratCopy = []
            let coreCopy = []
            let unplannedCopy = []
            let ratingsCopy = {}

            const performance = await fetch('http://localhost:3005/performance/api/fetchSpms', {
                method : 'GET',
                headers : {
                    "Authorization" : `Bearer ${token}`,
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            })

            const perf_result = await performance.json()

            if (perf_result.error === 403) {
                console.log('test')
                const result = await refresh(setAccessToken)
    
                if (!result.success) {
                    return new errorResponse(false, result.message)
                }
    
                const newToken = result.data;
    
                return await fetchUserData(newToken);
            }

            perf_result.data.forEach(perf => {
               
                if (perf.category === 'strat_obj') stratCopy.push(perf)
                if (perf.category === 'core_sup') coreCopy.push(perf)
                if (perf.category === 'unplanned') unplannedCopy.push(perf)
            })

            const ratings = await fetch('http://localhost:3005/performance/api/fetchRatings', {
                method : 'GET',
                headers : {
                    "Authorization" : `Bearer ${token}`,
                    "Content-Type" : "application/json"
                },
                credentials : "include"

            }) 
            
            const rate_result = await ratings.json()

            if (rate_result.error === 403) {
                console.log('test')
                const result = await refresh(setAccessToken)
    
                if (!result.success) {
                    return new errorResponse(false, result.message)
                }
    
                const newToken = result.data;
    
                return await fetchUserData(newToken);
            }

            ratingsCopy = rate_result.data[0]

            const user = await fetch('http://localhost:3005/auth/api/fetchUser', {
                method : 'GET',
                headers : {
                    "Authorization" : `Bearer ${token}`,
                    "Content-Type" : "application/json"
                },
                credentials : "include"

            })
    
            const user_result = await user.json()

            if (user_result.error === 403) {
                const result = await refresh(setAccessToken)
    
                if (!result.success) {
                    return new errorResponse(false, result.message)
                }
    
                const newToken = result.data;
    
                return await fetchUserData(newToken);
            }

            setStrat(stratCopy)
            setCore(coreCopy)
            setUnplanned(unplannedCopy)
            setRatings(ratingsCopy)
            setUser(user_result.data)
        }

        fetchUserData()
    }, [])


  return (
    <div className='view-container'>
        <div className='container'> 
            <div className="view-agency">
                <img className="view-agency-logo" src={logo}/>
                <strong className="view-agency-name">Presidential Commision on Good Government</strong>
            </div>

            <div className="ipcr-form">    
                <div className="view-ipcr-container">
                    <h4> {userRole === 'IPCR' ? 'INDIVIDUAL' : userRole === 'DPCR' ? 'DIVISION' : 'OFFICE'} PERFORMANCE COMMITMENT AND REVIEW FORM ({userRole})</h4>
                    <p className="commitment-text">
                        I, <strong style={{textDecoration : "underline"}}>{`${user.first_name} ${user.middle_name ? `${user.middle_name[0]}. ` : " "}${user.last_name}`}</strong> of the  
                        <strong style={{textDecoration : "underline"}}>{` ${user.department}`}</strong> commit to deliver and agree to be 
                        rated on the attainment of the following targets in accordance with the indicated measures for the period 
                        <strong style={{textDecoration : "underline"}}> July to December 31, 2025.</strong>
                    </p>
                </div> 
                
            <div className="view-signature-section">
                <div className="view-signature-block">
                <div className="view-signature-line"></div>
                <div className="view-label">{userRole === 'IPCR' ? 'Employee' : userRole === 'DPCR' ? 'OIC/Division Chief/Section Head' : 'Director'}</div>
                <div className="view-date-row">
                    Date: <strong style={{textDecoration : "underline"}}>{user.created_at ? formatDate(user.created_at) : ""}</strong>
                </div>
                </div>
            </div>

            <table className="view-table">
                <tr>
                    <th style={{backgroundColor: "rgb(224, 224, 224)", textAlign: "left"}}>Recommending Approval:</th>
                    <th style={{backgroundColor: "rgb(224, 224, 224)"}}>Date</th>
                    <th style={{backgroundColor: "rgb(224, 224, 224)", textAlign: "left"}}>Approved by:</th>
                    <th style={{backgroundColor: "rgb(224, 224, 224)"}}>Date</th>
                </tr>
                <tr>
                    <td style={{textAlign: "center"}}>{userRole === 'IPCR' ? (user.supervisor_division_chief) : userRole === 'DPCR' ? user.office_director : user.commissioner}</td>
                    <td rowSpan={2} style={{textAlign: "center"}}>{user.created_at ? formatDate(user.created_at) : ""}</td>
                    <td style={{textAlign: "center"}}>{userRole === 'IPCR' ? user.office_director : userRole === 'DPCR' ? user.commissioner : user.chairperson}</td>
                    <td rowSpan={2} style={{textAlign: "center"}}>{user.created_at ? formatDate(user.created_at) : ""}</td>
                </tr>
                <tr>
                    <td style={{backgroundColor: "rgb(224, 224, 224)", textAlign: "center", fontWeight: "bold"}}>{userRole === 'IPCR' ? 'Immediate Supervisor/Division Chief' : userRole === 'DPCR' ? 'Director' : 'Commissioner In-charge'}</td>
                    <td style={{backgroundColor: "rgb(224, 224, 224)", textAlign: "center", fontWeight: "bold"}}>{userRole === 'IPCR' ? 'Head Of Office/Director' : userRole === 'DPCR' ? 'Commissioner In-charge' : 'Chairperson'}</td>
                </tr>
                <tr>
                    <td colSpan={4} style={{backgroundColor: "rgb(224, 224, 224)"}}>PART 1: Evaluation</td>
                </tr>
            </table>

            <table className="view-table">
                <tr>
                    <th colSpan={2} style={{backgroundColor: "rgb(201, 201, 201)"}}>To be accomplished During Planning Phase</th>
                    <th colSpan={6} style={{backgroundColor: "rgb(201, 201, 201)"}}>To be accomplished During Planning Phase</th>
                </tr> 
                <tr>
                    <td rowSpan={2} style={{backgroundColor: "rgb(224, 224, 224)", textAlign: "center", fontWeight: "bold"}}>Key Performance Area(KPA)/Office <br/> Performance Scorecard</td>
                    <td rowSpan={2} style={{backgroundColor: "rgb(224, 224, 224)", textAlign: "center", fontWeight: "bold"}}>Success Indicators <br/> (TARGETS+MEASURES)</td>
                    <td rowSpan={2} style={{backgroundColor: "rgb(224, 224, 224)", textAlign: "center", fontWeight: "bold"}}>Actual Accomplishments</td>
                    { userRole !== 'IPCR' ?
                        <>
                            <td rowSpan={2} style={{backgroundColor: "rgb(224, 224, 224)", textAlign: "center", fontWeight: "bold"}}>Alloted Budget</td>
                            <td rowSpan={2} style={{backgroundColor: "rgb(224, 224, 224)", textAlign: "center", fontWeight: "bold"}}>Division / Individuals Accountable</td>
                        </> : ""
                    }
                    <td colSpan={4} style={{backgroundColor: "rgb(224, 224, 224)", textAlign: "center", fontWeight: "bold"}}>Ratings</td>
                    <td colSpan={2} rowSpan={2} style={{backgroundColor: "rgb(224, 224, 224)", textAlign: "center", fontWeight: "bold"}}>Remarks</td>
                </tr>
                <tr style={{textAlign: "center"}}>
                    <td style={{padding: 10, paddingLeft: 15, paddingRight: 15, borderWidth: 2}}>Q</td>
                    <td style={{padding: 10, paddingLeft: 15, paddingRight: 15, borderWidth: 2}}>E</td>
                    <td style={{padding: 10, paddingLeft: 15, paddingRight: 15, borderWidth: 2}}>T</td>
                    <td style={{padding: 10, paddingLeft: 15, paddingRight: 15, borderWidth: 2}}>A</td>
                </tr>

                <tr>
                    <td style={{fontWeight: "bold"}}>STRATEGIC OBJECTIVES</td>
                    { userRole !== 'IPCR' ?
                        <>
                            <td></td>
                            <td></td>
                        </> : ""
                    }
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{backgroundColor: "rgb(248, 248, 248)"}}></td>
                    <td></td>
                </tr>

                    {strat_obj.map(perf => {
                        return (
                            <UserPerformance 
                                strategy={perf}
                                role={userRole}
                                key={perf.performance_id}
                            />
                        )
                    })}

                    <tr>
                    <td style={{fontWeight: "bold", backgroundColor: "rgb(224, 224, 224)"}}>CORE / SUPPORT FUNCTIONS</td>
                    <td style={{backgroundColor: "rgb(224, 224, 224)"}}></td>
                    <td style={{backgroundColor: "rgb(224, 224, 224)"}}></td>
                    <td style={{backgroundColor: "rgb(224, 224, 224)"}}></td>
                    <td style={{backgroundColor: "rgb(224, 224, 224)"}}></td>
                    <td style={{backgroundColor: "rgb(224, 224, 224)"}}></td>
                    { userRole !== 'IPCR' ?
                        <>
                            <td style={{backgroundColor:"rgb(224, 224, 224)"}}></td>
                            <td style={{backgroundColor:"rgb(224, 224, 224)"}}></td>
                        </> : ""
                    }
                    <td style={{backgroundColor:"rgb(224, 224, 224)"}}></td>
                    <td style={{backgroundColor:"rgb(224, 224, 224)"}}></td>
                </tr>
    
                    {core_sup.map(perf => {
                        return (
                            <UserPerformance 
                                strategy={perf}
                                role={userRole}
                                key={perf.performance_id}
                            />
                        )
                    })}
                
                <tr>
                    <td style={{fontWeight: "bold", backgroundColor: "rgb(224, 224, 224)"}}>UPLANNED</td>
                    <td style={{backgroundColor: "rgb(224, 224, 224)"}}></td>
                    <td style={{backgroundColor: "rgb(224, 224, 224)"}}></td>
                    <td style={{backgroundColor: "rgb(224, 224, 224)"}}></td>
                    <td style={{backgroundColor: "rgb(224, 224, 224)"}}></td>
                    <td style={{backgroundColor: "rgb(224, 224, 224)"}}></td>
                    <td style={{backgroundColor:"rgb(224, 224, 224)"}}></td>
                    <td style={{backgroundColor:"rgb(224, 224, 224)"}}></td>
                    { userRole !== 'IPCR' ?
                        <>
                            <td style={{backgroundColor:"rgb(224, 224, 224)"}}></td>
                            <td style={{backgroundColor:"rgb(224, 224, 224)"}}></td>
                        </> : ""
                    }
                </tr>
                
                {unplanned.map(perf => {
                        return (
                            <UserPerformance 
                                strategy={perf}
                                role={userRole}
                                key={perf.performance_id}
                            />
                        )
                    })}

                <tr>
                    <td colSpan={2}></td>
                    <td colSpan={userRole === 'IPCR' ? 4 : 6} style={{backgroundColor: "rgb(221, 221, 221)", textAlign: "center"}}>Average Rating</td>
                    <td style={{backgroundColor: "rgb(248, 248, 248)", fontWeight: "bold"}}>{String(userRatings.avg_rating).padEnd(4, '0')}</td>
                    <td></td>
                </tr>
            </table>

            <table className="view-table" style={{marginTop: 10}}>
                <tr>
                    <td style={{textAlign: "center"}}>RATINGS:</td>
                    <td style={{textAlign: "center"}}>5-Outstanding</td>
                    <td style={{textAlign: "center"}}>4-Very Satisfactory</td>
                    <td style={{textAlign: "center"}}>3-Satisfactory</td>
                    <td style={{textAlign: "center"}}>2-Unsatisfactory</td>
                    <td style={{textAlign: "center"}}>1-Poor</td>
                </tr>
                <tr>
                    <td style={{textAlign: "center"}}>Legend:</td>
                    <td colSpan={2} style={{textAlign: "center"}}>Q - Quality/Effectiveness ( e.g. Meeting Standards, <br/> Acceptablity, Accuracy, Completeness of reports, <br/> Creativity, Initiative )</td>
                    <td colSpan={2} style={{textAlign: "center"}}>E - Efficiency ( e.g. Standard response time no. of <br/> requests acted upon over total request)</td>
                    <td style={{textAlign: "center"}}>T - Timeliness ( Done w/in scheduled / <br/> expected timeframe )</td>
                </tr>
                <tr>
                    <td colSpan={6}>PART II: Development Assessment</td>
                </tr>
                <tr>
                    <td colSpan={2}>Need for training or other developmental <br/> intervention, Why?:</td>
                    <td colSpan={4}></td>
                </tr>
            </table>
            
            <div style={{display: "flex", flexDirection: "column", alignItems: "end"}}>
                <table style={{marginTop: 10, width: 600, gap: 20}} className="view-table" >
                    <tr>
                        <th style={{backgroundColor: "rgb(222, 222, 222)", textAlign: "center"}}>Category</th>
                        <th style={{backgroundColor: "rgb(222, 222, 222)", textAlign: "center"}}>ASSIGNED WEIGHT</th>
                        <th style={{backgroundColor: "rgb(222, 222, 222)", textAlign: "center"}}>FINAL RATING</th>
                    </tr>
                    <tr>
                        <td style={{backgroundColor: "rgb(245, 245, 245)"}}>Strategic Priority</td>
                        <td style={{textAlign: "center"}}>{userRatings.strat_obj_weight}0%</td>
                        <td style={{backgroundColor: "rgb(245, 245, 245)", textAlign: "center"}}>{userRatings.strat_obj_final}</td>
                    </tr>
                    <tr>
                        <td style={{backgroundColor: "rgb(245, 245, 245)"}}>Core/Support Functions</td>
                        <td style={{textAlign: "center"}}>{userRatings.core_sup_weight}0%</td>
                        <td style={{backgroundColor: "rgb(245, 245, 245)", textAlign: "center"}}>{userRatings.core_sup_final}</td>
                    </tr>
                    <tr>
                        <td style={{backgroundColor: "rgb(245, 245, 245)"}}>Unplanned Results</td>
                        <td style={{textAlign: "center"}}>{userRatings.unplanned_weight}0%</td>
                        <td style={{backgroundColor: "rgb(245, 245, 245)", textAlign: "center"}}>{userRatings.unplanned_final}</td>
                    </tr>
                </table>

                <table className="view-table" style={{width: 400, marginTop: 10, borderWidth: 2}}>
                    <tr>
                        <th style={{backgroundColor: "rgb(245, 245, 245)"}}>Total Overall Rating</th>
                        <td style={{backgroundColor: "rgb(245, 245, 245)", textAlign: "center"}}>{userRatings.overall_rating}</td>
                    </tr>
                    <tr>
                        <th style={{backgroundColor: "rgb(245, 245, 245)"}}>Adjective Rating</th>
                        <td style={{backgroundColor: "rgb(245, 245, 245)", textAlign: "center"}}>{userRatings.adjective_rating}</td>
                    </tr>
                </table>
            </div>

            <table className="view-table" style={{marginTop: 10, borderWidth: 2}}>
                <tr>
                    <th style={{backgroundColor: "rgb(245, 245, 245)"}}>Discussed with:</th>
                    <th style={{backgroundColor: "rgb(245, 245, 245)"}}>Date</th>
                    <th style={{backgroundColor: "rgb(245, 245, 245)"}}>Assessed by:</th>
                    <th style={{backgroundColor: "rgb(245, 245, 245)"}}>Date</th>
                    <th style={{backgroundColor: "rgb(245, 245, 245)"}}>Final Rating by:</th>
                    <th style={{backgroundColor: "rgb(245, 245, 245)"}}>Date</th>
                </tr>
                <tr>
                    <td style={{textAlign: "center"}}>{`${user.first_name} ${user.middle_name ? `${user.middle_name[0]}. ` : " "}${user.last_name}`}</td>
                    <td rowSpan={2} style={{textAlign: "center"}}>{user.created_at ? formatDate(user.created_at) : ""}</td>
                    <td style={{textAlign: "center"}}>
                        <p> I certify that i discussed my assessment of the performance with the <br/>employee</p>
                        <p style={{fontWeight: "bold", marginTop: 10}}>{user.supervisor_division_chief ? user.supervisor_division_chief.toUpperCase() : ""}</p>
                    </td>
                    <td rowSpan={2} style={{textAlign: "center"}}>{user.created_at ? formatDate(user.created_at) : ""}</td>
                    <td style={{textAlign: "center", verticalAlign: "bottom", fontWeight: "bold"}}>{user.office_director ? user.office_director.toUpperCase() : ""}</td>
                    <td rowSpan={2} style={{textAlign: "center"}}>{user.created_at ? formatDate(user.created_at) : ""}</td>
                </tr>
                <tr>
                    <td style={{backgroundColor: "rgb(245, 245, 245)", textAlign: "center"}}>Employee</td>
                    <td style={{backgroundColor: "rgb(245, 245, 245)", textAlign: "center"}}>Immediate Supervisor / Division Chief </td>
                    <td style={{backgroundColor: "rgb(245, 245, 245)", textAlign: "center"}}>Head of Office / Director</td>
                </tr>
            </table>
            </div>

        
        <button className='print-btn' onClick={() => window.print()}>PRINT</button>
        </div>
    </div>

  )
}