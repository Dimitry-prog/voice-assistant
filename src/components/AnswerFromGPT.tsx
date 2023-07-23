import { ChangeEvent, FormEvent, useState } from 'react';
import { generateChatCompletion } from '../utils/openAIApi';
import Form from './FormTextarea/FormTextarea';
import Answer from './Answer/Answer';

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

const AnswerFromGPT = () => {
  const [text, setText] = useState<string>(userText);
  const [isDataLoad, setIsDataLoad] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [lang, setLang] = useState<string>('russian');

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
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.8,
      max_tokens: 500,
    };

    generateChatCompletion(requestData)
      .then((data) => {
        if (data.choices && data.choices.length > 0) {
          const generatedText = data.choices[0].message.content;

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
      <Form text={text} handleSubmit={handleSubmit} handleChange={handleChange} />
      <Answer isDataLoad={isDataLoad} message={message} />
    </>
  );
};

export default AnswerFromGPT;
