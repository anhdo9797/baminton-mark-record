import React from 'react';
import { Card, Tooltip } from 'antd';

import styles from './styles.less';

interface PropsCard {
    name: string;
    avatar: string;
    onClick?: any;
}

const CardHome: React.FC<PropsCard> = ({ name, avatar, onClick }) => {
    return (
        // <Tooltip title={noneToolTip ? null : 'Choose another player'}>
        <Card
            hoverable
            className={styles.cardHome}
            cover={<img src={avatar} />}
            onClick={onClick}
        >
            <h3>{name} </h3>
        </Card>
    );
};

export default CardHome;
