import { atom, selector } from "recoil";

interface IToDoState {
  [key: string]: ITodo[];
  //property as string, and string array
}

export interface ITodo {
  id: number;
  text: string;
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    to_do: [
      { id: 1, text: "hello" },
      { id: 2, text: "jello" },
    ],
    doing: [],
    done: [],
    hehe: [],
  },
});
