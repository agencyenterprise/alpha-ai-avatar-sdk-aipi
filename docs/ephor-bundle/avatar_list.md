## Set / Change Avatar:

- You must set the avatar in the `avatarController` before using the avatar in the UI.
- This is **REQUIRED** and must be done when the avatar controller is initilized in `setState`. DO NOT use any other hook to set the avatar, this will cause an error with the avatar controller's streaming functionality.


```typescript
const App = () => {
    // This is the same in both Manual and Conversational modes.
    const [avatarController, setAvatarController] = useState(new ManualAvatarController(
        {
            apiKey: process.env.REACT_APP_ALPHA_AVATAR_API_KEY,
            avatarId: 10 // REQUIRED PROP: Initial avatar id MUST be set here
        }
    ));

    return (
        <ManualAvatarDisplay
            avatarController={avatarController}
        />
    )
}
```

### Choosing an Avatar:
- If the user does not specify an avatar you can choose one from the list that best fits the request.
- If the user specifies an avatar that's not in the list, choose one that is closest to the request


#### Switching Avatars:
- If the application requires functionality to swap avatar from the one initially set in the `avatarController` you use the `switchAvatar()` function and provide the desired avatar's ID. 

```typescript
const switchAvatar = (avatarId: number) => {
    avatarController.switchAvatar(avatarId);
}
```

#### Avatar List in UI:
- If the application uses a dropdown select of all avatars, you can get a formatted list via the `getAvatars()` async function.

```typescript
const getAvatarList = async () => {
    const avatars = await avatarController.getAvatars();
    return avatars // Array<{ id: number, name: string, thumbnail: string }>
}
```

- Use the thumbnail when possible to provide good user experience and ui design.

## Available Avatars
"id","name","thumbnail"
8,"André-Marie Ampère","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/andre_marie_ampre.jpg"
9,"Nicolaus Copernicus","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/copernicus.jpg"
10,"Albert Einstein","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/albert_einstein.jpg"
11,"Susan B. Anthony","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/susan.png"
12,"Benjamin Franklin","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/benfran.jpg"
14,"Thomas Jefferson","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/jefferson.png"
15,"Johannes Kepler","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/kepler.png"
16,"Woodrow Wilson","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/new-woodrow.jpg"
17,"Galileo Galilei","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/galileo.png"
18,"Michael Faraday","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/faraday.png"
19,"Niels Bohr","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/bohr.jpg"
23,"Genghis Khan","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/genghis_khan.jpg"
24,"Socrates","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/socrates.jpg"
25,"Cleopatra","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/cleopatra.jpg"
26,"Julius Caesar","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/julius_caesar.jpg"
27,"Louis Pasteur","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/louis_pasteur.jpg"
28,"Martin Luther","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/martin_luther.jpg"
29,"Queen Elizabeth I","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/queen_elizabeth_i.jpg"
30,"William Shakespeare","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/william_shakespeare.jpg"
31,"Confucius","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/confucius.jpg"
32,"Charles Darwin","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/darwin.jpg"
33,"Nikola Tesla","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Nikola_Tesla.jpg"
34,"Mahatma Gandhi","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Mahatma_Gandhi.jpg"
35,"Mother Teresa","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Mother_Teresa.jpg"
36,"Martin Luther King Jr","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Martin_Luther_King_Jr.jpg"
37,"Alan Turing","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Alan_Turing.jpg"
38,"Muhammad Ali","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Muhammad_Ali.jpg"
39,"Marie Curie","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Marie_Curie.jpg"
40,"Ernest Hemingway","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Ernest_Hemingway.jpg"
41,"Isaac Newton","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Isaac_Newton.jpg"
42,"Jane Austen","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Jane_Austen.jpg"
43,"Maya Angelou","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Maya_Angelou.jpg"
44,"Franklin D Roosevelt","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/franklin_d_roosevelt.jpg"
45,"Alexander Hamilton","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Alexander_Hamilton.jpg"
46,"Buddha","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Buddha.jpg"
47,"King George III","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/King_George_III.jpg"
48,"Oppenheimer","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Oppenheimer.jpg"
49,"Henry Ford","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Henry_Ford.jpg"
50,"Rockefeller","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Rockefeller.jpg"
51,"Abraham Lincoln","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Abraham_Lincoln.jpg"
52,"Theodore Roosevelt","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Theodore_Roosevelt.jpg"
53,"John F Kennedy","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Kennedy.jpg"
54,"Leonardo da Vinci","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Leonardo_da_Vinci.jpg"
55,"Alexander The Great","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Alexander_The_Great.jpg"
56,"Mark Twain","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Mark_Twain.jpg"
57,"George Washington","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/George_Washington.jpg"
58,"Nelson Mandela","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Nelson_Mandela.jpg"
59,"Andrew Carnegie","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Andrew_Carnegie.jpg"
60,"Al Capone","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Al_Capone.jpg"
61,"Walt Disney","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/Walt_Disney.jpg"
62,"Alexander Graham Bell","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/teachtap__alexander_graham_bell.jpg"
63,"Aristotle","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/teachtap__aristotle.jpg"
64,"Charles Dickens","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/teachtap__charles_dickens.jpg"
65,"Christopher Columbus","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/teachtap__christopher_columbus.jpg"
66,"Fidel Castro","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/teachtap__fidel_castro.jpg"
67,"Galileo Galilei","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/teachtap__galileo_galilei.jpg"
68,"Marco Polo","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/teachtap__marco_polo.jpg"
69,"Marilyn Monroe","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/teachtap__marilyn_monroe.jpg"
70,"Michelangelo","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/teachtap__michelangelo.jpg"
71,"Napoleon Bonaparte","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/teachtap__napoleon_bonaparte.jpg"
72,"Winston Churchill","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/teachtap__winston_churchill.jpg"
<!-- 73,"Ancient Kahn","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/gs__kahn__ancient.png" -->
<!-- 74,"Marie Curie","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/mm_marie_curie.jpg"
75,"Nelson Mandela","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/mm_nelson_mandela.jpg"
76,"Ernest Hemingway","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/mm_hemingway.jpg"
77,"Leonardo da Vinci","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/mm_leonardo_da_vinci.jpg"
78,"Henry Ford","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/mm_henry_ford.jpg"
79,"Nikola Tesla","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/mm_tesla.jpg"
80,"Marie Curie","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/mm_marie_curie.jpg" -->
<!-- 81,"Jane Austen","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/mm_jane_austen.jpg"
82,"Maya Angelou","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/mm_maya_angelou.jpg"
83,"Walt Disney","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/mm_walt_disney.jpg" -->
<!-- 84,"Cleopatra","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/mm_cleopatra.jpg" -->
<!-- 85,"Thomas Edison","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/mm_thomas_edison.jpg" -->
<!-- 86,"Genghis Kahn","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/mm_kahn.jpg" -->
<!-- 87,"Isaac Newton","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com//mm_isaac_newton.jpg" -->
<!-- 88,"Galileo","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/mm_galileo.jpg"
89,"Alan Turing","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/mm_alan_turing.jpg" -->
<!-- 90,"Amelia Earhart","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/mm_amelia_earhart.jpg"
91,"Thomas Edison","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/mm_thomas_edison.jpg"
92,"Thomas Edison","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/mm_thomas_edison.jpg"
93,"Amelia Earhart","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/mm_amelia_earhart.jpg" -->
<!-- 94,"Simone Biles","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/debug_avatar_test_thumbnail.jpg"
95,"Cristiano Ronaldo","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/debug_avatar_test_thumbnail.jpg"
96,"Eleven","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/debug_avatar_test_thumbnail.jpg"
97,"Lebron James","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/debug_avatar_test_thumbnail.jpg"
98,"Lucas Sinclar","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/debug_avatar_test_thumbnail.jpg"
99,"Will Byers","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/debug_avatar_test_thumbnail.jpg"
100,"MrBeast","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/debug_avatar_test_thumbnail.jpg"
101,"Patrick Mahomes","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/debug_avatar_test_thumbnail.jpg"
103,"Patrick Mahomes","https://alpha-avatar-thumbnail.s3.us-west-2.amazonaws.com/debug_avatar_test_thumbnail.jpg" -->
