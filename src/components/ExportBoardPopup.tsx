import React from 'react';
import useEscape from '../hooks/useEscape';

import successIcon from '../images/successIcon.svg';
import noSuccessIcon from '../images/noSuccessIcon.svg';
import closePopup from '../images/closePopup.svg';

type ExportBoardPopupProps = {
  onClose: () => void;
  status: {
    isOpen: boolean;
    successful: boolean;
    text: string;
    link: string;
  };
};

const ExportBoardPopup: React.FC<ExportBoardPopupProps> = ({ onClose, status }) => {
  const handleClickOverlay = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEscape(onClose, status.isOpen);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 custom-info-tooltip ${
        status.isOpen ? 'opacity-100' : 'opacity-0 invisible'
      } transition-all duration-300 cursor-pointer z-50`}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs bg-white bg-opacity-100 rounded-lg relative p-8 box-border shadow-md cursor-default"
        onClick={handleClickOverlay}
      >
        <div
          className={`w-24 h-24 m-6 mx-auto bg-center bg-no-repeat bg-cover`}
          style={{
            backgroundImage: `url(${status.successful ? successIcon : noSuccessIcon})`,
          }}
        ></div>
        <h2 className="mb-6 text-2xl text-center">
          {status.successful ? 'Карточки успешно созданы' : 'Не удалось создать карточки'}
        </h2>
        <a href={status.link} target="_blank" rel="noreferrer" className="text-center text-green">
          {status.text}
        </a>
        <button
          type="button"
          className="absolute top-[-40px] right-[-40px] w-8 h-8 border-none bg-transparent bg-center bg-no-repeat bg-cover p-0 opacity-100 transition-all duration-300 ease-in"
          style={{
            backgroundImage: `url(${closePopup})`,
          }}
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default ExportBoardPopup;
