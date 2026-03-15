'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchInventory() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // This function waits 300ms after you stop typing to update the URL
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative mb-6">
      <input
        className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="Search by name or SKU..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
    </div>
  );
}