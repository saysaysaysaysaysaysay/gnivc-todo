import styles from './Spinner.module.scss';

export function Spinner() {
  return <div className={styles['spinner']} aria-label="Загрузка..." role="status" />;
}

export default Spinner;
