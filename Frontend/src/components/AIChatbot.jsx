import { useState } from "react"
import api from "../services/api"
import ReactMarkdown from "react-markdown"

export default function AIChatbot(){

const[open,setOpen]=useState(false)
const[messages,setMessages]=useState([])
const[input,setInput]=useState("")

const sendMessage=async()=>{
if(!input)return

const userMsg={role:"user",text:input}

setMessages((prev)=>[...prev,userMsg])
setInput("")

try{
const res=await api.post("/ai/service-suggestion",{
message:input
})

const aiMsg={role:"ai",text:res.data.reply}

setMessages((prev)=>[...prev,aiMsg])
}catch(err){
setMessages((prev)=>[
...prev,
{ role:"ai",text:"AI error occurred."}
])
}
}

return(
<>
<button
onClick={() => setOpen(!open)}
style={{
position: "fixed",
bottom: "20px",
right: "20px",
borderRadius: "50%",
width: "60px",
height: "60px",
fontSize: "20px"
}}
>
💬
</button>


{open && (

<div
style={{
position: "fixed",
bottom: "90px",
right: "20px",
width: "300px",
height: "400px",
background: "white",
border: "1px solid #ccc",
display: "flex",
flexDirection: "column"
}}
>

<div
style={{
padding: "10px",
borderBottom: "1px solid #ddd",
fontWeight: "bold"
}}
>
AI Assistant
</div>

<div
style={{
flex: 1,
overflowY: "auto",
padding: "10px"
}}
>

{messages.map((msg, index) => (

<div key={index}
style={{
textAlign: msg.role === "user" ? "right" : "left",
margin: "5px 0"
}}
>
<ReactMarkdown>{msg.text}</ReactMarkdown>  
</div>

))}

</div>

<div style={{ display: "flex" }}>

<input
value={input}
onChange={(e) => setInput(e.target.value)}
style={{ flex: 1 }}
placeholder="Ask something..."
/>

<button onClick={sendMessage}>
Send
</button>
</div>
</div>
)}
</>
)}