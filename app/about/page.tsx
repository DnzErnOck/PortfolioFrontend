import { fetchData } from '../utils/fetchData';
import styles from './style.module.css';

export default async function AboutPage() {
  const aboutData = await fetchData('/api/v1/about'); // Swagger endpoint'i burada tanımlanır.

  if (!aboutData) {
    return <p>Error fetching about data.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About</h1>
      <p className={styles.description}>{aboutData.description}</p>
    </div>
  );
}
