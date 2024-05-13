export const initializeBackground = () => {
	const container = document.getElementsByClassName('finisher-header')[0];

	if (window.FinisherHeader && container) {
		new window.FinisherHeader({
			count: 10,
			size: {
				min: 1000,
				max: 1500,
				pulse: 0.5,
			},
			speed: {
				x: {
					min: 0,
					max: 0.3,
				},
				y: {
					min: 0,
					max: 0,
				},
			},
			colors: {
				background: '#070f71',
				particles: ['#035465', '#9f8b02', '#9d020a'],
			},
			blending: 'lighten',
			opacity: {
				center: 0.75,
				edge: 0.1,
			},
			skew: 0,
			shapes: ['s'],
		});
	}
};
