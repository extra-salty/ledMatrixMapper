const Measure = ({ before }: { before: number }) => {
	const now = performance.now();

	const result = now - before;

	console.info('Overall performance: ', result);
	return <>{result}</>;
};

export default Measure;
