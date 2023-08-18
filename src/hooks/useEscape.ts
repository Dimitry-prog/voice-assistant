import { useEffect } from 'react';

export default function useEscape(callback: () => void, dependency: boolean) {
  useEffect(() => {
    if (dependency) {
      const onEscClose = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          callback();
        }
      };
      document.addEventListener('keyup', onEscClose);

      return () => {
        document.removeEventListener('keyup', onEscClose);
      };
    }
  }, [dependency, callback]);
}
