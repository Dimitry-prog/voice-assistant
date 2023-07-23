import React, { FormEvent, ChangeEvent } from 'react';

interface FormProps {
  text: string;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Form: React.FC<FormProps> = ({ text, handleSubmit, handleChange }) => {
  return (
    <form className="m-5" onSubmit={handleSubmit}>
      <div className={`relative overflow-y-hidden h-20 outline-2 w-3/4 border-2 border-black/50`}>
        <textarea
          id="prompt-textarea"
          placeholder="Send a question"
          className="m-0 w-full h-full outline-none resize-none"
          value={text}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="submit" className="border-2 border-black/50 w-20">
        Answer
      </button>
    </form>
  );
};

export default Form;
