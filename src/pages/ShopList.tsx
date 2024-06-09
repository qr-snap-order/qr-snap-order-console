import { gql, useSuspenseQuery } from '@apollo/client'

import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useFilter } from '@/hooks/useFilter'

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

  const {
    filter,
    setFilter,
    result: shops,
  } = useFilter(data.shops, ['id', 'name'])

  return (
    <div>
      <Input
        placeholder="Filter by id, name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shops.map((shop) => (
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
