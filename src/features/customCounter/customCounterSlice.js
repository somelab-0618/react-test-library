import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const sleep = (msec) => {
  const start = new Date();
  while (new Date() - start < msec);
};

// 2秒後に受け取った値を返す非同期関数
export const fetchDummy = createAsyncThunk('fetch/dummy', async (num) => {
  await sleep(2000);
  return num;
});

export const fetchJSON = createAsyncThunk('fetch/api', async (num) => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/users/1');
  const { username } = res.data;
  return username;
});

const initialState = {
  mode: 0,
  value: 0,
  username: '',
};

export const customCounterSlice = createSlice({
  name: 'customCounter',
  initialState,
  reducers: {
    increment: (state) => {
      switch (state.mode) {
        case 0:
          state.value += 1;
          break;
        case 1:
          state.value += 100;
          break;
        case 2:
          state.value += 10000;
          break;
        default:
          break;
      }
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      switch (state.mode) {
        case 0:
          state.value += action.payload;
          break;
        case 1:
          state.value += 100 * action.payload;
          break;
        case 2:
          state.value += 10000 * action.payload;
          break;
        default:
          break;
      }
    },
  },
  // 非同期関数の後処理
  extraReducers: (builder) => {
    // fetchDummyが正常終了した場合
    builder.addCase(fetchDummy.fulfilled, (state, action) => {
      state.value = 100 + action.payload;
    });
    // fetchDummyが失敗した場合
    builder.addCase(fetchDummy.rejected, (state, action) => {
      state.value = 100 - action.payload;
    });
    // fetchJSONが正常終了した場合
    builder.addCase(fetchJSON.fulfilled, (state, action) => {
      console.log(action.payload);
      state.username = action.payload;
    });
    // fetchJSONが失敗した場合
    builder.addCase(fetchJSON.rejected, (state, action) => {
      console.log(action.payload);
      state.username = 'anonymous';
    });
  },
});

export const { increment, decrement, incrementByAmount } =
  customCounterSlice.actions;

export const selectCount = (state) => state.customCounter.value;
export const selectUsername = (state) => state.customCounter.username;

export default customCounterSlice.reducer;
