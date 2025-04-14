import { MOBILE_MAX_SIZE } from '@/shared/const';

export const getCurrentViewport = () => {
  return window.innerWidth <= MOBILE_MAX_SIZE ? 'mobile' : 'desktop';
};
