import { gql, useSuspenseQuery } from '@apollo/client'

const GET_SHOPS = gql`
  query {
    shops {
      id
      name
    }
  }
`

type ShopsData = {
  shops: {
    id: string
    name: string
  }[]
}

export default function ShopList() {
  const { data } = useSuspenseQuery<ShopsData>(GET_SHOPS)
  return (
    <div>
      {data.shops.map((shop) => (
        <div key={shop.id}>{shop.name}</div>
      ))}
    </div>
  )
}
