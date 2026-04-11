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
            avgSum += Number(data['avg_per_form'])
            rowNum++    
        }
    })
  
    return avgSum / rowNum ? Math.round(((avgSum / rowNum) * weight) * 100) / 100 : 0
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
                timeliness: form.timeliness,
                quality: form.quality,
                efficiency: form.efficiency,
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
  
    let newForm = {
        key_perf : "",
        actual_accomp : "",
        succes_indic : "",
        category : "strat_obj",
        quality : 0,
        efficiency : 0,
        timeliness : 0,
        avg_per_form : "",
        id: action.payload.id
    }


    switch (action.type) {
        case "ADD FORM" : 
            if (action.payload.role === 'OPCR' || action.payload.role === 'DPCR') {
                newForm['alloted_budget'] = "",
                newForm['division_individuals_accountable'] = ""
            }

            return {
                ...state,
                userData : [...state.userData, newForm],

                request : [...state.request, {...newForm, ['action'] : "create"}]
            }

        case "DELETE FORM" : {
            userDataCopy = userDataCopy.filter(f => f.id !== action.payload.id)

            requestCopy = action.payload.form['performance_id'] ? 
            [...requestCopy, { ['performance_id'] : action.payload.form['performance_id'], ['action'] : 'delete'}] :
            requestCopy.filter(r => r.id !== action.payload.id)

            let ratingsCopy = {...state.ratings, ['avg_rating'] : Math.round((action.payload.computeRating(userDataCopy)) * 100 ) / 100, ['strat_obj_final'] : computeFinalRating(userDataCopy, state.ratings['strat_obj_weight'], 'strat_obj'),
                ['core_sup_final'] : computeFinalRating(userDataCopy, state.ratings['core_sup_weight'], 'core_sup'), ['unplanned_final'] : computeFinalRating(userDataCopy, state.ratings['unplanned_weight'], 'unplanned')
            }

            ratingsCopy = {...ratingsCopy, ['overall_rating'] : Math.round((ratingsCopy['core_sup_final'] + ratingsCopy['strat_obj_final'] + ratingsCopy['unplanned_final']) * 100) / 100}

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
                r.id === action.payload.id ? {...r, ['avg_per_form'] : action.payload.computeAvg(r)} : r
            )

            let ratingsCopy = {...state.ratings, ['avg_rating'] : Math.round((action.payload.computeRating(userDataCopy)) * 100 ) / 100, ['strat_obj_final'] : computeFinalRating(userDataCopy, state.ratings['strat_obj_weight'], 'strat_obj'),
                ['core_sup_final'] : computeFinalRating(userDataCopy, state.ratings['core_sup_weight'], 'core_sup'), ['unplanned_final'] : computeFinalRating(userDataCopy, state.ratings['unplanned_weight'], 'unplanned')
            }

            ratingsCopy = {...ratingsCopy, ['overall_rating'] : Math.round((ratingsCopy['core_sup_final'] + ratingsCopy['strat_obj_final'] + ratingsCopy['unplanned_final']) * 100) / 100 }

            ratingsCopy = {...ratingsCopy, ['adjective_rating'] : ratingsCopy.overall_rating >= 5 ? 'OUTSTANDING' : ratingsCopy.overall_rating >= 4 ? 'VERY SATISFACTORY' : ratingsCopy.overall_rating >= 3 ? 'SATISFACTORY' : ratingsCopy.overall_rating >= 2 ? 'UNSATISFACTORY' : 'POOR'}

            return { 
                ...state,
                userData : userDataCopy,
                ratings : ratingsCopy,
                request : requestCopy
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

        case 'FETCH DATA' : 
            return {
                ...state,
                userData : action.payload.spms,
                ratings : action.payload.ratings
            }
    }
}