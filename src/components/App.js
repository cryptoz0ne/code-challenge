import { useState, useEffect } from 'react';
import { Stack, Dropdown } from 'react-bootstrap';
import { getCountries, getStates } from '../api';

import './App.css';

function App() {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState({})
  const [states, setStates] = useState([])
  const [selectedState, setSelectedState] = useState({})

  useEffect(() => {
    getCountries()
      .then(response => response.json())
      .then(data => setCountries(data))
  }, [])

  useEffect(() => {
    if(selectedCountry.id) {
      setSelectedState({})
      setStates([])
      
      getStates(selectedCountry.id)
        .then(response => response.json())
        .then(data => setStates(data))
    }
  }, [selectedCountry])

  return (
    <Stack gap={3} className="p-4">
      <Dropdown>
        <Dropdown.Toggle data-testid="toggle-countries" variant="secondary" disabled={countries.length === 0}>
          {selectedCountry.id ? selectedCountry.value : 'Select a country'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {countries.map(({id, value}) => (
            <Dropdown.Item key={`${id}_${value}`} onClick={() => setSelectedCountry({id, value})}>{value}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown>
        <Dropdown.Toggle data-testid="toggle-states" variant="secondary" disabled={states.length === 0}>
          {selectedState.id ? selectedState.value : 'Select a state'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {states.map(({id, value}) => (
            <Dropdown.Item key={`${id}_${value}`} onClick={() => setSelectedState({id, value})}>{value}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  );
}

export default App;
