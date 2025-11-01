export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "chore",
        "ci",
        "revert",
      ],
    ],
    "type-case": [2, "always", "lower-case"],
    "subject-case": [0],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-empty": [2, "never"],
    "scope-empty": [0],
  },
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^(feat|fix|docs|style|refactor|perf|test|chore|ci|revert)\/(\w+):\s(.+)$/,
      headerCorrespondence: ["type", "scope", "subject"],
    },
  },
};
