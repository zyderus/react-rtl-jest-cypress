import './App.css'
import { useState, useEffect } from 'react'
import { API_KEY as apiKey } from './constants'
import Button from './components/button'

function App() {
  const [error, setError] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('')
  const [paginate, setPaginate] = useState(8)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const options = {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-type': 'application/json',
      },
      method: 'get',
    }

    fetch('https://countryapi.io/api/all', options)
      .then(res => res.json())
      .then(
        result => {
          setLoaded(true)
          setItems(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          setLoaded(true)
          setError(error)
        }
      )
  }, [])

  const data = Object.values(items)

  // const search_parameters = Object.keys(Object(...data));
  const search_parameters = Object.keys(Object.assign({}, ...data))

  const filter_items = [...new Set(data.map(item => item.region))]

  const search = items => {
    return items.filter(
      item =>
        item.region.includes(filter) &&
        search_parameters.some(parameter =>
          item[parameter].toString().toLowerCase().includes(query)
        )
    )
  }

  const load_more = e => {
    setPaginate(prevValue => prevValue + 8)
  }

  if (error) {
    return <>ERROR: {error.message}</>
  } else if (!loaded) {
    return <>loading...</>
  } else {
    return (
      <div className="App">
        <div className="wrapper">
          <div className="search-wrapper">
            <label htmlFor="search-form">
              <input
                type="search"
                name="search-form"
                id="search-form"
                className="search-input"
                placeholder="Search for..."
                onChange={e => setQuery(e.target.value)}
              />
              <span className="sr-only">Search countries here</span>
            </label>

            <div className="select">
              <select
                onChange={e => setFilter(e.target.value)}
                className="custom-select"
                aria-label="Filter Countries By Region"
              >
                <option value="">Filter By Region</option>
                {filter_items.map((item, idx) => (
                  <option key={idx} value={item}>
                    Filter by {item}
                  </option>
                ))}
              </select>
              <span className="focus"></span>
            </div>
          </div>

          <Button onClick={() => setShow(!show)}>Click me</Button>

          {show ? (
            <div
              data-test-id="ninja"
              style={{
                padding: '1rem',
                borderRadius: '7px',
                textAlign: 'center',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
              }}
            >
              <h1>Ninja</h1>
            </div>
          ) : null}

          <ul className="card-grid">
            {search(data)
              .slice(0, paginate)
              .map(item => (
                <li key={item.alpha3Code}>
                  <article className="card">
                    <div className="card-image">
                      <img src={item.flag.large} alt={item.name} />
                    </div>
                    <div className="card-content">
                      <h2 className="card-name">{item.name}</h2>
                      <ol className="card-list">
                        <li>
                          population: <span>{item.population}</span>
                        </li>
                        <li>
                          Region: <span>{item.region}</span>
                        </li>
                        <li>
                          Capital: <span>{item.capital}</span>
                        </li>
                      </ol>
                    </div>
                  </article>
                </li>
              ))}
          </ul>
        </div>
        <button onClick={load_more}>Load More</button>
      </div>
    )
  }
}

export default App

/* ANOTHER WAY TO COMPILE OPTIONS */
// const request_headers = new Headers();
// request_headers.append('Authorization', `Bearer ${apiKey}`);
// request_headers.append('Content-type', 'application/json');

// const request_options = {
//   method: 'GET',
//   headers: request_headers,
// };
