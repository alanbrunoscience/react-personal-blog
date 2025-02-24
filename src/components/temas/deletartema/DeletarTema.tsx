import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import Tema from "../../../models/Tema"
import { buscar, deletar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarTema() {
  const navigate = useNavigate()

  const [tema, setTema] = useState<Tema>({} as Tema)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const { id } = useParams<{ id: string }>()

  async function buscarTemaPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token },
      })
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes("401")) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", 'info')
      navigate("/")
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarTemaPorId(id)
    }
  }, [id])

  /**
   * Criamos a função deletarTema, responsável por deletar
   * um tema da aplicação (DELETE).
   */
  async function deletarTema() {
    setIsLoading(true)

    try {
      await deletar(`/temas/${id}`, {
        headers: { Authorization: token },
      })

      ToastAlerta("Tema foi apagado com sucesso!", 'sucesso')
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes("401")) {
        handleLogout()
      } else {
        ToastAlerta("Erro ao excluir o tema!", 'erro')
      }
    }

    setIsLoading(false)
    retornar()
  }

  function retornar() {
    navigate("/temas")
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar tema</h1>
      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar o tema a seguir?
      </p>
      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
          Tema
        </header>

        {/* 
          Como a propriedade descricao é um campo dinâmico (cada renderização do Componente
          DeletarTema receberá um valor diferente), inserimos na tag de paragrafo (`<p></p>`) 
          a propriedade descricao do estado tema.
        */}
        <p className="p-8 text-3xl bg-slate-200 h-full">{tema.descricao}</p>
        <div className="flex">
          <button
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={retornar}
          >
            Não
          </button>
          <button
            className="w-full text-slate-100 bg-indigo-400 
                                   hover:bg-indigo-600 flex items-center justify-center"
            onClick={deletarTema}
          >
            {isLoading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
export default DeletarTema