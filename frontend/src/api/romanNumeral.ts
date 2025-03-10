interface RomanNumeralResponse {
  input: string;
  output: string;
}

const BASE_URL = 'http://localhost:8080';

export const getRomanNumeral = async (query: string): Promise<RomanNumeralResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/romannumeral?query=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // when response is bad
    if (!response.ok) {
      const errorData: { error?: string } = await response.json();
      throw new Error(errorData.error || 'Unknown error');
    }

    // convert to JSON object
    const data: RomanNumeralResponse = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error?.message || 'Unknown error occurred');
  }
};
