# Avatar SDK Guide

## Introduction

This Avatar AI SDK allows developers to integrate both manual and conversational avatars into their applications. It supports real-time voice synthesis, background layers, and conversational features powered by a backend AI system. This guide will walk you through how to set up and use the SDK for both manual and conversational avatar control.

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

