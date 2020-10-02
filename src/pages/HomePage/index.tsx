import React, { useEffect, useState } from 'react';
import { Row, Button, Modal } from 'antd';

import styles from './styles.less';
import { CardEmpty, CardHome } from '@/components/Card/index';
import SearchPlayer from '../SearchPlayer';
import { history } from 'umi';
import { creatRoom } from '@/services/game';

interface PropsHome {
    match: any;
}

const HomePage: React.FC<PropsHome> = props => {
    const [playerOnce, setPlayerOnce] = useState({
        photoURL: '',
        displayName: '',
    });
    const [playerTow, setPlayerTow] = useState({
        photoURL: '',
        displayName: '',
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

    const startGame = async () => {
        const roomId = await creatRoom(playerOnce, playerTow);
        history.push({
            pathname: `/playing/${roomId}`,
        });
    };

    return (
        <div className={'container'}>
            <div className={styles.homePage}>
                <h2>Select players</h2>
                <Row justify="space-between">
                    {playerOnce.photoURL ? (
                        <CardHome
                            avatar={playerOnce.photoURL}
                            name={playerOnce.displayName}
                            onClick={selectPlayerOnce}
                        />
                    ) : (
                        <CardEmpty onClick={selectPlayerOnce} />
                    )}

                    <h2 className={styles.vs}>VS</h2>

                    {playerTow.photoURL ? (
                        <CardHome
                            avatar={playerTow.photoURL}
                            name={playerTow.displayName}
                            onClick={selectPlayerTow}
                        />
                    ) : (
                        <CardEmpty onClick={selectPlayerTow} />
                    )}
                </Row>

                {playerOnce.photoURL && playerTow.photoURL ? (
                    <Button type="primary" block onClick={startGame}>
                        Start Game
                    </Button>
                ) : null}

                <Modal visible={showModal}>
                    <SearchPlayer
                        selectUser={completeSelect}
                        playerOnce={playerOnce}
                        playerTow={playerTow}
                    />
                </Modal>
            </div>
        </div>
    );
};

export default HomePage;
