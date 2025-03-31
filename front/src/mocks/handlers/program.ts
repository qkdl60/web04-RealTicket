import { API } from '@/constants';
import { mockProgramDetails, mockPrograms } from '@/mocks/data/program.ts';
import { HttpResponse, http } from 'msw';

// Mock data

export const programHandlers = [
  // Get all programs
  http.get(`${API.PROGRAMS.GET_PROGRAMS}`, () => {
    return HttpResponse.json(mockPrograms);
  }),

  // Get program detail
  http.options('http://localhost/program/:id', () => {
    return new HttpResponse(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true', // credentials 허용
      },
    });
  }),
  http.get('http://localhost/program/:id', ({ params }) => {
    const id = Number(params.id);

    if (isNaN(id)) {
      return new HttpResponse(null, { status: 400 });
    }
    const program = mockProgramDetails.find((p) => p.id === id);
    if (!program) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(program, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true', // credentials 허용
      },
    });
  }),
];
