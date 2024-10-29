# Avatar SDK Documentation

**IMPORTANT: FORBIDDEN** You cannot use React `useEffect`. This will break the avatar. Only use `useState`. Only develop your application in functional components.

## Install Package: 

```bash
npm install alpha-ai-avatar-sdk-aipi
# or
yarn add alpha-ai-avatar-sdk-aipi
```


## Introduction

This SDK allows developers to integrate both manual and conversational avatars into their applications. It supports real-time voice synthesis, background layers, and conversational features powered by a backend AI system. This guide will walk you through how to set up and use the SDK for both manual and conversational avatar control.

---

# Avatar Components & Use cases

### Manual Control Avatar vs Conversation Mode Avatar:

- The manually controlled avatar (`<ManualAvatarDisplay/>`) requires developers to directly use the `avatarController.speak()` command, giving full control over the avatar's speech.

- The conversational avatar (`<ConversationalAvatarDisplay />`) interacts with the AvatarService backend LLM. Developers can adjust the LLM that powers the avatar's speech through the conversation state via .setConversationHistory() but have no direct control over the avatar's speech output.

### Instructions for Choosing `<ManualAvatarDisplay/>`vs `<ConversationalAvatarDisplay/>`

#### **Select Manual Control when:**

- The application does not require user microphone input or the application requires custom logic for handling user voice input
- The application requires its own logic/controls for generating responses via LLM
- The application is a guided/scripted experience where the avatar's speech is predetermined and does not require dynamic responses to user input.
- The interaction requires precise control over the avatar's speech content and timing, and deviations from the script are not acceptable.
- The application involves delivering content that does not require input or responses from users, such as instructional videos or presentations.
- The deployment environment is public or semi-public where user input varies minimally and a set script is preferable for consistency, like in kiosks or exhibits.

#### **Select Conversational Mode when:**

- The user is chatting with their microphone input
- The interaction benefits from or requires dynamic responses that adapt to user inputs, questions, or behaviors in real-time.
- The use case involves engaging users in a dialogue where the avatar needs to interpret and respond to free-form user input, as in customer support or educational applications.
- The application aims to provide a highly interactive user experience that mimics human-like conversational abilities, suitable for roles like virtual assistants or interactive storytellers.

---

## Required Manual Control Setup

### Basic Setup of Manual Controller & Display:

- **Required `ManualAvatarController()`** initilized using `useState`.

- **Required `<ManualAvatarDisplay/>`**: Pass the avatar controller to the AvatarDisplay component as a prop.

```tsx
import { ManualAvatarController, ManualAvatarDisplay } from 'alpha-ai-avatar-sdk-aipi';
const App = () => {
    // note: DO NOT USE `setAvatarController`, you must instantiate it here.
    const [avatarController, setAvatarController] = useState(new ManualAvatarController({apiKey: "XX__YOUR_AVATAR_API_KEY__XX"}));


    // ... application code  ...

    return (
            // .. UI components ..
        <ManualAvatarDisplay
            avatarController={avatarController}
            /* All other props are OPTIONAL, start simple and add customization as needed */
        />
        // .. UI components ..
    )
```

## Required Conversational Mode Setup

### Basic Setup of Conversational Controller & Display:

- **Required `ConversationalAvatarController()`** initilized using `useState`.

- **Required `<ConversationalAvatar/>`**: Pass the avatar controller to the <ConversationalAvatar /> component as a prop.

```tsx
import { ConversationalAvatarController, ConversationalAvatarDisplay } from 'alpha-ai-avatar-sdk-aipi';
const App = () => {

    // note: DO NOT USE `setAvatarController`, you must instantiate ManualAvatarController with useState for it to work properly
    const [avatarController, setAvatarController] =  useState(new ConversationalAvatarController({
        apiKey: "XX__YOUR_AVATAR_API_KEY__XX",
        initialPrompt: [
            {
                role: 'system',
                content: 'Act like Albert Einstein',
            },
        ],
        // avatarId: <Number> (Optional). This will be used if you need to connect to a specific avatar. Only use this if specificly asked to use a certain avatar.
    }));

    // ... application code  ...

    return (
            // .. UI components ..
        <ConversationalAvatarDisplay
            avatarController={avatarController}
            /* All other props are OPTIONAL, start simple and add customization as needed */
        />
        // .. UI components ..
    )
```

# Controller & Display Properties

## Avatar Controller

### Initialization Configurations

```tsx
interface BaseControllerConfig {
  apiKey: string;
}

// new ManualAvatarController(config: ManualAvatarConfig);
interface ManualAvatarConfig extends BaseControllerConfig {}

// new ConversationalAvatarController(config: ConversationControllerConfig);
interface ConversationControllerConfig extends BaseControllerConfig {
  initialConversationConfig: {
    systemMessage: string;
    conversationHistory: { text: string; speaker: 'assistant' | 'user' }[];
  };
}
```

### Controller Methods

```tsx
interface BaseAvatarController {
  stopSpeaking: () => void;
}

interface ManualAvatarController extends BaseAvatarControllerProps {
  speak: (text: string, overrideVoice?: VoiceConfig) => void;
}

interface ConversationalAvatarController extends BaseControllerConfig {
  setMicrophoneMute: (isMuted: boolean) => void;
  sendTextResponse: (text: string) => void;
}
```

## Avatar Display

```tsx
interface BaseAvatarDisplayProps {
  avatarController: AvatarController;
  height: number;
  width: number;
  className?: string; // optional
}

interface ConversationalAvatarDisplayProps extends BaseAvatarDisplayProps {}
interface ManualAvatarDisplayProps extends BaseAvatarDisplayProps {}

### Using Chat to display messages from conversational mode

```tsx
import { Chat } from 'alpha-ai-avatar-sdk-aipi';

<Chat
  avatarController={avatarController}
  avatarDisplayName='Albert Einstein' // can be anything
  userDisplayName='You'
/>;
```

## Get List of Available Avatar ID / Name / Thumbnail

If the user wants to control which avatar they want to use, you can create a UI using a list of avatars by using the `getAvatars()` async function to retrieve a list of all available avatars in the system.

```typescript
const avatars = await avatarController.getAvatars();
// returns Array<{ id: number, name: string, thumbnail: string }>
```

