import Image from 'next/image';
import Link from 'next/link';

interface CarCardProps {
  car: {
    id: number;
    brand: string;
    model: string;
    number: string;
    price: number;
    image: string | null;
    tarif: string[];
  };
}

const CarCard = ({ car }: CarCardProps): JSX.Element => {
  return (
    <div className='card' style={{ width: '18rem', margin: '10px' }}>
      {car.image ? (
        <Image
          src={car.image}
          className='card-img-top'
          alt={`${car.brand} ${car.model}`}
          width={286}
          height={180}
          priority={true}
        />
      ) : (
        <div
          className='card-img-top'
          style={{
            width: '286px',
            height: '180px',
            backgroundColor: '#e9ecef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span>Изображение не найдено</span>
        </div>
      )}
      <div className='card-body'>
        <h5 className='card-title'>
          {car.brand} {car.model}
        </h5>
        <p className='card-text'>Рег.номер: {car.number}</p>
        <p className='card-text'>Цена: {car.price}</p>
        {car.tarif && car.tarif.length > 0 && (
          <p className='card-text'>Тариф: {car.tarif.join(', ')}</p>
        )}
        <Link href={`/car/${car.id}`} legacyBehavior>
          <a className='btn btn-primary'>Информация</a>
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
