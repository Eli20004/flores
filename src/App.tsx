import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import bouquetImage from './assets/yellow-bouquet.png'

type Flower = {
  name: string
  description: string
  imageUrl: string
  alt: string
}

const flowers: Flower[] = [
  {
    name: 'Girasoles',
    description: 'Porque desde que estás tú, todo brilla un poquito más.',
    imageUrl: 'https://images.unsplash.com/photo-1597848212624-e1e6f348d4b3?auto=format&fit=crop&w=800&q=85',
    alt: 'Girasol amarillo en un campo luminoso',
  },
  {
    name: 'Tulipanes',
    description: 'Porque contigo hasta los nuevos días se sienten bonitos.',
    imageUrl: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=85',
    alt: 'Tulipanes amarillos frescos',
  },
  {
    name: 'Rosas',
    description: 'Porque mi amor por ti florece en cada detalle.',
    imageUrl: 'https://images.unsplash.com/photo-1494336934272-f58822c6c718?auto=format&fit=crop&w=800&q=85',
    alt: 'Rosas amarillas delicadas',
  },
]

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

function FlowerCard({ flower, index }: { flower: Flower; index: number }) {
  const [loaded, setLoaded] = useState(false)
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      className="group overflow-hidden rounded-[1.75rem] bg-white shadow-[0_12px_35px_rgba(85,74,36,0.09)]"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.12, duration: 0.55 }}
      whileHover={reduceMotion ? undefined : { y: -9, scale: 1.02, boxShadow: '0 22px 42px rgba(100, 79, 21, 0.18)' }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-butter/40">
        {!loaded && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-butter via-cream to-[#efe7c9]" />}
        <img
          src={flower.imageUrl}
          alt={flower.alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
      <div className="p-6 sm:p-7">
        <h3 className="font-display text-2xl text-forest">{flower.name}</h3>
        <p className="mt-2 leading-7 text-forest/65">{flower.description}</p>
      </div>
    </motion.article>
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
              href="#flores"
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

      <section id="flores" className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="mb-11 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sage">Para la persona que quiero</p>
          <h2 className="mt-3 font-display text-4xl text-forest sm:text-5xl">Tres formas de decirte: te quiero</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">{flowers.map((flower, index) => <FlowerCard key={flower.name} flower={flower} index={index} />)}</div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65 }}
          className="mx-auto mt-16 max-w-3xl rounded-[2rem] border border-sunshine/25 bg-white/70 px-8 py-10 text-center shadow-[0_16px_38px_rgba(100,79,21,0.08)] backdrop-blur sm:px-14"
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
