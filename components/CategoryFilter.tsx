'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const CATEGORIES = ['All', 'Workstations', 'Networking', 'Peripherals'];

export default function CategoryFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilter = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category !== 'All') {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      className="p-3 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e) => handleFilter(e.target.value)}
      defaultValue={searchParams.get('category') || 'All'}
    >
      {CATEGORIES.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}