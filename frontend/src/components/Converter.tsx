import React, { useState } from 'react'
import { TextField, Button, Heading, View, Content, ProgressCircle } from '@adobe/react-spectrum'
import { getRomanNumeral } from '../api/romanNumeral'

const Converter: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // to validate input
  const isValidInput = input && Number(input) >= 1 && Number(input) <= 3999
  const validationState = isValidInput ? 'valid' : 'invalid'

  const handleConvert = async () => {
    if (!isValidInput) return

    setError('')
    setOutput('')
    setIsLoading(true)

    try {
      const result = await getRomanNumeral(input)
      setOutput(result.output)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View
      paddingX="size-300"
      paddingBottom="size-600"
      maxWidth="size-4600"
      data-testid="converter"
    >
      <Heading level={1}>Roman numeral converter</Heading>
      <TextField
        label="Enter a number"
        value={input}
        onChange={setInput}
        type="number"
        width="size-4600"
        description="Number should be between 1 and 3999"
        errorMessage="Invalid input. Please enter a number between 1 and 3999."
        validationState={input === '' ? undefined : validationState}
      />

      <Button
        width="size-2600"
        min-width="size-2600"
        variant="cta"
        onPress={handleConvert}
        marginTop="size-200"
        isDisabled={!isValidInput || isLoading} // disable when invalid input or loading
      >
        {isLoading ? 'Converting...' : 'Convert to roman numeral'}
      </Button>

      {isLoading && <ProgressCircle aria-label="Loading..." isIndeterminate marginTop="size-200" />}

      {error && (
        <Content marginTop="size-200" UNSAFE_style={{ color: 'red' }}>
          Error: {error}
        </Content>
      )}

      {output && (
        <Content marginTop="size-200">
          <strong>Roman numeral:</strong> {output}
        </Content>
      )}
    </View>
  )
}

export default Converter
