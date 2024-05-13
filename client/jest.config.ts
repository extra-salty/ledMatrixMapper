import nextJest from 'next/jest.js';
import type { Config } from 'jest';

// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
const createJestConfig = nextJest({
	dir: './',
});

const config: Config = {
	setupFilesAfterEnv: ['./jest.setup.ts'],
	testEnvironment: 'jest-environment-jsdom',
	// testEnvironment: 'node',
	preset: 'ts-jest',
	// roots: ['./'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
