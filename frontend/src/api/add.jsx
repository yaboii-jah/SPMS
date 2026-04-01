export async function addPerformance (performance) { 
    await fetch('http://localhost:3005/performance/api/add', {
        method : 'POST',
        headers: {
            "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwicm9sZSI6IklQQ1IiLCJpYXQiOjE3NzQ5MTY4OTcsImV4cCI6MTc3NTAwMzI5N30.4aQvpDrIJ-5rTJ6BNeWbDYnovZvpXciBetr8sYBa628`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(performance)
    });
}

export async function addRatings (ratings) { 
    await fetch('http://localhost:3005/ratings/api/add', {
        method : 'POST',
        headers: {
            "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwicm9sZSI6IklQQ1IiLCJpYXQiOjE3NzQ5MTY4OTcsImV4cCI6MTc3NTAwMzI5N30.4aQvpDrIJ-5rTJ6BNeWbDYnovZvpXciBetr8sYBa628`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(ratings)
    });
}