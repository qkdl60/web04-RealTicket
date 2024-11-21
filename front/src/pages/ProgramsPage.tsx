import { Link } from 'react-router-dom';

import { getPrograms } from '@/api/program';

import { useSuspenseQuery } from '@tanstack/react-query';

//TODO 지연로딩,  로딩 skeleton 적용, scrollbar 관리(나타나면서 화면을 밀어버린다 ), queryKey 관리 필요
export default function ProgramsPage() {
  const { data } = useSuspenseQuery({ queryKey: ['programs'], queryFn: getPrograms });
  console.log(data);
  //현재 데이터가 없어서 mock 대체
  return (
    <ul className="mx-auto grid grid-cols-5 gap-6">
      {programs.map((program) => (
        <li key={program.id}>
          <Link to={`/programs/1`}>
            <ProgramCard {...program} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

interface IProgram {
  id: number;
  name: string;
  genre: string;
  place: {
    id: number;
    name: string;
  };
  profileUrl: string;
  actors: string;
}
const ProgramCard = ({
  name,
  profileUrl,
  actors,
}: Pick<IProgram, 'actors' | 'id' | 'name' | 'profileUrl'>) => {
  return (
    <div className="flex w-[200px] flex-col rounded border-2 p-4 hover:border-surface">
      <img className="object-con flex-grow object-cover" width={200} height={300} src={profileUrl} />
      <div className="flex flex-col gap-1 text-center">
        <div className="truncate text-display1 text-typo">{name}</div>
        <div className="text-caption1">{actors}</div>
      </div>
    </div>
  );
};

const programs = [
  {
    id: 1,
    name: 'The Phantom of the Opera - Original actors',
    genre: '뮤지컬',
    place: '예술의전당 오페라극장, 서울',
    profileUrl: 'https://picsum.photos/200/300?random=1',
    actors: '김철수, 박영희',
  },
  {
    id: 2,
    name: 'BTS World Tour: The Symphony Edition',
    genre: '콘서트',
    place: '서울월드컵경기장, 서울',
    profileUrl: 'https://picsum.photos/200/300?random=2',
    actors: '이민호, 최수진',
  },
  {
    id: 3,
    name: 'Cats - Korean Revival',
    genre: '공연',
    place: '부산 드림씨어터, 부산',
    profileUrl: 'https://picsum.photos/200/300?random=3',
    actors: '정우성, 한효주',
  },
  {
    id: 4,
    name: 'Les Misérables - The History Live',
    genre: '뮤지컬',
    place: '대구 오페라하우스, 대구',
    profileUrl: 'https://picsum.photos/200/300?random=4',
    actors: '박영희, 김철수',
  },
  {
    id: 5,
    name: 'IU - Dreaming with Music',
    genre: '콘서트',
    place: '인천 문학월드컵경기장, 인천',
    profileUrl: 'https://picsum.photos/200/300?random=5',
    actors: '최수진, 이민호',
  },
  {
    id: 6,
    name: 'The Nutcracker Ballet Special',
    genre: '공연',
    place: '광주 문화예술회관 대극장, 광주',
    profileUrl: 'https://picsum.photos/200/300?random=6',
    actors: '한효주, 정우성',
  },
  {
    id: 7,
    name: 'Beethoven Symphony No.9',
    genre: '뮤지컬',
    place: '예술의전당 콘서트홀, 서울',
    profileUrl: 'https://picsum.photos/200/300?random=7',
    actors: '김철수, 이민호',
  },
  {
    id: 8,
    name: 'Park Hyo Shin LIVE: Soulful Night',
    genre: '콘서트',
    place: '부산 벡스코 오디토리움, 부산',
    profileUrl: 'https://picsum.photos/200/300?random=8',
    actors: '박영희, 최수진',
  },
  {
    id: 9,
    name: 'Nanta - The Korea Original Show',
    genre: '공연',
    place: '대구 엑스코 오디토리움, 대구',
    profileUrl: 'https://picsum.photos/200/300?random=9',
    actors: '정우성, 김철수',
  },
  {
    id: 10,
    name: 'Frozen: The Musical Korea Premiere',
    genre: '뮤지컬',
    place: '광주 유스퀘어문화관, 광주',
    profileUrl: 'https://picsum.photos/200/300?random=10',
    actors: '한효주, 박영희',
  },
];