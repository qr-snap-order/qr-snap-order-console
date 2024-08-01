import { z } from 'zod'

export const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255),
  menuSections: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1).max(255),
      menuItems: z.array(
        z.object({
          id: z.string(),
          name: z.string().min(1).max(255),
          price: z.coerce.number().min(0).max(99999999),
          image: z
            .custom<File | null | string>()
            .transform((v) => (typeof v === 'string' ? undefined : v)),
          menuItemGroups: z.array(
            z
              .object({
                id: z.string(),
                name: z.string().min(1).max(255),
              })
              .transform((menuItemGroup) => menuItemGroup.id)
          ),
        })
      ),
    })
  ),
})

export type FormInput = z.input<typeof formSchema>

export type FormOutput = z.output<typeof formSchema>
