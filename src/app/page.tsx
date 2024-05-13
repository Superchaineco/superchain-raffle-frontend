import styles from './page.module.css';
import { DashBoard } from './views';
export default function Home() {
  return <main className={styles.container}><DashBoard /></main>;
}
