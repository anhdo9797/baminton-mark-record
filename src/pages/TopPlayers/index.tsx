import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import { history, useModel } from 'umi';

import styles from '../HomePage/styles.less';
import style from './styles.less';

import { getPlayers } from '@/services/user';
import { LeftOutlined } from '@ant-design/icons';

const colors = [
    '#fbc02d',
    '#fdd835',
    '#ffee58',
    '#fff176',
    '#fff59d',
    '#fff9c4',
];

const formatNumber = (number: number) =>
    new Intl.NumberFormat('en-US').format(number);

const Player: React.FC<{
    avatar: string;
    places: any;
    name: string;
    score?: number;
    uid?: string;
}> = ({ avatar, places, name, score, uid }) => {
    const bg = places > 5 ? colors[5] : colors[places];
    const st =
        places == 1 ? 'st' : places == 2 ? 'nd' : places == 3 ? 'rd' : 'th';

    return (
        <Row className={style.userItem}>
            <Col style={style.wrapAvatar}>
                <img src={avatar} className={style.avatar} />
                <div className={style.places} style={{ backgroundColor: bg }}>
                    {places}
                    {st}
                </div>
            </Col>
            <Col className={style.wrapText}>
                <p className={style.name}>{name}</p>
                <p className={style.score}>{formatNumber(score || 0)} pts </p>
            </Col>
        </Row>
    );
};

const TopPlayer: React.FC = () => {
    //?=====STATE==========
    const { initialState } = useModel('@@initialState');
    const { currentUser } = initialState;
    const [topUsers, setTopUser] = useState([]);

    useEffect(() => {
        getTopPlayer();
    }, []);

    const getTopPlayer = async () => {
        try {
            const players = await getPlayers();

            const top: any = players?.sort((a, b) => {
                return b.score - a.score;
            });

            setTopUser(top);
        } catch (error) {
            console.log(error);
        }
    };

    const getName = (user: User) => {
        if (user.uid === currentUser.uid) return `${user.displayName} (you)`;
        return user.displayName;
    };

    return (
        <div className="container">
            <div className={styles.homePage}>
                <Row justify="space-between" className={style.header}>
                    <Button
                        onClick={() => history.push('/')}
                        icon={<LeftOutlined />}
                        className={style.backButton}
                    />
                    <h2>Top Players</h2>
                    <h2 />
                </Row>
                <div className={style.wrapPlayers}>
                    {topUsers.map((user: User, key) => (
                        <Player
                            name={getName(user)}
                            score={user.score || 0}
                            avatar={user.photoURL || ''}
                            places={key + 1}
                            uid={user.uid}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopPlayer;
