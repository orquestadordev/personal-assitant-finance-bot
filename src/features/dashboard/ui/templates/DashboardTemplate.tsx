import { DashboardView } from '../organisms/DashboardView';

export function DashboardTemplate() {
  return (
    <div className="max-w-[600px] mx-auto px-4 py-4">
      <header className="text-center py-5">
        <h1 className="text-2xl font-bold text-white">Finanzas Personales</h1>
        <p className="text-gray-500 text-sm mt-1">Dashboard</p>
      </header>
      <DashboardView />
    </div>
  );
}
