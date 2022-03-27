// テスト対象のHooksをインポート
import { useCounter } from './useCounter';
import { act, renderHook } from '@testing-library/react-hooks';
import { cleanup } from '@testing-library/react';

afterEach(() => cleanup());

describe('useCounter カスタムフックテスト', () => {
  it('incrementがクリックされると1増加する', () => {
    const { result } = renderHook(() => useCounter(3));
    // 初期値の確認
    expect(result.current.count).toBe(3);
    // incrementの実行
    act(() => {
      result.current.increment();
    });
    // 結果の確認
    expect(result.current.count).toBe(4);
  });
  it('decrementがクリックされると1減算する', () => {
    const { result } = renderHook(() => useCounter(3));
    // 初期値の確認
    expect(result.current.count).toBe(3);
    // incrementの実行
    act(() => {
      result.current.decrement();
    });
    // 結果の確認
    expect(result.current.count).toBe(2);
  });
  it('doubleがクリックされると2倍になる', () => {
    const { result } = renderHook(() => useCounter(3));
    // 初期値の確認
    expect(result.current.count).toBe(3);
    // incrementの実行
    act(() => {
      result.current.double();
    });
    // 結果の確認
    expect(result.current.count).toBe(6);
  });
  it('tripleがクリックされると3倍になる', () => {
    const { result } = renderHook(() => useCounter(3));
    // 初期値の確認
    expect(result.current.count).toBe(3);
    // incrementの実行
    act(() => {
      result.current.triple();
    });
    // 結果の確認
    expect(result.current.count).toBe(9);
  });
  it('restがクリックされると0になる', () => {
    const { result } = renderHook(() => useCounter(3));
    // 初期値の確認
    expect(result.current.count).toBe(3);
    // incrementの実行
    act(() => {
      result.current.reset();
    });
    // 結果の確認
    expect(result.current.count).toBe(0);
  });
});
