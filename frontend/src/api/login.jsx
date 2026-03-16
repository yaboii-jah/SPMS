export async function LogUser (username, password) { 
    const response = await fetch('http://localhost:3005/auth/api/login', {
        method : 'POST',
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify({
            username,
            password
        })
    });
    const result = await response.json();

    return result;
}