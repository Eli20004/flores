import { motion, useReducedMotion } from 'framer-motion'
import bouquetImage from './assets/yellow-bouquet.png'

const petals = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  left: `${(index * 17 + 7) % 100}%`,
  delay: (index % 8) * -1.3,
  duration: 10 + (index % 5) * 1.8,
  size: 10 + (index % 4) * 5,
  drift: index % 2 === 0 ? 42 : -42,
}))

function PetalField() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <motion.span
          key={petal.id}
          className="absolute top-[-12%] block rounded-[100%_0_100%_0] bg-sunshine/70 blur-[0.2px]"
          style={{ left: petal.left, width: petal.size, height: petal.size * 0.72 }}
          animate={reduceMotion ? undefined : { y: ['0vh', '115vh'], x: [0, petal.drift, petal.drift / 2], rotate: [0, 150, 300], opacity: [0, 0.8, 0.65, 0] }}
          transition={reduceMotion ? undefined : { duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  )
}

function App() {
  const reduceMotion = useReducedMotion()
  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: 'easeOut' as const },
  })

  return (
    <main className="overflow-hidden bg-cream text-forest">
      <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-[radial-gradient(circle_at_12%_20%,rgba(255,255,255,.95),transparent_28%),linear-gradient(135deg,#fffdf6_0%,#fff4c7_48%,#e9eedb_100%)] px-6 py-16 sm:px-10 lg:px-16">
        <PetalField />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          <div className="max-w-xl pt-8 lg:pt-0">
            <motion.p {...fadeUp(0.08)} className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-sage">Una pequeña sorpresa para Wendy</motion.p>
            <motion.h1 {...fadeUp(0.2)} className="font-display text-5xl leading-[1.04] tracking-tight text-forest sm:text-6xl lg:text-7xl">Wendy, eres mi lugar favorito.</motion.h1>
            <motion.p {...fadeUp(0.34)} className="mt-7 max-w-md text-lg leading-8 text-forest/70">Te regalo estas flores amarillas porque no encontré una forma más bonita de decirte que contigo todo se siente más cálido, más alegre y más especial.</motion.p>
            <motion.a
              {...fadeUp(0.48)}
              href="#dedicatoria"
              whileHover={reduceMotion ? undefined : { scale: 1.04, y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-forest px-7 py-4 font-semibold text-white shadow-lg shadow-forest/20 transition-colors hover:bg-[#415a3e] focus:outline-none focus:ring-4 focus:ring-sunshine/40"
            >
              Abre mi regalo para ti <span aria-hidden="true">♡</span>
            </motion.a>
          </div>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.18, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-2xl"
          >
            <div className="absolute -inset-5 rounded-[2.5rem] bg-sunshine/15 blur-3xl" />
            <img src={bouquetImage} alt="Ramo de girasoles, tulipanes, rosas y craspedias amarillas" className="relative aspect-[3/2] w-full rounded-[2rem] object-cover shadow-flower" />
          </motion.div>
        </div>
      </section>

      <section id="dedicatoria" className="bg-white px-6 py-20 text-center sm:px-10 sm:py-28">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-3xl px-2 sm:px-14"
        >
          <span className="text-3xl text-sunshine" aria-hidden="true">♡</span>
          <p className="mt-4 font-display text-3xl leading-tight text-forest sm:text-4xl">No son solo flores amarillas. Son una forma pequeña de recordarte lo mucho que significas para mí.</p>
          <p className="mt-5 text-forest/65">Para Wendy, con todo mi amor. Hoy, mañana y siempre.</p>
        </motion.div>
      </section>
    </main>
  )
}

export default App
