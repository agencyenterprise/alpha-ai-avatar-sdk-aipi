import { BaseAvatarController } from './BaseAvatarController';
import { AvatarClientConfig, SynthesizerOptions } from 'alpha-ai-avatar-sdk-js';

export class ConversationalAvatarController extends BaseAvatarController {
  constructor(config: AvatarClientConfig) {
    super({
      ...config,
      conversational: true,
    });
  }

  updateSystemMessage(message: string) {
    this.avatarClient.say(message);
  }

  updateConversationHistory(message: string) {
    this.avatarClient.setMessagesHistory([
      {
        role: 'system',
        content: message,
      },
    ]);
  }

  setMicrophoneMute(isMuted: boolean) {
    if (isMuted) {
      this.avatarClient.disableMicrophone();
    } else {
      this.avatarClient.enableMicrophone();
    }
  }

  override async connect(
    videoElement: HTMLVideoElement,
    audioElement: HTMLAudioElement,
  ): Promise<any> {
    this.avatarClient.init(
      {
        videoElement,
      },
      audioElement,
    );
    await this.avatarClient.connect(undefined, {
      adaptiveStream: false,
    });
    return new Promise((resolve) =>
      setTimeout(() => {
        this.avatarClient.enableMicrophone();
        resolve(null);
      }, 1500),
    );
  }

  speak(text: string, overrideVoice?: SynthesizerOptions) {
    this.avatarClient.say(text, overrideVoice);
  }

  sendTextResponse(text: string) {
    this.avatarClient.sendConversationalMessage(text);
  }
}
