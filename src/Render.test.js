import React from 'react';
import { render, screen } from '@testing-library/react';
// テスト対象のコンポーネントの読み込み
import Render from './Render';

// テストスイート（実行単位）のタイトル
describe('Rendaring', () => {
  // テストケース
  it('すべての要素が正しくレンダリングされている', () => {
    // コンポーネントの内容を取得
    render(<Render />);
    // 要素にアクセス
    // screen.debug(); // コンポーネントのすべての要素をデバッグしてコンソールに出力する
    // screen.debug(screen.getByRole('heading'));
    expect(screen.getByRole('heading')).toBeTruthy(); // 要素の存在をチェック
    expect(screen.getByRole('textbox')).toBeTruthy(); // 要素の存在をチェック
    expect(screen.getAllByRole('button')[0]).toBeTruthy(); // 複数要素の存在をチェック
    expect(screen.getAllByRole('button')[1]).toBeTruthy(); // 複数要素の存在をチェック
    // screen.debug(screen.getByText('React Rendering Test'));
    expect(screen.getByText('React Rendering Test')).toBeTruthy(); // テキストが表示されていることをチェック
    expect(screen.queryByText('Vue Rendering Test')).toBeNull(); // テキストが存在しないことをチェック
    expect(screen.getByTestId('copyright')).toBeTruthy(); // idで要素を取得し存在ことをチェック
  });
});
