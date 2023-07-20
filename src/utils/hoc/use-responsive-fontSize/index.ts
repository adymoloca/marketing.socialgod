import { useEffect, useState } from 'react';

export type FontSize = '16px' | '18px';

export function useResponsiveFontSize(): FontSize {
	const getFontSize = (): FontSize => (window.innerWidth < 450 ? '16px' : '18px');
	const [fontSize, setFontSize] = useState(getFontSize);

	useEffect(() => {
		const onResize = (): void => setFontSize(getFontSize);

		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
		};
	});

	return fontSize;
}
