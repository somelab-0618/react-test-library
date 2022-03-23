import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
// テスト対象のコンポーネントの読み込み
import MockServer from './MockServer';

// モックサーバーを定義
const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/users/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: 'Dummy User' }));
  })
);

// モックサーバーを起動
beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close);

describe('Mocking API', () => {
  it('Fetchが成功した場合はデータが正しく表示され、ボタンが無効化される', async () => {
    render(<MockServer />);
    userEvent.click(screen.getByRole('button'));
    expect(await screen.findByText('Dummy User')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });
  it('Fetchが失敗した場合はエラーメッセージが表示され、h3タグは非表示かつボタンが有効化されている', async () => {
    // serverをエラーのレスポンスに書き換える
    server.use(
      rest.get('https://jsonplaceholder.typicode.com/users/1', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    render(<MockServer />);
    userEvent.click(screen.getByRole('button'));
    expect(await screen.findByTestId('error')).toHaveTextContent('Fetching Failed!');
    expect(await screen.queryByRole('heading')).toBeNull();
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
  });
});
