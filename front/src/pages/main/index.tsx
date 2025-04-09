import { Link } from 'react-router-dom';

import { CustomError } from '@/api/axios.ts';
import { getPrograms } from '@/api/program';

import type { Program } from '@/pages/main/ui/programCard';

import { ROUTE_URL } from '@/shared/const';
import { useSuspenseQuery } from '@tanstack/react-query';

import { ProgramCard } from './ui';

//TODO 반응형 레이아웃 적용
export const MainPage = () => {
  const { data: programs } = useSuspenseQuery<Program[], CustomError>({
    queryKey: ['programs'],
    queryFn: getPrograms,
  });

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
};
