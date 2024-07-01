/**
 * Value of `NODE_ENV`: `"testing"`, `"development"`, or `"production"`
 */
export const nodeEnv = import.meta.env.NODE_ENV || '';

const validEnvModes = ['testing', 'development', 'production'];

const isNodeEnvValid = (envValue: string) => validEnvModes.includes(envValue);

// ensure NODE_ENV is set to a valid value
if (!nodeEnv || !isNodeEnvValid(nodeEnv)) {
  console.error(`Invalid NODE_ENV: ${nodeEnv}`);
  process.exit(1);
}
