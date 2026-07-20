import { Moon, WalletCards } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-[82px] items-center justify-between bg-finance-bg px-8 pt-5">
      <WalletCards className="size-6 text-finance-primary" strokeWidth={2.4} />
      <h1 className="text-[22px] font-extrabold leading-none tracking-normal text-finance-text">
        Finanzas Personales
      </h1>
      <Moon className="size-6 text-finance-primary" strokeWidth={2.4} />
    </header>
  );
}
