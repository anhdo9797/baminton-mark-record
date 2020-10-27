import React, { useCallback, useEffect, useState } from 'react';
import { Row, InputNumber, Button, message, Modal } from 'antd';
import { CardHome } from '@/components/Card/index';

import styles from '../HomePage/styles.less';
import stylesPage from './styles.less';
import { useParams, history } from 'umi';
import { endGame, getPlayersInRoom } from '@/services/game';

interface PropsSet {
    setValueOnce: any;
    setValuetwo: any;
    set: number;
    disabled?: boolean;
    show?: boolean;
}

interface Set {
    value1: number;
    value2: number;
}

const WrapSet: React.FC<PropsSet> = ({
    setValueOnce,
    setValuetwo,
    set,
    disabled,
    show = true,
}) => {
    if (!show) return null;
    return (
        <Row justify="space-between" className={stylesPage.round}>
            <InputNumber
                className={stylesPage.inputType}
                placeholder="Enter points"
                min={0}
                max={25}
                onChange={setValueOnce}
                disabled={disabled}
                defaultValue={0}
            />
            <p className={stylesPage.set}>set {set} </p>
            <InputNumber
                min={0}
                max={25}
                defaultValue={0}
                className={stylesPage.inputType}
                placeholder="Enter points"
                onChange={setValuetwo}
                disabled={disabled}
            />
        </Row>
    );
};

const isEndSet = (points = [0, 0]) => {
    const [first, second] = points;
    return (
        first == 25 ||
        second == 25 ||
        (first > 19 && second > 19 && Math.abs(first - second) > 1)
    );
};

const getWinner = (
    sets = {
        1: [0, 0],
        2: [0, 0],
        3: [0, 0],
    },
) => {
    const roundWin = [0, 0];
    Object.values(sets).forEach(set => {
        if (isEndSet(set)) roundWin[set[0] > set[1] ? 0 : 1]++;
    });
    return roundWin[0] == roundWin[1] ? 2 : roundWin[0] > roundWin[1] ? 0 : 1;
};

// const isEndgame = sets => {
//     getWinner(sets);
// };

const Playing: React.FC = () => {
    let { roomId } = useParams<{ roomId: string }>();
    const [sets, setSets] = useState({
        1: [0, 0],
        2: [0, 0],
        3: [0, 0],
    });

    const [players, setPlayers] = useState<User[]>([]);

    const initData = async () => {
        const players = await getPlayersInRoom(roomId);
        setPlayers(players);
    };

    useEffect(() => {
        initData();
    }, []);

    useEffect(() => {
        console.log('========= getWinner(sets========');
        console.log(getWinner(sets));
        console.log('====================================');
    });

    const submitEndGame = async () => {
        await endGame(roomId, sets, players[getWinner(sets)]);
    };

    const show = (index: number) => {
        // return index == 0 || isEndSet(sets[index]);
        // if (index == 0) {
        //     return true;
        // } else if (isEndSet(sets[0])) {
        //     return getWinner(sets) == 2;
        // }
        if (index == 0) {
            return true;
        } else if (isEndSet(sets[1])) {
            return getWinner(sets) != 2;
        }
    };

    return (
        <div className="container">
            <div className={styles.homePage}>
                <h2>Playing</h2>

                <Row justify="space-between">
                    <CardHome
                        avatar={players[0]?.photoURL || ''}
                        name={players[0]?.displayName || ''}
                    />

                    <h2>VS</h2>

                    <CardHome
                        avatar={players[1]?.photoURL || ''}
                        name={players[1]?.displayName || ''}
                    />
                </Row>
                {Object.values(sets).map((set, index) => (
                    <WrapSet
                        key={index}
                        set={index + 1}
                        setValueOnce={(value: number) => {
                            sets[index + 1][0] = value;
                            setSets({ ...sets });
                        }}
                        setValuetwo={(value: number) => {
                            sets[index + 1][1] = value;
                            setSets({ ...sets });
                        }}
                        // disabled={isEndSet(set)}
                        show={show(index)}
                    />
                ))}

                <b>Winner: {players[getWinner(sets)]?.displayName}</b>
                <Button type="primary" onClick={submitEndGame}>
                    End game
                </Button>
            </div>
        </div>
    );
};

export default Playing;
