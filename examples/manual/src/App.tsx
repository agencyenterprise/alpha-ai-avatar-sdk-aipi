import {
  ManualAvatarController,
  ManualAvatarDisplay,
} from 'alpha-ai-avatar-sdk-aipi';

export function App() {
  const manualController = new ManualAvatarController({
    apiKey: 'API_KEY',
    avatarId: 10,
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '20px',
      }}>
      <ManualAvatarDisplay avatarController={manualController} />
      <button
        onClick={() => manualController.speak(`Hello! This is a test message`)}>
        Speak
      </button>
    </div>
  );
}
