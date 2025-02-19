import { useNavigate } from "react-router-dom";
import CardTemas from "../cardtemas/CardTemas"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";

function ListaTemas() {

  const navigate = useNavigate()

  const [temas, setTemas] = useState<Tema[]>([])

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function buscarTemas() {
    try {

      await buscar('/temas', setTemas, {
        headers: { Authorization: token }
      })

    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes("401")) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado!')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    buscarTemas()
  }, [temas.length])

  return (
    <>
      {temas.length === undefined && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col mx-2">
          {/* 
						**IMPLEMENTAÇÃO EXTRA**

						Se o Recurso Tema estiver vazio, ou seja, não possuir nenhum
						tema cadastrado, será exibida a mensagem abaixo
					*/}
          {temas.length === 0 && (
            <span className="text-3xl text-center my-8">
              Nenhum Tema foi encontrado!
            </span>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
            {
              temas
                .sort((a, b) => a.id - b.id)
                .map((tema) => (
                  <CardTemas key={tema.id} tema={tema} />
                ))
            }
          </div>
        </div>
      </div>
    </>
  )
}
export default ListaTemas;