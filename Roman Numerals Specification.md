# Roman Numerals Specification

Reference: [Wikipedia Roman numerals](!https://en.wikipedia.org/wiki/Roman_numerals)

Roman numerals use a combination of seven basic symbols:

- **I (1), V (5), X (10), L (50), C (100), D (500), M (1000)**

Numbers are constructed by combining these symbols according to specific rules. Roman numerals are read from left to right, adding or subtracting values as necessary.

## Rules

1. **Repetition and Addition:**
   - Repeating a numeral indicates multiplication. For example, III = 3, XX = 20.
   - A smaller numeral to the right of a larger numeral is added to the larger numeral.  
     Example: VI = 5 + 1 = 6, XV = 10 + 5 = 15.

2. **Subtraction:**
   - A smaller numeral to the left of a larger numeral is subtracted from the larger numeral.
     - Only **I, X,** and **C** can be used for subtraction.
       - Example: IV = 4 (5 - 1), IX = 9 (10 - 1), XL = 40 (50 - 10).
     - Subtraction is only allowed for one positional value:
       - Example: 99 is XCIX (100 - 10 + 10 - 1), not IC (100 - 1).
     - The subtractive numeral must be a single character:
       - Example: VIII = 8, not IIX.

3. **Limitation on Repetition:**
   - The same numeral can appear at most three times in a row.
     - Example: 30 is XXX, but 40 is XL, not XXXX.
     - Example: 14 is XIV, not XIIII.

4. **Constructing Numbers:**

   - Roman numerals are constructed by adding symbols from the highest to the lowest place value:
      - **39** = XXX + IX = **XXXIX**
      - **246** = CC + XL + VI = **CCXLVI**
      - **789** = DCC + LXXX + IX = **DCCLXXXIX**
      - **2,421** = MM + CD + XX + I = **MMCDXXI**
  
   - When a place value is zero, it is simply omitted:
      - **160** = C + LX = **CLX**
      - **207** = CC + VII = **CCVII**
      - **1,009** = M + IX = **MIX**
      - **1,066** = M + LX + VI = **MLXVI**

5. **Maximum Representable Number**

   - The largest number representable in standard Roman numerals is **3,999 (MMMCMXCIX)**.