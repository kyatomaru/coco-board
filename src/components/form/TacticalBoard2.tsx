import React, { useState } from 'react';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    position: 'relative',
    width: 400,
    height: 300,
    backgroundSize: 'cover',
    border: '1px solid #ddd',
    borderRadius: 8,
    marginBottom: theme.spacing(2),
}));

const StyledPlayerIcon = styled(Box)(({ theme, team }) => ({
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: team === 1 ? 'red' : 'blue', // チームごとに色を変更
    cursor: 'grab',
}));

const StyledBallIcon = styled(Box)(({ theme }) => ({
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: '50%',
    backgroundColor: 'black',
    cursor: 'grab',
}));

const StyledButtonList = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    marginTop: theme.spacing(2),
}));

const AddPlayerButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'green !important',
    color: 'white',
}));

const AddBallButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'blue !important',
    color: 'white',
    '& .MuiButton-label': {
        color: 'blue', // デフォルトの文字色を使用
    },
}));

const TacticalBoard = () => {
    const [players, setPlayers] = useState([]);
    const [ball, setBall] = useState({ x: 0, y: 0 });
    const [draggedItem, setDraggedItem] = useState(null);

    const handlePlayerMove = (index, offsetX, offsetY) => {
        const updatedPlayers = [...players];
        const maxX = 400 - 20;
        const maxY = 300 - 20;
        updatedPlayers[index] = {
            ...updatedPlayers[index],
            x: Math.min(Math.max(0, offsetX), maxX),
            y: Math.min(Math.max(0, offsetY), maxY),
        };
        setPlayers(updatedPlayers);
    };

    const handleBallMove = (offsetX, offsetY) => {
        const maxX = 400 - 15;
        const maxY = 300 - 15;

        setBall({
            x: Math.min(Math.max(0, offsetX), maxX),
            y: Math.min(Math.max(0, offsetY), maxY),
        });
    };

    const handleAddPlayer = (team) => {
        const newPlayer = {
            x: 100, // 適切な初期位置を設定
            y: 100, // 適切な初期位置を設定
            team: team,
        };
        setPlayers([...players, newPlayer]);
    };

    const handleAddBall = () => {
        const newBall = {
            x: 200, // 適切な初期位置を設定
            y: 200, // 適切な初期位置を設定
        };
        setBall(newBall);
    };

    const handleDragStart = (index) => {
        // handle drag start logic
        console.log("")
        setDraggedItem(index);
    };

    const handleDragEnd = (index, e) => {
        setDraggedItem(false);
        const rect = e.target.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        if (index !== null) {
            handlePlayerMove(index, players[index].x + offsetX, players[index].y + offsetY);
        } else {
            handleBallMove(ball.x + offsetX, ball.y + offsetY);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (index, e) => {
        e.preventDefault();
        const rect = e.target.getBoundingClientRect();
        const offsetX = ball.x + e.clientX - rect.left;
        const offsetY = ball.y + e.clientY - rect.top;

        if (index !== null) {
            handlePlayerMove(index, offsetX, offsetY);
        } else {
            handleBallMove(offsetX, offsetY);
        }
    };

    return (
        <StyledBox>
            <StyledPaper onDragOver={handleDragOver}>
                {players.map((player, index) => (
                    // ドラッグされているアイコン以外は表示
                    !draggedItem || draggedItem !== index ? (
                        <StyledPlayerIcon
                            key={index}
                            team={player.team}
                            style={{ left: player.x, top: player.y }}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragEnd={(e) => handleDragEnd(index, e)}
                            onDrop={(e) => handleDrop(index, e)}
                        />
                    ) : null
                ))}
                {!draggedItem ? (
                    <StyledBallIcon
                        style={{ left: ball.x, top: ball.y }}
                        draggable
                        onDragStart={() => handleDragStart(null)}
                        onDragEnd={(e) => handleDragEnd(null, e)}
                        onDrop={(e) => handleDrop(null, e)}
                    />
                ) : null}
            </StyledPaper>

            <StyledButtonList>
                <AddPlayerButton variant="contained" color="primary" onClick={() => handleAddPlayer(1)}>
                    プレイヤー追加（チーム1）
                </AddPlayerButton>
                <AddPlayerButton variant="contained" color="primary" onClick={() => handleAddPlayer(2)}>
                    プレイヤー追加（チーム2）
                </AddPlayerButton>
                <AddBallButton variant="contained" color="primary" onClick={handleAddBall}>
                    ボール追加
                </AddBallButton>
            </StyledButtonList>
        </StyledBox>
    );
};

export default TacticalBoard;
