import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className="w-full flex justify-center py-4 bg-indigo-900 text-white">
      <div className="container flex justify-between text-lg">
        <p className="ml-4"><Link to="/home" className="text-2xl font-bold">Blog Pessoal</Link></p>

        <div className="flex">
          <nav>
            <ul className="flex text-center list-none">
              <li className="mr-4">Postagens</li>
              <li className="mr-4">Temas</li>
              <li className="mr-4">Cadastrar Tema</li>
              <li className="mr-4">Perfil</li>
              <li className="mr-4"><Link to="/login">Sair</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar