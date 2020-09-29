import React from 'react';
import { Card } from 'antd';

import styles from './styles.less';

interface PropsCard {
    name: string;
    avatar: string;
}

const CardHome: React.FC<PropsCard> = ({ name, avatar }) => {
    return (
        <Card
            hoverable
            className={styles.cardHome}
            cover={<img alt="example" src={avatar} />}
        >
            <h3>{name} </h3>
        </Card>
    );
};

export default CardHome;
