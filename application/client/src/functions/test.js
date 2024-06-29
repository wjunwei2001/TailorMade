export const getTest = async () => {
    try {
        
        const res = await fetch('http://localhost:8000/test', {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        return await res.json();
    } catch (err) {

    }
};