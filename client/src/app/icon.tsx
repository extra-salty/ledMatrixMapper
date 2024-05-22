import { ImageResponse } from 'next/og';
// export const contentType = 'image/png';

export default function Icon() {
	return new ImageResponse(
		(
			<svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
				<path d='M20 8L4 8' stroke='white' stroke-width='2' stroke-linecap='round' />
				<path d='M20 16L4 16' stroke='white' stroke-width='2' stroke-linecap='round' />
				<path d='M8 4L8 20' stroke='white' stroke-width='2' stroke-linecap='round' />
				<path d='M16 4V20' stroke='white' stroke-width='2' stroke-linecap='round' />
			</svg>
		),
		{
			width: 24,
			height: 24,
		},
	);
}

{
	/* <svg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
<path
  d='M31.5 10.666L0.5 10.666'
  stroke='white'
  stroke-width='2'
  stroke-linecap='round'
/>
<path
  d='M31.5 21.333L0.5 21.333'
  stroke='white'
  stroke-width='2'
  stroke-linecap='round'
/>
<path
  d='M10.666 0.5L10.666 31.5'
  stroke='white'
  stroke-width='2'
  stroke-linecap='round'
/>
<path
  d='M21.333 0.5V31.5'
  stroke='white'
  stroke-width='2'
  stroke-linecap='round'
/>
</svg> */
}
