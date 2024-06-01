import { Image } from 'antd';
import styles from './.module.css';

export default function ImageSlider({ items }: { items: string[] }) {
  const length = items.length;

  if (length === 1)
    return (
      <div className={styles.image} aria-label="Slider">
        <Image width={250} src={items[0]} />
      </div>
    );

  const inputs: JSX.Element[] = Array.from({ length }, (_, i) =>
    i === 0 ? (
      <input key={i} type="radio" name="image-slider" id={`image-slider_${i}`} defaultChecked aria-hidden />
    ) : (
      <input key={i} type="radio" name="image-slider" id={`image-slider_${i}`} aria-hidden />
    ),
  );

  const slides: JSX.Element[] = Array.from({ length }, (_, i) => {
    const prev = i - 1 < 0 ? length - 1 : i - 1;
    const next = i + 1 > length - 1 ? 0 : i + 1;
    const previewItems = [items[i], ...Array.from(items).splice(i - 1, 1)];
    return (
      <li key={i} className={styles.slider__item}>
        <Image.PreviewGroup items={previewItems}>
          <Image width={250} src={items[i]} />
        </Image.PreviewGroup>
        <div className={styles.slider__ctrl}>
          <label htmlFor={`image-slider_${prev}`} className={styles.slider__ctrl_prev} />
          <label htmlFor={`image-slider_${next}`} className={styles.slider__ctrl_next} />
        </div>
      </li>
    );
  });

  const navItems: JSX.Element[] = Array.from({ length }, (_, i) => (
    <li key={i} className={styles.slider__nav_item}>
      <label htmlFor={`image-slider_${i}`} />
    </li>
  ));

  return (
    <div className={styles.slider} aria-label="Slider">
      {inputs}
      <div className={styles.slider__wrap}>
        <ol className={styles.slider__list}>{slides}</ol>
      </div>
      <ul className={styles.slider__nav}>{navItems}</ul>
    </div>
  );
}
