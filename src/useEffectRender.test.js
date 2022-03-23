import React from 'react';
import { render, screen } from '@testing-library/react';
// テスト対象コンポーネント
import UseEffectRender from './UseEffectRender';

describe('userEffectのレンダリング', () => {
  it('async functionがresolvedになった後、内容がレンダリングされる', async () => {
    render(<UseEffectRender />);
    // resolved以前
    expect(screen.queryByText(/I am/)).toBeNull(); // 正規表現を使うと文字列の一部を比較対象にできる
    // resolved後 findByで非同期が完了するまで待ってくれる
    expect(await screen.findByText(/I am/)).toBeInTheDocument();
  });
});
