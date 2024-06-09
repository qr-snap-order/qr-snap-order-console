import { gql, useSuspenseQuery } from '@apollo/client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.shops.map((shop) => (
            <TableRow key={shop.id}>
              <TableCell>{shop.id}</TableCell>
              <TableCell>{shop.name}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
