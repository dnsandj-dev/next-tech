import React from 'react';
import { Calendar, CheckCircle2, Circle, Rocket, Wrench } from 'lucide-react';
import { ProjectStatus } from '@prisma/client'; 

// --- TYPES ---
interface Milestone {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface Project {
  id: string;
  name: string;
  status: ProjectStatus; 
  createdAt: Date; 
  description?: string | null;
  targetDate?: Date | null;
  milestones?: Milestone[];
}

interface InfrastructureRoadmapProps {
  projects: Project[];
}

interface RoadmapSectionProps {
  title: string;
  status: 'IN_PROGRESS' | 'PLANNING' | 'COMPLETED'; 
  date: string;
  icon: React.ReactNode;
  milestones: Milestone[];
}

// --- MAIN COMPONENT ---
const InfrastructureRoadmap = ({ projects }: InfrastructureRoadmapProps) => {
  return (
    <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Strategic Roadmap</h2>
          <p className="text-slate-500">Your planned infrastructure upgrades and procurement phases.</p>
        </div>
      </header>

      <div className="space-y-12 relative">
        <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-100"></div>

        <RoadmapSection 
          title="Q2 2026: Security Hardening" 
          status="IN_PROGRESS"
          date="April - June"
          icon={<Wrench className="text-white" size={18} />}
          milestones={[
            { id: "m1", title: "Procure Cisco Meraki Firewall Cluster", isCompleted: true },
            { id: "m2", title: "Standardize endpoint encryption", isCompleted: true },
            { id: "m3", title: "Deploy YubiKey 5C hardware tokens", isCompleted: false }
          ]}
        />

        <RoadmapSection 
          title="Q3 2026: Remote Fleet Refresh" 
          status="PLANNING"
          date="July - Sept"
          icon={<Rocket className="text-white" size={18} />}
          milestones={[
            { id: "m4", title: "Audit 2-year-old laptop inventory", isCompleted: false },
            { id: "m5", title: "Bulk buy 15x MacBook Pro M3 units", isCompleted: false },
            { id: "m6", title: "Global logistics & imaging setup", isCompleted: false }
          ]}
        />
      </div>
    </div>
  );
};

// --- HELPER COMPONENT ---
function RoadmapSection({ title, status, date, icon, milestones }: RoadmapSectionProps) {
  return (
    <div className="relative pl-12">
      <div className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-sm ${
        status === 'IN_PROGRESS' ? 'bg-indigo-600' : 'bg-slate-300'
      }`}>
        {icon}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className={`text-lg font-bold ${status === 'IN_PROGRESS' ? 'text-slate-900' : 'text-slate-500'}`}>
            {title}
          </h3>
          <p className="text-sm text-slate-400 flex items-center gap-1 mt-1">
            <Calendar size={14} /> {date}
          </p>
        </div>
        <span className={`text-[10px] uppercase font-black px-2 py-1 rounded tracking-widest w-fit ${
          status === 'IN_PROGRESS' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'
        }`}>
          {status.replace('_', ' ')}
        </span>
      </div>

      <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-3">
        {milestones.map((m) => (
          <div key={m.id} className="flex items-center gap-3 text-sm">
            {m.isCompleted ? (
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
            ) : (
              <Circle size={18} className="text-slate-300 shrink-0" />
            )}
            <span className={m.isCompleted ? 'text-slate-500 line-through' : 'text-slate-700 font-medium'}>
              {m.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfrastructureRoadmap;