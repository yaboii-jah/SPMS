export async function updatePerformance (updatedPerformance) { 
    await fetch('http://localhost:3005/performance/api/update', {
        method : 'POST',
        headers: {
            "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwicm9sZSI6IklQQ1IiLCJpYXQiOjE3NzQyMjQ3NDksImV4cCI6MTc3NDMxMTE0OX0.x2gZD_5MLd1zMuIx5G235LL7tAEnSXcbZf64K5kBwj8`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(updatedPerformance)
    });
}