import { LinkedinLogo, InstagramLogo, FacebookLogo } from '@phosphor-icons/react';

function Footer() {

  const date = new Date().getFullYear();

  return (
    // <div className="w-full flex justify-center bg-indigo-900 text-white fixed bottom-0 left-0">
    <div className="inset-x-0 flex justify-center fixed bottom-0 bg-indigo-900 text-white">
      <div className="container flex flex-col items-center py-4">
        <p className='text-xl font-bold'>
          Blog Pessoal Generation | Copyright: {date}
        </p>
        <p className='text-lg'>
          Acesse nossas redes sociais
        </p>
        <div className='flex gap-2'>
          <LinkedinLogo size={48} weight='bold' />
          <InstagramLogo size={48} weight='bold' />
          <FacebookLogo size={48} weight='bold' />
        </div>
      </div>

    </div>
  )
}

export default Footer