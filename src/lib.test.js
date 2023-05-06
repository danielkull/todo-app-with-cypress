/// <reference types="jest" />

import {
  emptyToDoText,
  isDuplicate,
  isFilterAll,
  isFilterDone,
  isFilterOpen,
  isTodoDone,
} from "./lib";

describe("#check if emptyToDoText function reconizes empty or filled text", () => {
  it("return true if no text is given", () => {
    const result = emptyToDoText("");
    expect(result).toBe(true);
  });

  it("return false one or more letters are given", () => {
    const result = isTodoDone("L");
    expect(result).toBe(false);
  });
});

test("#find duplicate of current todo Text", () => {
  const newTodo = "Learn Jest";
  const todos = [
    {
      todo: "Learn jest",
      done: false,
    },
    {
      todo: "Learn HTML",
      done: false,
    },
  ];

  const result = isDuplicate(newTodo, todos);

  expect(result).toBe(true);
});

test("#check if current todo Text passes if no duplicate exists", () => {
  const newTodo = "Learn Jest";
  const todos = [
    {
      todo: "Learn CSS",
      done: false,
    },
    {
      todo: "Learn HTML",
      done: false,
    },
  ];

  const result = isDuplicate(newTodo, todos);

  expect(result).toBe(false);
});

describe("#check if todo is done/checked", () => {
  it("return true if checkbox is checked", () => {
    const result = isTodoDone(true);
    expect(result).toBe(true);
  });

  it("return false if checkbox is not checked", () => {
    const result = isTodoDone(false);
    expect(result).toBe(false);
  });
});

describe("#check if Function isFilterALL() works", () => {
  it("return true if value is all", () => {
    const result = isFilterAll("all");
    expect(result).toBe(true);
  });

  it("return false if value is not all", () => {
    const result = isFilterAll("open");
    expect(result).toBe(false);
  });
});

describe("#check if Function isFilterOpen() works", () => {
  it("return true if value is open", () => {
    const result = isFilterOpen("open");
    expect(result).toBe(true);
  });

  it("return false if value is not open", () => {
    const result = isFilterOpen("done");
    expect(result).toBe(false);
  });
});

describe("#check if Function isFilterDone() works", () => {
  it("return true if value is done", () => {
    const result = isFilterDone("done");
    expect(result).toBe(true);
  });

  it("return false if value is not done", () => {
    const result = isFilterDone("open");
    expect(result).toBe(false);
  });
});
