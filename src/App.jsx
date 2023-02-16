import { useState } from 'react'
import './App.css'

function App() {
  
  const API_KEY = "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"

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  async function sendMessage(message) {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}` // reemplaza API_KEY con tu clave de API de ChatGPT
      },
      body: JSON.stringify({
        prompt: `User: ${message}\nAI:`,
        max_tokens: 60,
        temperature: 0.5,
        n: 1,
        stop: '\n'
      })
      
    });
    
    const data = await response.json();
    console.log(data)
    return data.choices[0].text.trim();
   
  }
 

  async function handleSubmit(event) {
    event.preventDefault();
    const message = inputValue;
    const response = await sendMessage(message);
    setMessages([...messages, { user: message, ai: response }]);
    setInputValue('');
  }

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <div>{message.user}</div>
            <div>{message.ai}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={event => setInputValue(event.target.value)} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App
