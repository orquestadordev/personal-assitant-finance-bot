'use client';

import type { ComponentType } from 'react';
import { Banknote, ChartPie, Grid2X2, type LucideIcon } from 'lucide-react';

export interface TabItem {
  key: string;
  label: string;
  icon?: LucideIcon | ComponentType<{ className?: string; strokeWidth?: number }>;
}

interface TabNavigationProps {
  tabs: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
}

export function TabNavigation({ tabs, activeKey, onChange }: TabNavigationProps) {
  const fallbackIcons = [Grid2X2, Banknote, ChartPie];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[430px] px-4 pb-4">
      <div className="grid h-[88px] grid-cols-3 rounded-t-card bg-finance-nav/95 px-5 shadow-nav ring-1 ring-finance-stroke/45 backdrop-blur">
        {tabs.map((tab, index) => {
          const Icon = tab.icon ?? fallbackIcons[index] ?? Grid2X2;
          const isActive = activeKey === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={`relative flex flex-col items-center justify-center gap-1.5 text-[13px] font-extrabold transition
                ${isActive
                  ? 'text-finance-primary'
                  : 'text-finance-secondary hover:text-finance-text'
                }`}
            >
              <Icon className="size-7" strokeWidth={2.25} />
              <span>{tab.label}</span>
              <span
                className={`absolute bottom-2 h-0.5 w-8 rounded-pill bg-finance-primary transition-opacity ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
