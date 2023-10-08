import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import styles from './footer.css';

import flashcards from '../../assets/flashcards.png';
import gear from '../../assets/gear.png';
import list from '../../assets/list.png';

const paths = [
    {
        path: '/',
        image: flashcards,
    },
    {
        path: '/list',
        image: list,
    },
    {
        path: '/settings',
        image: gear,
    },
];

export default function Footer() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return <div className={styles.footer_outer}>
        <div className={styles.footer_inner}>
            {paths.map(({ path, image }, index) => {
                if (path === pathname) {
                    return;
                }
                return <Link key={`link_${index}`} to={path}>
                    <img className={styles.footer_image} src={image} />
                </Link>
            })}
        </div>
    </div>
}