import { customerStore } from '~/entities';

export const themeInit = () => {
  const { theme } = customerStore;
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.setProperty('--dark-theme', theme === 'dark' ? '1' : '0');
};
