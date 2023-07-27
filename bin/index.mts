#!/usr/bin/env node

import fs from "fs"
import ora from "ora"
import chalk from "chalk"
import { program } from "commander"
// import { exec } from "child_process"
import { dependencyGraph, traverseDependencies } from "../lib/index.mjs"

program
  .command("analyze")
  .description("Analyze dependencies")
  .option("--depth <n>", "The maximum depth of analysis", "Infinity")
  .option("--json <file-path>", "Output to a JSON file")
  .action((options: { depth?: string | number; json: string }) => {
    options.depth =
      options.depth === "Infinity" ? Infinity : parseInt(options.depth as string)
    
    const spinner = ora("Analyzing dependencies...").start()

    traverseDependencies(process.cwd(), options)
    const jsonString = JSON.stringify(dependencyGraph, null, 2)

    if (options.json) {
      // Write the dependency graph to a JSON file if --json is provided
      fs.writeFile(options.json, jsonString, err => {
        if (err) {
          console.error(chalk.red("JSON file is not"), err)
        } else {
          console.log(chalk.green("JSON file created successfully."))
          spinner.succeed("Analysis complete!")
        }
      })
    } else {
      // Otherwise, open a website to visualize the dependency graph
      // exec("npm run start", (error, stdout, stderr) => {
      //   if (error) {
      //     console.error(
      //       chalk.red(`Error occurred while starting server: ${error.message}`)
      //     )
      //     return
      //   }
      //   if (stderr) {
      //     console.error(chalk.red(`Error occurred while starting server: ${stderr}`))
      //     return
      //   }
      //
      //   console.log(chalk.green("Server started successfully!"))
      //   spinner.succeed("Server launched!")
      // })
    }
  })

program.parse(process.argv)
