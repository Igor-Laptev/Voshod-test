import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './CarDetail.module.css';

interface Car {
  id: number;
  brand: string;
  model: string;
  number: string;
  price: number;
  image: string | null;
  tarif: string[];
  images?: { id: number; image: string }[];
}

const CarDetail = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchCar = async () => {
        try {
          setLoading(true);
          const res = await fetch(
            `https://test.taxivoshod.ru/api/test/?w=catalog-car&id=${id}`
          );
          const data = await res.json();
          setCar(data.item);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          setError('Ошибка при загрузке данных.');
        }
      };

      fetchCar();
    }
  }, [id]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!car) return <div>Данные не найдены.</div>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    arrows: false,
    centerPadding: '40px',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '20px',
        },
      },
    ],
  };

  const uniqueImages = car.images?.filter(
    (image, index, self) =>
      index === self.findIndex((img) => img.image === image.image)
  );

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      <div className={`card ${styles.card}`}>
        <h1 className={styles.title}>
          {car.brand} {car.model}
        </h1>
        {uniqueImages && uniqueImages.length > 1 ? (
          <Slider {...settings} className={styles.slider}>
            {uniqueImages.map((img) => (
              <div key={img.id} className={styles.slide}>
                <Image
                  src={img.image}
                  alt={`${car.brand} ${car.model}`}
                  width={500}
                  height={500}
                  priority
                  className='card-img-top'
                />
              </div>
            ))}
          </Slider>
        ) : uniqueImages && uniqueImages.length === 1 ? (
          <div className={styles.slide}>
            <Image
              src={uniqueImages[0].image}
              alt={`${car.brand} ${car.model}`}
              width={500}
              height={500}
              priority
              className='card-img-top'
            />
          </div>
        ) : (
          <div className={styles.img}>
            <div className={`card-img-top ${styles.noImage}`}>
              <span>Изображение не найдено</span>
            </div>
          </div>
        )}
        <div className='card-body'>
          <p className='card-text'>Цена: {car.price}</p>
          {car.tarif && car.tarif.length > 0 && (
            <p className='card-text'>Тариф: {car.tarif.join(', ')}</p>
          )}
          <button onClick={handleBackClick} className={styles.backButton}>
            Назад
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
