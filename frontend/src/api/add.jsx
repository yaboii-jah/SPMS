export async function addPerformance (performance) { 
    await fetch('http://localhost:3005/performance/api/add', {
        method : 'POST',
        headers: {
            "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwicm9sZSI6IklQQ1IiLCJpYXQiOjE3NzQ0MjI2NDcsImV4cCI6MTc3NDUwOTA0N30.wMcaFy_XPcf_o-23-UsmKv_jWToEivzBORklDOT4Syg`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(performance)
    });
}