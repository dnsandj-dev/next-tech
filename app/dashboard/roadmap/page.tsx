import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import InfrastructureRoadmap from "@/components/dashboard/InfrastructureRoadmap";

export default async function RoadmapPage() {
  // 1. Authenticate the user via Clerk
 const { userId: clerkId } = await auth();

  if (!clerkId) {
    redirect("/sign-in");
  }

  // 2. Fetch the Project and its Milestones from Prisma
  // We filter by the clerkId to ensure users only see their own data
  const projects = await prisma.project.findMany({
    where: {
      user: {
        clerkId: clerkId,
      },
    },
    include: {
      milestones: {
        orderBy: {
          id: 'asc', // Or add a 'createdAt' field to your schema
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // 3. Handle the "Empty State"
  if (projects.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900">No Roadmap Found</h2>
        <p className="text-slate-500">Your strategic IT roadmap is being drafted by our consultants.</p>
      </div>
    );
  }

  // 4. Pass the live data into the Component
  return (
    <div className="p-8">
      <InfrastructureRoadmap projects={projects} />
    </div>
  );
}