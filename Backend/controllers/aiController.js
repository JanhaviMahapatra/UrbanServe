const axios = require("axios")

exports.serviceSuggestion = async (req, res) => {

try {

const { message } = req.body

const response = await axios.post(
"https://openrouter.ai/api/v1/chat/completions",
{
model: "deepseek/deepseek-chat",

messages: [
{
role: "system",
content:
"You are an assistant for a home service platform. Suggest the correct service like plumber, electrician, AC repair, cleaning."
},
{
role: "user",
content: message
}
]
},
{
headers: {
Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
"Content-Type": "application/json"
}
}
)

const reply = response.data.choices[0].message.content

res.json({ reply })

} catch (error) {

console.error(error.response?.data || error.message)

res.status(500).json({
error: "AI request failed"
})

}

}