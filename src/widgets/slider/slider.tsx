import { cloneElement } from 'react';
import styles from './.module.css';

let counter = 1;

export default function Slider({ items, itemsToShow = 1 }: { items: JSX.Element[]; itemsToShow?: number }) {
  const length = Math.ceil(items.length / itemsToShow);
  counter += 1;

  const chunks: JSX.Element[][] = [];
  for (let i = 0; i < items.length; i += itemsToShow) {
    const chunk = items.slice(i, i + itemsToShow);
    chunks.push(chunk);
  }

  const inputs: JSX.Element[] = Array.from({ length }, (_, i) => (
    <input key={i} type="radio" name={`slider${counter}`} id={`slider${counter}_${i}`} aria-hidden />
  ));

  const slides: JSX.Element[] = Array.from({ length }, (_, i) => {
    const prev = i - 1 < 0 ? length - 1 : i - 1;
    const next = i + 1 > length - 1 ? 0 : i + 1;
    return (
      <li key={i} className={styles.slider__item}>
        {chunks[i]?.map((item, id) => cloneElement(item, { key: id }))}
        <div className={styles.slider__ctrl}>
          <label htmlFor={`slider${counter}_${prev}`} className={styles.slider__ctrl_prev} />
          <label htmlFor={`slider${counter}_${next}`} className={styles.slider__ctrl_next} />
        </div>
      </li>
    );
  });

  const navItems: JSX.Element[] = Array.from({ length }, (_, i) => (
    <li key={i} className={styles.slider__nav_item}>
      <label htmlFor={`slider${counter}_${i}`} />
    </li>
  ));

  return (
    <div className={styles.slider} aria-label="Slider">
      {inputs}
      <div className={styles.slider__wrap} data-testid="slider">
        <ol className={styles.slider__list}>{slides}</ol>
      </div>
      {itemsToShow === 1 && <ul className={styles.slider__nav}>{navItems}</ul>}
    </div>
  );
}
