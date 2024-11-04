import {
  Chat,
  ConversationalAvatarController,
  ConversationalAvatarDisplay,
} from 'alpha-ai-avatar-sdk-aipi';

export function App() {
  const conversationalontroller = new ConversationalAvatarController({
    apiKey: 'API_KEY',
    avatarId: 10, // Albert Einstein
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '20px',
      }}>
      <ConversationalAvatarDisplay avatarController={conversationalontroller} />
      <Chat avatarController={conversationalontroller} />
    </div>
  );
}
