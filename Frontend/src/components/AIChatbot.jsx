import { useState } from "react"
import api from "../services/api"
import ReactMarkdown from "react-markdown"
import "../Style/AIChatbot.css"

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
{/* The Floating Action Button (FAB) */}
<button 
className={`chat-toggle ${open ? 'active' : ''}`} 
onClick={() => setOpen(!open)}
aria-label="Toggle Assistant"
>
{open ? "✕" : "💬"}
</button>

{open && (
<div className="chat-window">
{/* Header with Status Indicator */}
<div className="chat-header">
<div className="status-dot"></div>
<div className="header-info">
<span className="title">AI Assistant</span>
<span className="subtitle">Online & Grounded</span>
</div>
</div>

{/* Scrollable Message Thread */}
<div className="message-list">
{messages.length === 0 && (
<p className="chat-empty-state">How can I help you with your services today?</p>
)}
{messages.map((msg, index) => (
<div 
key={index} 
className={`msg-wrapper ${msg.role === "user" ? "user-row" : "ai-row"}`}
>
<div className="msg-bubble">
<ReactMarkdown>{msg.text}</ReactMarkdown>
</div>
</div>
))}
</div>

{/* Input Field Area */}
<div className="chat-footer">
<input
value={input}
onChange={(e) => setInput(e.target.value)}
onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
placeholder="Type a message..."
autoFocus
/>
<button className="btn-send-icon" onClick={sendMessage}>
<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
</svg>
</button>
</div>
</div>
)}
</>
);
};