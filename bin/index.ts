#!/usr/bin/env node

import fs from "fs"
import path from "path"
import { program } from "commander"

const analyzed = new Set<string>()
let dependencyGraph: { [key: string]: any } = {}
// This object will hold the dependency graph

function getPackageJsonContent(filePath: string) {
  const content = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(content)
}

function traverseDependencies(
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

program
  .command("analyze")
  .description("Analyze dependencies")
  .option("--depth <n>", "The maximum depth of analysis", "Infinity")
  .option("--json <file-path>", "Output to a JSON file")
  .action(options => {
    options.depth = options.depth === "Infinity" ? Infinity : parseInt(options.depth)
    traverseDependencies(process.cwd(), options)
    const jsonString = JSON.stringify(dependencyGraph, null, 2)
    // Write the dependency graph to a JSON file if --json is provided
    fs.writeFile(options.json, jsonString, (err) => {
        if (err) {
          console.error("JSON file is not", err);
        } else {
          console.log("JSON file created successfully.");
        }})
    
  })

program.parse(process.argv)
