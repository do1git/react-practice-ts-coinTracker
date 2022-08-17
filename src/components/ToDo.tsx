import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesState, categoryState, IToDo, toDoState } from "../atoms";

const Div = styled.div`
  background-color: black;
  color: white;
  width: 100px;
  font-size: 30px;
  padding: 5px;
  border-radius: 5px;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const currentCategory = useRecoilValue(categoryState);
  const categories = useRecoilValue(categoriesState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((old) => {
      const targetIndex = old.findIndex((toDo) => toDo.id === id);
      // const oldToDo = old[targetIndex];
      const newToDo = { text: text, id, category: name as any };
      return [
        ...old.slice(0, targetIndex),
        newToDo,
        ...old.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <Div>#{text}</Div>

      {categories.map((cat, i) => (
        <button name={cat} key={i} onClick={onClick}>
          Go to &rarr; {cat}
        </button>
      ))}
    </li>
  );
}
export default ToDo;
