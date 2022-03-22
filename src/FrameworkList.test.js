import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
// テスト対象のコンポーネントの読み込み
import FrameworkList from './FrameworkList';

afterEach(() => cleanup());

describe('propsを受け取った際のリストのレンダリングテスト', () => {
  it('propsがない場合、「No Data!」がレンダリングされる', () => {
    render(<FrameworkList />); // propsを渡さない
    expect(screen.getByText('No Data!')).toBeInTheDocument(); // テキストが含まれるかチェック
  });
  it('propsがある場合、リストが正しく表示される', () => {
    const dummyData = [
      {
        id: 1,
        item: 'React test',
      },
      {
        id: 2,
        item: 'Angular test',
      },
      {
        id: 3,
        item: 'Vue test',
      },
    ];
    render(<FrameworkList frameworks={dummyData} />); // propsを渡さない
    const frameworkItems = screen
      .getAllByRole('listitem')
      .map((elem) => elem.textContent);
    // ダミーデータのitemを取得し、frameworkItemsの内容と比較できるようにする。
    const dummyItems = dummyData.map((elem) => elem.item);
    expect(frameworkItems).toEqual(dummyItems);
    expect(screen.queryByTestId('No Data!')).toBeNull(); // テキストが含まれるかチェック
  });
});
