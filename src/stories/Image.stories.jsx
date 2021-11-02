import Image from '@components/base/Image';

export default {
  title: 'Component/Image',
  component: Image,
  argTypes: {
    src: {
      defaultValue: 'https://picsum.photos/200',
    },
    placeholder: {
      defaultValue: 'https://via.placeholder.com/200',
    },
    width: {
      control: { type: 'range', min: 0, max: 600 },
    },
    height: {
      control: { type: 'range', min: 0, max: 600 },
    },
    mode: {
      defaultValue: 'cover',
      control: { type: 'inline-radio' },
      options: ['cover', 'fill', 'contain'],
    },
  },
};

export const Default = (args) => <Image {...args} />;

export const Lazy = (args) => (
  <div>
    {Array.from(new Array(20), (_, k) => k).map((i) => (
      <Image {...args} isLazy src={`${args.src}?${i}`} key={i} />
    ))}
  </div>
);
