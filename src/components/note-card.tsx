import { TrashSimple } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import { CloseButton } from ".";

interface NoteCardProps {
  note: {
    id: string;
    date: Date;
    content: string;
  };
  onNoteDeleted: (id: string) => void;
}

export function NoteCard({ note, onNoteDeleted }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex flex-col gap-3 text-left rounded-md bg-slate-800 p-5 overflow-hidden relative  hover:ring-2 hover:ring-lime-300 focus-visible:ring-2 focus-visible:ring-lime-300 outline-none transition">
          <span className="text-sm font-medium text-slate-300">
            Nota publicada{" "}
            {formatDistanceToNow(note.date, {
              locale: ptBR,
              addSuffix: true,
            })}
          </span>
          <p className="text-sm leading-6 text-slate-400">{note.content}</p>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="flex flex-col items-center fixed p-8 inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:max-w-[640px] md:h-[60vh] bg-slate-700 md:rounded-md outline-none overflow-hidden">
          <CloseButton />
          <div className="w-full flex flex-col flex-1 gap-3">
            <span className="text-sm font-medium text-slate-300 pb-2 border-b border-b-slate-500">
              Nota publicada{" "}
              {formatDistanceToNow(note.date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
            <p className="text-sm leading-6 text-slate-400">{note.content}</p>
          </div>

          <button
            type="button"
            className="flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-sm font-medium text-slate-50 py-4 px-6 outline-none rounded-full transition"
            onClick={() => onNoteDeleted(note.id)}
          >
            <TrashSimple weight="bold" className="size-5" />
            Apagar nota
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
