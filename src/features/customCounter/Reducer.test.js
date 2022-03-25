// Reducerをインポート
import reducer, { increment, incrementByAmount } from './customCounterSlice';

describe('ReduxToolKitのReducerテスト', () => {
  describe('increment action', () => {
    // テスト用state
    let initialState = {
      mode: 0,
      value: 1,
    };

    it('mode 0では、1増加する', () => {
      const action = { type: increment.type };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(2);
    });
    it('mode 1では、100増加する', () => {
      initialState = {
        mode: 1,
        value: 1,
      };
      const action = { type: increment.type };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(101);
    });
    it('mode2では、10000増加する', () => {
      initialState = {
        mode: 2,
        value: 1,
      };
      const action = { type: increment.type };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(10001);
    });
  });
  describe('incrementByAmount action', () => {
    // テスト用state
    let initialState = {
      mode: 0,
      value: 1,
    };
    it('mode 0ではpayloadの値分増加する', () => {
      const action = { type: incrementByAmount.type, payload: 3 };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(4);
    });
    it('mode 1ではpayloadの100倍増加する', () => {
      initialState = {
        mode: 1,
        value: 1,
      };
      const action = { type: incrementByAmount.type, payload: 3 };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(301);
    });
    it('mode 2ではpayloadの10000倍増加する', () => {
      initialState = {
        mode: 2,
        value: 1,
      };
      const action = { type: incrementByAmount.type, payload: 3 };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(30001);
    });
  });
});
