// import { useAppSelector } from '../hooks/reduxHooks';
// import React from 'react';
//
// const AnswerFromGPT = () => {
//   const gptPrompt = useAppSelector((state) => state.prompt.gptPrompt);
//   const status = useAppSelector((state) => state.prompt.status);
//
//   return (
//     <div className="max-w-md text-center text-white/80">
//       {status === 'loading' ? (
//         <>Грузится ответ с OpenAI... (желательно прикрутить анимацию)</>
//       ) : (
//         <>{gptPrompt}</>
//       )}
//     </div>
//   );
// };
//
// export default AnswerFromGPT;
