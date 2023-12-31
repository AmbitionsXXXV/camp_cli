import fs from "fs"
import path from "path"

// save dependencies that have been analyzed
export const analyzed = new Set<string>()

// This object will hold the dependency graph
// add circularDependencies property to hold circular dependencies
export const dependencyGraph: {
  [key: string]: any
  circularDependencies: { [key: string]: string }
} = { circularDependencies: {} }

export function getPackageJsonContent(filePath: string) {
  const content = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(content)
}

export function traverseDependencies(
  packagePath: string,
  options: any,
  currentDepth: number = 0
) {
  const packageJsonPath = path.join(packagePath, "package.json")
  if (!fs.existsSync(packageJsonPath)) {
    return
  }

  const packageJsonContent = getPackageJsonContent(packageJsonPath)
  const dependencies = packageJsonContent.dependencies || {}
  const peerDependencies = packageJsonContent.peerDependencies || {}
  const devDependencies = packageJsonContent.devDependencies || {}

  const packageName = packageJsonContent.name
  if (analyzed.has(packageName)) {
    if (!dependencyGraph.circularDependencies.hasOwnProperty(packageName)) {
      dependencyGraph.circularDependencies[packageName] = packageJsonContent.version
    }
    return
  }

  analyzed.add(packageName)
  dependencyGraph[packageName] = dependencies

  if (currentDepth < options.depth) {
    for (const dep in { ...dependencies, ...peerDependencies, ...devDependencies }) {
      traverseDependencies(
        path.join(packagePath, "node_modules", dep),
        options,
        currentDepth + 1
      )
    }
  }
}
