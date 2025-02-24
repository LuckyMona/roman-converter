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
      status: 400
    } as Response);

    await expect(getRomanNumeral('0')).rejects.toThrow('Invalid input, please enter an integer between 1 and 3999');
  });

  test('server error - return 500 Server Error', async () => {
    // Mock return 500 code
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500
    } as Response);

    await expect(getRomanNumeral('123')).rejects.toThrow('Server error, please try again later');
  });

  test('network error - throw Unknown error occurred', async () => {
    // Mock network error
    mockFetch.mockRejectedValueOnce(new Error('Network Error'));

    await expect(getRomanNumeral('12')).rejects.toThrow('Network Error');
  });
});
