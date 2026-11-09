import { useEffect, useMemo, useRef, useState } from 'react'
import { geoMercator, geoNaturalEarth1, geoPath, type GeoProjection } from 'd3-geo'
import { feature } from 'topojson-client'

export const MW = 960, MH = 500
export type View = 'world' | 'europe'

let cache: any[] | null = null
/** Pays du monde (world-atlas 110m), chargés une seule fois. */
export function useWorld() {
  const [w, setW] = useState<any[] | null>(cache)
  useEffect(() => {
    if (cache) return
    import('world-atlas/countries-110m.json').then(t => { cache = (feature(t.default as any, (t.default as any).objects.countries) as any).features; setW(cache) })
  }, [])
  return w
}
export function useProjection(world: any[] | null, view: View) {
  return useMemo(() => {
    if (!world) return null
    const proj: GeoProjection = view === 'europe'
      ? geoMercator().center([12, 52]).scale(620).translate([MW / 2, MH / 2])
      : geoNaturalEarth1().fitExtent([[6, 6], [MW - 6, MH - 6]], { type: 'Sphere' } as any)
    return { proj, path: geoPath(proj) }
  }, [world, view])
}
/** Centre la carte horizontalement une fois (utile sur téléphone, où la carte défile). */
export const centerOnce = (el: HTMLDivElement | null) => { if (el && !el.dataset.c) { el.dataset.c = '1'; el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2 } }
/** Centre horizontalement une carte qui défile, une fois la carte dessinée. */
export function useCentered(ready: boolean, key: string) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const el = ref.current; if (ready && el) requestAnimationFrame(() => { el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2 }) }, [ready, key])
  return ref
}
