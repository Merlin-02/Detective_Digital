import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { Card, CategoriaChip } from '../components/ui'

function Paso({ codigo, nombre, subtitulo }: { codigo: string; nombre: string; subtitulo?: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-300 font-black text-black shadow-[0_2px_12px_rgba(199,255,0,0.3)]">
        {codigo}
      </div>
      <p className="mt-2 text-sm font-bold uppercase tracking-tight text-slate-100">{nombre}</p>
      {subtitulo && <p className="max-w-[180px] text-xs text-slate-400">{subtitulo}</p>}
    </div>
  )
}

export function Home() {
  const { t } = useI18n()

  const problemas = [
    { k: 'home.problem_1' },
    { k: 'home.problem_2' },
    { k: 'home.problem_3' },
  ]

  const features = [
    { t: 'home.feature1t', d: 'home.feature1d', n: '01' },
    { t: 'home.feature2t', d: 'home.feature2d', n: '02' },
    { t: 'home.feature3t', d: 'home.feature3d', n: '03' },
    { t: 'home.feature4t', d: 'home.feature4d', n: '04' },
  ]

  const mils = ['home.mil_a', 'home.mil_b', 'home.mil_c', 'home.mil_d']

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="grid items-center gap-10 py-14 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-800 bg-indigo-950 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-300">
            {t('home.kicker')}
          </span>
          <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
            {t('home.title')}{' '}
            <span className="texto-destello bg-gradient-to-r from-indigo-300 to-violet-500 bg-clip-text text-transparent">
              {t('home.titleAccent')}
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-balance text-lg text-slate-300">
            {t('home.subtitle')}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/jugar"
              className="cta-pulso rounded-xl bg-indigo-300 px-5 py-3 font-semibold text-black hover:bg-indigo-400"
            >
              {t('home.ctaPlay')}
            </Link>
            <Link
              to="/perfil"
              className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 font-semibold text-slate-200 hover:border-indigo-400 hover:text-indigo-300"
            >
              {t('home.ctaLabel')}
            </Link>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <Card className="flotar relative z-10 -rotate-2 p-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <span>ETIQUETA INFORMATIVA</span>
              <CategoriaChip categoria="ia" />
            </div>
            <div className="mt-4 space-y-4">
              {[
                ['Precisión crítica', '86%', 'bg-emerald-500'],
                ['Diversidad de fuentes', '72%', 'bg-sky-500'],
                ['Balance temático', '61%', 'bg-amber-500'],
                ['Consumo informacional', '90%', 'bg-violet-500'],
              ].map(([n, v, c]) => (
                <div key={n as string}>
                  <div className="flex justify-between text-sm">
                    <span>{n}</span>
                    <strong>{v}</strong>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-slate-800">
                    <div className={`h-2 rounded-full ${c}`} style={{ width: v as string }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="flotar-rev absolute -bottom-8 -left-6 z-20 rotate-3 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-indigo-300">Nivel de investigador</p>
            <p className="text-2xl font-black text-slate-100">Investigador Senior</p>
          </Card>
        </div>
      </section>

      {/* Ciclo */}
      <section className="py-12">
        <h2 className="text-center text-3xl font-black tracking-tight">{t('home.cycleTitle')}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600 dark:text-slate-300">{t('home.cycleNote')}</p>
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          <Paso codigo="1" nombre={t('home.cycle.game')} subtitulo={t('home.cycle.practice')} />
          <Paso codigo="2" nombre={t('home.cycle.data')} />
          <Paso codigo="3" nombre={t('home.cycle.etiqueta')} />
          <Paso codigo="4" nombre={t('home.cycle.recommend')} subtitulo={t('home.cycle.improve')} />
        </div>
      </section>

      {/* Problema */}
      <section className="py-12">
        <h2 className="text-3xl font-black tracking-tight">{t('home.problemTitle')}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {problemas.map((p, i) => (
            <Card key={p.k} className="p-5">
              <span className="text-xs font-bold uppercase text-indigo-500">0{i + 1}</span>
              <p className="mt-2">{t(p.k)}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <h2 className="text-3xl font-black tracking-tight">{t('home.featuresTitle')}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {features.map((f) => (
            <Card key={f.t} className="p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 font-black text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                {f.n}
              </div>
              <h3 className="mt-3 text-lg font-bold">{t(f.t)}</h3>
              <p className="mt-1 text-slate-600 dark:text-slate-300">{t(f.d)}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* MIL laws */}
      <section className="py-12">
        <h2 className="text-3xl font-black tracking-tight">{t('home.milTitle')}</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {mils.map((m) => (
            <span
              key={m}
              className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300"
            >
              {t(m)}
            </span>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900 px-8 py-12 text-center">
        <h2 className="text-3xl font-black text-slate-100">{t('home.ctaTitle')}</h2>
        <p className="mx-auto mt-2 max-w-xl text-slate-400">{t('home.ctaSub')}</p>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">{t('home.demoHint')}</p>
        <Link
          to="/jugar"
          className="cta-pulso mt-6 inline-block rounded-xl bg-indigo-300 px-6 py-3 font-bold text-black hover:bg-indigo-400"
        >
          {t('home.ctaPlay')}
        </Link>
      </section>
    </div>
  )
}