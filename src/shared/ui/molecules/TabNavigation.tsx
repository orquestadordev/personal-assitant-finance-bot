'use client';

interface Tab {
  key: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeKey: string;
  onChange: (key: string) => void;
}

export function TabNavigation({ tabs, activeKey, onChange }: TabNavigationProps) {
  return (
    <div className="flex border-b border-gray-800">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex-1 py-2.5 text-sm font-medium transition
            ${activeKey === tab.key
              ? 'text-white border-b-2 border-money-ars'
              : 'text-gray-500 hover:text-gray-300'
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
