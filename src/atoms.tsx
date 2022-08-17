import {
  atom,
  DefaultValue,
  RecoilState,
  selector,
  useRecoilState,
} from "recoil";

// export type Tcategories = "DONE" | "DOING" | "TO_DO";
// export enum Categories {
//   "TO_DO" = "TO_DO",
//   "DOING" = "DOING",
//   "DONE" = "DONE",
// }

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects: [
    ({ onSet, setSelf }) => {
      const storedData = localStorage.getItem("toDo");
      if (storedData != null) {
        setSelf(JSON.parse(storedData));
      }
      onSet((newList) => {
        console.log("updated todo");
        localStorage.setItem("toDo", JSON.stringify(newList));
      });
    },
  ],
});

export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});

export const categoriesState = atom({
  key: "categoriesState",
  default: ["DONE", "DOING", "TO_DO"],
  effects: [
    ({ onSet, setSelf }) => {
      const storedData = localStorage.getItem("categoriesState");
      if (storedData != null) {
        setSelf(JSON.parse(storedData));
      }
      onSet((newList) => {
        console.log("updated cat");
        localStorage.setItem("categoriesState", JSON.stringify(newList));
      });
    },
  ],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    console.log(toDos);
    return [...toDos.filter((toDo) => toDo.category === category)];
  },
});
