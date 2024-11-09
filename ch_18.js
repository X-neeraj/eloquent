
const url = "https://eloquentjavascript.net/author";

async function fetchContent(format) {
    try {
        const response = await fetch(url, {
            headers: { Accept: format }
        })

        const contentType = response.headers.get("Content-Type")
        console.log(`Requested format: ${format}`)
        console.log(`Content-Type received: ${contentType}`)

        if (format === "application/json") {
            const json = await response.json()
            console.log("Response JSON:", json)
        } else {
            const text = await response.text()
            console.log("Response Text:", text)
        }

        console.log("Status Code:", response.status)
        console.log("---------")
    } catch (error) {
        console.error(`Error fetching ${format}:`, error)
    }
}

fetchContent("text/plain")
fetchContent("text/html")
fetchContent("application/json")
fetchContent("application/rainbows+unicorns") 
