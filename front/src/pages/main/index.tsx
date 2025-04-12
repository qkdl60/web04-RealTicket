import { Link } from 'react-router-dom';

import { CustomError } from '@/api/axios.ts';
import { getPrograms } from '@/api/program';

import type { Program } from '@/pages/main/ui/programCard';

import { ROUTE_URL } from '@/shared/const';
import { useSuspenseQuery } from '@tanstack/react-query';

import { ProgramCard } from './ui';

export const MainPage = () => {
  const { data: programs } = useSuspenseQuery<Program[], CustomError>({
    queryKey: ['programs'],
    queryFn: getPrograms,
  });

  return (
    <>
      <ul className="grid h-full w-full grid-cols-[repeat(4,200px)] grid-rows-[repeat(auto-fill,350px)] justify-between gap-y-6 pb-8 max-[960px]:grid-cols-[repeat(3,200px)] max-[720px]:grid-cols-[repeat(2,200px)] max-[480px]:grid-cols-[repeat(1,200px)] max-[480px]:justify-center">
        {programs.map((program) => (
          <li key={program.id}>
            <Link className="" to={ROUTE_URL.PROGRAM.PROGRAM_DETAIL(program.id)}>
              <ProgramCard {...program} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
