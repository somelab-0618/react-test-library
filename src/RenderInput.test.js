import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RenderInput from './RenderInput'; // テスト対象コンポーネント

afterEach(() => cleanup()); // 各テスト後にコンポーネントのマウントを解除

describe('レンダリング', () => {
  it('すべての要素が正しくレンダリングされている', () => {
    render(<RenderInput />);
    expect(screen.getByRole('button')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter')).toBeTruthy(); // placeholderのテキストで要素を取得できる
  });
});

describe('インプットフォームのonChengeイベント', () => {
  it('入力された値が正しく更新されている', () => {
    render(<RenderInput />);
    // コンポーネントからinput要素を取得
    const inputElem = screen.getByPlaceholderText('Enter');
    // ユーザーのアクション
    userEvent.type(inputElem, 'test'); // ユーザーの入力をシミュレート
    expect(inputElem.value).toBe('test');
  });
});

describe('「Console」ボタンからのoutput関数の呼び出し条件', () => {
  it('inputステートが空の場合はoutput関数は呼び出さない', () => {
    // モック関数の定義
    const outputFunction = jest.fn();
    render(<RenderInput outputConsole={outputFunction} />);

    // クリックをシミュレート
    userEvent.click(screen.getByRole('button'));
    expect(outputFunction).not.toHaveBeenCalled(); // 関数が呼び出されない
  });

  it('inputステートに値が入っているの場合はoutput関数を呼び出す', () => {
    // モック関数の定義
    const outputFunction = jest.fn();
    render(<RenderInput outputConsole={outputFunction} />);

    const inputElem = screen.getByPlaceholderText('Enter');
    userEvent.type(inputElem, 'test');
    // クリックをシミュレート
    userEvent.click(screen.getByRole('button'));
    expect(outputFunction).toHaveBeenCalledTimes(1); // 関数が1回呼び出される
  });
});
