import CarList from '../components/CarList';
import styles from '../styles/Home.module.css';

const Home = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <CarList />
    </div>
  );
};

export default Home;
