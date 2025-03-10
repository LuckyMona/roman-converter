import { getRomanNumeral } from './romanNumeral';

describe('getRomanNumeral', () => {
  const BASE_URL = 'http://localhost:8080';
  const mockFetch = jest.spyOn(global, 'fetch');

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('req success - return correct JSON', async () => {
    // Mock success response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ input: '12', output: 'XII' })
    } as Response);

    const result = await getRomanNumeral('12');
    expect(result).toEqual({ input: '12', output: 'XII' });
    expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/romannumeral?query=12`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
  });

  test('req fail - return 400 Bad Request', async () => {
    // Mock return 400 code
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ error: 'Invalid input, please enter an integer between 1 and 3999' })
    } as Response);
    await expect(getRomanNumeral('0')).rejects.toThrow('Invalid input, please enter an integer between 1 and 3999');
  });

  test('server error - return 500 Server Error', async () => {
    // Mock return 500 code
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Server error, please try again later' })
    } as Response);
    await expect(getRomanNumeral('123')).rejects.toThrow('Server error, please try again later');
  });

  test('network error - throw Unknown error occurred', async () => {
    // Mock network error
    mockFetch.mockRejectedValueOnce(new Error('Network Error'));
    await expect(getRomanNumeral('12')).rejects.toThrow('Network Error');
  });
  test('req fail - return 400 Bad Request without error message', async () => {
    // Mock return 400 with empty JSON
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({}) // No error message provided
    } as Response);
    await expect(getRomanNumeral('0')).rejects.toThrow('Unknown error');
  });
  test('JSON parse error - throw Unknown error occurred', async () => {
    // Mock response.json() throwing an error
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('Unexpected token in JSON');
      }
    } as unknown as Response);
    await expect(getRomanNumeral('12')).rejects.toThrow('Unexpected token in JSON');
  });
  test('JSON parse error - throw Unknown error occurred when error message is empty', async () => {
    // Mock response.json() throwing an error with an empty message
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('');
      }
    } as unknown as Response);
    await expect(getRomanNumeral('12')).rejects.toThrow('Unknown error occurred');
  });
});
