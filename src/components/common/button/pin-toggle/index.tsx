import { Icon } from '@iconify/react';
import { Tooltip } from '@mui/material';
import { FC, MouseEvent, ReactElement, useId } from 'react';
import { useTranslation } from 'react-i18next';

export interface PinToggleProps {
	onClick: () => void;
	pinned?: boolean;
	tooltip?: string;
}

interface WrapperProps {
	tooltip: PinToggleProps['tooltip'];
	children: ReactElement;
}

const Wrapper: FC<WrapperProps> = ({ tooltip, children }): JSX.Element =>
	tooltip ? <Tooltip title={tooltip}>{children as ReactElement}</Tooltip> : children;

const PinToggle: FC<PinToggleProps> = ({ onClick, pinned, tooltip }): JSX.Element => {
	const id = useId();
	const { t } = useTranslation();

	return (
		<Wrapper tooltip={(pinned ? tooltip : t('add_to_favorites')) as string}>
			<Icon
				id={id}
				fontSize={20}
				icon={pinned ? 'typcn:pin' : 'typcn:pin-outline'}
				onClick={(e: MouseEvent<SVGSVGElement>): void => {
					e.preventDefault();
					e.stopPropagation();
					onClick();
				}}
			/>
		</Wrapper>
	);
};

PinToggle.defaultProps = {
	pinned: false,
	tooltip: '',
};

export default PinToggle;
