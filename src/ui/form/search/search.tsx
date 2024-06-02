import { forwardRef } from 'react';

import styles from './search.module.css';

const clearSrc = '/icons/close.svg';
const searchSrc = '/icons/search.svg';

interface SearchProps {
  searchClear: () => void;
}

export const Search = forwardRef<HTMLInputElement, SearchProps>(({ searchClear }: SearchProps, ref) => {
  return (
    <div className={styles.search}>
      <input
        ref={ref}
        className={styles.input}
        type="text"
        name="search"
        id="search"
        placeholder=""
        minLength={3}
        maxLength={18}
        required
      />
      <label className={styles.label} htmlFor="search">
        Search
      </label>
      <button type="button" className={styles.clear} onClick={searchClear}>
        <img src={clearSrc} alt="" />
      </button>
      <button type="submit" className={styles.submit}>
        <img src={searchSrc} alt="" />
      </button>
    </div>
  );
});
