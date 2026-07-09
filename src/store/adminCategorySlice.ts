import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { Status } from "../globals/types/type";
import type { AppDispatch } from "./store";
import { API, APIWITHTOKEN } from "../http";

interface ICategory{
    id : string,
    categoryName : string
}


interface ICategoryInitialState{
    items : ICategory[],
    status : Status
}

const initialState: ICategoryInitialState = {
  items: [],
  status: Status.LOADING,
};

const adminCategorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    setItems(state: ICategoryInitialState
    , action: PayloadAction<ICategory[]>) {
      state.items = action.payload;
    },
    setStatus(state: ICategoryInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    addCategoryToItems(state:ICategoryInitialState,action:PayloadAction<ICategory>){
state.items.push(action.payload)
    },
   
    setDeleteCategoryItem(state:ICategoryInitialState , action: PayloadAction<string>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload,
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    resetStatus(state:ICategoryInitialState){
      state.status = Status.LOADING;
    }
  },
});

export const { setItems, setStatus,  setDeleteCategoryItem,addCategoryToItems,resetStatus } =
  adminCategorySlice.actions;


export default adminCategorySlice.reducer;

export function addToCategory(categoryName: string) {
  return async function addToCategoryThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.post("/category", {
      categoryName : categoryName
      });
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(addCategoryToItems(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchCategoryItems() {
  return async function addToCategoryThunk(dispatch: AppDispatch) {
    try {
      const response = await API.get("/category");
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setItems(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// export function handleCategoryItemUpdate(productId: string, quantity: number) {
//   return async function handleCategoryItemUpdateThunk(dispatch: AppDispatch) {
//     try {
//       const response = await APIWITHTOKEN.patch("/Category/" + productId, {
//         quantity: quantity,
//       });
//       if (response.status === 200) {
//         dispatch(setStatus(Status.SUCCESS));
//         dispatch(setUpdateCategoryItem({ productId, quantity }));
//       } else {
//         dispatch(setStatus(Status.ERROR));
//       }
//     } catch (error) {
//       dispatch(setStatus(Status.ERROR));
//     }
//   };
// }

export function handleCategoryItemDelete(categoryId: string) {
  return async function handleCategoryItemDeleteThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.delete("/category/" + categoryId);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setDeleteCategoryItem(categoryId));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
