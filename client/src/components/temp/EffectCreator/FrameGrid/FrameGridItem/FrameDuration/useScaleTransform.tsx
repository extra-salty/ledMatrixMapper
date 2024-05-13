const useScaleTransform = (min: number, max: number, intervals: number[]) => {
	const distributions = intervals.length;
	const modifiedMax = Math.ceil(
		(max - min) / intervals.reduce((total, step) => total + step / distributions, 0),
	);

	const scaleTransform = (input: number): number => {
		const stepTransforms = intervals.map((s, i) => {
			const setCount = Math.min(
				Math.ceil(input - (modifiedMax * i) / distributions),
				Math.round(modifiedMax / distributions),
			);
			return setCount > 0 ? setCount * s : 0;
		});

		let lastStep = 0;
		const out =
			Math.round(
				stepTransforms.reduce((total, num, i) => {
					if (num) {
						lastStep = i;
					}
					return total + num;
				}),
			) + min;

		const unit = intervals[lastStep];

		return Math.min(Math.round(out / unit) * unit, max);
	};

	return { modifiedMax, transform: scaleTransform };
};

export default useScaleTransform;
