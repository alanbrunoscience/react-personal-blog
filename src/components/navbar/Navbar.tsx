function Navbar() {
  return (
    <div className="w-full flex justify-center py-4 bg-indigo-900 text-white">
      <div className="container flex justify-between text-lg">
        <p>Blog Pessoal</p>

        <div className="flex">
          <nav>
            <ul className="flex text-center list-none">
              <li>Postagens</li>
              <li className="ml-4">Temas</li>
              <li className="ml-4">Cadastrar Tema</li>
              <li className="ml-4">Perfil</li>
              <li className="ml-4">Sair</li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar