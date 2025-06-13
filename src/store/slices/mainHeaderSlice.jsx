import { createSlice } from "@reduxjs/toolkit";

const mainHeaderSlice = createSlice({
  name: "mainHeader",
  initialState: [],
  reducers: {
    init(state, action) {
      if (state.length === 0) {
        state.push(...action.payload);
      }
    },
    toggleFavorites(state, action) {
      const favoritesGroupItem = state.find(
        ({ favorites }) => favorites
      )?.groupItem;

      const groupIndex = favoritesGroupItem.findIndex(
        ({ id }) => id === action.payload[0].id
      );

      if (groupIndex >= 0) {
        const subItemIndex = favoritesGroupItem[groupIndex].subItems.findIndex(
          ({ id }) => id === action.payload[1].id
        );

        if (subItemIndex >= 0) {
          favoritesGroupItem[groupIndex].subItems.splice(subItemIndex, 1);
          if (favoritesGroupItem[groupIndex].subItems.length === 0) {
            favoritesGroupItem.splice(0, 1);
          }
        } else {
          favoritesGroupItem[groupIndex].subItems.push(action.payload[1]);
        }
      } else {
        favoritesGroupItem.push({ ...action.payload[0], subItems: [] });
        favoritesGroupItem[favoritesGroupItem.length - 1].subItems.push(
          action.payload[1]
        );
      }
    },
  },
});

export default mainHeaderSlice.reducer;

export const mainHeaderAction = mainHeaderSlice.actions;
