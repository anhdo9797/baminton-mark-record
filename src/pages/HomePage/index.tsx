import React, { useEffect, useState } from 'react';
import { Row, Button, Modal } from 'antd';

import styles from './styles.less';
import { CardEmpty, CardHome } from '@/components/Card/index';
import SearchPlayer from '../SearchPlayer';
import { history } from 'umi';

interface PropsHome {
    match: any;
}

const HomePage: React.FC<PropsHome> = props => {
    const [playerOnce, setPlayerOnce] = useState({
        avatar: '',
        name: '',
        active: '',
    });
    const [playerTow, setPlayerTow] = useState({
        avatar: '',
        name: '',
        active: '',
    });
    const [player, setPlayer] = useState(0);

    const [showModal, setShowModal] = useState(false);

    const selectPlayerOnce = () => {
        setShowModal(true);
        setPlayer(1);
    };

    const selectPlayerTow = () => {
        setShowModal(true);
        setPlayer(2);
    };

    const completeSelect = (e: object) => {
        //check player after set player => show Player
        player == 1 ? setPlayerOnce(e) : setPlayerTow(e);
        setShowModal(false);
    };

    const startGame = () => {
        history.push({
            pathname: '/playing',
            state: { playerOnce, playerTow },
        });
    };

    return (
        <div className={'container'}>
            <div className={styles.homePage}>
                <h2>Select players</h2>
                <Row justify="space-between">
                    {playerOnce.active ? (
                        <CardHome
                            avatar={playerOnce.avatar}
                            name={playerOnce.name}
                            onClick={selectPlayerOnce}
                        />
                    ) : (
                        <CardEmpty onClick={selectPlayerOnce} />
                    )}

                    <h2 className={styles.vs}>VS</h2>

                    {playerTow.avatar ? (
                        <CardHome
                            avatar={playerTow.avatar}
                            name={playerTow.name}
                            onClick={selectPlayerTow}
                        />
                    ) : (
                        <CardEmpty onClick={selectPlayerTow} />
                    )}
                </Row>

                {playerOnce.avatar && playerTow.avatar ? (
                    <Button type="primary" block onClick={startGame}>
                        Start Game
                    </Button>
                ) : null}

                <Modal visible={showModal}>
                    <SearchPlayer selectUser={completeSelect} />
                </Modal>
            </div>
        </div>
    );
};

export default HomePage;
