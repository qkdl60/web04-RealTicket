import { useEffect, useState } from 'react';

import { getCurrentViewport } from '@/shared/libs';

type View = 'mobile' | 'desktop';

export function useView() {
  const [view, setView] = useState<View>('desktop');
  useEffect(() => {
    const handleResize = () => {
      const currentView = getCurrentViewport();
      setView((prev) => {
        if (prev !== currentView) {
          return currentView;
        }
        return prev;
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return view;
}
