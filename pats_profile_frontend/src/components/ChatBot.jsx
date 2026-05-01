import { useState, useEffect, useRef } from 'react'

const getOrCreateToken = () => {
    let token = localStorage.getItem('chat_session_token')
    if (!token) {
        token = crypto.randomUUID()
        localStorage.setItem('chat_session_token', token)
    }
    return token
}

export default function ChatBot() {
    const bottomRef = useRef(null)

    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const token = getOrCreateToken()
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/chat/history?session_token=${token}`)                              
        .then(r => r.json())                                                                                           
        .then(data => setMessages(data))                                                                               
    }, [])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })                                                        
    }, [messages])
    
    const send = async () => {
        if (!input.trim() || loading) return
        const token = getOrCreateToken()
        const msg = { role: 'user', content: input }

        setMessages(prev => [...prev, msg])
        setInput('')
        setLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session_token: token, content: input })
            })
            const data = await res.json()
            setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
        } catch {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
        } finally {
            setLoading(false)
        }
    }

    return(
        <div className="flex flex-col h-[70vh]">                                                                           
            {/* Message list */}                                                                                             
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
            {messages.map((msg, i) => (                                                                                    
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>                    
                    <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed
                        ${msg.role === 'user'                                                                                    
                        ? 'header-gradient text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'}`}>                                                        
                        {msg.content}                                                                                            
                    </div>
                </div>                                                                                                       
            ))}                                               
            {loading && (
                <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-400 px-4 py-2 rounded-2xl rounded-bl-sm text-sm">                    
                    Thinking...
                </div>                                                                                                     
                </div>                                                                                                       
            )}
            <div ref={bottomRef} />                                                                                        
            </div>                                              

            {/* Input */}
            <div className="border-t border-gray-200 p-4 flex gap-2">
                <input                                                                                                         
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 
            focus:ring-indigo-300"                                                                                             
                    placeholder="Ask me anything..."                
                    value={input}                                                                                                
                    onChange={e => setInput(e.target.value)}        
                    onKeyDown={e => e.key === 'Enter' && send()}
                />                                                                                                             
                <button
                    onClick={send}                                                                                               
                    disabled={loading}                              
                    className="header-gradient text-white px-5 py-2 rounded-xl text-sm font-medium disabled:opacity-50"
                >                                                                                                              
                    Send
                </button>                                                                                                      
            </div>                                              
        </div>       
    )
}