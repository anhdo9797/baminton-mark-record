import React from 'react';
import { Card } from 'antd';

import styles from './styles.less';

interface PropsCard {
    name: string;
    active: string;
    avatar: string;
    onClick: any;
}

const CardX: React.FC<PropsCard> = ({ name, active, avatar, onClick }) => {
    return (
        <Card
            onClick={onClick}
            hoverable
            className={styles.modeCard}
            cover={<img alt="example" src={avatar} />}
        >
            <h3>{name} </h3>
            <h4>{active}</h4>
        </Card>
    );
};

export default CardX;
