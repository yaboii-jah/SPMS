export async function addPerformance (performance) { 
    await fetch('http://localhost:3005/performance/api/add', {
        method : 'POST',
        headers: {
            "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwicm9sZSI6IklQQ1IiLCJpYXQiOjE3NzM4MTM2MjIsImV4cCI6MTc3MzgxNzIyMn0.YXmW_BULC74f-3zv5CXXJKGeEM0wKcBPLUG5uSanrXk`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(performance)
    });
}