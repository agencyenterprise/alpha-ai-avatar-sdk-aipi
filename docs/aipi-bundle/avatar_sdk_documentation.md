**REQUIRED**
- React implementation must only functional React component architecture without useEffect hooks
- Using the hook `useEffect` is FORBIDDEN, instead, require user input to set up state
- Only use useState for state management
**REQUIRED**

# SDK Reference:

### Manual Mode
```tsx
import { ManualAvatarController, ManualAvatarDisplay } from 'alpha-ai-avatar-sdk-aipi';

const avatarController = new ManualAvatarController({
  apiKey: "<REPLACE WITH API KEY>",
  avatarId: 10, // required, choose the best one from the avatar list
});

return <ManualAvatarDisplay avatarController={avatarController} />;
```

### Conversational Mode
```tsx
import { ConversationalAvatarController, ConversationalAvatarDisplay } from 'alpha-ai-avatar-sdk-aipi';

const avatarPrompt = '<PUT PROMPT HERE FOR AVATAR PERSANLITY/BEHAVIOR/CHAT GUIDELINES>'
const avatarController = new ConversationalAvatarController({
  apiKey: "<REPLACE WITH API KEY>",
  avatarId: 10, // required, choose the best one from the avatar list
  initialPrompt: [{role: 'system', content: avatarPrompt }]
});

return <ConversationalAvatarDisplay avatarController={avatarController} />;
```

## Core Methods

### Manual Controller
- `avatarController.speak(text: string)`
- `avatarController.stopSpeaking()`

### Conversational Controller
- `avatarController.setMicrophoneMute(isMuted: boolean)`
- `avatarController.stopSpeaking()`

## Display Props
```tsx
{
  avatarController: AvatarController;
  height: number;
  width: number;
  className?: string;
}
```

### Changing Avatar On The Fly
```tsx
// Switch avatar (NEVER USED IN HOOK)
avatarController.switchAvatar(newAvatarId);

// Get avatar list
const avatars = await avatarController.getAvatars();
// Returns: Array<{ id: number, name: string, thumbnail: string }>
```

# Choose the best avatar for the application:
## Available Avatars

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




# Avatar SDK Guide

## Introduction

The Avatar AI SDK enables two distinct modes of avatar implementation: Manual Mode and Conversational Mode. The key to successful implementation is choosing the correct mode for your use case.

## Core Modes

### 1. Manual Mode (`ManualAvatarController()` & `<ManualAvatarDisplay/>`)
The default and most versatile implementation method. Use this for any scenario where you don't need real-time chat functionality.

**Key Features:**
- Direct control via `avatarController.speak()`
- Precise timing control
- Full customization of avatar responses
- No dependency on microphone input

**✅ REQUIRED for these use cases:**
- Pre-scripted content delivery
- Instructional/training materials
- Kiosk displays
- Marketing presentations
- Video content
- Custom LLM integration
- Public installations
- Any scenario not involving live chat

### 2. Conversational Mode (`ConversationalAvatarController` & `<ConversationalAvatarDisplay/>`)
ONLY use this mode when implementing a live chat interface where users speak directly to the avatar.

**Key Features:**
- Requires microphone input
- Automatic response generation
- Built-in LLM integration
- Real-time speech processing

**⚠️ ONLY use for:**
- Live chat applications where users speak to the avatar
- Voice-based customer service interfaces
- Interactive Q&A sessions requiring voice input

## Implementation Decision Tree

1. Does your application need to process live voice input from users?
   - NO → Use Manual Mode
   - YES → Continue to question 2

2. Is this specifically for a chat interface?
   - NO → Use Manual Mode
   - YES → Use Conversational Mode

## Common Mistakes to Avoid

❌ Don't use Conversational Mode for:
- Static content delivery
- Pre-scripted experiences
- Video productions
- Any scenario where you don't need live voice chat

✅ Always default to Manual Mode unless you specifically need live chat functionality with voice input.