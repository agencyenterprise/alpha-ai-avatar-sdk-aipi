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