import { useEffect, useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import constants from './constant';
import Message from './message';
import logo from '../logo.svg';
import { Widget, addResponseMessage } from 'react-chat-widget';

const ChatBox = ({ apiKey }) => {
  const [message, setMessage] = useState(
    new Message(constants)
  );

  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);

  useEffect(() => {
    addResponseMessage('Welcome to this awesome chat!');
  }, []);
  
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

  return  <Widget
      handleNewUserMessage={handleNewUserMessage}
      profileAvatar={logo}
      title="Ask me everything"
      subtitle="ChatGPT 3"
      Dialog={true} />
}

export default ChatBox;