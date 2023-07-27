#!/usr/bin/env node

import fs from "fs"
import { program } from "commander"
import { dependencyGraph, traverseDependencies } from "../lib"

program
  .command("analyze")
  .description("Analyze dependencies")
  .option("--depth <n>", "The maximum depth of analysis", "Infinity")
  .option("--json <file-path>", "Output to a JSON file")
  .action(options => {
    options.depth = options.depth === "Infinity" ? Infinity : parseInt(options.depth)
    traverseDependencies(process.cwd(), options)
    const jsonString = JSON.stringify(dependencyGraph, null, 2)

    if (options.json) {
      // Write the dependency graph to a JSON file if --json is provided
      fs.writeFile(options.json, jsonString, err => {
        if (err) {
          console.error("JSON file is not", err)
        } else {
          console.log("JSON file created successfully.")
        }
      })
    } else {
      // Otherwise, open a website to visualize the dependency graph
    }
  })

program.parse(process.argv)
