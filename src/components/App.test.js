import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { act } from 'react'
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import App from './App';

export const handlers = [
  rest.get('https://fedt.unruffledneumann.xyz/api/v1/countries', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
          {id: 4, value: "Afghanistan"}
      ])
    )
  }),
  rest.get('https://fedt.unruffledneumann.xyz/api/v1/countries/4/states', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
          {id: 15, value: "Bedekhshan"},
          {id: 17, value: "Beghlan"},
          {id: 29, value: "Chekhansor"}
      ])
    )
  })
]

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterAll(() => server.resetHandlers(), server.close())

test('displays data from API', async () => {
  render(<App />);

  // Waiting API response so the countries dropdown toggle is enabled & content is 'Select a country' - default state.
  const toggleCountriesBtn = screen.getByTestId("toggle-countries")
  await waitFor(() => expect(toggleCountriesBtn).not.toBeDisabled(), { timeout: 1000 });
  expect(toggleCountriesBtn).toHaveTextContent('Select a country')

  // Click countries dropdown toggle
  act(() => {
    fireEvent.click(toggleCountriesBtn)
  })

  // Check Afghanistan (mocked api resposne) is existing under the countries dropdown list
  const country = screen.getByText('Afghanistan')
  expect(country).toBeInTheDocument();

  // Click Afghanistan from the dropdown
  act(() => {
    fireEvent.click(country)
  })

  // Check countries dropdown toggle content is "Afghanistan"
  expect(screen.getByTestId("toggle-countries")).toHaveTextContent('Afghanistan')

  // Waiting API response so the states dropdown toggle is enabled & content is 'Select a state' - default state
  const toggleStatesBtn = screen.getByTestId("toggle-states")
  await waitFor(() => expect(toggleStatesBtn).not.toBeDisabled(), { timeout: 1000 });
  expect(toggleStatesBtn).toHaveTextContent('Select a state')

  // Click states dropdown toggle
  act(() => {
    fireEvent.click(toggleStatesBtn)
  })

  // Check Bedekhshan (mocked api response) is existing under the states dropdown list
  const state = screen.getByText('Bedekhshan')
  expect(state).toBeInTheDocument();

  // Click Bedekhshan from the dropdown
  act(() => {
    fireEvent.click(state)
  })

  // Check states dropdown toggle content is "Bedekhshan"
  expect(screen.getByTestId("toggle-states")).toHaveTextContent('Bedekhshan')
});
