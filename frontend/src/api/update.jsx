export async function updatePerformance (updatedPerformance) { 
    await fetch('http://localhost:3005/performance/api/update', {
        method : 'POST',
        headers: {
            "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwicm9sZSI6IklQQ1IiLCJpYXQiOjE3NzQ5MTY4OTcsImV4cCI6MTc3NTAwMzI5N30.4aQvpDrIJ-5rTJ6BNeWbDYnovZvpXciBetr8sYBa628`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(updatedPerformance)
    });
}

export async function updateRatings (updatedRatings) { 
    await fetch('http://localhost:3005/ratings/api/update', {
        method : 'POST',
        headers: {
            "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwicm9sZSI6IklQQ1IiLCJpYXQiOjE3NzQ5MTY4OTcsImV4cCI6MTc3NTAwMzI5N30.4aQvpDrIJ-5rTJ6BNeWbDYnovZvpXciBetr8sYBa628`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(updatedRatings)
    });
}





