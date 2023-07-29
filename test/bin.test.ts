// test/bin.test.ts
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

describe('Test CLI command: analyze', () => {
  it('should analyze dependencies and create JSON file', () => {
    const packagePath = '.'; // Provide the correct path here

    const result = spawnSync(
      'ts-node',
      [
        '--esm',
        './bin/index.mts', // Provide the correct path to your bin file
        'analyze',
        '--depth',
        '0',
        '--json',
        './output.json',
      ],
      { cwd: packagePath }
    );

    // Assert the expected output
    expect(result.status).toBe(0);
    expect(result.stdout.toString()).toContain('JSON file created successfully.');

    // Read the JSON file and assert its contents
    const jsonFilePath = './output.json';
    const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8');
    const parsedJson = JSON.parse(jsonContent);
    expect(parsedJson).toEqual({
      circularDependencies: {},
      byte_dance_camp: {}
    });

    // Clean up: delete the JSON file after the test
    fs.unlinkSync(jsonFilePath);
  });
});
