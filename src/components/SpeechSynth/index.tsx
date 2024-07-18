import { useState, JSX } from 'react';
import { SpeechSynth } from 'springroll';
import clsx from 'clsx';
import styles from './styles.module.scss';
import CodeBlock from '@theme/CodeBlock';

interface CodeExampleParams {
  newMessage?: string,
  newPitch?: number,
  newVolume?: number,
  newVoice?: number,
  newRate?: number,
}

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
  const [codeExample, setCodeExample] = useState(`const speaker = new SpeechSynth({ \n  volume: ${volume
      }, \n  rate ${rate}, \n  pitch: ${pitch}, \n  voice: ${voice
      } \n}); \n\n speaker.say('${message}');
      `);

  const totalVoices = speaker.voiceOptions.length || 0;

  // Updates the displayed code example. Because of how React updates state this requires 
  // updating the values manually rather than just relying on state
  const updateCodeExample = ({ newMessage, newPitch, newVolume, newRate, newVoice }: CodeExampleParams) => {
    const codeMessage = newMessage || newMessage === '' ? newMessage : message;
    setCodeExample(`const speaker = new SpeechSynth({ \n  volume: ${newVolume || volume 
      }, \n  rate ${newRate || rate}, \n  pitch: ${newPitch || pitch}, \n  voice: ${newVoice || voice
      } \n}); \n\n speaker.say('${codeMessage}');
      `);
  };

  // Input change handlers, they set the values on the SpeechSynth instance and update the displayed example
  const handleMessageChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newMessage = e.currentTarget.value;
    setMessage(newMessage);
    updateCodeExample({newMessage});
  };
  const handleVolumeChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newVolume = +e.currentTarget.value;
    setVolume(newVolume);
    speaker.volume = newVolume;
    updateCodeExample({newVolume});
  };
  const handlePitchChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newPitch = +e.currentTarget.value;
    setPitch(newPitch);
    speaker.pitch = newPitch;
    updateCodeExample({newPitch});
  };
  const handleRateChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newRate = +e.currentTarget.value;
    setRate(newRate);
    speaker.rate = newRate;
    updateCodeExample({newRate});
  };
  const handleVoiceChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newVoice = +e.currentTarget.value;
    setVoice(newVoice);
    speaker.setVoice(newVoice);
    updateCodeExample({newVoice});
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
