import { ChangeEvent, FormEvent, useState } from 'react'

import { Microphone, PencilSimple, Plus } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { toast } from 'sonner'

import { CloseButton } from '.'

interface NewNoteButtonProps {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteButton({ onNoteCreated }: NewNoteButtonProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [content, setContent] = useState('')

  const isContentEmpty = content === ''

  const handlrStartEditor = () => {
    setShouldShowOnboarding(false)
  }

  const handleContentChanged = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)

    if (!event.target.value) {
      setShouldShowOnboarding(true)
    }
  }

  const handleSaveNote = (event: FormEvent) => {
    event.preventDefault()

    if (isContentEmpty) return ''

    onNoteCreated(content)

    setContent('')

    setShouldShowOnboarding(true)

    toast.success('Nota gravada com sucesso')
  }

  const handleStartRecording = () => {
    const isSpeechRecognitionAPIAvailable =
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionAPIAvailable) {
      alert('Navegador não suporta o recurso de gravação.')
      return
    }

    setIsRecording(true)
    setShouldShowOnboarding(false)

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-br' // idioma selecionado
    speechRecognition.continuous = true // grava continuamente até que sinalize para parar
    speechRecognition.maxAlternatives = 1 // retorna apenas uma alternativa
    speechRecognition.interimResults = true // retorna resultados enquando se fala

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.error(event.message)
    }

    speechRecognition.start()
  }

  const handleStopRecording = () => {
    setIsRecording(false)

    if (speechRecognition !== null) {
      speechRecognition.stop()
    }
  }

  const onOpenChangeDialog = (open: boolean) => {
    if (!open && !content) {
      setShouldShowOnboarding(true)
    }

    if (speechRecognition !== null && isRecording) {
      speechRecognition.stop()
      setIsRecording(false)
    }
  }

  return (
    <Dialog.Root onOpenChange={onOpenChangeDialog}>
      <Dialog.Trigger className="group flex items-center gap-3 bg-lime-300 text-slate-800 font-semibold py-2 lg:py-4 px-4 lg:px-6 rounded-full hover:text-lime-300 hover:ring-2 hover:ring-lime-300 hover:bg-transparent focus-visible:text-lime-300 focus-visible:bg-transparent focus-visible:ring-2 focus-visible:ring-lime-300 outline-none transition">
        <Plus weight="bold" />
        Nova nota
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="flex flex-col fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:max-w-[640px] md:h-[60vh] bg-slate-700 md:rounded-md outline-none overflow-hidden">
          <CloseButton />
          <form className="flex flex-col items-center flex-1 p-8">
            <div className="w-full flex flex-col flex-1 gap-6 mb-6">
              <span className="flex items-center gap-2 text-sm font-medium text-slate-300 pb-2 border-b border-b-slate-500">
                {isRecording ? (
                  <>
                    <Microphone
                      weight="bold"
                      size={20}
                      className="text-red-500 animate-pulse"
                    />
                    Gravando nota...
                  </>
                ) : (
                  'Criar nova nota'
                )}
              </span>

              {shouldShowOnboarding ? (
                <ul className="flex-1 flex flex-col items-center justify-center gap-6">
                  <li>
                    <button
                      type="button"
                      className="group flex items-center gap-3 bg-lime-300 text-slate-800 font-semibold py-2 lg:py-4 px-4 lg:px-6 rounded-full hover:text-lime-300 hover:ring-2 hover:ring-lime-300 hover:bg-transparent focus-visible:text-lime-300 focus-visible:bg-transparent focus-visible:ring-2 focus-visible:ring-lime-300 outline-none transition"
                      onClick={handleStartRecording}
                    >
                      <Microphone weight="bold" />
                      Gravar nota
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="group flex items-center gap-3 bg-lime-300 text-slate-800 font-semibold py-2 lg:py-4 px-4 lg:px-6 rounded-full hover:text-lime-300 hover:ring-2 hover:ring-lime-300 hover:bg-transparent focus-visible:text-lime-300 focus-visible:bg-transparent focus-visible:ring-2 focus-visible:ring-lime-300 outline-none transition"
                      onClick={handlrStartEditor}
                    >
                      <PencilSimple weight="bold" />
                      Escrever nota
                    </button>
                  </li>
                </ul>
              ) : (
                <textarea
                  autoFocus
                  className="flex-1 text-sm leading-6 text-slate-400 bg-slate-800 p-4 rounded resize-none outline-none"
                  onChange={handleContentChanged}
                  value={content}
                />
              )}
            </div>

            {isRecording ? (
              <button
                type="button"
                className="flex items-center justify-center gap-2 bg-slate-900 text-sm font-semibold text-slate-300 py-4 px-6 rounded-full outline-none hover:text-slate-100 transition"
                onClick={handleStopRecording}
              >
                <div className="size-3 bg-red-500 animate-pulse" />
                Parar gravação
              </button>
            ) : (
              <button
                type="button"
                className="bg-lime-300 font-semibold text-lime-950 py-4 px-6 outline-none hover:bg-lime-400 transition disabled:pointer-events-none disabled:bg-slate-600 disabled:text-slate-800 rounded-full"
                onClick={handleSaveNote}
                disabled={isContentEmpty}
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
