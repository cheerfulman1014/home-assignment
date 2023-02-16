import { useState } from 'react';
import './App.css';
import 'react-chat-widget/lib/styles.css';
import ChatBox from './component/ChatBox';

function App() {
  const [apiKey, setApiKey] = useState("");
  const [start, setStart] = useState(false);

  return (
    <div className="App">
      <h1>Home Assignment for Vistendo</h1>
      {
        start ? 
          <ChatBox apiKey={apiKey}/>
        :
        <>
          <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Input here your api key"/>
          <input type="button" onClick={(e) => setStart(true)} value="Start"/>
        </>
      }
    </div>
  );
}

export default App;
