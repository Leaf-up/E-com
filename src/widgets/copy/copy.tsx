import { useState } from 'react';

import styles from './copy.module.css';

import copyImg from '/icons/clipboard.svg';

let index = 0;

export const CopyInput = ({ text }: { text: string }) => {
  const [copyed, setCopyed] = useState(false);
  index += 1;

  const handleCopy = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopyed(true);
      setTimeout(() => setCopyed(false), 3000);
    }
  };

  return (
    <div className={styles.copy}>
      <input className={styles.copy__input} id={`copy_field${index}`} value={text} readOnly />
      <img className={styles.copy__btn} src={copyImg} alt="copy" title="copy" onClick={handleCopy} />
      {copyed && <div className={styles.copy__msg}>Copyed!</div>}
    </div>
  );
};
