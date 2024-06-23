import React, { useState, useEffect } from 'react';
import CarCard from './CarCard';
import Filters from './Filters';
import Pagination from './Pagination';
import styles from '../styles/CarList.module.css';

interface Car {
  id: number;
  brand: string;
  model: string;
  number: string;
  price: number;
  image: string | null;
  tarif: string[];
}

interface Brand {
  brand: string;
  models: string[];
}

const CarList = (): JSX.Element => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<Brand[]>([]);
  const [tarifs, setTarifs] = useState<{ [key: string]: string }>({});
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedTarifs, setSelectedTarifs] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const perPage = 10;

  const fetchCars = async (
    brands: string[],
    models: string[],
    tarifs: string[],
    page: number
  ) => {
    try {
      setLoading(true);
      let url = `https://test.taxivoshod.ru/api/test/?w=catalog-cars&page=${page}`;
      if (brands.length > 0) {
        url += brands.map((brand) => `&brand[]=${brand}`).join('');
      }
      if (models.length > 0) {
        url += models.map((model) => `&model[]=${model}`).join('');
      }
      if (tarifs.length > 0) {
        url += tarifs.map((tarif) => `&tarif[]=${tarif}`).join('');
      }
      const res = await fetch(url);
      const data = await res.json();
      setCars(data.list);
      setFilteredCars(data.list);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Ошибка при загрузке данных.');
    }
  };

  useEffect(() => {
    fetchCars([], [], [], 1);
  }, []);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await fetch(
          'https://test.taxivoshod.ru/api/test/?w=catalog-filter'
        );
        const data = await res.json();
        setBrands(data.brands.values);
        setModels(data.models.values);
        setTarifs(data.tarif.values);
      } catch (err) {
        setError('Ошибка при загрузке фильтров.');
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    fetchCars(selectedBrands, selectedModels, selectedTarifs, page);
  }, [selectedBrands, selectedModels, selectedTarifs, page]);

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedBrands(value);

    const newModels = models
      .filter((model) => value.includes(model.brand))
      .flatMap((model) => model.models);
    setSelectedModels(newModels);
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedModels(value);
  };

  const handleTarifChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedTarifs(value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleResetFilters = () => {
    setSelectedBrands([]);
    setSelectedModels([]);
    setSelectedTarifs([]);
    setPage(1);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Car Catalog</h1>
      <Filters
        brands={brands}
        models={models}
        tarifs={tarifs}
        selectedBrands={selectedBrands}
        selectedModels={selectedModels}
        selectedTarifs={selectedTarifs}
        onBrandChange={handleBrandChange}
        onModelChange={handleModelChange}
        onTarifChange={handleTarifChange}
      />
      <button onClick={handleResetFilters} className={styles.resetButton}>
        Сбросить фильтр
      </button>
      <div className={styles.carList}>
        {filteredCars.slice((page - 1) * perPage, page * perPage).map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
      <Pagination
        totalItems={filteredCars.length}
        itemsPerPage={perPage}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CarList;
