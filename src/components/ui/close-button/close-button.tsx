import * as Dialog from '@radix-ui/react-dialog'

import { XIcon } from '@phosphor-icons/react'

export function CloseButton() {
  return (
    <Dialog.Close className="absolute top-0 right-0 bg-lime-300 text-slate-800 p-1.5 hover:bg-lime-200 transition">
      <XIcon weight="bold" className="size-5" />
    </Dialog.Close>
  )
}
