# Lazy Array Util

A lightweight utility for working with arrays lazily in chunks.  
Instead of loading all data at once, `LazyArray` lets you fetch elements in configurable batches (`pullSize`).

---

## ✨ Features

- Fetch array items in **chunks**.
- Keeps track of **progress** (`currentIndex`, `hasMore`).

---

## 📦 Installation

```bash
npm install lazy-array-util
```

## 🚀 Usage

```ts
import { LazyArray } from "@hamza_arif/lazy-array";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const lazy = new LazyArray(numbers, { pullSize: 3 });

console.log(lazy.fetch());
// { data: [1, 2, 3], totalElements: 9, hasMore: true }

console.log(lazy.fetch());
// { data: [1, 2, 3, 4, 5, 6], totalElements: 9, hasMore: true }

console.log(lazy.fetch());
// { data: [1, 2, 3, 4, 5, 6, 7, 8, 9], totalElements: 9, hasMore: false }
```
