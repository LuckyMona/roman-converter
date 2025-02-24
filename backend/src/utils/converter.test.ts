import { convertToRoman } from './converter';

describe('convertToRoman', () => {
  test('converts single digits', () => {
    expect(convertToRoman(1)).toBe('I');
    expect(convertToRoman(2)).toBe('II');
    expect(convertToRoman(3)).toBe('III');
    expect(convertToRoman(4)).toBe('IV');
    expect(convertToRoman(5)).toBe('V');
    expect(convertToRoman(6)).toBe('VI');
    expect(convertToRoman(9)).toBe('IX');
  });

  test('converts tens', () => {
    expect(convertToRoman(10)).toBe('X');
    expect(convertToRoman(20)).toBe('XX');
    expect(convertToRoman(40)).toBe('XL');
    expect(convertToRoman(50)).toBe('L');
    expect(convertToRoman(90)).toBe('XC');
    expect(convertToRoman(99)).toBe('XCIX');
  });

  test('converts hundreds', () => {
    expect(convertToRoman(100)).toBe('C');
    expect(convertToRoman(200)).toBe('CC');
    expect(convertToRoman(400)).toBe('CD');
    expect(convertToRoman(500)).toBe('D');
    expect(convertToRoman(900)).toBe('CM');
    expect(convertToRoman(999)).toBe('CMXCIX');
  });

  test('converts thousands', () => {
    expect(convertToRoman(1000)).toBe('M');
    expect(convertToRoman(2000)).toBe('MM');
    expect(convertToRoman(3000)).toBe('MMM');
    expect(convertToRoman(3999)).toBe('MMMCMXCIX');
  });

  test('converts complex numbers', () => {
    expect(convertToRoman(1987)).toBe('MCMLXXXVII');
    expect(convertToRoman(2023)).toBe('MMXXIII');
    expect(convertToRoman(3999)).toBe('MMMCMXCIX');
  });

  test('converts edge cases', () => {
    // max
    expect(convertToRoman(1)).toBe('I');
    // min
    expect(convertToRoman(3999)).toBe('MMMCMXCIX');
  });
});
