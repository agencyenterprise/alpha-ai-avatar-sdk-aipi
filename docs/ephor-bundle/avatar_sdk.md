**REQUIRED**
- React implementation must only functional React component architecture without useEffect hooks
- Using the hook `useEffect` is FORBIDDEN, instead, require user input to set up state
- Only use useState for state management
**REQUIRED**

# SDK Reference:

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