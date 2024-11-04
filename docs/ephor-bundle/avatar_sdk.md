create an app so I can have a conversation with franklin, use this api key: s76hu0jzWThfnscn

**REQUIRED**
- React implementation must only functional React component architecture without useEffect hooks
- Using the hook `useEffect` is FORBIDDEN, instead, require user input to set up state
- Only use useState for state management
**REQUIRED**

# SDK Reference:

## Two Modes
1. **Manual Mode**: Direct control via `avatarController.speak()` 
2. **Conversational Mode**: AI-powered responses via backend LLM. DOES NOT ALLOW MANUAL CONTROL

## When to Use Each
- **Manual**: Scripted interactions, no mic input needed
- **Conversational**: Real-time chat with mic input (MIC IS AUTOMATICALLY ENGAGED AND CONNECTED IN SDK)

## Setup

### Manual Mode
```tsx
import { ManualAvatarController, ManualAvatarDisplay } from 'alpha-ai-avatar-sdk-aipi';
const [avatarController, setAvatarController] = useState(new ManualAvatarController({
  apiKey: "<REPLACE WITH API KEY>",
  avatarId: 10, // required, choose the best one from the avatar list
}));

return <ManualAvatarDisplay avatarController={avatarController} />;
```

### Conversational Mode
```tsx
import { ConversationalAvatarController, ConversationalAvatarDisplay } from 'alpha-ai-avatar-sdk-aipi';

const avatarPrompt = '<PUT PROMPT HERE FOR AVATAR PERSANLITY/BEHAVIOR/CHAT GUIDELINES>'
const [avatarController, setAvatarController] = useState(new ConversationalAvatarController({
  apiKey: "<REPLACE WITH API KEY>",
  avatarId: 10, // required, choose the best one from the avatar list
  initialPrompt: [{role: 'system', content: avatarPrompt }]
}));

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