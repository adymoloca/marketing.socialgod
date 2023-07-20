import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Telegram from '@mui/icons-material/Telegram';
import Reddit from '@mui/icons-material/Reddit';
import { ReactNode } from 'react';

export interface FooterSocial {
	url: string;
	icon: ReactNode | JSX.Element;
}

const FooterSocialsData: FooterSocial[] = [
	{
		url: 'twitter.com/SmartBoxDigital',
		icon: <TwitterIcon />,
	},
	{
		url: 'instagram.com/SmartBoxDigital',
		icon: <InstagramIcon />,
	},
	{
		url: 'facebook.com/SmartBoxDigital',
		icon: <FacebookIcon />,
	},
	{
		url: 'https://t.me/socialgodshop',
		icon: <Telegram />,
	},
	{
		url: 'https://www.reddit.com/user/SocialGodShop',
		icon: <Reddit />,
	},
	{
		url: 'linkedin.com/SmartBoxDigital',
		icon: <LinkedInIcon />,
	},
];

export default FooterSocialsData;
