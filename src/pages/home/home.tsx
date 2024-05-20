import { NavigationMenu } from '~/widgets';
import styles from './home.module.css';

const imgSrc = '/image/people-02.svg';

export function Home() {
  return (
    <div className={styles.home}>
      <NavigationMenu isColumn />
      <img className={styles.home__img} src={imgSrc} alt="welcome" />
    </div>
  );
}
