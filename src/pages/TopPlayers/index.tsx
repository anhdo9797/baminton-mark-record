import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';

import styles from '../HomePage/styles.less';
import style from './styles.less';

import { getPlayers } from '@/services/user';

const colors = [
    '#fbc02d',
    '#fdd835',
    '#ffee58',
    '#fff176',
    '#fff59d',
    '#fff9c4',
];

const Player: React.FC<{
    avatar: string;
    places: any;
    name: string;
    score?: number;
}> = ({ avatar, places, name, score }) => {
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
                <p className={style.name}>{name} </p>
                <p className={style.score}>{score} pts </p>
            </Col>
        </Row>
    );
};

const TopPlayer: React.FC = () => {
    //?=====STATE==========
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

    return (
        <div className="container">
            <div className={styles.homePage}>
                <h2>Top Players</h2>
                {topUsers.map((user: User, key) => (
                    <Player
                        name={user.displayName || ''}
                        score={user.score || ''}
                        avatar={user.photoURL || ''}
                        places={key + 1}
                    />
                ))}
            </div>
        </div>
    );
};

export default TopPlayer;
