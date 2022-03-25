// reducerとテストする関数をインポート
import reducer, { fetchDummy } from './customCounterSlice';

describe('extraReducersテスト', () => {
  const initialState = {
    mode: 0,
    value: 0,
  };
  it('正常終了の場合、payloadの値 + 100が返される', () => {
    const action = { type: fetchDummy.fulfilled.type, payload: 5 };
    const state = reducer(initialState, action);
    expect(state.value).toEqual(105);
  });
  it('失敗の場合、100 - payloadの値 が返される', () => {
    const action = { type: fetchDummy.rejected.type, payload: 5 };
    const state = reducer(initialState, action);
    expect(state.value).toEqual(95);
  });
});
