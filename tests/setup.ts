// Mock environment variables
process.env.OPENAI_API_KEY = 'test-key';
process.env.REDIS_URL = 'redis://localhost:6379';

// Mock Redis client
jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => ({
    connect: jest.fn(),
    disconnect: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  }));
});

// Global test timeout
jest.setTimeout(10000); 