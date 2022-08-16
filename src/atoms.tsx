import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minutes",
  default: 0,
});

// export const hourSelector = selector<number>({
export const hourSelector = selector({
  key: "hours",
  get: ({ get }) => {
    console.log(get(minuteState) * 60);
    return get(minuteState) / 60;
  },
  set: ({ set }, newValue) => {
    console.log(typeof newValue);
    set(minuteState, Number(newValue) * 60);
  },
});
