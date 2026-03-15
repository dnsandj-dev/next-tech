import { prisma } from "@/lib/prisma";
import { Resend } from 'resend';
import { RoadmapUpdatedEmail } from '@/email/RoadmapUpdated';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function publishRoadmap(projectId: string) {
  // 1. Update Project in Prisma
  const project = await prisma.project.update({
    where: { id: projectId },
    data: { status: 'IN_PROGRESS' },
    include: { user: true }
  });

  // 2. Send the Notification
  if (project.user.email) {
    await resend.emails.send({
      from: 'next-tech <updates@yourstartup.com>',
      to: project.user.email,
      subject: `New Roadmap: ${project.name}`,
      react: <RoadmapUpdatedEmail 
  clientName={project.user.company || 'there'} 
  projectName={project.name}
  status={project.status} 
/>,
    });
  }
}