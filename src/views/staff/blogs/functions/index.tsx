import { Box, Button, ButtonProps, Typography, TypographyProps } from '@mui/material';
import BlogDefault from 'assets/images/blog-default.jpg';
import { AlignType, IBlogComponent } from '../add-blogs/index.interfaces';
import { EditableText } from '../add-blogs/index.styled';

const handleTypography = (value: string, styling: { [key: string]: string | number }): JSX.Element[] => {
	const separateText = value.split('\n');
	return separateText.map(
		(item: string): JSX.Element =>
			item ? (
				<Typography width='100%' key={`${item}`} sx={{ ...styling }}>
					{item}
				</Typography>
			) : (
				<div key={`${item}`} style={{ width: '100%', height: styling.fontSize }} />
			)
	);
};

const handleFlexAlign = (type: AlignType | undefined): string => {
	switch (type) {
		case 'left': {
			return 'flex-start';
		}
		case 'center': {
			return 'center';
		}
		case 'right': {
			return 'flex-end';
		}
		default: {
			return '';
		}
	}
};

const handleFindComponent = (
	item: IBlogComponent,
	scenario: 'edit' | 'view',
	index?: number,
	handleOpen?: (index: number) => void
): JSX.Element => {
	const { type, content, link, deletable, ...styling } = item;
	styling.fontSize = `${styling.fontSize}px`;
	switch (scenario) {
		case 'edit': {
			if (handleOpen && index)
				switch (type) {
					case 'Heading': {
						return (
							<EditableText
								flexWrap='wrap'
								onClick={(): void => handleOpen(index - 1)}
								sx={{ ...(styling as TypographyProps) }}>
								{handleTypography(content, styling)}
							</EditableText>
						);
					}
					case 'Text': {
						return (
							<EditableText
								flexWrap='wrap'
								onClick={(): void => handleOpen(index - 1)}
								sx={{ ...(styling as TypographyProps) }}>
								{handleTypography(content, styling)}
							</EditableText>
						);
					}
					case 'Button': {
						return (
							<EditableText
								display='flex'
								justifyContent={handleFlexAlign(styling.textAlign)}
								flexWrap='wrap'
								onClick={(): void => handleOpen(index - 1)}
								sx={{ ...(styling as TypographyProps) }}>
								<Button> {handleTypography(content, styling)}</Button>
							</EditableText>
						);
					}
					case 'Image': {
						return (
							<Box
								component='img'
								src={!content ? BlogDefault : content}
								alt='image not found'
								onClick={(): void => handleOpen(index - 1)}
							/>
						);
					}
					default: {
						return <Box />;
					}
				}
			return <Box />;
		}
		case 'view': {
			switch (type) {
				case 'Heading': {
					return (
						<Typography flexWrap='wrap' variant='h1' sx={{ ...(styling as TypographyProps) }}>
							{handleTypography(content, styling)}
						</Typography>
					);
				}
				case 'Text': {
					return (
						<Typography flexWrap='wrap' sx={{ ...(styling as TypographyProps) }}>
							{handleTypography(content, styling)}
						</Typography>
					);
				}
				case 'Button': {
					return (
						<Button sx={{ ...(styling as ButtonProps) }}>
							<a
								target='_blank'
								rel='noreferrer'
								href={`https://www.${link}`}
								style={{ textDecoration: 'none', color: 'inherit' }}>
								{handleTypography(content, styling)}
							</a>
						</Button>
					);
				}
				case 'Image': {
					return <Box component='img' src={!content ? BlogDefault : content} alt='Image not found' />;
				}
				default: {
					return <Box />;
				}
			}
		}
		default: {
			return <Box>{deletable}</Box>;
		}
	}
};

const handlePushComponent = (component: string, index: number): IBlogComponent => {
	switch (component) {
		case 'Heading': {
			return {
				type: 'Heading',
				content: `Title ${index}`,
				color: '#000000',
				textAlign: 'center',
				fontSize: 70,
				deletable: true,
			} as IBlogComponent;
		}
		case 'Text': {
			return {
				type: 'Text',
				content: `text ${index}`,
				fontSize: 20,
				color: '#000000',
				textAlign: 'center',
				deletable: true,
			} as IBlogComponent;
		}
		case 'Button': {
			return {
				type: 'Button',
				content: `Button ${index}`,
				color: '#E70042',
				link: '',
				fontSize: 30,
				textAlign: 'center',
				deletable: true,
			} as IBlogComponent;
		}
		case 'Image': {
			return {
				type: 'Image',
				content: '',
				image: true,
				textAlign: 'center',
				deletable: true,
			} as IBlogComponent;
		}
		default: {
			return {} as IBlogComponent;
		}
	}
};

const handleChangeProperty = (temps: IBlogComponent, value: string | number, type: string): IBlogComponent => {
	const temp = temps;
	switch (type) {
		case 'content': {
			temp.content = value as string;
			return temp;
		}
		case 'fontSize': {
			'fontSize' in temp && (temp.fontSize = value as number);
			return temp;
		}
		case 'color': {
			'color' in temp && (temp.color = value as string);
			return temp;
		}
		case 'link': {
			'link' in temp && (temp.link = value as string);
			return temp;
		}
		case 'textAlign': {
			'textAlign' in temp && (temp.textAlign = value as AlignType);
			return temp;
		}
		case 'align': {
			'align' in temp && (temp.align = value as AlignType);
			return temp;
		}
		default: {
			return temp;
		}
	}
};

export { handleFindComponent, handlePushComponent, handleChangeProperty, handleFlexAlign };
