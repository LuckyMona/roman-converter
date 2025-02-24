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

    // check HTTP code
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Invalid input, please enter an integer between 1 and 3999');
      }
      throw new Error('Server error, please try again later');
    }

    // convert to JSON object
    const data: RomanNumeralResponse = await response.json();
    return data;

  } catch (error: any) {
    throw new Error(error.message || 'Unknown error occurred');
  }
};
