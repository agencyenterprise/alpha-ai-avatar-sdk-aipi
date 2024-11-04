create an app so I can have a conversation with franklin, use this api key: s76hu0jzWThfnscn

**REQUIRED**
- React implementation must only functional React component architecture without useEffect hooks
- Using the hook `useEffect` is FORBIDDEN, instead, require user input to set up state
- Only use useState for state management
**REQUIRED**

# SDK Reference:

### Manual Mode
```tsx
import { ManualAvatarController, ManualAvatarDisplay } from 'alpha-ai-avatar-sdk-aipi';

// REQUIRED TO HAVE SET FUNCTION.. [avatarController, setAvatarController] -- ERROR IF ONLY SINGULAR [avatarController] 
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

** IMPORTANT ** _Always_ set initial avatar in useState, not in other hooks.


# Choose the best avatar for the application:
## Available Avatars
"id", "avatar name"
8,"André-Marie Ampère"
9,"Nicolaus Copernicus"
10,"Albert Einstein"
11,"Susan B. Anthony"
12,"Benjamin Franklin"
14,"Thomas Jefferson"
15,"Johannes Kepler"
16,"Woodrow Wilson"
17,"Galileo Galilei"
18,"Michael Faraday"
19,"Niels Bohr"
23,"Genghis Khan"
24,"Socrates"
25,"Cleopatra"
26,"Julius Caesar"
27,"Louis Pasteur"
28,"Martin Luther"
29,"Queen Elizabeth I"
30,"William Shakespeare"
31,"Confucius"
32,"Charles Darwin"
33,"Nikola Tesla"
34,"Mahatma Gandhi"
35,"Mother Teresa"
36,"Martin Luther King Jr"
37,"Alan Turing"
38,"Muhammad Ali"
39,"Marie Curie"
40,"Ernest Hemingway"
41,"Isaac Newton"
42,"Jane Austen"
43,"Maya Angelou"
44,"Franklin D Roosevelt"
45,"Alexander Hamilton"
46,"Buddha"
47,"King George III"
48,"Oppenheimer"
49,"Henry Ford"
50,"Rockefeller"
51,"Abraham Lincoln"
52,"Theodore Roosevelt"
53,"John F Kennedy"
54,"Leonardo da Vinci"
55,"Alexander The Great"
56,"Mark Twain"
57,"George Washington"
58,"Nelson Mandela"
59,"Andrew Carnegie"
60,"Al Capone"
61,"Walt Disney"
62,"Alexander Graham Bell"
63,"Aristotle"
64,"Charles Dickens"
65,"Christopher Columbus"
66,"Fidel Castro"
67,"Galileo Galilei"
68,"Marco Polo"
69,"Marilyn Monroe"
70,"Michelangelo"
71,"Napoleon Bonaparte"
72,"Winston Churchill"
73, "Ancient Kahn"
75, "Nelson Mandela"
76, "Ernest Hemingway"
77, "Leonardo da Vinci"
78, "Henry Ford"
79, "Nikola Tesla"
80, "Marie Curie"
81, "Jane Austen"
82, "Maya Angelou"
83, "Walt Disney"
84, "Cleopatra"
85, "Genghis Khan"
86, "Genghis Khan"
87, "Isaac Newton"
88, "Galileo Galilei"
89, "Alan Turing"
90, "Marco Polo"
91, "Michelangelo"
92, "Thomas Edison"
93, "Amelia Earhart"
94, "Simone Biles"
95, "Cristiano Ronaldo"
96, "Eleven"
97, "Lebron James"
98, "Lucas Sinclar"
99, "Will Byers"
100, "MrBeast"
101, "Julius Caesar"
102, "Queen Elizabeth I"
103, "Patrick Mahomes"
105, "Andy"




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