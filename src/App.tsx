import Main from './components/Main';
import Logo from './components/Logo';
import { useAppDispatch } from './hooks/reduxHooks';
import { useEffect } from 'react';
import { createNotionCard } from './api/notionApi';
import { REQUEST_NOTION_CARD_DATA } from './utils/constants';

function App() {
  const dispatch = useAppDispatch();
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 30);
  const data = {
    role: 'Frontend',
    title: 'First try',
    date: {
      start: new Date().toString(),
      end: currentDate.toString(),
    },
  };

  useEffect(() => {
    dispatch(createNotionCard(REQUEST_NOTION_CARD_DATA(data)));
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Logo />
      <Main />
    </div>
  );
}

export default App;
