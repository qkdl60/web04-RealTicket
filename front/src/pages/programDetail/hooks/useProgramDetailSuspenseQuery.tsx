import { useParams } from 'react-router-dom';

import { CustomError } from '@/api/axios.ts';
import { getProgramsDetail } from '@/api/program.ts';

import { ProgramDetail } from '@/shared/types/data';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useProgramDetailSuspenseQuery = () => {
  const { programId } = useParams();
  const { data: programDetail } = useSuspenseQuery<ProgramDetail, CustomError>({
    queryKey: [`program`, programId],
    queryFn: getProgramsDetail(Number(programId)),
  });

  return {
    programDetail,
  };
};
