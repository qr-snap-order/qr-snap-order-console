import { Link } from 'react-router-dom'

import ShopNew from '@/components/organisms/shop/ShopNew'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useShops } from '@/hooks/shop/useShops'
import { useFilter } from '@/hooks/useFilter'

export default function ShopList() {
  const { data } = useShops()

  const {
    filter,
    setFilter,
    result: shops,
  } = useFilter(data.shops, ['id', 'name'])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Input
          placeholder="Filter by id, name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>New</Button>
          </DialogTrigger>
          <DialogContent>
            <ShopNew />
          </DialogContent>
        </Dialog>
      </div>
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
              <TableCell>
                <Link to={`/shops/${shop.id}`}>
                  <Button variant="link">Show</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
