import Container from '../../components/Shared/Container'
import { Helmet } from 'react-helmet-async'
import Heading from '../../components/Shared/Heading'
import Button from '../../components/Shared/Button/Button'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Plants from '../../components/Home/Plants'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
// import PurchaseModal from '../../components/Modal/PurchaseModal'
import PurchaseModal from '../../components/Modal1/PurchaseModal'
const PlantDetails = () => {
  const { id } = useParams();

  // console.log(id)
  let [isOpen, setIsOpen] = useState(false)
  const { data: plant = [], isPending, refetch } = useQuery({
    queryKey: ['plant', id],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/plants/${id}`)
      // console.log(data)
      return data;
    }
  })
  if (isPending) return <LoadingSpinner></LoadingSpinner>
  const {
    _id, name, description, category, price, quantity, image, seller
  } = plant || {}
  const closeModal = () => {
    setIsOpen(false)
  }
  // console.log(plant)
  return (
    <Container>
      <Helmet>
        <title>Money Plant</title>
      </Helmet>
      <div className='mx-auto flex flex-col lg:flex-row justify-between w-full gap-12'>
        {/* Header */}
        <div className='flex flex-col gap-6 flex-1'>
          <div>
            <div className='w-full overflow-hidden rounded-xl'>
              <img
                className='object-cover w-full'
                src={image}
                alt='header image'
              />
            </div>
          </div>
        </div>
        <div className='md:gap-10 flex-1'>
          {/* Plant Info */}
          <Heading
            title={name}
            subtitle={`Category: ${category}`}
          />
          <hr className='my-6' />
          <div
            className='
          text-lg font-light text-neutral-500'
          >
            {description}
          </div>
          <hr className='my-6' />

          <div
            className='
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              '
          >
            <div>Seller: {seller.name}</div>

            <img
              className='rounded-full'
              height='30'
              width='30'
              alt='Avatar'
              referrerPolicy='no-referrer'
              src={seller.image}
            />
          </div>
          <hr className='my-6' />
          <div>
            <p
              className='
                gap-4 
              '
            >
              <strong>Quantity: </strong> {quantity} Units Left Only!
            </p>
          </div>
          <hr className='my-6' />
          <div className='flex justify-between'>
            <p className=' text-3xl'><strong>Price:</strong> {price}$</p>
            <div>
              <Button onClick={() => setIsOpen(true)} label={quantity > 0 ? 'Purchase' : 'Out of Stock'} />
            </div>
          </div>
          <hr className='my-6' />

          {/* <PurchaseModal closeModal={closeModal} isOpen={isOpen} /> */}
          {
            quantity > 0 && <PurchaseModal setIsOpen={setIsOpen} isOpen={isOpen} plant={plant}></PurchaseModal>
          }
        </div>
      </div>
    </Container>
  )
}

export default PlantDetails
