import React from 'react'
import css from './styles.module.css'
import { getNounData, ImageData } from '@nouns/assets'
import { buildSVG } from '@nouns/sdk'
import classNames from 'classnames'
export type NounProps = {
  background: number
  body: number
  accessory: number
  head: number
  glasses: number
}
function NounsAvatar({ seed, className }: { seed: NounProps; className?: string }) {
  const { parts, background } = getNounData(seed)
  const { palette } = ImageData
  const svgBinary = buildSVG(parts, palette, background)
  const svgBase64 = btoa(svgBinary)
  return (
    <img
      className={className ? classNames(css.noun, className) : css.noun}
      src={`data:image/svg+xml;base64,${svgBase64}`}
      alt="nouns"
    />
  )
}

export default NounsAvatar
