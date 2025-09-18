import { describe, it, expect } from "vitest";
import { LazyArray } from "./LazyArray";

describe("LazyArray", () => {
  it("fetches data in batches", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const lazy = new LazyArray(arr, { pullSize: 3 });

    const first = lazy.fetch();
    expect(first.data).toEqual([1, 2, 3]);
    expect(first.hasMore).toBe(true);

    const second = lazy.fetch();
    expect(second.data).toEqual([1, 2, 3, 4, 5, 6]);
    expect(second.hasMore).toBe(true);

    const third = lazy.fetch();
    expect(third.data).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(third.hasMore).toBe(true);

    const last = lazy.fetch();
    expect(last.data).toEqual(arr);
    expect(last.hasMore).toBe(false);
  });

  it("handles exact batch size", () => {
    const arr = [1, 2, 3];
    const lazy = new LazyArray(arr, { pullSize: 3 });

    const result = lazy.fetch();
    expect(result.data).toEqual(arr);
    expect(result.hasMore).toBe(false);
  });

  it("handles empty array gracefully", () => {
    const lazy = new LazyArray([], { pullSize: 2 });
    const result = lazy.fetch();
    expect(result.data).toEqual([]);
    expect(result.hasMore).toBe(false);
  });
});
