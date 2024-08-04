import * as React from 'react'
import { Link } from 'react-router-dom'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

type Props = {
  links: {
    href?: string
    label: string
  }[]
}

export function BreadcrumbNav(props: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {props.links.map((link, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {link.href ? (
                <Link to={link.href}>{link.label}</Link>
              ) : (
                <BreadcrumbPage>{link.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {props.links.length - 1 !== index && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
