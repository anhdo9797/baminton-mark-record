import React from 'react';
import { Card, Tooltip } from 'antd';

import styles from './styles.less';

interface PropsCard {
    onClick: any;
}

const CardEmpty: React.FC<PropsCard> = ({ onClick }) => {
    return (
        <Card
            hoverable
            className={styles.cardEmpty}
            onClick={onClick}
            cover={
                <img
                    alt="example"
                    src={require('../../assets/icon/emptyUser.svg')}
                />
            }
        />
    );
};

export default CardEmpty;
