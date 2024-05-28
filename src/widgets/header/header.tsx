import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { NavigationMenu } from '../navigation/nav';
import { SideMenu } from '~/widgets/side-menu/side-menu';
import menuIcon from '/icons/menu.svg';
import styles from './header.module.css';

export function Header() {
  const [showModal, setShowModal] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles.header__logo}>
          <NavLink to="/" className={styles.header__logo_img} />
          <span className={styles.header__logo_title}>Magic seeds</span>
        </div>
        <button type="button" className={styles.header__menu_button} onClick={() => setShowModal(!showModal)}>
          <img src={menuIcon} alt="menu" />
        </button>
        <div className={styles.header__nav}>
          <NavigationMenu />
        </div>
        <SideMenu isOpen={showModal} onClose={() => setShowModal(false)} />
      </div>
    </header>
  );
}
