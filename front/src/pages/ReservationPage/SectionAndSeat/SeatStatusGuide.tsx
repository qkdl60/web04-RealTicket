import Separator from '@/components/common/Separator.tsx';

type SeatStatus = {
  label: string;
  colorClass: string;
};

const SEAT_STATUS_MAP: Record<string, SeatStatus> = {
  available: {
    label: '선택 가능',
    colorClass: 'bg-primary',
  },
  selecting: {
    label: '선택 중',
    colorClass: 'bg-warning',
  },
  selected: {
    label: '선택 완료',
    colorClass: 'bg-success',
  },
  unavailable: {
    label: '선택 불가',
    colorClass: 'bg-surface-sub',
  },
} as const;

type StatusItemProps = {
  colorClass: string;
  label: string;
};

function StatusItem({ colorClass, label }: StatusItemProps) {
  return (
    <div className="flex items-center gap-4 text-display1 text-typo">
      <div className={`h-6 w-6 ${colorClass} rounded`} />
      {label}
    </div>
  );
}

export default function SeatStatusGuide() {
  return (
    <>
      <Separator direction="row" />
      <div className="flex justify-evenly">
        {Object.values(SEAT_STATUS_MAP).map(({ label, colorClass }) => (
          <StatusItem key={label} label={label} colorClass={colorClass} />
        ))}
      </div>
      <Separator direction="row" />
    </>
  );
}
