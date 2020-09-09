import React, { FunctionComponent, Fragment, useState } from 'react'
import { FormattedPrice } from 'vtex.formatted-price'
import { ButtonPlain, InputButton, Modal, Tag } from 'vtex.styleguide'

import { useItemContext } from './ItemContext'

import styles from './styles.css'

const ManualPricing: FunctionComponent = () => {
  const { item } = useItemContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const sellingPrice =
    item.sellingPrice != null
      ? (item.sellingPrice * item.quantity) / 100
      : item.sellingPrice
  const [manualPrice, setManualPrice] = useState(sellingPrice)
  const priceChanged = manualPrice !== sellingPrice

  const handleManualPriceChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newManualPrice = evt.target.value as unknown

    setManualPrice(newManualPrice as number)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmitForm = (e: any) => {
    e.preventDefault()
    handleCloseModal()
  }

  return (
    <div
      className={`mt4 ${styles.quantity} ${styles.quantitySelector}`}
    >
      <div className="flex flex-column items-center mt3 tc">
        <div className="mb3 c-muted-1">
          <FormattedPrice value={manualPrice} />
        </div>

        {priceChanged && (
          <Fragment>
            <div className="mb4">
              <Tag size="small" bgColor="#3F3F40" className="fw5">
                Changed
              </Tag>
            </div>
          </Fragment>
        )}

        <ButtonPlain size="small" onClick={handleOpenModal}>
          {priceChanged ? 'Price options' : 'Change price'}
        </ButtonPlain>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form className="c-on-base" onSubmit={e => { handleSubmitForm(e) }}>
          <div>
            <div className="t-small mb3">Original price</div>
            <div className={`c-muted-1 mb3 ${priceChanged ? 'strike' : ''}`}>
              <FormattedPrice value={sellingPrice} />
            </div>
          </div>

          <div className="pt3">
            <InputButton
              autoFocus="autofocus"
              button="OK"
              buttonProps={{
                variation: "primary"
              }}
              label="Change to"
              onChange={handleManualPriceChange}
              value={manualPrice}
            />
          </div>

          {priceChanged && (
            <div className="mt5">
              <ButtonPlain size="small" onClick={() => setManualPrice(sellingPrice)}>
                Revert to original
              </ButtonPlain>
            </div>
          )}
        </form>
      </Modal>
    </div>
  )
}

export default ManualPricing
