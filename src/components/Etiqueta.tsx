import type { Etiqueta } from '../types'
import { useI18n } from '../i18n'

function Fila({
  titulo,
  desc,
  valor,
  color,
}: {
  titulo: string
  desc: string
  valor: number
  color: string
}) {
  return (
    <div className="border-t border-slate-800 py-3">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <p className="font-semibold leading-snug">{titulo}</p>
          <p className="text-xs text-slate-500">{desc}</p>
        </div>
        <span className="text-xl font-extrabold tabular-nums">{valor}%</span>
      </div>
      <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${valor}%` }} />
      </div>
    </div>
  )
}

export function Etiqueta({ etiqueta, equipo = false }: { etiqueta: Etiqueta; equipo?: boolean }) {
  const { t } = useI18n()

  return (
    <div className="rounded-2xl border border-slate-300 bg-white text-slate-900 shadow-lg dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100">
      <div className="rounded-t-2xl bg-amber-400 px-5 py-3 text-xs font-bold uppercase tracking-widest text-amber-950">
        {equipo ? t('profile.equipoLabel') : 'Etiqueta informativa'}
      </div>
      <div className="border-t border-slate-300 p-5 dark:border-slate-600">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-widest text-slate-500">
            {t(equipo ? 'profile.equipoLabel' : 'profile.yourLabel')}
          </p>
          <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">
            {etiqueta.nivel ? t(`profile.nivel_${etiqueta.nivel.indice}`) : '—'}
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          {t('profile.newLabelSub')} · {etiqueta.casosResueltos} {t('profile.casesResolved')}
        </p>

        <div className="mt-4">
          <Fila titulo={t('profile.precisionTitle')} desc={t('profile.precisionDesc')} valor={etiqueta.precisionCritica} color="bg-emerald-500" />
          <Fila titulo={t('profile.diversityTitle')} desc={t('profile.diversityDesc')} valor={etiqueta.diversidadFuentes} color="bg-sky-500" />
          <Fila titulo={t('profile.balanceTitle')} desc={t('profile.balanceDesc')} valor={etiqueta.balanceTematico} color="bg-amber-500" />
          <Fila titulo={t('profile.consumptionTitle')} desc={t('profile.consumptionDesc')} valor={etiqueta.consumoInformacional} color="bg-violet-500" />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-300 pt-3 text-sm dark:border-slate-600">
          <span className="font-semibold">{t('profile.points')}</span>
          <span className="tabular-nums">{etiqueta.puntos}</span>
        </div>
      </div>
    </div>
  )
}