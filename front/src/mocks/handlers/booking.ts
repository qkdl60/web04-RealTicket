import { BASE_URL } from '@/api/axios.ts';

import { seats } from '@/mocks/data/seats.ts';
import { http } from 'msw';

const random = () => {
  const r = Math.random();
  return r > 0.5 ? true : false;
};
export const bookingHandler = [
  http.get(`${BASE_URL}/booking/seat/:id`, () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        const interval = setInterval(() => {
          seats[0][0] = random();
          const data = {
            seatStatus: seats,
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        }, 1000);

        // 클라이언트가 연결을 끊으면 interval 정리
        return () => {
          clearInterval(interval);
        };
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  }),
];
