import { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Widget, addResponseMessage } from 'react-chat-widget';
import './App.css';
import 'react-chat-widget/lib/styles.css';
import { Configuration, OpenAIApi } from "openai";
import constants from './component/constant';
import Message from './component/message';

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

function App() {
  useEffect(() => {
    addResponseMessage('Welcome to this awesome chat!');
  }, []);

  const [message, setMessage] = useState(
    new Message(constants)
  );

  const handleNewUserMessage = async (newMessage) => {
    let correction = new Promise((resolve) => resolve(newMessage));
    correction.then(async (correction) => {
      const prompt = message.get_prompt(correction).trim();

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        stop: constants["USER_PREFIX"].trim(),
        max_tokens: constants["MAX_TOKENS"],
        frequency_penalty: constants["FREQUENCY_PENALTY"],
        presence_penalty: constants["PRESENCE_PENALTY"],
      });
      const random = Math.floor(Math.random() * response.data.choices.length);
      const resMessage = response.data.choices[random].text
      message.set_completion(resMessage);
      addResponseMessage(resMessage);
    })
  };

  const getCustomlauncher = (handleToggle) => {
    handleToggle();
  }

  return (
    <div className="App">
      <h1>Home Assignment for Vistendo</h1>
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={logo}
        title="Ask me everything"
        subtitle="ChatGPT 3"
        Dialog={true}
      />
    </div>
  );
}

export default App;
