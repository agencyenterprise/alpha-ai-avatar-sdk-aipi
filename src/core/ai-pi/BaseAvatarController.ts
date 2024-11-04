import { AvatarClient, AvatarClientConfig } from 'alpha-ai-avatar-sdk-js';
import avatars from '../../assets/avatars.json';

export class BaseAvatarController {
  public avatarClient: AvatarClient;

  constructor(config: AvatarClientConfig) {
    if (!config.initialPrompt?.length && config.avatarId) {
      const prompt = this.getAvatarPrompt(config.avatarId);

      if (prompt) {
        config.initialPrompt = [
          {
            role: 'system',
            content: prompt,
          },
        ];
      }
    }

    this.avatarClient = new AvatarClient(config);
  }

  stopSpeaking() {
    this.avatarClient.stop();
  }

  async connect(
    videoElement: HTMLVideoElement,
    audioElement: HTMLAudioElement,
  ) {
    this.avatarClient.init(
      {
        videoElement,
      },
      audioElement,
    );

    let canAutoPlay = false;

    try {
      await audioElement.play();
      canAutoPlay = true;
    } catch (error) {
      console.error('Error playing audio:', error);
    }

    await this.avatarClient.connect(undefined, {
      adaptiveStream: false,
    });

    if (!canAutoPlay) {
      this.waitUserGestureToPlayAudio(audioElement);
    }
  }

  waitUserGestureToPlayAudio(audioElement: HTMLAudioElement) {
    const interactionEvents = [
      'click',
      'scroll',
      'keydown',
      'touchstart',
      'mousemove',
      'touchmove',
      'touchend',
    ];

    const enableAudio = () => {
      audioElement.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    };

    interactionEvents.forEach((eventType) => {
      document.addEventListener(eventType, enableAudio, {
        once: true,
        passive: true,
      });
    });
  }

  async getAvatars() {
    return this.avatarClient.getAvatars();
  }

  switchAvatar(avatarId: number) {
    const prompt = this.getAvatarPrompt(avatarId);

    if (prompt) {
      this.avatarClient.setMessagesHistory([
        {
          role: 'system',
          content: prompt,
        },
      ]);
    }

    this.avatarClient.switchAvatar(avatarId);
  }

  setConversationHistory(
    messages: {
      role: string;
      content: string;
    }[],
  ) {
    this.avatarClient.setMessagesHistory(messages);
  }

  disconnect() {
    this.avatarClient.disconnect();
  }

  getAvatarPrompt(avatarId: number) {
    return avatars.find((avatar) => avatar.avatarId === avatarId)?.prompt;
  }
}
