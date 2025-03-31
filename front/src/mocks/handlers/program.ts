import { API } from '@/constants';
import { HttpResponse, http } from 'msw';

// Mock data
const mockPrograms = [
  {
    id: 1,
    name: '2024 봄맞이 클래식 콘서트',
    genre: 'CLASSIC',
    place: {
      id: 1,
      name: '서울 콘서트홀',
    },
    profileUrl: 'https://picsum.photos/200/300?random=1',
    actors: '서울 심포니 오케스트라',
  },
  {
    id: 2,
    name: '재즈 나이트',
    genre: 'JAZZ',
    place: {
      id: 2,
      name: '블루노트 재즈클럽',
    },
    profileUrl: 'https://picsum.photos/200/300?random=2',
    actors: '재즈 트리오',
  },
  {
    id: 3,
    name: 'K-POP 아이돌 팬미팅',
    genre: 'K-POP',
    place: {
      id: 3,
      name: 'KBS 콘서트홀',
    },
    profileUrl: 'https://picsum.photos/200/300?random=3',
    actors: '인기 아이돌 그룹',
  },
  {
    id: 4,
    name: '로컬 밴드 페스티벌',
    genre: 'ROCK',
    place: {
      id: 4,
      name: '홍대 클럽',
    },
    profileUrl: 'https://picsum.photos/200/300?random=4',
    actors: '다양한 로컬 밴드',
  },
  {
    id: 5,
    name: '월드뮤직 페스티벌',
    genre: 'WORLD',
    place: {
      id: 5,
      name: '올림픽공원',
    },
    profileUrl: 'https://picsum.photos/200/300?random=5',
    actors: '세계 각국의 음악가들',
  },
  {
    id: 6,
    name: '인디 포크 콘서트',
    genre: 'FOLK',
    place: {
      id: 6,
      name: '인디스페이스',
    },
    profileUrl: 'https://picsum.photos/200/300?random=6',
    actors: '인디 포크 가수들',
  },
  {
    id: 7,
    name: '힙합 쇼케이스',
    genre: 'HIPHOP',
    place: {
      id: 7,
      name: '힙합 스테이션',
    },
    profileUrl: 'https://picsum.photos/200/300?random=7',
    actors: '신진 힙합 아티스트들',
  },
  {
    id: 8,
    name: '클래식 발레 공연',
    genre: 'DANCE',
    place: {
      id: 8,
      name: '예술의전당',
    },
    profileUrl: 'https://picsum.photos/200/300?random=8',
    actors: '세계적인 발레단',
  },
  {
    id: 9,
    name: '어쿠스틱 라이브',
    genre: 'ACOUSTIC',
    place: {
      id: 9,
      name: '어쿠스틱 라운지',
    },
    profileUrl: 'https://picsum.photos/200/300?random=9',
    actors: '어쿠스틱 밴드',
  },
  {
    id: 10,
    name: '월드뮤직 콘서트',
    genre: 'WORLD',
    place: {
      id: 10,
      name: '세계문화센터',
    },
    profileUrl: 'https://picsum.photos/200/300?random=10',
    actors: '세계 전통 음악 연주자들',
  },
];

export const programHandlers = [
  // Get all programs
  http.get(`${API.PROGRAMS.GET_PROGRAMS}`, () => {
    return HttpResponse.json(mockPrograms);
  }),

  // Get program detail
  http.get('/programs/:id', ({ params }) => {
    const id = Number(params.id);
    if (isNaN(id)) {
      return new HttpResponse(null, { status: 400 });
    }

    const program = mockPrograms.find((p) => p.id === id);
    if (!program) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(program);
  }),
];
