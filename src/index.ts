import { Ai } from '@cloudflare/ai'
import { Hono } from 'hono'

const app = new Hono<{ Bindings: Env }>()

// GET /?query="How is your day today?"
app.get("/", async c => {
	const ai = new Ai(c.env.AI)

	const content = c.req.query("query") || 'What is the origin of the phrase Hello, World'

	const messages = [
      		{ role: "system", content: "You are a friendly assistant" },
      		{
        	role: "user",
        	content ,
     	 	},
    	];

	const inputs = { messages }

	const res = await ai.run("@cf/mistral/mistral-7b-instruct-v0.1", inputs)

	return c.json(res)
})

app.get('/hello', async c => {
	return c.text("Hello World!", 200);
})

export default app
