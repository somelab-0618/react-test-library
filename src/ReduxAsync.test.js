import React from 'react';
// レンダリング、ユーザーイベントテスト用module
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import customCounterReducer from '../src/features/customCounter/customCounterSlice';
// 対象コンポーネント
import ReduxAsync from './ReduxAsync';

afterEach(() => {
  cleanup();
});

describe('ReduxAsyncコンポーネントテスト', () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: { customCounter: customCounterReducer },
    });
  });

  it('fetchDummyが正常終了すると100+payloadの値が表示される', async () => {
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    userEvent.click(screen.getByText('FetchDummy'));
    expect(await screen.findByTestId('count-value')).toHaveTextContent('105');
  });
});
