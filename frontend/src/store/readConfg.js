export default async function readConfig() {
    const data = await fetch('/config.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(res=>res.json())
    return (data);
}