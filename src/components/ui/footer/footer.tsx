import nlwExpertLogo from ".././../../assets/logo-nlw-expert.svg";

export function Footer() {
  return (
    <footer className="mt-auto pt-20">
      <div className="flex flex-col items-center mx-auto max-w-6xl text-sm text-slate-600 text-center my-12 px-5 lg:px-12">
        <p>
          Desenvolvido por{" "}
          <a href="https://www.marcelopereira.dev/" target="_blank">
            Marcelo Pereira
          </a>{" "}
          durante a NLW Expert - 2024.
        </p>

        <img src={nlwExpertLogo} alt="Logo NLW Expert" />
      </div>
    </footer>
  );
}
