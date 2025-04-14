import { BASE_URL } from '@/api/axios.ts';

import { HttpResponse, http } from 'msw';

const TEMP_USER_DATA = {
  id: 3,
  loginId: 'guest-a66f90b3-28eb-4040-a29f-3cc8c5698e8d',
  targetEvent: null,
  userStatus: 'LOGIN',
};

export const userHandlers = [
  http.get(`${BASE_URL}/user/guest`, () => {
    return HttpResponse.json(TEMP_USER_DATA);
  }),
];
