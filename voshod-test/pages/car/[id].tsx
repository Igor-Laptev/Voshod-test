import dynamic from 'next/dynamic';

const CarDetail = dynamic(
  () => import('../../components/CarDetails/CarDetails'),
  {
    ssr: false,
  }
);

const CarDetailPage = () => {
  return <CarDetail />;
};

export default CarDetailPage;
