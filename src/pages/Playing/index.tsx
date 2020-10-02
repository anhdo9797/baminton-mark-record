import React, { useCallback, useEffect, useState } from 'react';
import { Row, InputNumber, Button } from 'antd';
import { CardHome } from '@/components/Card/index';

import styles from '../HomePage/styles.less';
import stylesPage from './styles.less';
import { useParams } from 'umi';
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
        <Row justify="space-between" className={stylesPage.settwo}>
            <InputNumber
                className={stylesPage.inputType}
                placeholder="Enter points"
                min={0}
                max={30}
                onChange={setValueOnce}
                disabled={disabled}
                defaultValue={0}
            />
            <p className={stylesPage.set}>set {set} </p>
            <InputNumber
                min={0}
                max={30}
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
        first == 30 ||
        second == 30 ||
        ((first > 20 || second > 20) && Math.abs(first - second) > 1)
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

const Playing: React.FC = () => {
    let { roomId } = useParams<{ roomId: string }>();
    const [sets, setSets] = useState({
        1: [0, 0],
        2: [0, 0],
        3: [0, 0],
    });
    const [players, setPlayers] = useState<User[]>([]);
    // const [player1, setPlayer1] = useState<User>();
    // const [player2, setPlayer2] = useState<User>();

    // const [set1, setSet1] = useState<set>({ value1: 0, value2: 0 });
    // const [set2, setSet2] = useState<set>({
    //     value1: 0,
    //     value2: 0,
    // });
    // const [set3, setSet3] = useState<set>({ value1: 0, value2: 0 });

    const initData = async () => {
        const players = await getPlayersInRoom(roomId);
        setPlayers(players);
        // setPlayer1(players[0]);
        // setPlayer2(players[1]);
    };

    useEffect(() => {
        initData();
    }, []);

    useEffect(() => {});

    const submitEndGame = async () => {
        await endGame(roomId, sets, players[getWinner(sets)]);
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
                        disabled={isEndSet(set)}
                        show={index == 0 || isEndSet(sets[index])}
                    />
                ))}
                {/* <WrapSet
                    set={1}
                    setValueOnce={(value1: number) =>
                        setSet1({ ...set1, value1 })
                    }
                    setValuetwo={(value2: number) =>
                        setSet1({ ...set1, value2 })
                    }
                    disabled={endSet(set1)}
                />

                {endSet(set1) ? (
                    <WrapSet
                        set={2}
                        setValueOnce={(value1: number) =>
                            setSet2({ ...set2, value1 })
                        }
                        setValuetwo={(value2: number) =>
                            setSet2({ ...set3, value2 })
                        }
                        disabled={endSet(set2)}
                    />
                ) : null}

                {endSet(set2) && (
                    <WrapSet
                        set={3}
                        setValueOnce={(value1: number) =>
                            setSet3({ ...set3, value1 })
                        }
                        setValuetwo={(value2: number) =>
                            setSet3({ ...set1, value2 })
                        }
                        disabled={endSet(set3)}
                    />
                )} */}
                <b>Winner: {players[getWinner(sets)]?.displayName}</b>
                <Button type="primary" onClick={submitEndGame}>
                    End game
                </Button>
            </div>
        </div>
    );
};

export default Playing;
