import type { Meta, StoryObj } from '@storybook/react'

import { MultipleSelect } from './multiple-select'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'component/organisms/MultipleSelect',
  component: MultipleSelect,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {
    options: [
      {
        id: '1',
        name: 'option 1',
      },
      {
        id: '2',
        name: 'option 2',
      },
      {
        id: '3',
        name: 'option 3',
      },
      {
        id: '4',
        name: 'option 4',
      },
      {
        id: '5',
        name: 'option 5',
      },
      {
        id: '6',
        name: 'option 6',
      },
      {
        id: '7',
        name: 'option 7',
      },
      {
        id: '8',
        name: 'option 8',
      },
      {
        id: '9',
        name: 'option 9',
      },
      {
        id: '10',
        name: 'option 10',
      },
      {
        id: '11',
        name: 'option 11',
      },
    ],
    value: [
      {
        id: '1',
        name: 'option 1',
      },
      {
        id: '3',
        name: 'option 3',
      },
    ],
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof MultipleSelect>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
}
