import styles from './footer.module.css';

const rssLogoSrc = '/logo/rss.svg';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__author}>
        <span>© 2024 </span>
        <a href="https://github.com/Leaf-up">Leaf up</a>
      </div>
      <a href="https://rs.school/">
        <img className={styles.footer__rss_logo} src={rssLogoSrc} alt="rss" />
      </a>
    </div>
  );
}
