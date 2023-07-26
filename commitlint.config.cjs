module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "init",
        "fix",
        "docs",
        "refactor",
        "perf",
        "test",
        "chore",
        "revert",
        "build"
      ]
    ],
    "subject-case": [0]
  }
}
