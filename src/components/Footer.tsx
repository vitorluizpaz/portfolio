import { useSettings } from "../settings";

export default function Footer() {
  const { t } = useSettings();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-muted sm:flex-row">
        <span className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-iris to-cyan text-[10px] font-bold text-ink">
            VP
          </span>
          Vitor Paz · {t.footer.role}
        </span>
        <span>{t.footer.built}</span>
      </div>
    </footer>
  );
}
