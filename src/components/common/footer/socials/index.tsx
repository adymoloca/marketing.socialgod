import { Box, Theme, Typography, useTheme } from '@mui/material';
import { FC } from 'react';
import { Copyright } from '@mui/icons-material';
import { NavigateFunction, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { capitalize, uuid } from 'utils/functions';
import { ClickableText, SocialIconWrapper, SocialsWrapper, StyledIconButton } from './index.styled';
import { FooterSocial } from '../data/socials';

interface FooterSocialsProps {
	socials: FooterSocial[];
}

const FooterSocials: FC<FooterSocialsProps> = ({ socials }): JSX.Element => {
	const currentYear = new Date().getFullYear();
	const navigate: NavigateFunction = useNavigate();
	const theme = useTheme<Theme>();
	const { t } = useTranslation();

	return (
		<SocialsWrapper>
			<Box display='flex' gap={1}>
				<Typography color={theme.palette.common.white}>Copyright</Typography>
				<Copyright sx={{ color: theme.palette.common.white }} />
				<Typography color={theme.palette.common.white}>SocialGod</Typography>
				<Typography color={theme.palette.common.white}>{currentYear}</Typography>
			</Box>
			<Box display='flex' gap={4}>
				<ClickableText onClick={(): void => navigate('/privacy-policy')}>
					{capitalize(t('footer.privacy_policy'))}
				</ClickableText>
				<ClickableText onClick={(): void => navigate('/terms-of-service')}>
					{capitalize(t('footer.terms_and_conditions'))}
				</ClickableText>
				<ClickableText onClick={(): void => navigate('/')}>{capitalize(t('footer.status'))}</ClickableText>
			</Box>
			<SocialIconWrapper>
				{socials.map((item: FooterSocial) => (
					<StyledIconButton
						href={`https://www.${item.url}`}
						target='_blank'
						rel='noopener'
						key={`socials-${uuid()}`}>
						{item.icon}
					</StyledIconButton>
				))}
			</SocialIconWrapper>
		</SocialsWrapper>
	);
};

export default FooterSocials;
