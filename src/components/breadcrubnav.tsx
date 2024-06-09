import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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
          <>
            <BreadcrumbItem key={index}>
              {link.href ? (
                <BreadcrumbLink href={link.href}>{link.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{link.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {props.links.length - 1 !== index && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
