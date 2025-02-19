import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

function Navbar() {

  const navigate = useNavigate()

  const { handleLogout } = useContext(AuthContext)

  function logout() {
    handleLogout()
    alert('O Usuário foi desconectado com sucesso!')
    navigate('/')
  }

  return (
    <div className="w-full flex justify-center py-4 bg-indigo-900 text-white">
      <div className="container flex justify-between text-lg">
        <p className="ml-4"><Link to="/home" className="text-2xl font-bold">Blog Pessoal</Link></p>

        <div className="flex">
          <nav>
            <ul className="flex text-center list-none">
              <li className="mr-4">Postagens</li>
              <li className="mr-4"><Link to='/temas' className='hover:underline'>Temas</Link></li>
              <li className="mr-4"><Link to='/cadastrartema' className='hover:underline'>Cadastrar tema</Link></li>
              <li className="mr-4">Perfil</li>
              <li className="mr-4"><Link to='' onClick={logout} className='hover:underline'>Sair</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar