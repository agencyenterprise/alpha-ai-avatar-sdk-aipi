# Avatar SDK Quick Reference

## Two Modes
1. **Manual Mode**: Direct control via `avatarController.speak()`
2. **Conversational Mode**: AI-powered responses via backend LLM

## When to Use Each
- **Manual**: Scripted interactions, no mic input needed
- **Conversational**: Real-time chat with mic input

## Setup

### Manual Mode
```tsx
const [avatarController] = useState(new ManualAvatarController({
  apiKey: process.env.REACT_APP_ALPHA_AVATAR_API_KEY,
  avatarId: 10, // required, choose the best one from the avatar list
}));

return <ManualAvatarDisplay avatarController={avatarController} />;
```

### Conversational Mode
```tsx
const avatarPrompt = '<PUT PROMPT HERE FOR AVATAR PERSANLITY/BEHAVIOR/CHAT GUIDELINES>'
const [avatarController] = useState(new ConversationalAvatarController({
  apiKey: process.env.REACT_APP_ALPHA_AVATAR_API_KEY,
  avatarId: 10, // required, choose the best one from the avatar list
  initialPrompt: [{role: 'system', content: avatarPrompt }]
}));

return <ConversationalAvatarDisplay avatarController={avatarController} />;
```

## Core Methods

### Manual Controller
- `speak(text: string)`
- `stopSpeaking()`

### Conversational Controller
- `setMicrophoneMute(isMuted: boolean)`
- `stopSpeaking()`

## Display Props
```tsx
{
  avatarController: AvatarController;
  height: number;
  width: number;
  className?: string;
}
```

## Chat Display
```tsx
<Chat
  avatarController={avatarController}
  avatarDisplayName="Albert Einstein"
  userDisplayName="You"
/>
```

### Changing Avatar On The Fly
```tsx
// Switch avatar (NEVER USED IN HOOK)
avatarController.switchAvatar(newAvatarId);

// Get avatar list
const avatars = await avatarController.getAvatars();
// Returns: Array<{ id: number, name: string, thumbnail: string }>
```

** IMPORTANT ** _Always_ set initial avatar in useState, not in other hooks.