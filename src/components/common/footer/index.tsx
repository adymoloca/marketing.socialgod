import { FC } from 'react';
import { ColoredSection, FooterWrapper } from './wrapper/index.styled';
import FooterSections from './sections';
import FooterData from './data/footer-data.json';
import FooterSocials from './socials';
import FooterSocialsData from './data/socials';
import FooterPaymentMethods from './payment-methods';

export interface FooterChildren {
	type: string;
	title: string;
	url: string;
}

export interface FooterItem {
	type: string;
	title: string;
	url: string;
	children: FooterChildren[];
}

const Footer: FC = (): JSX.Element => (
	<FooterWrapper>
		<FooterPaymentMethods />
		<ColoredSection>
			<FooterSections sections={FooterData} />
			<FooterSocials socials={FooterSocialsData} />
		</ColoredSection>
	</FooterWrapper>
);

export default Footer;
