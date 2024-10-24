**IMPORTANT, FIRST ENSURE LIBRARY IS INSTALLED, ADD THIS TO <EXTRA_LIBRARIES>**
"""
<LIBRARY>
<NAME>alpha-ai-avatar-sdk-react</NAME>
<VERSION>latest</VERSION>
</LIBRARY>
"""

**IMPORTANT** Use of `useEffect` will CRASH the avatar, do not use this. Only use `useState` for the application code.

**IMPORTANT** Use the API Key Values in the documentation, DO NOT GENERATE CODE USING ENV VARIABLES.

# Avatar SDK Documentation

## Introduction

This SDK allows developers to integrate both manual and conversational avatars into their applications. It supports real-time voice synthesis, background layers, and conversational features powered by a backend AI system. This guide will walk you through how to set up and use the SDK for both manual and conversational avatar control.

Create a game of who wants to be a millionaire, where the avatar acts as the host reading the questions & responding appropriately when the user answers. Use GPT to generate questions for each level increasing in difficulty, also use GPT to know if the answer is correct and generate a response.

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
    const [avatarController, setAvatarController] = useState(new ManualAvatarController({apiKey: 'XX_AVATAR_API_KEY_XX'}));


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
        apiKey: 'XX_AVATAR_API_KEY_XX',
        initialPrompt: [
            {
                role: 'system',
                content: 'Act like Albert Einstein',
            },
        ],
        avatarId: Number // Optional. This will be used if you need to connect to a specific avatar.
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
```

### Using GPT Api for Content Generation

**DO NOT REQUEST JSON FORMAT, OR ANY FORMAT THAT REQUIRES PARSING. USE PLAIN TEXT RESPONSES ONLY.**

```tsx
// copy this function exactly, use when needed for content generation
const getGptApiResponse = async (promptRules: string, promptRequest: string) => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer XX_OPENAI_API_KEY_XX' },
        body: JSON.stringify({
            model: "gpt-4o", // USE THIS MODEL ID EXACTLY (gpt-4o)
            messages: [
            { role: "system", content: promptRules }
            { role: "user", content: promptRequest },
        ]})
    });

    const data = await response.json();
    return data.choices[0].message.content.trim()
};
```

### Using Chat to display messages from conversational mode

```tsx
import { Chat } from 'alpha-ai-avatar-sdk-aipi';

<Chat
  avatarController={avatarController}
  avatarDisplayName='XX_AVATAR_NAME_XX'
  userDisplayName='You'
/>;
```

## Getting Available Avatars

Use the `getAvatars()` async function to retrieve a list of all available avatars in the system.

```typescript
const avatars = await avatarController.getAvatars();
```

### Response Format

The function returns an array of avatar objects with the following properties:

```typescript
interface Avatar {
  id: number;
  name: string;
  thumbnail: string;
  updatedAt: string;
  createdAt: string;
  deletedAt: string | null;
  Applications: any | null;
  avatarVersions: any | null;
}
```

### Example Response

```json
[
  {
    "id": 2,
    "name": "Elle",
    "thumbnail": "https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/elle.jpg",
    "createdAt": "2024-04-23T14:50:20.065993Z",
    "updatedAt": "2024-04-23T14:50:20.065993Z",
    "deletedAt": null,
    "Applications": null,
    "avatarVersions": null
  }
]
```

## Switching Avatars

To change the current avatar, use the `switchAvatar()` function and provide the desired avatar's ID.

```typescript
avatarController.switchAvatar(avatarId);
```

### Parameters

- `avatarId` (number): The ID of the avatar to switch to. This ID can be obtained from the `getAvatars()` response.

### Example Usage

```typescript
// Get available avatars
const avatars = await avatarController.getAvatars();

// Switch to a specific avatar
avatarController.switchAvatar(2);
```

## Notes

- Always ensure the avatar ID exists before attempting to switch to it
- Invalid avatar IDs will result in an error
- Don't call the switchAvatar from a useEffect, only call it when you need to change the avatar.

## Avatar Categories and IDs

### Scientists & Inventors

| ID  | Name                  | Field                  |
| --- | --------------------- | ---------------------- |
| 80  | Marie Curie           | Physics/Chemistry      |
| 87  | Isaac Newton          | Physics                |
| 8   | André-Marie Ampère    | Electromagnetism       |
| 9   | Nicolaus Copernicus   | Astronomy              |
| 10  | Albert Einstein       | Physics                |
| 15  | Johannes Kepler       | Astronomy              |
| 88  | Galileo Galilei       | Physics/Astronomy      |
| 18  | Michael Faraday       | Electromagnetism       |
| 19  | Niels Bohr            | Physics                |
| 27  | Louis Pasteur         | Microbiology           |
| 32  | Charles Darwin        | Biology                |
| 79  | Nikola Tesla          | Electrical Engineering |
| 89  | Alan Turing           | Computer Science       |
| 48  | Oppenheimer           | Physics                |
| 62  | Alexander Graham Bell | Telecommunications     |
| 92  | Thomas Edison         | Electrical Engineering |

### Political Leaders & Presidents

| ID  | Name                 | Era/Role        |
| --- | -------------------- | --------------- |
| 51  | Abraham Lincoln      | US President    |
| 57  | George Washington    | US President    |
| 14  | Thomas Jefferson     | US President    |
| 16  | Woodrow Wilson       | US President    |
| 44  | Franklin D Roosevelt | US President    |
| 47  | King George III      | British Monarch |
| 52  | Theodore Roosevelt   | US President    |
| 53  | John F Kennedy       | US President    |
| 66  | Fidel Castro         | Cuban Leader    |
| 71  | Napoleon Bonaparte   | French Leader   |
| 72  | Winston Churchill    | British PM      |

### Athletes & Modern Celebrities

| ID  | Name              | Field           |
| --- | ----------------- | --------------- |
| 38  | Muhammad Ali      | Boxing          |
| 69  | Marilyn Monroe    | Entertainment   |
| 94  | Simone Biles      | Gymnastics      |
| 95  | Cristiano Ronaldo | Soccer          |
| 97  | Lebron James      | Basketball      |
| 100 | MrBeast           | Content Creator |
| 103 | Patrick Mahomes   | Football        |

### Writers & Artists

| ID  | Name                | Field       |
| --- | ------------------- | ----------- |
| 30  | William Shakespeare | Literature  |
| 76  | Ernest Hemingway    | Literature  |
| 81  | Jane Austen         | Literature  |
| 82  | Maya Angelou        | Literature  |
| 77  | Leonardo da Vinci   | Art/Science |
| 56  | Mark Twain          | Literature  |
| 64  | Charles Dickens     | Literature  |
| 70  | Michelangelo        | Art         |

### Philosophers & Religious Figures

| ID  | Name          | Era/Tradition      |
| --- | ------------- | ------------------ |
| 24  | Socrates      | Ancient Greek      |
| 28  | Martin Luther | Christianity       |
| 31  | Confucius     | Chinese Philosophy |
| 46  | Buddha        | Buddhism           |
| 63  | Aristotle     | Ancient Greek      |

### Civil Rights & Social Leaders

| ID  | Name                  | Cause               |
| --- | --------------------- | ------------------- |
| 11  | Susan B. Anthony      | Women's Rights      |
| 34  | Mahatma Gandhi        | Indian Independence |
| 35  | Mother Teresa         | Humanitarian        |
| 36  | Martin Luther King Jr | Civil Rights        |
| 75  | Nelson Mandela        | Anti-Apartheid      |

### Business & Industrial Leaders

| ID  | Name            | Industry           |
| --- | --------------- | ------------------ |
| 78  | Henry Ford      | Automotive         |
| 50  | Rockefeller     | Oil/Business       |
| 59  | Andrew Carnegie | Steel/Philanthropy |
| 83  | Walt Disney     | Entertainment      |

### Ancient Leaders & Explorers

| ID  | Name                 | Era/Region     |
| --- | -------------------- | -------------- |
| 86  | Genghis Khan         | Mongol Empire  |
| 84  | Cleopatra            | Ancient Egypt  |
| 26  | Julius Caesar        | Roman Empire   |
| 29  | Queen Elizabeth I    | Tudor England  |
| 55  | Alexander The Great  | Ancient Greece |
| 65  | Christopher Columbus | Exploration    |
| 68  | Marco Polo           | Exploration    |
| 73  | Ancient Kahn         | Mongol Empire  |

### Fictional & Entertainment Characters

| ID  | Name          | Source/Type     |
| --- | ------------- | --------------- |
| 96  | Eleven        | Stranger Things |
| 98  | Lucas Sinclar | Stranger Things |
| 99  | Will Byers    | Stranger Things |

### American Founding Fathers

| ID  | Name               | Role                     |
| --- | ------------------ | ------------------------ |
| 45  | Alexander Hamilton | First Treasury Secretary |
| 12  | Benjamin Franklin  | Diplomat/Inventor        |

### Aviation Pioneers

| ID  | Name           |
| --- | -------------- |
| 93  | Amelia Earhart |

### Crime Figures

| ID  | Name      |
| --- | --------- |
| 60  | Al Capone |

#### Implementation Example

```typescript
// Example configuration
const [avatarController, setAvatarController] = useState(
  new ConversationalAvatarController({
    apiKey: 'XX_AVATAR_API_KEY_XX',
    initialPrompt: [
      {
        role: 'system',
        content: 'Act like Albert Einstein',
      },
    ],
    avatarId: 10, // To talk to Albert Einstein
  }),
);
```
