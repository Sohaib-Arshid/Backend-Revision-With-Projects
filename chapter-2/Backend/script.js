    import express from 'express'
    import dotenv from 'dotenv'
    const app = express()
    dotenv.config();

    app.get('/jokes', (req, res) => {
        const jokes = [
            {
                id: 1,
                title: "Programmer Life",
                content: "Why do programmers prefer dark mode? Because light attracts bugs."
            },
            {
                id: 2,
                title: "JavaScript Truth",
                content: "Why was the JavaScript developer sad? Because he didn’t know how to 'null' his feelings."
            },
            {
                id: 3,
                title: "Database Problem",
                content: "Why did the database administrator leave his wife? She had too many connections."
            },
            {
                id: 4,
                title: "Debugging Mood",
                content: "I told my code to stop working… but it just kept throwing exceptions."
            },
            {
                id: 5,
                title: "Frontend vs Backend",
                content: "Frontend and Backend got into a fight… Backend said: I handle logic, you just look pretty."
            },
            {
                id: 6,
                title: "Server Joke",
                content: "Why did the server go to therapy? It had too many requests."
            }
        ];
        res.send(jokes)
    })

    const port = process.env.PORT || 4000

    app.listen(port, (req, res) => {
        console.log(`server is listinting on http://localhost:${port}`);
    })