import { useNavigate } from "react-router-dom";
import CardPostagem from "../cardpostagens/CardPostagens";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaPostagens() {

    const navigate = useNavigate();

    /**
     * Criamos um estado chamado postagens, do tipo Postagem (Interface
     * Model), através do Hook useState, com todos os atributos da Interface
     * Postagem inicializados com o valor vazio ou zero, de acordo com as
     * respectivas tipagens de cada atributo.
     * 
     * Para modificar o valor do estado, foi criada a função setPostagens,
     * seguindo a sintaxe básica do Hook useState.
     * 
     * O objetivo do estado postagens é armazenar os dados de todos as
     * postagens, que foram persistidas no Back-end. Observe que postagens
     * foi definido como um Array.
     */

    const [postagens, setPostagens] = useState<Postagem[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * Acessamos o contexto AuthContext através do hook useContext.
     * 
     * Note que desestruturamos as propriedades do Componente Context,
     * tornando possível o uso individualizado das propriedades 
     * disponibilizadas pelo Componente AuthContext.
     * 
     * Através da desestruturação foi possível selecionar apenas as 
     * propriedades usuario (usuario autenticado) e handleLogout (função
     * de saída do sistema), e na sequência atribuí-las as respectivas 
     * variáveis com os mesmos nomes.
     */

    const { usuario, handleLogout } = useContext(AuthContext);

    /**
     * Definimos uma constante chamada token e adicionamos o atributo token
     * do usuário autenticado, ou seja, o token de autenticação JWT gerado 
     * pelo Back-end, quando o usuário efetuou o login.
     */
    const token = usuario.token;

    /**
     * A função buscarPostagens é responsável por realizar o processo de
     * busca de todas as postagens persistidas no Back-end, atualizando 
     * o Estado postagens (array do tipo Postagem) com os resultados 
     * encontrados.
     * 
     * Ela também lida com as Exceptions (Exceções), especificamente tratando
     * erros de autenticação, alertando o usuário sobre a expiração do token e
     * executando o logout, para que o usuário faça um novo login e receba um 
     * novo token de acesso.
     */
    async function buscarPostagens() {

        /**
         * Dentro do bloco try, invocamos a função buscar(), do Script 
         * Service.
         * 
         * Seguindo a sua estrutura, passamos como argumentos:
         * 
         * - A URL do endpoint de cadastro ('/postagens'), definida no recurso
         * Postagem do Back-end;
         * - A função setPostagens, que será utilizada para atualizar o 
         * estado postagens, com os dados recebidos na resposta da requisição
         * HTTP.
         * - O token JWT, que da mesma forma que fazíamos no Insomnia, será enviado
         * dentro do cabeçalho da requisição (header), na propriedade Authorization.
         */

        try {
            setIsLoading(true)

            await buscar('/postagens', setPostagens, {
                headers: {
                    Authorization: token,
                },
            })

        } catch (error: unknown) {
            if (error instanceof Error && error.message.includes("401")) {
                handleLogout()
            }
        } finally {
            setIsLoading(false)
        }
    }

    /**
     * O primeiro Hook useEffect monitora a variável token:
     * 
     * - Caso esteja vazia (usuário não autenticado), será exibido
     * um alerta para o usuário e o mesmo será redirecionado para a tela de login.
     * 
     * - Caso contrário, mantém o usuário no componente ListaPostagens
     */

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'info')
            navigate('/')
        }
    }, [token])

    /**
     * - O segundo Hook useEffect será executado sempre que houver
     * uma mudança no tamanho (número de elementos armazenados) do estado postagens.
     * 
     * - Todas as vezes que ocorrer uma mudança no tamanho do estado postagens,
     * a função buscaPostagens() será executada para atualizar a listagem de 
     * postagens.
     */

    useEffect(() => {
        buscarPostagens()
    }, [postagens.length])

    return (
        <>
            {isLoading && (
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
                    {(!isLoading && postagens.length) === 0 && (
                        <span className="text-3xl text-center my-8">
                            Nenhuma Postagem foi encontrada!
                        </span>
                    )}
                    <div className='container mx-auto my-4 
                        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                    >
                        {
                            postagens
                                .sort((a, b) => a.id - b.id)
                                .map((postagem) => (
                                <CardPostagem key={postagem.id} postagem={postagem} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaPostagens;