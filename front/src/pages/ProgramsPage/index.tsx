import { Link } from 'react-router-dom';

import { CustomError } from '@/api/axios.ts';
import { getPrograms } from '@/api/program';

import ProgramCard from '@/pages/ProgramsPage/ProgramCard.tsx';
import type { Program } from '@/pages/ProgramsPage/ProgramCard.tsx';

import { ROUTE_URL } from '@/constants/index.ts';
import { useSuspenseQuery } from '@tanstack/react-query';

//TODO 반응형 레이아웃 적용
export default function ProgramsPage() {
  const { data: programs } = useSuspenseQuery<Program[], CustomError>({
    queryKey: ['programs'],
    queryFn: getPrograms,
  });

  //현재 데이터가 없어서 mock 대체
  return (
    <ul className="grid grid-cols-[repeat(4,minmax(auto,_1fr))] gap-6 overflow-auto">
      {programs.map((program) => (
        <li key={program.id}>
          <Link to={ROUTE_URL.PROGRAM.PROGRAM_DETAIL(program.id)}>
            <ProgramCard {...program} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
