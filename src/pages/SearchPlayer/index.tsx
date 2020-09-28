import React from 'react';
import styles from './style.less';

const SearchPlayer: React.FC<{}> = () => {
    return (
        <div className="container">
            <div className={styles.searchPlayer}>
                <h3>Search</h3>
            </div>
        </div>
    );
};

export default SearchPlayer;
