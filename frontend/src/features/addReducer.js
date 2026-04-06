export const initialState = {
    userData : [{
        key_perf : "",
        actual_accomp : "",
        succes_indic : "",
        category : 'strat_obj',
        quality : 0,
        efficiency : 0,
        timeliness : 0,
        avg_per_form : "",
        id: crypto.randomUUID()
    }],
    
    ratings : {
        avg_rating : 0,
        strat_obj_weight : 0.3,
        core_sup_weight : 0.7,
        unplanned_weight : 0,
        strat_obj_final : 0,
        core_sup_final : 0,
        unplanned_final : 0,
        overall_rating : 0,
        adjective_rating : ""
    }
}

function computeFinalRating (userData, weight, name) {
    let avgSum = 0
    let rowNum = 0

    userData.forEach(data => {
        if (data.category === name) {
            avgSum += Number(data['avg_per_form'])
            rowNum++
        }
    })

    return avgSum / rowNum ? Math.round(((avgSum / rowNum) * weight) * 100) / 100 : 0
}

export function reducer(state, action) {
    let userDataCopy = state.userData.map(data => (
        {...data}
    ))

    switch (action.type) {
        case "ADD FORM" : 
            return {
                ...state,
                userData : [...state.userData, {
                    key_perf : "",
                    actual_accomp : "",
                    succes_indic : "",
                    category : "strat_obj",
                    quality : 0,
                    efficiency : 0,
                    timeliness : 0,
                    avg_per_form : "",
                    id: crypto.randomUUID()
                }]
            }

        case "DELETE FORM" : {
            userDataCopy = userDataCopy.filter(f => f.id !== action.payload.id)

            let ratingsCopy = {...state.ratings, ['avg_rating'] : Math.round((action.payload.computeRating(userDataCopy)) * 100 ) / 100, ['strat_obj_final'] : computeFinalRating(userDataCopy, state.ratings['strat_obj_weight'], 'strat_obj'),
                ['core_sup_final'] : computeFinalRating(userDataCopy, state.ratings['core_sup_weight'], 'core_sup'), ['unplanned_final'] : computeFinalRating(userDataCopy, state.ratings['unplanned_weight'], 'unplanned')
            }

            ratingsCopy = {...ratingsCopy, ['overall_rating'] : Math.round((ratingsCopy['core_sup_final'] + ratingsCopy['strat_obj_final'] + ratingsCopy['unplanned_final']) * 100) / 100}

            ratingsCopy = {...ratingsCopy, ['adjective_rating'] : ratingsCopy.overall_rating >= 5 ? 'OUTSTANDING' : ratingsCopy.overall_rating >= 4 ? 'VERY SATISFACTORY' : ratingsCopy.overall_rating >= 3 ? 'SATISFACTORY' : ratingsCopy.overall_rating >= 2 ? 'UNSATISFACTORY' : 'POOR'}

            return {
                ...state,
                userData : userDataCopy,
                ratings : ratingsCopy
            }
        }
        
        case 'DYNAMIC UPDATE' : {
            userDataCopy = userDataCopy.map(f => 
                f.id === action.payload.id ? {...f, [action.payload.name] : action.payload.value} : f
            )

            userDataCopy = userDataCopy.map(f => 
                f.id === action.payload.id ? {...f, ['avg_per_form'] : action.payload.computeAvg(f)} : f
            )

            let ratingsCopy = {...state.ratings, ['avg_rating'] : Math.round((action.payload.computeRating(userDataCopy)) * 100 ) / 100, ['strat_obj_final'] : computeFinalRating(userDataCopy, state.ratings['strat_obj_weight'], 'strat_obj'),
                ['core_sup_final'] : computeFinalRating(userDataCopy, state.ratings['core_sup_weight'], 'core_sup'), ['unplanned_final'] : computeFinalRating(userDataCopy, state.ratings['unplanned_weight'], 'unplanned')
            }

            ratingsCopy = {...ratingsCopy, ['overall_rating'] : Math.round((ratingsCopy['core_sup_final'] + ratingsCopy['strat_obj_final'] + ratingsCopy['unplanned_final']) * 100) / 100 }

            ratingsCopy = {...ratingsCopy, ['adjective_rating'] : ratingsCopy.overall_rating >= 5 ? 'OUTSTANDING' : ratingsCopy.overall_rating >= 4 ? 'VERY SATISFACTORY' : ratingsCopy.overall_rating >= 3 ? 'SATISFACTORY' : ratingsCopy.overall_rating >= 2 ? 'UNSATISFACTORY' : 'POOR'}

            return {
                ...state,
                userData : userDataCopy,
                ratings : ratingsCopy
            }
        }

        case 'COMPUTE RATINGS' : {
            let ratingsCopy = {...state.ratings, ['avg_rating'] : Math.round((action.payload.computeRating(userDataCopy)) * 100 ) / 100, [`${action.payload.name}_final`] : action.payload.avgSum / action.payload.rowNum ? Math.round(((action.payload.avgSum / action.payload.rowNum) * action.payload.value) * 100 ) / 100 : 0, 
            [`${action.payload.name}_weight`] : action.payload.value}
            
            ratingsCopy = {...ratingsCopy, ['overall_rating'] : Math.round((ratingsCopy['core_sup_final'] + ratingsCopy['strat_obj_final'] + ratingsCopy['unplanned_final']) * 100) / 100 }

            ratingsCopy = {...ratingsCopy, ['adjective_rating'] : ratingsCopy.overall_rating >= 5 ? 'OUTSTANDING' : ratingsCopy.overall_rating >= 4 ? 'VERY SATISFACTORY' : ratingsCopy.overall_rating >= 3 ? 'SATISFACTORY' : ratingsCopy.overall_rating >= 2 ? 'UNSATISFACTORY' : 'POOR'}

            return {
                ...state,
                ratings : ratingsCopy
            }
        }
    }
}