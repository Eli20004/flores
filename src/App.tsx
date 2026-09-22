import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

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

type BloomProps = { x: number; y: number; delay: number }

function Sunflower({ x, y, delay }: BloomProps) {
  const reduceMotion = useReducedMotion()
  return <motion.g initial={reduceMotion ? false : { scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay, type: 'spring', stiffness: 130, damping: 12 }} style={{ transformOrigin: `${x}px ${y}px` }}>
    {Array.from({ length: 16 }, (_, i) => <ellipse key={i} cx={x} cy={y - 21} rx="11" ry="29" fill="#f7bf21" transform={`rotate(${i * 22.5} ${x} ${y})`} />)}
    <circle cx={x} cy={y} r="22" fill="#6f4b1f" /><circle cx={x} cy={y} r="15" fill="#8a6027" />
  </motion.g>
}

function Tulip({ x, y, delay }: BloomProps) {
  const reduceMotion = useReducedMotion()
  return <motion.g initial={reduceMotion ? false : { scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay, type: 'spring', stiffness: 145, damping: 13 }} style={{ transformOrigin: `${x}px ${y}px` }}>
    <path d={`M${x - 27} ${y + 17} C${x - 33} ${y - 22},${x - 12} ${y - 47},${x} ${y - 22} C${x + 12} ${y - 47},${x + 33} ${y - 22},${x + 27} ${y + 17} C${x + 11} ${y + 31},${x - 11} ${y + 31},${x - 27} ${y + 17}Z`} fill="#f6cc2a" />
    <path d={`M${x} ${y - 22}v44`} stroke="#e3ad18" strokeWidth="3" opacity=".6" />
  </motion.g>
}

function Rose({ x, y, delay }: BloomProps) {
  const reduceMotion = useReducedMotion()
  return <motion.g initial={reduceMotion ? false : { scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay, type: 'spring', stiffness: 150, damping: 13 }} style={{ transformOrigin: `${x}px ${y}px` }}>
    <circle cx={x} cy={y} r="30" fill="#f4c229" />
    <path d={`M${x - 22} ${y + 3}C${x - 6} ${y - 25},${x + 24} ${y - 17},${x + 13} ${y + 4}C${x + 2} ${y + 22},${x - 17} ${y + 16},${x - 9} ${y - 2}C${x} ${y - 13},${x + 11} ${y - 2},${x + 2} ${y + 10}`} fill="none" stroke="#fff0a3" strokeWidth="5" strokeLinecap="round" />
  </motion.g>
}

function AnimatedBouquet() {
  const reduceMotion = useReducedMotion()
  const stems = [[320, 120], [205, 152], [435, 145], [122, 210], [510, 206], [270, 215], [376, 222]]

  return <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_50%_5%,#fffdf0,transparent_45%),linear-gradient(145deg,#f9edb7,#f6d668)] shadow-flower">
    <svg viewBox="0 0 640 420" className="h-full w-full" role="img" aria-label="Ramo animado de flores amarillas creado para Wendy">
      <motion.ellipse cx="320" cy="394" rx="145" ry="19" fill="#b58d42" opacity=".22" initial={{ opacity: 0 }} animate={{ opacity: .22 }} transition={{ delay: .25 }} />
      {stems.map(([x, y], i) => <motion.path key={i} d={`M320 372 Q${(320 + x) / 2} ${300 - i * 8} ${x} ${y + 28}`} fill="none" stroke="#537341" strokeWidth="9" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduceMotion ? 0 : .7, delay: i * .11 }} />)}
      {[[234, 270, -28], [390, 267, 30], [176, 296, -42], [455, 301, 37], [281, 302, -18]].map(([x, y, angle], i) => <motion.ellipse key={i} cx={x} cy={y} rx="13" ry="31" fill="#71934f" transform={`rotate(${angle} ${x} ${y})`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: .55 + i * .1 }} />)}
      <motion.path d="M242 330 L320 390 L397 330 L370 395 L320 407 L270 395Z" fill="#ead5aa" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: .65, delay: .85 }} />
      <Sunflower x={122} y={198} delay={.7} /><Sunflower x={510} y={194} delay={.85} /><Sunflower x={320} y={116} delay={1.02} />
      <Tulip x={205} y={142} delay={1.12} /><Tulip x={435} y={137} delay={1.22} /><Tulip x={270} y={205} delay={1.32} /><Tulip x={376} y={212} delay={1.42} />
      <Rose x={184} y={235} delay={1.5} /><Rose x={454} y={238} delay={1.6} />
      {[{ x: 80, y: 150 }, { x: 560, y: 145 }, { x: 155, y: 116 }, { x: 488, y: 111 }, { x: 320, y: 205 }].map((dot, i) => <motion.circle key={i} cx={dot.x} cy={dot.y} r="11" fill="#e8b426" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.7 + i * .08, type: 'spring' }} />)}
      <motion.path d="M268 342 Q320 305 372 342" fill="none" stroke="#f9f0d4" strokeWidth="8" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .5, delay: 2.05 }} />
    </svg>
  </div>
}

function App() {
  const reduceMotion = useReducedMotion()
  const [giftOpen, setGiftOpen] = useState(false)
  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: 'easeOut' as const },
  })

  return (
    <main className="overflow-hidden bg-cream text-forest">
      <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-[radial-gradient(circle_at_12%_20%,rgba(255,255,255,.95),transparent_28%),linear-gradient(135deg,#fffdf6_0%,#fff4c7_48%,#e9eedb_100%)] px-6 py-16 sm:px-10 lg:px-16">
        {giftOpen && <PetalField />}
        <AnimatePresence mode="wait">
          {!giftOpen ? (
            <motion.div key="closed" exit={reduceMotion ? undefined : { opacity: 0, scale: 0.94 }} className="relative z-10 mx-auto w-full max-w-md text-center">
              <motion.div animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [-1, 1, -1] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} className="rounded-[2.5rem] border border-sunshine/35 bg-white/75 px-8 py-12 shadow-flower backdrop-blur">
                <span className="text-5xl text-sunshine" aria-hidden="true">♡</span>
                <p className="mt-7 text-sm font-semibold uppercase tracking-[0.24em] text-sage">Tengo algo para ti</p>
                <h1 className="mt-3 font-display text-5xl text-forest">Wendy</h1>
                <p className="mt-5 text-lg leading-8 text-forest/65">Toca aquí y deja que este regalo se construya para ti.</p>
                <motion.button onClick={() => setGiftOpen(true)} whileHover={reduceMotion ? undefined : { scale: 1.04 }} whileTap={reduceMotion ? undefined : { scale: 0.97 }} className="mt-9 rounded-full bg-forest px-8 py-4 font-semibold text-white shadow-lg shadow-forest/20 focus:outline-none focus:ring-4 focus:ring-sunshine/40">Abrir mi sorpresa</motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="open" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
              <div className="max-w-xl pt-8 lg:pt-0">
                <motion.p {...fadeUp(0.1)} className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-sage">Una pequeña sorpresa para Wendy</motion.p>
                <motion.h1 {...fadeUp(0.32)} className="font-display text-5xl leading-[1.04] tracking-tight text-forest sm:text-6xl lg:text-7xl">Wendy, eres mi lugar favorito.</motion.h1>
                <motion.p {...fadeUp(0.56)} className="mt-7 max-w-md text-lg leading-8 text-forest/70">Te regalo estas flores amarillas porque no encontré una forma más bonita de decirte que contigo todo se siente más cálido, más alegre y más especial.</motion.p>
                <motion.a {...fadeUp(0.8)} href="#dedicatoria" whileHover={reduceMotion ? undefined : { scale: 1.04, y: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }} className="mt-9 inline-flex items-center gap-3 rounded-full bg-forest px-7 py-4 font-semibold text-white shadow-lg shadow-forest/20 transition-colors hover:bg-[#415a3e] focus:outline-none focus:ring-4 focus:ring-sunshine/40">Sigue bajando <span aria-hidden="true">♡</span></motion.a>
              </div>
              <motion.div initial={reduceMotion ? false : { clipPath: 'inset(100% 0 0 0 round 2rem)', scale: 0.94 }} animate={{ clipPath: 'inset(0% 0 0 0 round 2rem)', scale: 1 }} transition={{ duration: reduceMotion ? 0 : 1.35, delay: 0.35, ease: 'easeOut' }} className="relative mx-auto w-full max-w-2xl">
                <div className="absolute -inset-5 rounded-[2.5rem] bg-sunshine/15 blur-3xl" />
                <div className="relative"><AnimatedBouquet /></div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
