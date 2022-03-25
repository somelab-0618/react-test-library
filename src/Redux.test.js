import React from 'react';
// レンダリング、ユーザーイベントテスト用module
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// テスト用store
import { Provider } from 'react-redux';
import Redux from './Redux';
import { configureStore } from '@reduxjs/toolkit';
// Reducer
import customCounterReducer from '../src/features/customCounter/customCounterSlice';

afterEach(() => {
  cleanup();
});

describe('Redux Integration Test', () => {
  let store;
  // 各テストの前にテスト用のstoreを作成する
  // stateはinitialStateが適用されている
  beforeEach(() => {
    store = configureStore({
      reducer: { customCounter: customCounterReducer },
    });
  });

  it('incrementボタンをクリック毎に1増加した値が表示される', () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    userEvent.click(screen.getByText('+'));
    userEvent.click(screen.getByText('+'));
    userEvent.click(screen.getByText('+'));
    expect(screen.getByTestId('count-value')).toHaveTextContent(3);
  });

  it('decrementボタンをクリック毎に1減算した値が表示される', () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    userEvent.click(screen.getByText('-'));
    userEvent.click(screen.getByText('-'));
    expect(screen.getByTestId('count-value')).toHaveTextContent(-2);
  });

  it('incrementByAmountボタンをクリックすると、inputに入力した値が表示される', () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    userEvent.type(screen.getByPlaceholderText('Enter'), '30');
    userEvent.click(screen.getByText('IncrementByAmount'));
    expect(screen.getByTestId('count-value')).toHaveTextContent(30);
  });
});
