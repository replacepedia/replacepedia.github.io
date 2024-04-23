import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../Components/Header';
import replace, { replaceLinks } from '../../utils/replacer';
import { loadFilters } from '../../utils/loadSaveFilters';
import { kebabToSentence } from '../../utils/formatString';
import styles from './article.module.css';

export default function Article() {
  const navigate = useNavigate();
  const contentRef = useRef();
  const { articleId, filter } = useParams();
  const [filters, setFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState();

  const loadContent = async () => {
    const response = await fetch(
      `https://pt.wikipedia.org/api/rest_v1/page/html/${articleId}`,
    );
    if (!response.ok) {
      navigate('/404');
    } else {
      const htmlContent = await response.text();
      contentRef.current.innerHTML = replaceLinks(
        replace(htmlContent, (filter) && JSON.parse(filter)),
        process.env.REACT_APP_BASE_URL,
        filter,
      );
    }
  };

  useEffect(() => {
    loadContent();
  }, [articleId, filter]);

  useEffect(() => {
    const loadedFilters = loadFilters();
    setFilters(loadedFilters);
    if (loadedFilters.length > 0) {
      setSelectedFilter(encodeURIComponent(JSON.stringify(loadedFilters[0])));
    }
  }, []);

  const getFilterValue = (filterJson) => {
    const filterWithoutName = { ...filterJson };
    delete filterWithoutName.name;
    return encodeURIComponent(JSON.stringify(filterWithoutName));
  };

  const loadFilter = () => {
    if (selectedFilter) {
      const base = document.getElementsByTagName('base')[0];
      base.href = '';
      navigate(`/${articleId}/${selectedFilter}`);
    }
  };

  return (
    <div id={styles.article}>
      <Header menu={(
        <label htmlFor={styles['filter-list']}>
          {'Select filter: '}
          <select
            id={styles['filter-list']}
            className="left"
            onChange={({ target }) => setSelectedFilter(target.value)}
          >
            {
            filters.map((filterJson) => (
              <option
                key={filterJson.name}
                value={getFilterValue(filterJson)}
              >
                {kebabToSentence(filterJson.name)}
              </option>
            ))
          }
          </select>
          <button
            className="right"
            type="button"
            onClick={loadFilter}
          >
            Load filter
          </button>
        </label>
      )}
      />
      <div id={styles.content} ref={contentRef} />
    </div>
  );
}
