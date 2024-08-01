import type { Meta, StoryObj } from '@storybook/react'

import { fn } from '@storybook/test'

import { InputImage } from './input-image'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'component/organisms/InputImage',
  component: InputImage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded', // NOTE:: centeredにすると画像が表示されない。AspectRatioを使っているのが原因のよう。DevToolsで確認するとposition: absoluteが効いて、それを削除すると表示される。
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    value: {
      control: 'text',
    },
    alt: {
      control: 'text',
    },
    accept: {
      control: 'text',
    },
    ratio: {
      control: 'number',
    },
    readOnly: {
      control: 'boolean',
    },
  },
  args: {
    value: 'sample.jpg',
    accept: 'image/*',
    ratio: 4 / 3,
    readOnly: false,
    alt: 'user',
    onChange: fn(),
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof InputImage>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
}
