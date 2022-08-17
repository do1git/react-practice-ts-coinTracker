import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ destination, draggableId, source }: DropResult) => {
    console.log(destination, source);
    if (!destination) return;
    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destBoard = [...allBoards[destination.droppableId]];

        sourceBoard.splice(source.index, 1);
        destBoard.splice(destination.index, 0, taskObj);

        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destBoard,
        };
      });
    } else {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        sourceBoard.splice(destination.index, 0, taskObj);

        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
