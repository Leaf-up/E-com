import { describe, expect } from '@jest/globals';
import { existsSync } from 'fs';
import * as path from 'node:path';

describe('Presence of project files', () => {
  it('Files must be on their places', async () => {
    const readmeFilePath = path.resolve(__dirname, '../README.md');
    expect(existsSync(readmeFilePath)).toBeTruthy();

    const packageFilePath = path.resolve(process.cwd(), 'package.json');
    expect(existsSync(packageFilePath)).toBeTruthy();

    const indexFilePath = path.resolve(process.cwd(), 'index.html');
    expect(existsSync(indexFilePath)).toBeTruthy();

    const appFilePath = path.resolve(process.cwd(), 'src/App.tsx');
    expect(existsSync(appFilePath)).toBeTruthy();
  });
});
