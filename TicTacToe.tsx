import { FC, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";

const TicTacToe: FC = () => {
  const [gameFlag, setGameFlag] = useState<boolean>(true) // true: game on, false: game paused.
  const blankImg = require('./assets/empty.png')
  const xImg = require('./assets/x.png')
  const oImg = require('./assets/o.png')
  const imgs = ['X Playing','O Playing',"X Wins",'O Wins','Draw']
  const [nowPlayingPic, setNowPlayingPic] = useState(imgs[0])
  const startBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  const startBoardImgs = [[blankImg, blankImg, blankImg], [blankImg, blankImg, blankImg], [blankImg, blankImg, blankImg]]
  let [board, setBoard] = useState(startBoard)
  let [boardImgs, setBoardImgs] = useState(startBoardImgs)
  const [player, setPlayer] = useState(0)
  const reset = () => {
    setBoard(startBoard)
    setBoardImgs(startBoardImgs)
    setPlayer(0)
    setGameFlag(true)
    setNowPlayingPic(imgs[0])
  }

  const Brick: FC<{ row: number, col: number, onPressCallBack: (row: number, col: number) => void }> = (props) => {
    return (
      <TouchableOpacity style={styles.brick} onPress={() => { props.onPressCallBack(props.row, props.col) }}>
        <Image source={boardImgs[props.row][props.col]} style={styles.sign}></Image>
      </TouchableOpacity>
    )
  }
  

  const onPressCallBack = (row: number, col: number) => {
    if (gameFlag) {
      if (board[row][col] != 0)
        alert("bad choise")
      else {
        //game:
        const newBoard = board
        const newBoardImgs = boardImgs
        newBoard[row][col] = (player % 2) + 1
        setBoard(newBoard)
        if (player % 2 == 0) {
          newBoardImgs[row][col] = xImg
        }
        else {
          newBoardImgs[row][col] = oImg
        }
        const result = checkWins()
        if (result == -1){
          //no more moves.
          setNowPlayingPic(imgs[4])
          setGameFlag(false)
        }else if(result == 1){
          //X wins
          setNowPlayingPic(imgs[2])
          setGameFlag(false)
        }
        else if(result == 2){
          //O wins
          setNowPlayingPic(imgs[3])
          setGameFlag(false)
        }
        else {
          setBoardImgs(newBoardImgs)
          setPlayer(player + 1)
          if(player%2 == 0) setNowPlayingPic(imgs[1])
          else setNowPlayingPic(imgs[0])
        }
      }
    }
  }

  const checkPath = (vec: Array<number>) => {
    //console.log("vec: " + vec)
    if (vec[0] === vec[1] && vec[0] === vec[2] && vec[0] != 0) return vec[0]
    if (vec[0] === 0 || vec[1] === 0 || vec[2] === 0) return 0
    return -1
  }

  const checkWins = () => {
    //-1 - no wins and no more moves.
    //0 - no wins and there are moves.
    //1 - X wins.
    //2 - O wins.
    let moves: boolean = false
    let result: Array<number> = [0, 0]
    for (var i = 0; i <= 3; i++) {
      //console.log(i)
      //Checks 2 variants each loop.
      //i = (0, 2) checks row and column each time
      //i = 3 checks diagonals.
      if (i == 3) {
        result[0] = checkPath([board[0][0], board[1][1], board[2][2]])
        result[1] = checkPath([board[0][2], board[1][1], board[2][0]])
        //console.log("new array: " + [board[0][0], board[1][1], board[2][2]])
      }
      else {
        result[0] = checkPath(board[i]);                                      //row i
        result[1] = checkPath([board[0][i], board[1][i], board[2][i]]);        //col i
      }
      for (let j = 0; j < 2; j++) {
        if (result[j] === 0)//there are still moves left
          moves = true
        else if (result[j] === 1) // x wins
          return 1
        else if (result[j] === 2) // o wins
          return 2
      }
    }
    if (!moves) return -1
    return 0
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{nowPlayingPic}</Text>
      <View style={styles.row}>
          <Brick row={0} col={0} onPressCallBack={onPressCallBack}></Brick>
          <Brick row={0} col={1} onPressCallBack={onPressCallBack}></Brick>
          <Brick row={0} col={2} onPressCallBack={onPressCallBack}></Brick>
        </View>

        <View style={styles.row}>
          <Brick row={1} col={0} onPressCallBack={onPressCallBack}></Brick>
          <Brick row={1} col={1} onPressCallBack={onPressCallBack}></Brick>
          <Brick row={1} col={2} onPressCallBack={onPressCallBack}></Brick>
        </View>

        <View style={styles.row}>
          <Brick row={2} col={0} onPressCallBack={onPressCallBack}></Brick>
          <Brick row={2} col={1} onPressCallBack={onPressCallBack}></Brick>
          <Brick row={2} col={2} onPressCallBack={onPressCallBack}></Brick>
        </View>
      <TouchableOpacity style={styles.restartButton} onPress={reset}>
        <Text style={styles.restartText}>Restart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  brick: {
    flex: 1,
    backgroundColor: "white",
    margin: 5,
    aspectRatio: 1,
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 10,
  },
  button: {
    flex: 1,
  },
  sign: {
    flex: 1,
    margin: 5,
    aspectRatio: 1,
  },
  text: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 36,
    fontFamily: "Roboto",
    fontWeight: "bold",
    alignSelf: "center",
  },
  restartButton: {
    marginTop: 30,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "black",
    alignSelf: "center",
  },
  restartText: {
    margin: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TicTacToe;
