import AnswerFromGPT from './components/AnswerFromGPT';
import RecordVoice from './components/RecordVoice';
import AnswerGptByVoice from './components/AnswerGPTByVoice';

function App() {
  return (
    <div className="w-full h-screen grid gap-4 place-content-center justify-items-center bg-gray-700">
      <h1 className="text-3xl font-bold text-white/90 underline">Your Voice Assistant</h1>
      <RecordVoice />
      <AnswerFromGPT />
      <AnswerGptByVoice />
    </div>
  );
}

export default App;
