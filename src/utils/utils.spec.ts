import { createObjectDiff } from "./utils";

test("Utils - createObjectDiff - standard diff", () => {
  const currentConfig = {
    same: "same",
    newer: "old",
    removed: "removed"
  };
  const newConfig = {
    same: "same",
    newer: "newer",
    added: "added"
  };
  const expectedDiff = {
    newer: "newer",
    removed: null,
    added: "added"
  };
  const diff = createObjectDiff(currentConfig, newConfig);
  expect(diff).toEqual(expectedDiff);
});

test("Utils - createObjectDiff - diff with children", () => {
  const currentConfig = {
    same: "same",
    newer: "old",
    removed: "removed",
    child: {
      same: "same",
      newer: "old",
      removed: "removed",
      child: {
        same: "same",
        newer: "old",
        removed: "removed"
      }
    }
  };
  const newConfig = {
    same: "same",
    newer: "newer",
    added: "added",
    child: {
      same: "same",
      newer: "newer",
      added: "added",
      child: {
        same: "same",
        newer: "newer",
        added: "added"
      }
    }
  };
  const expectedDiff = {
    newer: "newer",
    removed: null,
    added: "added",
    child: {
      newer: "newer",
      removed: null,
      added: "added",
      child: {
        newer: "newer",
        removed: null,
        added: "added"
      }
    }
  };
  const diff = createObjectDiff(currentConfig, newConfig);
  expect(diff).toEqual(expectedDiff);
});
