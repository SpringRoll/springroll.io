import { useState, JSX, useMemo, useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import CodeBlock from '@theme/CodeBlock';

/**
 * Speech Synth Component - Simple demo page showing off SpringRoll's speech synth module. Referenced in docs/Examples/speechsynth.mdx
 * @returns JSX.Element
 */
export default function SpeechSynthExample(): JSX.Element {

  const [speaker, setSpeaker] = useState(null);
  const [message, setMessage] = useState('');
  const [totalVoices, setTotalVoices] = useState(0);
  const [volume, setVolume] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [rate, setRate] = useState(0);
  const [voice, setVoice] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      import('springroll').then(({ SpeechSynth }) => {
        setSpeaker(new SpeechSynth({}));
      });
    }
  }, []);

  useEffect(() => {
    if(speaker){
      setTotalVoices(speaker.voiceOptions.length|| 0);
      setVolume(speaker.volume);
      setPitch(speaker.pitch);
      setRate(speaker.rate);
    }
  }, [speaker]);

  const codeExample = useMemo(
    () => `const speaker = new SpeechSynth({ \n  volume: ${volume
      }, \n  rate ${rate}, \n  pitch: ${pitch}, \n  voice: ${voice
      } \n}); \n\n speaker.say('${message}');`,
      [volume, rate, pitch, voice, message]
  );


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

  if (!speaker) {
    return <div>Loading speech synthesis...</div>;
  }
  
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
