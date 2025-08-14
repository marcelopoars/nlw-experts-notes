import {
  GithubLogoIcon,
  GoogleChromeLogoIcon,
  LinkedinLogoIcon,
} from '@phosphor-icons/react'
import nlwExpertLogo from '.././../../assets/logo-nlw-expert.svg'

export function Footer() {
  return (
    <footer className="py-12 pb-6 lg:py-12">
      <div className="flex flex-col items-center mx-auto max-w-6xl text-sm text-slate-500 text-center px-5 lg:px-12">
        <div className="w-full flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-slate-600" />
          <img src={nlwExpertLogo} alt="Logo NLW Expert" />
          <div className="flex-1 h-px bg-slate-600" />
        </div>

        <p className="pb-4">
          Desenvolvido por{' '}
          <a
            href="https://www.marcelopereira.dev/"
            target="_blank"
            className="text-slate-400 font-semibold hover:underline focus-visible:underline underline-offset-4 outline-none"
            rel="noreferrer"
          >
            Marcelo Pereira
          </a>{' '}
          durante a <span className="whitespace-nowrap">NLW Expert - 2024</span>
          .
        </p>

        <aside className="">
          <ul className="flex gap-4">
            <li>
              <a
                href="https://github.com/marcelopoars/nlw-experts-notes"
                target="_blank"
                rel="noopener noreferrer"
                title="Ir para o repositório Github deste projeto"
              >
                <GithubLogoIcon className="size-6 text-lime-300" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/marcelopoars"
                target="_blank"
                rel="noopener noreferrer"
                title="Ir para o perfil Linkedin de Marcelo Pereira"
              >
                <LinkedinLogoIcon className="size-6 text-lime-300" />
              </a>
            </li>
            <li>
              <a
                href="https://www.marcelopereira.dev"
                target="_blank"
                rel="noopener noreferrer"
                title="Ir para o website de Marcelo Pereira"
              >
                <GoogleChromeLogoIcon className="size-6 text-lime-300" />
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </footer>
  )
}
