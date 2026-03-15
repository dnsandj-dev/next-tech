import { Hammer, Clock, ArrowRight } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-center">
      <div className="max-w-md">
        <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Hammer size={32} />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Optimizing the Engine</h1>
        <p className="text-slate-400 mb-8">
          We are currently deploying new procurement features and updating vendor price feeds. We'll be back online shortly.
        </p>
        
        <div className="bg-slate-800 rounded-xl p-4 flex items-center justify-between text-sm text-slate-300">
          <span className="flex items-center gap-2">
            <Clock size={16} className="text-indigo-400" /> Estimated Uptime:
          </span>
          <span className="font-mono text-white">18:00 EST</span>
        </div>

        <a href="mailto:support@nexus-it.com" className="mt-8 inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
          Need urgent procurement? Contact Support <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}