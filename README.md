# Getting Started

Hello! 👋 This tutorial will help you get started with the **Avatar SDK for AIPI**.

## Table of Contents

- [Getting Started](#getting-started)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Available Options](#available-options)
    - [Integrating with React](#integrating-with-react)
  - [Plugins](#plugins)
  - [Examples](#examples)
  - [Documentation](#documentation)

## Installation

To install the package, run the following command:

```bash
npm i alpha-ai-avatar-sdk-aipi
```

## Usage

### Available Options

- `apiKey` (required): Your API key for authentication.
- `baseUrl` (optional): Send `'https://staging.avatar.alpha.school'` to use the staging environment. Defaults to the production URL.
- `initialPrompt` (optional): This be included before the conversation, helping guide AI behavior and responses.
- `avatarId` (optional): This will be used if you need to connect to a specific avatar.

### Integrating with React

```javascript
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
      <p>Conversational mode example</p>
      <ConversationalAvatarDisplay avatarController={avatarController} />
      <Chat avatarController={avatarController} />
    </div>
  );
}
```

## Plugins

You can explore our comprehensive list of plugins supported within the Avatar SDK to streamline and accelerate your application development process. For detailed information about each plugin, refer to our [plugins documentation](docs/plugins).

## Examples

You can find a few examples in the [examples](examples/) folder of the library. These examples demonstrates how to configure and use the SDK in a React project.

## Documentation

For a detailed overview of all supported configurations, please refer to our comprehensive [documentation](docs/).

---

**Note:** Always ensure you keep your API key secure and do not expose it in publicly accessible code.

Congratulations! You have successfully integrated the Avatar SDK into your app. 🎉 Feel free to experiment and build more complex components with avatars.
