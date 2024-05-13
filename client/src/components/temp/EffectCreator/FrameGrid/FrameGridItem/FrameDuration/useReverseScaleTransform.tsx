const useReverseScaleTransform = (
	input: number,
	max: number,
	intervals: number[],
): { value: number; unitIndex: number } => {
	const intervalsSum = Math.round(max / intervals.reduce((acc, curr) => acc + curr, 0));
	let unitIndex = 0;

	const getStepValue = (diff: number, index: number): number => {
		const stepDiff = intervalsSum * intervals[index];

		if (diff < stepDiff) {
			return diff / intervals[index];
		} else {
			unitIndex++;
			return stepDiff / intervals[index] + getStepValue(diff - stepDiff, index + 1);
		}
	};

	return { value: Math.round(getStepValue(input, 0)), unitIndex };
};

export default useReverseScaleTransform;
