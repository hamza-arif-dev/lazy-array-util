export type LazyArrayOptions = {
  pullSize: number;
};

export class LazyArray<T> {
  private readonly generator: Generator<T>;
  private readonly pullSize: number;
  private readonly totalElements: number;
  private currentIndex = 0;
  private data: T[] = [];

  constructor(array: T[], options: LazyArrayOptions) {
    if (!Array.isArray(array)) {
      throw new Error("Invalid data provided");
    }
    this.generator = this.toGenerator(array);
    this.pullSize = options.pullSize;
    this.totalElements = array.length;
  }

  private *toGenerator(array: T[]): Generator<T> {
    for (const item of array) {
      yield item;
    }
  }

  fetch() {
    for (let i = 0; i < this.pullSize; i++) {
      const { value, done } = this.generator.next();
      if (value !== undefined) {
        this.data.push(value);
      }
      if (this.currentIndex < this.totalElements) this.currentIndex++;
      if (done) break;
    }

    return {
      data: [...this.data],
      totalElements: this.totalElements,
      hasMore: this.currentIndex !== this.totalElements,
    };
  }
}
