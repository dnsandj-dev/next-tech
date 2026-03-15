
import React from 'react';

type VendorCardProps = {
  name: string;
  category: string;
  reliability: number;
  activePOs: number; // Added per requirement
  status: string;    // Added per requirement
  alert?: string;    // Added per requirement (optional)
  contact?: string;
  email?: string;
};

export default function VendorCard({
  name,
  category,
  reliability,
  activePOs,
  status,
  alert,
  contact,
  email,
}: VendorCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-3 flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{category}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          status === 'Operational' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
        }`}>
          {status}
        </span>
      </div>

      <div className="space-y-1 mb-3">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Reliability:</span> {reliability}/5
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Active POs:</span> <span className="font-mono font-bold">{activePOs}</span>
        </p>
      </div>

      {alert && (
        <div className="mb-3 p-2 bg-red-50 border border-red-100 rounded-lg text-[11px] text-red-600 font-medium">
          ⚠️ {alert}
        </div>
      )}

      {(contact || email) && (
        <div className="pt-3 border-t border-gray-100 space-y-1">
          {contact && (
            <p className="text-xs text-gray-600">
              <span className="font-medium text-gray-900">Contact:</span> {contact}
            </p>
          )}
          {email && (
            <p className="text-xs text-gray-600">
              <span className="font-medium text-gray-900">Email:</span> {email}
            </p>
          )}
        </div>
      )}
    </div>
  );
}