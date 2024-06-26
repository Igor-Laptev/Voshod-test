import CarList from '../components/CarList/CarList';
import styles from '../styles/Home.module.css';

const Home = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Добро пожаловать на наш сайт по аренде машин!</h1>
        <p>Выберите автомобиль который вам больше всего подходит!</p>
      </header>
      <CarList />
    </div>
  );
};

export default Home;
