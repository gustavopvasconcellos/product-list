import React, { FunctionComponent } from 'react'
import { Loading } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

import Selector from './components/QuantitySelector'
import { useItemContext } from './ItemContext'
import { AVAILABLE } from './constants/Availability'
import { opaque } from './utils/opaque'
import styles from './styles.css'
import QuantityStepper from './components/QuantityStepper'

const MAX_ITEM_QUANTITY = 99999
const CSS_HANDLES = ['quantitySelectorContainer'] as const

enum QuantitySelectorVariation {
  Selector,
  Stepper,
}

type QuantitySelectorProps = {
  variation: QuantitySelectorVariation
}

const QuantitySelector: FunctionComponent<QuantitySelectorProps> = ({
  variation = QuantitySelectorVariation.Stepper,
}) => {
  const { item, loading, onQuantityChange } = useItemContext()
  const handles = useCssHandles(CSS_HANDLES)

  if (loading) {
    return <Loading />
  }

  return variation === QuantitySelectorVariation.Selector ? (
    <div
      className={`${opaque(item.availability)} ${
        handles.quantitySelectorContainer
      } ${styles.quantity} ${styles.quantitySelector}`}
    >
      <Selector
        id={item.id}
        value={item.quantity}
        maxValue={MAX_ITEM_QUANTITY}
        onChange={onQuantityChange}
        disabled={item.availability !== AVAILABLE}
      />
    </div>
  ) : (
    <div
      className={`${opaque(item.availability)} ${
        handles.quantitySelectorContainer
      } ${styles.quantity} ${styles.quantitySelector}`}
    >
      <QuantityStepper
        id={item.id}
        value={item.quantity}
        maxValue={MAX_ITEM_QUANTITY}
        onChange={onQuantityChange}
        disabled={item.availability !== AVAILABLE}
      />
    </div>
  )
}

export default QuantitySelector
