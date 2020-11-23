// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  /*
  Essa é uma operação pesada. Ler do localstorage pode ser lento, então é preferível usar LAZY INITIALIAZTION, passando uma callback que retorna uma expressão, ao invés de passar uma experssão ou function call.
  */
  const [name, setName] = React.useState(
    // AVOID:
    // window.localStorage.getItem('name') ?? initialName,

    // https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
    // OK:
    () => window.localStorage.getItem('name') ?? initialName,
  )

  React.useEffect(() => {
    window.localStorage.setItem('name', name)
    /*
    Atualiza apenas no unmount. Repara que o array de dependencias não faria muito sentido.
    return () => window.localStorage.setItem('name', name)
    */
  }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello, {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
