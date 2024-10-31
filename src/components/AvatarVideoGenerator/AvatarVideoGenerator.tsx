import '../style.css';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Upload, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AvatarClient } from 'alpha-ai-avatar-sdk-js';

const TIME_INTERVAL = 10000;

export type AvatarVideoGeneratorProps = {
  apiKey: string;
};

export const AvatarVideoGenerator = ({ apiKey }: AvatarVideoGeneratorProps) => {
  const [image, setImage] = useState<string>();
  const [text, setText] = useState('');
  const [voiceId, setVoiceId] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState<string | null>(null);
  const [jobId, setJobId] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('');

  const avatarClient = new AvatarClient({
    apiKey,
  });

  const loadingMessages: string[] = [
    'Initializing avatar processing...',
    'Analyzing image data...',
    'Generating speech synthesis...',
    'Creating animation sequences...',
    'Finalizing video rendering...',
  ];

  const handleImageSelect = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      if (file.type !== 'image/png') {
        setError('Only PNG images are allowed');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data =
          typeof reader.result === 'string' ? reader.result.split(',')[1] : '';
        setImage(base64Data);
        setPreviewUrl(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    let messageIndex = 0;
    let intervalId: NodeJS.Timeout;

    if (status === 'pending') {
      setLoadingMessage(loadingMessages[0] || '');
      intervalId = setInterval(() => {
        if (messageIndex < loadingMessages.length - 1) {
          messageIndex += 1;
          setLoadingMessage(loadingMessages[messageIndex] || '');
        } else {
          clearInterval(intervalId);
        }
      }, TIME_INTERVAL / 2);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setStatus('processing');
    setVideoUrl(null);
    if (!image || !text || !voiceId) {
      setError('Please fill all the fields');
      setStatus('idle');
      return;
    }

    try {
      const data: any = await avatarClient.generateAvatarVideo({
        image,
        text,
        voiceId,
      });
      setJobId(data.id);
      setStatus('pending');
    } catch (err: any) {
      setError(err.message);
      setStatus('error');
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (jobId && status === 'pending') {
      intervalId = setInterval(async () => {
        try {
          const data: any = await avatarClient.getAvatarVideoStatus(jobId);
          if (data.status === 'succeeded') {
            setStatus('completed');
            setVideoUrl(data.output);
            clearInterval(intervalId);
          } else if (data.status === 'failed' || data.status === 'canceled') {
            setError('Video generation failed');
            setStatus('error');
            clearInterval(intervalId);
          }
        } catch (err) {
          setError('Failed to fetch status');
          setStatus('error');
          clearInterval(intervalId);
        }
      }, TIME_INTERVAL);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [jobId, status]);

  return (
    <div className='container mx-auto p-4'>
      <Card className='max-w-2xl mx-auto'>
        <CardHeader>
          <CardTitle>Avatar Video Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <label className='block text-sm font-medium'>
                Avatar Image (PNG only)
              </label>
              <div className='flex items-center space-x-4'>
                <div className='flex-1'>
                  <div className='border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400'>
                    <input
                      type='file'
                      accept='image/png'
                      onChange={handleImageSelect}
                      className='hidden'
                      id='avatar-upload'
                    />
                    <label htmlFor='avatar-upload' className='cursor-pointer'>
                      <Upload className='mx-auto h-12 w-12 text-gray-400' />
                      <p className='mt-2 text-sm text-gray-600'>
                        Click to upload or drag and drop
                      </p>
                      <p className='mt-1 text-xs text-gray-500'>
                        PNG format only, max 5MB
                      </p>
                    </label>
                  </div>
                </div>
                {previewUrl && (
                  <div className='w-24 h-24'>
                    <img
                      src={previewUrl}
                      alt='Preview'
                      className='w-full h-full object-cover rounded-lg'
                    />
                  </div>
                )}
              </div>
            </div>

            <div className='space-y-2'>
              <label className='block text-sm font-medium'>Speech Text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className='w-full p-2 border rounded-md'
                rows={4}
                placeholder='Enter the text for the avatar to speak...'
              />
            </div>

            <div className='space-y-2'>
              <label className='block text-sm font-medium'>Voice ID</label>
              <input
                type='text'
                value={voiceId}
                onChange={(e) => setVoiceId(e.target.value)}
                className='w-full p-2 border rounded-md'
                placeholder='Enter the voice ID...'
              />
            </div>

            {error && (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type='submit'
              disabled={
                !image ||
                !text ||
                !voiceId ||
                status === 'processing' ||
                status === 'pending'
              }
              className='w-full'>
              {status === 'processing' || status === 'pending' ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  {status === 'processing'
                    ? 'Starting Generation...'
                    : loadingMessage}
                </>
              ) : (
                'Generate Video'
              )}
            </Button>
          </form>

          {status === 'completed' && videoUrl && (
            <div className='mt-6 space-y-4'>
              <Alert>
                <AlertDescription className='text-green-600'>
                  Video generated successfully!
                </AlertDescription>
              </Alert>
              <div className='aspect-video rounded-lg overflow-hidden bg-black'>
                <video
                  className='w-full h-full'
                  controls
                  autoPlay
                  src={videoUrl}>
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
