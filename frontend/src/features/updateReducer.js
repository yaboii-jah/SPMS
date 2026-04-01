export const initialState = {
    userData : [],
    
    ratings : {
        avg_rating : 4.42,
        strat_obj_weight : 0.30,
        core_sup_weight : 0.70,
        unplanned_weight : 0.00,
        strat_obj_final : 1.35,
        core_sup_final : 3.06,
        unplanned_final : 0.00,
        overall_rating : 4.41,
        adjective_rating : "VERY SATISFACTORY"
    },

    request : []
}

function computeFinalRating (userData, weight, name) {
    let avgSum = 0
    let rowNum = 0

    userData.forEach(data => {
        if (data.category === name) {
            console.log(data.category)
            avgSum += Number(data['avg_per_form'])
            rowNum++
        }
    })

    return avgSum / rowNum ? (avgSum / rowNum) * weight : 0
}

function conditionalUpdate (request, form, id, name, value) {
    const existing = request.find(r => r.id === id);

    if (existing) {
        return request.map(r =>
            r.id === id ? { ...r, [name]: value } : r
        );
    } else {
        return [
            ...request,
            {
                id: id,
                performance_id: form.performance_id,
                action: 'update',
                [name]: value
            }
        ];
    }
}

export function reducer(state, action) {
    let userDataCopy = state.userData.map(data => (
        {...data}
    ))

    let requestCopy = state.request.map(req => (
        {...req}
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
                    avg_per_form : 0,
                    id: action.payload
                }],

                request : [...state.request, {
                    action : "create",
                    key_perf : "",
                    actual_accomp : "",
                    succes_indic : "",
                    category : "strat_obj",
                    quality : 0,
                    efficiency : 0,
                    timeliness : 0,
                    avg_per_form : 0,
                    id: action.payload
                }]
            }

        case "DELETE FORM" : {
            userDataCopy = userDataCopy.filter(f => f.id !== action.payload.id)

            requestCopy = action.payload.form['performance_id'] ? 
            [...requestCopy, { ['performance_id'] : action.payload.form['performance_id'], ['action'] : 'delete'}] :
            requestCopy.filter(r => r.id !== action.payload.id)

            let ratingsCopy = {...state.ratings, ['avg_rating'] : action.payload.computeRating(userDataCopy).toFixed(2), ['strat_obj_final'] : computeFinalRating(userDataCopy, state.ratings['strat_obj_weight'], 'strat_obj'),
                ['core_sup_final'] : computeFinalRating(userDataCopy, state.ratings['core_sup_weight'], 'core_sup'), ['unplanned_final'] : computeFinalRating(userDataCopy, state.ratings['unplanned_weight'], 'unplanned')
            }

            ratingsCopy = {...ratingsCopy, ['overall_rating'] : ratingsCopy['core_sup_final'] + ratingsCopy['strat_obj_final'] + ratingsCopy['unplanned_final']}

            ratingsCopy = {...ratingsCopy, ['adjective_rating'] : ratingsCopy.overall_rating >= 5 ? 'OUTSTANDING' : ratingsCopy.overall_rating >= 4 ? 'VERY SATISFACTORY' : ratingsCopy.overall_rating >= 3 ? 'SATISFACTORY' : ratingsCopy.overall_rating >= 2 ? 'UNSATISFACTORY' : 'POOR'}

            return {
                ...state,
                userData : userDataCopy,
                request : requestCopy,
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

            requestCopy = requestCopy.map(r =>
                r.id === action.payload.id ? {...r, [action.payload.name] : action.payload.value} : r
            )

            requestCopy = conditionalUpdate(requestCopy, action.payload.form, action.payload.id, action.payload.name, action.payload.value)
            
            requestCopy = requestCopy.map(r => 
                r.id === action.payload.id && r.action === 'update' ? {...r, ['avg_per_form'] : action.payload.computeAvg(r)} : r
            )

            let ratingsCopy = {...state.ratings, ['avg_rating'] : action.payload.computeRating(userDataCopy).toFixed(2), ['strat_obj_final'] : computeFinalRating(userDataCopy, state.ratings['strat_obj_weight'], 'strat_obj'),
                ['core_sup_final'] : computeFinalRating(userDataCopy, state.ratings['core_sup_weight'], 'core_sup'), ['unplanned_final'] : computeFinalRating(userDataCopy, state.ratings['unplanned_weight'], 'unplanned')
            }

            console.log(ratingsCopy)

            ratingsCopy = {...ratingsCopy, ['overall_rating'] : ratingsCopy['core_sup_final'] + ratingsCopy['strat_obj_final'] + ratingsCopy['unplanned_final']}

            ratingsCopy = {...ratingsCopy, ['adjective_rating'] : ratingsCopy.overall_rating >= 5 ? 'OUTSTANDING' : ratingsCopy.overall_rating >= 4 ? 'VERY SATISFACTORY' : ratingsCopy.overall_rating >= 3 ? 'SATISFACTORY' : ratingsCopy.overall_rating >= 2 ? 'UNSATISFACTORY' : 'POOR'}

            return {
                ...state,
                userData : userDataCopy,
                ratings : ratingsCopy,
                request : requestCopy
            }
        }

        case 'COMPUTE RATINGS' : {
            let ratingsCopy = {...state.ratings, ['avg_rating'] : action.payload.computeAvg(userDataCopy).toFixed(2), [`${action.payload.name}_final`] : Number(action.payload.avgSum / action.payload.rowNum) ? (action.payload.avgSum / action.payload.rowNum) * Number(action.payload.value) : 0, 
            [`${action.payload.name}_weight`] : action.payload.value}
            
            ratingsCopy = {...ratingsCopy, ['overall_rating'] : ratingsCopy['core_sup_final'] + ratingsCopy['strat_obj_final'] + ratingsCopy['unplanned_final']}

            ratingsCopy = {...ratingsCopy, ['adjective_rating'] : ratingsCopy.overall_rating >= 5 ? 'OUTSTANDING' : ratingsCopy.overall_rating >= 4 ? 'VERY SATISFACTORY' : ratingsCopy.overall_rating >= 3 ? 'SATISFACTORY' : ratingsCopy.overall_rating >= 2 ? 'UNSATISFACTORY' : 'POOR'}

            return {
                ...state,
                ratings : ratingsCopy
            }
        }

        case 'FETCH DATA' : 
            return {
                ...state,
                userData : action.payload.spms,
                ratings : action.payload.ratings
            }
    }
}