import React from 'react';
import PropTypes from 'prop-types';
import styles from './header.module.css';

export default function Header({ menu }) {
  return (
    <div id={styles.header}>
      <div>
        <h1 className="title">Replacepedia</h1>
      </div>
      { menu }
    </div>
  );
}

Header.propTypes = {
  menu: PropTypes.element,
};

Header.defaultProps = {
  menu: null,
};
