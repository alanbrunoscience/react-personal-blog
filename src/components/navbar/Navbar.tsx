import { ReactNode, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Navbar() {

  const navigate = useNavigate()

  const { usuario, handleLogout } = useContext(AuthContext)

  function logout() {
    handleLogout()
    ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
    navigate('/')
  }

  let componente: ReactNode;

  if (usuario.token !== '') {
    componente = (
      <div className="w-full flex justify-center py-4 bg-indigo-900 text-white">
        <div className="container flex justify-between text-lg">
          <p className="ml-4">
            <Link to="/home" className="text-2xl font-bold">Blog Pessoal</Link>
          </p>

          <div className="flex">
            <nav>
              <ul className="flex text-center list-none">
                <li className="mr-4">
                  <Link to='/postagens' className='hover:underline'>Postagens</Link>
                </li>
                <li className="mr-4">
                  <Link to='/temas' className='hover:underline'>Temas</Link>
                </li>
                <li className="mr-4">
                  <Link to='/cadastrartema' className='hover:underline'>Cadastrar tema</Link>
                </li>
                <li className="mr-4">
                  <Link to='/perfil' className='hover:underline'>Perfil</Link>
                </li>
                <li className="mr-4">
                  <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {componente}
    </>
  )
}

export default Navbar