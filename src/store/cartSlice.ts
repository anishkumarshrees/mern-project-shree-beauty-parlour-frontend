import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  ICartInitialState,
  ICartItem,
  ICartUpdateItem,
} from "../pages/cart/type";
import { Status } from "../globals/types/type";
import type { AppDispatch } from "./store";
import { APIWITHTOKEN } from "../http";

const initialState: ICartInitialState = {
  items: [],
  status: Status.LOADING,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setItems(state: ICartInitialState, action: PayloadAction<ICartItem[]>) {
      state.items = action.payload;
    },
    setStatus(state: ICartInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setUpdateCartItem(
      state: ICartInitialState,
      action: PayloadAction<ICartUpdateItem>,
    ) {
      const index = state.items.findIndex(
        (item) => item.productId === action.payload.productId,
      );
      if (index !== -1) {
        state.items[index].quantity = action.payload.quantity;
      }
    },
    setDeleteCartItem(state: ICartInitialState, action: PayloadAction<string>) {
      const index = state.items.findIndex(
        (item) => item.productId === action.payload,
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { setItems, setStatus, setUpdateCartItem, setDeleteCartItem } =
  cartSlice.actions;
export default cartSlice.reducer;

export function addToCart(productId: string) {
  return async function addToCartThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.post("/cart", {
        productId: productId,
        quantity: 1,
      });
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

export function fetchCartItems() {
  return async function addToCartThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.get("/cart");
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

export function handleCartItemUpdate(productId: string, quantity: number) {
  return async function handleCartItemUpdateThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.patch("/cart/" + productId, {
        quantity: quantity,
      });
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setUpdateCartItem({ productId, quantity }));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function handleCartItemDelete(productId: string) {
  return async function handleCartItemDeleteThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.delete("/cart/" + productId);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setDeleteCartItem(productId));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
