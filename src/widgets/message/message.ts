import styles from './styles.module.css';

class Message {
  private $el: HTMLElement;
  private $text: HTMLElement;
  private $icon: HTMLElement;
  private _timer: NodeJS.Timeout | null = null;

  constructor() {
    this.$el = document.createElement('div');
    this.$el.className = `${styles.message} ${styles.message_hidden}`;
    this.$icon = document.createElement('div');
    this.$icon.className = styles.message__icon;
    this.$icon.textContent = '\u2714';
    this.$text = document.createElement('div');
    this.$text.className = styles.message__text;
    this.$el.append(this.$icon, this.$text);
  }

  public get el() {
    return this.$el;
  }

  public show(text: string, mode: 'regular' | 'error' = 'regular') {
    this.$el.classList.remove(styles.message_hidden);
    this.$text.textContent = text;
    if (mode === 'error') {
      this.$icon.textContent = '\u274C';
      this.$icon.style.backgroundColor = 'gray';
    } else {
      this.$icon.textContent = '\u2714';
      this.$icon.removeAttribute('style');
    }
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
    this._timer = setTimeout(() => this.$el.classList.add(styles.message_hidden), 3000);
  }
}

const message = new Message();
export default message;
