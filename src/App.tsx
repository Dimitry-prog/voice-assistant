import RecordVoice from './components/RecordVoice';
import AnswerFromGPT from './components/AnswerFromGPT';

function App() {
  return (
    <div className="w-full h-screen grid gap-4 place-content-center justify-items-center bg-gray-700">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <RecordVoice />
      <AnswerFromGPT />
    </div>
  );
}

export default App;
