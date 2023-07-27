import AnswerFromGPT from './components/AnswerFromGPT';
import RecordVoice from './components/RecordVoice';
import AnswerGptByVoice from './components/AnswerGPTByVoice';
import Main from './components/Main';

function App() {
  return (
    <div className="w-full h-screen grid gap-4 justify-items-center">
      <h1 className="text-3xl font-bold m-5 underline">Your Voice Assistant</h1>
      <Main />
      {/* <RecordVoice /> */}
      {/* <AnswerFromGPT /> */}
      {/* <AnswerGptByVoice /> */}
    </div>
  );
}

export default App;
