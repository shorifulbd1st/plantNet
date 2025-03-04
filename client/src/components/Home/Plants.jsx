import Card from './Card'
import Container from '../Shared/Container'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../Shared/LoadingSpinner'

const Plants = () => {
  const { data: plants = [], isPending } = useQuery({
    queryKey: ['plants'],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/plants`)
      // console.log(data)
      return data;
    }
  })
  if (isPending) return <LoadingSpinner></LoadingSpinner>
  // console.log(plants.length)
  return (
    <Container>
      <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {plants.map((plant, idx) => <Card key={idx} plant={plant} />)}
      </div>
    </Container>
  )
}

export default Plants
