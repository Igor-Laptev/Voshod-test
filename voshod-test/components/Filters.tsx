import React from 'react';
import styles from '../styles/Filters.module.css';

interface FiltersProps {
  brands: string[];
  models: { brand: string; models: string[] }[];
  tarifs: { [key: string]: string };
  selectedBrands: string[];
  selectedModels: string[];
  selectedTarifs: string[];
  onBrandChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onModelChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onTarifChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Filters = ({
  brands,
  models,
  tarifs,
  selectedBrands,
  selectedModels,
  selectedTarifs,
  onBrandChange,
  onModelChange,
  onTarifChange,
}: FiltersProps): JSX.Element => {
  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <label>Марка</label>
        <select
          value={selectedBrands}
          onChange={onBrandChange}
          multiple
          className={styles.select}
        >
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.filterGroup}>
        <label>Модель</label>
        <select
          value={selectedModels}
          onChange={onModelChange}
          multiple
          className={styles.select}
        >
          {models
            .filter((model) => selectedBrands.includes(model.brand))
            .flatMap((model) => model.models)
            .map((model, index) => (
              <option key={index} value={model}>
                {model}
              </option>
            ))}
        </select>
      </div>
      <div className={styles.filterGroup}>
        <label>Тариф</label>
        <select
          value={selectedTarifs}
          onChange={onTarifChange}
          multiple
          className={styles.select}
        >
          {Object.entries(tarifs).map(([key, value], index) => (
            <option key={index} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
