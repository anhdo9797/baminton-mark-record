import React from 'react';
import { Card } from 'antd';

import styles from './styles.less';
import Loading from '../Loading/Loading';

interface PropsCard {
    name: string;
    avatar: string;
    onClick?: any;
    active?: boolean;
}

const CardHome: React.FC<PropsCard> = ({ name, avatar, onClick, active }) => {
    return (
        <Card
            hoverable
            className={styles.cardHome + ' ' + (active && styles.active)}
            cover={
                !avatar ? (
                    <div className={styles.loading}>
                        <Loading />
                    </div>
                ) : (
                    <img src={avatar} alt="avatar" />
                )
            }
            onClick={onClick}
        >
            <h3>{name} </h3>
        </Card>
    );
};

export default CardHome;
