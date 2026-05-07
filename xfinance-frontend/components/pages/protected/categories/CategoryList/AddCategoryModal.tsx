"use client";

import React from "react";
import { Button } from "@/components/shared/Button";
import { useCreateCategory } from "@/lib/modules/categories/domain/category.queries";
import CloseIcon from '@mui/icons-material/Close';

type AddCategoryModalProps = {
  open: boolean;
  onClose: () => void;
};

const categoryEmojiOptions = [
  "🍔",
  "🏠",
  "🚗",
  "✈️",
  "🛒",
  "💊",
  "🎬",
  "🎓",
  "🐶",
  "🎁",
  "💼",
  "💡",
  "📚",
  "🏋️",
  "👕",
  "☕",
];

export const AddCategoryModal = ({
  open,
  onClose,
}: AddCategoryModalProps) => {
  const [name, setName] = React.useState("");
  const [emoji, setEmoji] = React.useState("");
  const [color, setColor] = React.useState("#16A34A");
  const [showEmojiModal, setShowEmojiModal] = React.useState(false);

  const { mutate, isPending } = useCreateCategory();

  const resetForm = React.useCallback(() => {
    setName("");
    setEmoji("");
    setColor("#16A34A");
    setShowEmojiModal(false);
  }, []);

  const handleClose = React.useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !emoji || !color) return;

    mutate(
      {
        name,
        emoji,
        color,
      },
      {
        onSuccess: () => {
          handleClose();
        },
      },
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/35 px-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl" data-aos="flip-up">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-zinc-900">
              Nova categoria
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Crie uma categoria personalizada para organizar melhor suas transacoes.
            </p>
          </div>
          <button
            type="button"
            className="text-sm text-zinc-500 transition hover:text-zinc-900"
            onClick={handleClose}
          >
            <CloseIcon />
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-700">
              Nome
            </span>
            <input
              type="text"
              className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none"
              placeholder="Ex.: Pets"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              disabled={isPending}
            />
          </label>

          <div className="grid gap-4 md:grid-cols-[120px_1fr]">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-700">
                Emoji
              </span>
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-center text-xl outline-none transition hover:border-zinc-400"
                onClick={() => setShowEmojiModal(true)}
                disabled={isPending}
              >
                {emoji || "🙂"}
              </button>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-700">
                Cor
              </span>
              <div className="flex h-[50px] items-center gap-3 rounded-xl border border-zinc-300 bg-zinc-50 px-3">
                <input
                  type="color"
                  className="h-8 w-10 cursor-pointer border-none bg-transparent p-0"
                  value={color}
                  onChange={(e) => setColor(e.currentTarget.value)}
                  disabled={isPending}
                />
                <input
                  type="text"
                  className="flex-1 bg-transparent text-sm outline-none"
                  value={color}
                  onChange={(e) => setColor(e.currentTarget.value)}
                  disabled={isPending}
                />
              </div>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              className="bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button className="min-w-36" disabled={isPending}>
              {isPending ? "Salvando..." : "Salvar categoria"}
            </Button>
          </div>
        </form>
      </div>

      {showEmojiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 px-4">
          <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl" data-aos="zoom-in">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-lg font-semibold text-zinc-900">
                  Escolha um emoji
                </h4>
                <p className="mt-1 text-sm text-zinc-500">
                  Selecione um dos emojis disponiveis para a categoria.
                </p>
              </div>
              <button
                type="button"
                className="text-sm text-zinc-500 transition hover:text-zinc-900"
                onClick={() => setShowEmojiModal(false)}
              >
                Fechar
              </button>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-3">
              {categoryEmojiOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className="flex h-14 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 text-2xl transition hover:border-emerald-400 hover:bg-emerald-50"
                  onClick={() => {
                    setEmoji(option);
                    setShowEmojiModal(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
