import { usePathname } from 'next/navigation';
import { MouseEvent, forwardRef } from 'react';
import Link, { LinkProps } from 'next/link';

const LinkBehavior = forwardRef<HTMLAnchorElement, LinkProps>(function LinkBehaviour(
	props,
	ref,
) {
	const pathname = usePathname();

	const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
		if (props.href === pathname) e.preventDefault();
		else props.onClick?.(e);
	};

	return <Link ref={ref} {...props} onClick={handleClick} />;
});

export default LinkBehavior;
