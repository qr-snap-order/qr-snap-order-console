import type { Meta, StoryObj } from '@storybook/react'

import { Mountain, Store, Users } from 'lucide-react'

import { SideNav } from './sidenav'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'component/organisms/SideNav',
  component: SideNav,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {
    logo: {
      label: 'Logo',
      icon: Mountain,
    },
    navItems: [
      {
        label: 'Users',
        icon: Users,
        to: '/users',
      },
      {
        label: 'Shops',
        icon: Store,
        to: '/shops',
      },
    ],
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof SideNav>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
}
