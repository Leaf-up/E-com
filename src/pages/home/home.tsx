import { Nav } from '~/widgets';
import styles from './home.module.css';

export function Home() {
  return (
    <div className={styles.home}>
      <Nav isColumn />
    </div>
  );
}
