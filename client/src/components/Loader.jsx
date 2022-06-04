import Main from './layout/Main'

function Loader() {
  return (
    <Main>
      <div className="flex flex-col items-center min-h-screen justify-center">
        <img src="/assets/thinking-minnie.png" className="h-72 mb-7" alt="Minnie Mouse" />
        <h1 className="text-4xl text-pink-500 font-bold">Cargando...</h1>
      </div>
    </Main>
  )
}

export default Loader
