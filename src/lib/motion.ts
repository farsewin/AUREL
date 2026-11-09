export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
export const EASE_IN_OUT: [number, number, number, number] = [0.76, 0, 0.24, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
}

export const lineReveal = {
  hidden: { y: '110%' },
  visible: (index: number) => ({
    y: '0%',
    transition: { duration: 1.05, delay: 0.1 + index * 0.09, ease: EASE },
  }),
}
