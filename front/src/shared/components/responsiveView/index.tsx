import { useView } from '@/shared/hooks';

export function ResponsiveView({ mobile, desktop }: { mobile: React.ReactNode; desktop: React.ReactNode }) {
  const view = useView();

  return view === 'mobile' ? mobile : desktop;
}
