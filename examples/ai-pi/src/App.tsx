import {
  ConversationalAvatarController,
  ConversationalAvatarDisplay,
  Chat,
} from 'alpha-ai-avatar-sdk-aipi';

const avatarController = new ConversationalAvatarController({
  apiKey: 'API_KEY',
  initialPrompt: [
    {
      role: 'system',
      content: 'Act like Albert Einstein',
    },
  ],
});

export function App() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'black',
        gap: '20px',
      }}>
      <p>conversational mode example</p>
      <ConversationalAvatarDisplay avatarController={avatarController} />
      <Chat avatarController={avatarController} />
    </div>
  );
}
