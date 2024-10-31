import { AvatarVideoGenerator } from 'alpha-ai-avatar-sdk-aipi';

export function App() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '20px',
      }}>
      <AvatarVideoGenerator apiKey='API_KEY' />
    </div>
  );
}
