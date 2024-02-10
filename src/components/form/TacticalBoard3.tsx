// import React, { useEffect, useRef, useState } from 'react';
// import { fabric } from 'fabric';

// const TacticalBoard = () => {
//     const [canvas, setCanvas] = useState('');
//     const canvasRef = useRef(null);

//     useEffect(() => {
//         setCanvas(initCanvas());

//         // 選手を追加する関数
//         const addPlayer = (color, left, top) => {
//             const player = new fabric.Circle({
//                 radius: 15,
//                 fill: color,
//                 left: left,
//                 top: top,
//                 originX: 'center',
//                 originY: 'center',
//                 hasControls: false,
//                 hasBorders: false,
//             });

//             canvas.add(player).setActiveObject(player);
//         };

//         // ボールを追加する関数
//         const addBall = (left, top) => {
//             const ball = new fabric.Circle({
//                 radius: 10,
//                 fill: 'black',
//                 left: left,
//                 top: top,
//                 originX: 'center',
//                 originY: 'center',
//                 hasControls: false,
//                 hasBorders: false,
//             });

//             canvas.add(ball).setActiveObject(ball);
//         };

//         // イベントリスナーを設定
//         // canvas.on('object:moved', (e) => {
//         //     canvas.requestRenderAll();
//         // });

//         // canvas.on('object:moving', (e) => {
//         //     canvas.requestRenderAll();
//         // });

//         // デモ用に選手とボールを追加
//         addPlayer('red', 100, 100);
//         addPlayer('blue', 200, 200);
//         addBall(300, 150);

//         return () => canvas.dispose(); // コンポーネントのアンマウント時にキャンバスを破棄
//     }, []);

//     const initCanvas = new fabric.Canvas(canvasRef.current, {
//         width: 600,
//         height: 400,
//         backgroundColor: "green"
//     });

//     return (
//         <div>
//             <canvas ref={canvasRef} />
//         </div>
//     );
// };

// export default TacticalBoard;
