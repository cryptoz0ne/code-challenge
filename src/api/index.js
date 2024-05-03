const BASE_URL = "https://fedt.unruffledneumann.xyz/api/v1"
const API_KEY = "rLn*xzeZ%U+(PRuK%:v@C(a3j=<.[TWX(F^,EDrv"

export const getCountries = () => {
  return fetch(`${BASE_URL}/countries`, {
    method: 'GET',
    headers: {
      'X-API-KEY': API_KEY
    }
  })
}

export const getStates = (countryId) => {
  return fetch(`${BASE_URL}/countries/${countryId}/states`, {
    method: 'GET',
    headers: {
      'X-API-KEY': API_KEY
    }
  })
}