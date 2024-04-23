import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import { loadFilters, saveFilters } from '../../utils/loadSaveFilters';
import sentenceToKebab, { kebabToSentence } from '../../utils/formatString';
import styles from './filters.module.css';

export default function Filters() {
  const [filters, setFilters] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterPieces, setFilterPieces] = useState([]);
  const [filterPieceType, setFilterPieceType] = useState('replace');
  const [filterPieceParams, setFilterPieceParams] = useState({});

  const deleteFilter = (index) => {
    setFilters(
      (oldFilters) => oldFilters.filter(
        (_filter, filterIndex) => filterIndex !== index,
      ),
    );
  };

  const editFilter = (index) => {
    const filter = filters[index];
    setFilterName(filter.name);
    setFilterPieces(filter.pieces);
    deleteFilter(index);
  };

  const updateFilterPieceParams = (key, value) => {
    setFilterPieceParams((oldFilterParams) => {
      const FilterParams = { ...oldFilterParams };
      FilterParams[key] = value;
      return FilterParams;
    });
  };

  const addFilterPiece = () => {
    setFilterPieces((oldFilterPieces) => [
      ...oldFilterPieces,
      { type: filterPieceType, params: { ...filterPieceParams } },
    ]);
    setFilterPieceParams({});
  };

  const getFilterParamInputs = () => {
    switch (filterPieceType) {
      case 'replace':
        return (
          <>
            <label htmlFor="text-param">
              {'Text: '}
              <input
                id="text-param"
                type="text"
                value={filterPieceParams?.text || ''}
                onChange={({ target }) => updateFilterPieceParams('text', target.value)}
              />
            </label>
            <label htmlFor="new-param">
              {'New: '}
              <input
                id="new-param"
                type="text"
                value={filterPieceParams?.new || ''}
                onChange={({ target }) => updateFilterPieceParams('new', target.value)}
              />
            </label>
          </>
        );
      default:
        return null;
    }
  };

  const deleteFilterPiece = (index) => {
    setFilterPieces(
      (oldFilterPieces) => oldFilterPieces.filter(
        (_filterPiece, filterPieceIndex) => filterPieceIndex !== index,
      ),
    );
  };

  const editFilterPiece = (index) => {
    const filterPiece = filterPieces[index];
    setFilterPieceType(filterPiece.type);
    setFilterPieceParams(filterPiece.params);
    deleteFilterPiece(index);
  };

  const createOrUpdateFilter = () => {
    setFilters((oldFilters) => {
      const newFilters = [...oldFilters];
      const filterToAdd = { name: sentenceToKebab(filterName), pieces: filterPieces };
      const filterIndex = newFilters.findIndex((filter) => filter.name === filterName);
      if (filterIndex >= 0) {
        newFilters[filterIndex] = filterToAdd;
      } else {
        newFilters.push(filterToAdd);
      }
      return newFilters;
    });
    setFilterName('');
    setFilterPieces([]);
    setFilterPieceParams({});
  };

  useEffect(() => {
    setFilters(loadFilters());
  }, []);

  useEffect(() => {
    saveFilters(filters);
  }, [filters]);

  return (
    <div id={styles.filters}>
      <Header />
      <h1>Filters</h1>
      <div>
        {
          filters.map((filter, index) => (
            <div className={styles.filter} key={filter.name}>
              <h2>{kebabToSentence(filter.name)}</h2>
              <button type="button" onClick={() => deleteFilter(index)}>Delete</button>
              <button type="button" onClick={() => editFilter(index)}>Edit</button>
            </div>
          ))
        }
      </div>
      <h1>Create or Update Filter</h1>
      <form id={styles['create-filter']}>
        <div>
          <label htmlFor="filter-name">
            {'Name: '}
            <input
              id="filter-name"
              type="text"
              value={filterName}
              onChange={({ target }) => setFilterName(target.value)}
            />
          </label>
        </div>
        <div>
          {
            (filterPieces.length > 0) && (
              <div id={styles['filter-piece-list']}>
                { filterPieces.map((FilterPiece, index) => {
                  const FilterPieceString = JSON.stringify(FilterPiece);
                  return (
                    <div key={FilterPieceString} className={styles['filter-piece']}>
                      <p>{FilterPieceString}</p>
                      <button type="button" onClick={() => deleteFilterPiece(index)}>Delete</button>
                      <button type="button" onClick={() => editFilterPiece(index)}>Edit</button>
                    </div>
                  );
                }) }
              </div>
            )
          }
          <div id={styles['create-filter-piece']}>
            <label htmlFor="filter-piece-type">
              {'Type: '}
              <select
                id="filter-piece-type"
                value={filterPieceType}
                onChange={({ target }) => setFilterPieceType(target.value)}
              >
                <option value="replace">Replace</option>
              </select>
            </label>
            { getFilterParamInputs() }
            <button type="button" onClick={addFilterPiece}>
              Add filter piece
            </button>
          </div>
        </div>
        <button type="button" onClick={createOrUpdateFilter}>Create or update</button>
      </form>
    </div>
  );
}
