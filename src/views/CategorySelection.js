import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles.css';

import DataContext from '../contexts/DataContext';
import classNames from 'classnames';

export default function CategorySelection() {
    const navigate = useNavigate();
    const { categories, selectCategory } = useContext(DataContext);

    return <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 400, width: '100%', height: '100%' }}>
            {categories.map((category) => {
                return <button
                    key={category}
                    style={{ width: '100%' }}
                    className={classNames(styles.button)}
                    onClick={() => {
                        selectCategory(category);
                        navigate("/cards");
                    }}
                >{category}</button>
            })}
        </div>
    </div>
}