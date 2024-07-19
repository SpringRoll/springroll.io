import { useState, JSX, useMemo } from 'react';
import { SpeechSynth } from 'springroll';
import clsx from 'clsx';
import styles from './styles.module.scss';
import CodeBlock from '@theme/CodeBlock';

/**
 * Speech Synth Component - Simple demo page showing off SpringRoll's speech synth module. Referenced in docs/Examples/speechsynth.mdx
 * @returns JSX.Element
 */
export default function SpeechSynthExample(): JSX.Element {

  const [speaker] = useState(new SpeechSynth({}));
  const [message, setMessage] = useState('');
  const [volume, setVolume] = useState(speaker.volume);
  const [pitch, setPitch] = useState(speaker.pitch);
  const [rate, setRate] = useState(speaker.rate);
  const [voice, setVoice] = useState(0);

  const codeExample = useMemo(
    () => `const speaker = new SpeechSynth({ \n  volume: ${volume
      }, \n  rate ${rate}, \n  pitch: ${pitch}, \n  voice: ${voice
      } \n}); \n\n speaker.say('${message}');`,
      [volume, rate, pitch, voice, message]
  );

  const totalVoices = speaker.voiceOptions.length || 0;

  // Input change handlers, they set the values on the SpeechSynth instance and update the displayed example
  const handleMessageChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };
  const handleVolumeChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newVolume = +e.currentTarget.value;
    setVolume(newVolume);
    speaker.volume = newVolume;
  };
  const handlePitchChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newPitch = +e.currentTarget.value;
    setPitch(newPitch);
    speaker.pitch = newPitch;
  };
  const handleRateChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newRate = +e.currentTarget.value;
    setRate(newRate);
    speaker.rate = newRate;
  };
  const handleVoiceChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newVoice = +e.currentTarget.value;
    setVoice(newVoice);
    speaker.setVoice(newVoice);
  };
  
  return (
    <section className={clsx('container', styles.speechSynthRoot)}>
      <div className='row'>
      <div className={clsx('col', styles.synth__controls)}>
        <label className={clsx('font-12 font', styles.synth__label)}>What to Say</label>
        <input className={clsx('--text font-16', styles.synth__input)} 
          onChange={handleMessageChange} 
        />
        <label className={clsx('font-12 font', styles.synth__label)}>Volume</label>
        <input className={clsx('font-16', styles.synth__input)} 
          color="accent" 
          onChange={handleVolumeChange} 
          value={volume} 
          min="0" 
          max="1" 
          step="0.1" 
          type="range" 
        />
        <label className={clsx('font-12 font', styles.synth__label)}>Rate</label>
        <input className={clsx('font-16', styles.synth__input)} 
          color="accent" 
          onChange={handleRateChange} 
          value={rate} 
          min="0.1" 
          max="10" 
          step="0.1" 
          type="range" 
        />
        <label className={clsx('font-12 font', styles.synth__label)}>Pitch</label>
        <input className={clsx('font-16', styles.synth__input)} 
          color="accent" 
          onChange={handlePitchChange} 
          value={pitch} 
          min="0" 
          max="2" 
          step="0.1" 
          type="range" 
        />
        <label className={clsx('font-12 font', styles.synth__label)}>Voice</label>
        <input className={clsx('font-16', styles.synth__input)} 
          color="accent" 
          onChange={handleVoiceChange} 
          value={voice}
          min="0" 
          max={totalVoices} 
          step="1" 
          type="range" 
        />
      </div>
      <div className={clsx('col', styles.synth__container)}>
        <CodeBlock>
          {codeExample}
        </CodeBlock>
        <button className="button button--primary" onClick={() => speaker.say(message)}>Speak</button>
      </div>
      </div>
    </section>
  );
}
