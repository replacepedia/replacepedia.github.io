import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './main.module.css';

export default function Main() {
  const navigate = useNavigate();

  const onKeyDown = async (event) => {
    if (event.key === 'Enter') {
      navigate(`/${event.target.value}`);
    }
  };

  return (
    <div id={styles.main}>
      <h1 className="title">Replacepedia</h1>
      <input type="text" onKeyDown={onKeyDown} />
    </div>
  );
}
