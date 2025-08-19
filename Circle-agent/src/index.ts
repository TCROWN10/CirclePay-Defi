import {
  logger,
  type Character,
  type IAgentRuntime,
  type Project,
  type ProjectAgent,
} from '@elizaos/core';
import starterPlugin from './plugin.ts';
import { character as circleCharacter } from './agent.ts';

/**
 * Represents the Circle character - a sophisticated DeFi agent and assistant.
 * Circle responds to DeFi-related questions, provides strategy recommendations,
 * and helps users navigate the complex world of decentralized finance safely.
 * Circle emphasizes risk management, user education, and staying updated on DeFi trends.
 */
export const character: Character = circleCharacter;

const initCharacter = ({ runtime }: { runtime: IAgentRuntime }) => {
  logger.info('Initializing Circle character');
  logger.info('Name: ', character.name);
  logger.info('Bio: ', character.bio);
};

export const projectAgent: ProjectAgent = {
  character,
  init: async (runtime: IAgentRuntime) => await initCharacter({ runtime }),
  plugins: [starterPlugin], // Enable the starter plugin
};

const project: Project = {
  agents: [projectAgent],
};

// Export test suites for the test runner
export { testSuites } from './__tests__/e2e/index.ts';

export default project;
