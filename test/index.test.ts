// test/index.test.ts
import {
  dependencyGraph,
  traverseDependencies,
  getPackageJsonContent,
  analyzed
} from "../lib/index.mts"

jest.mock("fs", () => ({
  readFileSync: jest.fn(),
  existsSync: jest.fn().mockReturnValue(true)
}))

describe("Test traverseDependencies function", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should traverse dependencies correctly", () => {
    // Mock the fs.readFileSync function to return a package.json content
    const packageJsonContent = JSON.stringify({
      name: "byte_dance_camp",
      dependencies: {}
    })
    ;(require("fs").readFileSync as jest.Mock).mockReturnValue(packageJsonContent)

    const options = { depth: 1 }
    const packagePath = "../package.json" // Provide the correct path here

    // Clear the analyzed set before each test
    analyzed.clear()

    traverseDependencies(packagePath, options)

    // Assert the expected values
    expect(dependencyGraph["byte_dance_camp"]).toEqual({})
    expect(Object.keys(dependencyGraph.circularDependencies)).toHaveLength(0)
    expect(analyzed.has("byte_dance_camp")).toBe(true)
  })
})

describe("Test getPackageJsonContent function", () => {
  it("should get package.json content correctly", () => {
    // Mock the fs.readFileSync function to return a package.json content
    const packageJsonContent = JSON.stringify({
      name: "byte_dance_camp",
      dependencies: {}
    })
    ;(require("fs").readFileSync as jest.Mock).mockReturnValue(packageJsonContent)

    const filePath = "../package.json" // Provide the correct path here

    const result = getPackageJsonContent(filePath)

    // Assert the expected values
    expect(result).toEqual({
      name: "byte_dance_camp",
      dependencies: {}
    })
  })
})

describe("Test dependencyGraph object", () => {
  it("should hold the correct dependency graph", () => {
    // Mock the fs.readFileSync function to return a package.json content
    const packageJsonContent = JSON.stringify({
      name: "byte_dance_camp",
      dependencies: {}
    })
    ;(require("fs").readFileSync as jest.Mock).mockReturnValue(packageJsonContent)

    const options = { depth: 1 }
    const packagePath = "../package.json" // Provide the correct path here

    // Clear the analyzed set before each test
    analyzed.clear()

    traverseDependencies(packagePath, options)

    // Assert the expected values
    expect(dependencyGraph["byte_dance_camp"]).toEqual({})
    expect(Object.keys(dependencyGraph.circularDependencies)).toHaveLength(0)
  })
})
