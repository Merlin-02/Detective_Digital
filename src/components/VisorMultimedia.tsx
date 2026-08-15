import { useEffect, useState } from 'react'
import type { MedioCaso } from '../types'
import { useI18n } from '../i18n'
import { Chip } from './ui'

function DemoBadge() {
  const { t } = useI18n()
  return (
    <Chip className="border border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-300">
      {t('media.demo')}
    </Chip>
  )
}

function ModalImagen({ medio, onClose }: { medio: MedioCaso; onClose: VoidFunction }) {
  const { t } = useI18n()
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/90 p-4 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-label={medio.alt}
      onClick={onClose}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-black/60 px-3 py-1.5 text-sm font-semibold text-white">
            {zoom * 100}%
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setZoom((z) => Math.min(4, z + 0.25))
            }}
            className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/20"
          >
            {t('media.zoomIn')}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setZoom((z) => Math.max(1, z - 0.25))
            }}
            className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/20"
          >
            {t('media.zoomOut')}
          </button>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg bg-white/10 px-4 py-1.5 text-sm font-semibold text-white hover:bg-white/20"
        >
          {t('media.close')} ✕
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto py-6">
        <img
          src={medio.src}
          alt={medio.alt}
          onClick={(e) => e.stopPropagation()}
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
          className="max-h-full max-w-full rounded-xl object-contain shadow-2xl transition-transform duration-150"
        />
      </div>
    </div>
  )
}

export function VisorMultimedia({ medios }: { medios: MedioCaso[] }) {
  const { t } = useI18n()
  const [imagenActiva, setImagenActiva] = useState<MedioCaso | null>(null)

  return (
    <section aria-label={t('media.title')} className="mt-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold">{t('media.title')}</h2>
        <DemoBadge />
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{t('media.hint')}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {medios.map((medio) => {
          const etiqueta = medio.etiqueta ? t(medio.etiqueta) : ''
          const clave = `${medio.tipo}-${medio.src}`
          if (medio.tipo === 'imagen') {
            return (
              <div key={clave} className="overflow-hidden rounded-2xl border glass-border glass">
                <button
                  type="button"
                  onClick={() => setImagenActiva(medio)}
                  className="group relative block aspect-video w-full"
                  aria-label={`${medio.alt} — ${t('media.inspect')}`}
                >
                  <img
                    src={medio.src}
                    alt={medio.alt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 text-sm font-semibold text-white">
                    {etiqueta} · {t('media.inspect')} 🔍
                  </span>
                </button>
              </div>
            )
          }
          if (medio.tipo === 'audio') {
            return (
              <div key={clave} className="rounded-2xl border glass-border glass p-4">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <span aria-hidden>🎧</span> {etiqueta}
                </p>
                <audio controls className="w-full" preload="none">
                  <source src={medio.src} type="audio/mpeg" />
                  {t('media.imgAlt')}
                </audio>
              </div>
            )
          }
          return (
            <div key={clave} className="rounded-2xl border glass-border glass p-4">
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <span aria-hidden>🎥</span> {etiqueta}
              </p>
              <video controls preload="none" className="aspect-video w-full rounded-xl bg-black">
                <source src={medio.src} type="video/mp4" />
                {t('media.imgAlt')}
              </video>
            </div>
          )
        })}
      </div>

      {imagenActiva && <ModalImagen medio={imagenActiva} onClose={() => setImagenActiva(null)} />}
    </section>
  )
}

export function BloqueMedios({ medios }: { medios?: MedioCaso[] }) {
  if (!medios || medios.length === 0) return null
  return <VisorMultimedia medios={medios} />
}