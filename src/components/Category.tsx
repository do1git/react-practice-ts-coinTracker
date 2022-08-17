import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesState, categoryState } from "../atoms";

interface ICategory {
  value: string;
  index: number;
}

const Parent = styled.div<{ selected: boolean }>`
  height: 40px;
  width: 250px;
  border-radius: 10px;
  border: 2px solid purple;
  background-color: ${(props) =>
    props.selected ? props.theme.toDoAccent : props.theme.toDoBack};
  margin: 10px;
  display: flex;
  align-items: center;
`;

const Child = styled.div`
  width: 150px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Del = styled(Child)`
  width: 50px;
  cursor: pointer;
`;
const Now = styled(Child)`
  width: 50px;
  cursor: pointer;
`;

function Category({ value, index }: ICategory) {
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategoties] = useRecoilState(categoriesState);

  const deleteCategory = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCategoties((old) => {
      const targetIndex = parseInt(e.currentTarget.id);
      const oldCat = [...old];
      oldCat.splice(targetIndex, 1);
      return oldCat;
    });
  };

  const setCurrentCat = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const targetIndex = parseInt(e.currentTarget.id.slice(1));
    setCategory(categories[targetIndex]);
  };

  return (
    <Parent selected={category === value}>
      <Child>{category === value ? `<< ${value} >>` : value}</Child>
      <Now onClick={setCurrentCat} id={`n${index.toString()}`}>
        ⬅️
      </Now>
      <Del onClick={deleteCategory} id={index.toString()}>
        ❌
      </Del>
    </Parent>
  );
}

export default Category;
