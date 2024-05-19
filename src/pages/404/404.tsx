import { Link } from 'react-router-dom';
import styles from './404.module.css';

const srcImg = '/image/people-24.svg';

export default function Page404() {
  return (
    <>
      <h1 className={styles.title}>(404) Page not found!</h1>
      <img src={srcImg} alt="not found" />
      <Link className={styles.button__back} to="/">
        Home
      </Link>
    </>
  );
}
