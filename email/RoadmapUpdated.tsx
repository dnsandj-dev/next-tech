import * as React from 'react';

interface RoadmapUpdatedEmailProps {
  projectName: string;
  clientName: string; 
  status: string;
}

export const RoadmapUpdatedEmail: React.FC<Readonly<RoadmapUpdatedEmailProps>> = ({
  projectName,
  status,
}) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px', border: '1px solid #eee', borderRadius: '10px' }}>
    <h1 style={{ color: '#333' }}>StudyUnlock Roadmap Update</h1>
    <p>The project <strong>{projectName}</strong> has been updated to: <strong>{status}</strong></p>
    <p>Log in to your dashboard to see the latest infrastructure changes.</p>
    <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />
    <footer style={{ fontSize: '12px', color: '#888' }}>
      This is an automated notification from your StudyUnlock Instance.
    </footer>
  </div>
);

export default RoadmapUpdatedEmail;
