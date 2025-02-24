import { LinkedinLogo, InstagramLogo, FacebookLogo } from '@phosphor-icons/react';
import { ReactNode, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function Footer() {

  const date = new Date().getFullYear();

  const { usuario } = useContext(AuthContext)

  let componente: ReactNode;

  if (usuario.token !== '') {
    componente = (
      // <div className="w-full flex justify-center bg-indigo-900 text-white fixed bottom-0 left-0">
      // <div className="inset-x-0 flex justify-center fixed bottom-0 bg-indigo-900 text-white">
      <footer className="w-full flex justify-center bg-indigo-900 text-white">
        <div className="container flex flex-col items-center py-4">
          <p className='text-xl font-bold'>
            Blog Pessoal Generation | Copyright: {date}
          </p>
          <p className='text-lg'>
            Acesse nossas redes sociais
          </p>
          <div className='flex gap-2'>
            <a href="https://www.linkedin.com/in/alanbmrosa/" target="_blank" rel="noopener noreferrer">
              <LinkedinLogo size={48} weight='bold' />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <InstagramLogo size={48} weight='bold' />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FacebookLogo size={48} weight='bold' />
            </a>
          </div>
        </div>

      </footer>
    )
  }

  return (
    <>
      {componente}
    </>
  )
}

export default Footer