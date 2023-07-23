import React, { useState, FormEvent, ChangeEvent } from 'react';
import Answer from './components/Answer/Answer';
import Form from './components/FormTextarea/FormTextarea';
import { generateChatCompletion } from './utils/openAIApi';

const userText = 'Привет';

interface IRequestData {
  model: string;
  messages: Array<{
    role: 'system' | 'user';
    content: string;
  }>;
  temperature: number;
  max_tokens: number;
}

function App() {
  const [text, setText] = useState<string>(userText); // Текст вопроса
  const [isDataLoad, setIsDataLoad] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(''); // Текст ответа
  const [lang, setLang] = useState<string>('russian'); // Меняет язык ответа

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setIsDataLoad(true);
    e.preventDefault();

    const requestData: IRequestData = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You will be asked a question, and your task is to generate an answer in ${lang}.`,
        }, // Сообщение для роли системы
        {
          role: 'user',
          content: text,
        }, // Сообщение для роли пользователя
      ],
      temperature: 0.8,
      max_tokens: 500,
    };

    generateChatCompletion(requestData)
      .then((data) => {
        if (data.choices && data.choices.length > 0) {
          const generatedText = data.choices[0].message.content;

          // Вывод сгенерированного текста на страницу
          setMessage(generatedText);
        } else {
          console.error('Некорректный ответ от сервера OpenAI:', data);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setIsDataLoad(false);
      });
  };
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Form text={text} handleSubmit={handleSubmit} handleChange={handleChange} />
      <Answer isDataLoad={isDataLoad} message={message} />
    </>
  );
}

export default App;
