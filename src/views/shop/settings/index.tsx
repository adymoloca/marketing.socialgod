import { Flex, Heading } from 'components/common';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SettingsCard from 'components/shop/cards/settings';
import sectionsItems from './data/index.json';
import Language from './language';
import Display from './display';

export interface SettingsSectionProps {
	goBack: () => void;
}

export enum section {
	language,
	display,
}

const Settings: FC = () => {
	const { t } = useTranslation();
	const [active, setActive] = useState<section | null>(null);

	const sections = useMemo(
		() => ({
			[section.language]: <Language goBack={(): void => setActive(null)} />,
			[section.display]: <Display goBack={(): void => setActive(null)} />,
		}),
		[setActive]
	);

	return (
		<>
			<Heading>{t('settings')}</Heading>
			{active === null ? (
				<Flex gap={3}>
					{sectionsItems.map((el: { icon: string; title: string; handler: number }) => {
						const parsed = { ...el, handler: () => setActive(el.handler) };
						return <SettingsCard key={el.handler} {...parsed} />;
					})}
				</Flex>
			) : (
				sections[active]
			)}
		</>
	);
};

export default Settings;
