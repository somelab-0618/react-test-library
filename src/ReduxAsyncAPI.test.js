import React from 'react';
// レンダリング、ユーザーイベントテスト用module
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import customCounterReducer from '../src/features/customCounter/customCounterSlice';

import ReduxAsync from './ReduxAsync';

// モックサーバー定義
const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/users/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: 'Dummy User' }));
  })
);

// サーバー起動
beforeAll(() => server.listen());
// テスト毎にサーバーをリセット
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
// すべてのテストが終了したらサーバーを停止
afterAll(() => server.close());

describe('Redux Async API モックテスト', () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: { customCounter: customCounterReducer },
    });
  });

  it('[FetchJSON成功時]usernameが<h3>タグで表示される', async () => {
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    expect(screen.queryByRole('heading')).toBeNull();
    userEvent.click(screen.getByText('FetchJSON'));
    expect(await screen.findByText('Dummy User')).toBeInTheDocument();
  });

  it('[FetchJSON失敗時]"anonymous"が<h3>タグで表示される', async () => {
    server.use(
      rest.get('https://jsonplaceholder.typicode.com/users/1', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    expect(screen.queryByRole('heading')).toBeNull();
    userEvent.click(screen.getByText('FetchJSON'));
    expect(await screen.findByText('anonymous')).toBeInTheDocument();
  });
});
