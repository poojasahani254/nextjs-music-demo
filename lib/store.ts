import { createStore, action } from "easy-peasy";
import { createWrapper } from "next-redux-wrapper";

const States = {
  activeSongs: [],
  activeSong: null,
  changeActiveSongs: action((state: any, payload: any) => {
    state.activeSongs = payload;
  }),
  changeActiveSong: action((state: any, payload: any) => {
    state.activeSong = payload;
  }),

  favoriteSongs: [],
  changeFavoriteSong: action((state: any, payload: any) => {
    state.favoriteSongs = [
      ...new Map(
        [...state.favoriteSongs, payload].map((value, index, array) => [
          value["songId"],
          value,
        ])
      ).values(),
    ];
  }),
  changeFavoriteSongs: action((state: any, payload: any) => {
    state.favoriteSongs = payload;
  }),
};

const initStore = () => {
  return createStore(States);
};

export const wrapper = createWrapper(initStore);