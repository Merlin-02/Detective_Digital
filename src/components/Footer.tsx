import { useI18n } from '../i18n'

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="mt-16 border-t glass-border glass-soft">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm text-slate-400 sm:grid-cols-3">
        <div>
          <p className="font-semibold text-slate-100">{t('nav.logoName')}</p>
          <p className="mt-2 max-w-xs">{t('footer.tagline')}</p>
        </div>
        <div>
          <p className="font-semibold text-slate-100">{t('footer.theMe')}</p>
          <ul className="mt-2 space-y-1">
            <li>{t('home.mil_a')}</li>
            <li>{t('home.mil_b')}</li>
            <li>{t('home.mil_c')}</li>
            <li>{t('home.mil_d')}</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-slate-100">{t('footer.guide')}</p>
          <p className="mt-2 max-w-xs">{t('footer.privacy')}</p>
          <p className="mt-2">{t('footer.unesco')}</p>
          <p className="mt-2 italic">{t('footer.designedFor')}</p>
        </div>
      </div>
    </footer>
  )
}