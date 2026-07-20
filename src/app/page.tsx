import { DashboardTemplate } from '@/features/dashboard';

export default function Home() {
  const now = new Date();

  return (
    <DashboardTemplate
      initialRange={{
        year: now.getFullYear(),
        month: now.getMonth() + 1,
      }}
    />
  );
}
