import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";

interface NoteCardProps {
  note: {
    id: string
    date: Date;
    content: string;
  };
  onNoteDeleted: (id: string) => void;
}

export function NoteCard({ note, onNoteDeleted }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex flex-col gap-3 text-left rounded-md bg-slate-800 p-5 overflow-hidden relative  hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-500 outline-none">
          <span className="text-sm font-medium text-slate-300">
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
        <Dialog.Content className="flex flex-col fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:max-w-[640px] md:h-[60vh] bg-slate-700 md:rounded-md outline-none overflow-hidden">
          <Dialog.Close className="absolute top-0 right-0 bg-slate-800 text-slate-400 p-1.5 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <div className="flex flex-col flex-1 gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              {formatDistanceToNow(note.date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
            <p className="text-sm leading-6 text-slate-400">{note.content}</p>
          </div>

          <button
            type="button"
            className="group bg-slate-800 text-sm font-medium text-slate-300 py-4 outline-none"
            onClick={() => onNoteDeleted(note.id)}
          >
            Deseja{" "}
            <span className="text-red-400 group-hover:underline underline-offset-8">
              apagar esta nota
            </span>
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
