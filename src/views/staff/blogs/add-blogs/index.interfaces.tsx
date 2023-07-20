export type IBlogComponent = IBlogHeading | IBlogText | IBlogButton | IBlogImage;

export type AlignType = 'left' | 'center' | 'right';

export type BlogContentType = 'Heading' | 'Text' | 'Image' | 'Button';

export type BlogCategory = 'All' | 'Reddit' | 'Twitter' | 'Instagram';

interface BaseComponent {
	type: BlogContentType;
	content: string;
	color?: string;
	link?: string;
	textAlign?: AlignType;
	fontSize?: number | string;
	deletable: boolean;
}

export type IBlogHeading = BaseComponent;

export type IBlogText = BaseComponent;

export interface IBlogButton extends BaseComponent {
	link?: string;
}

export interface IBlogImage extends BaseComponent {
	width?: string;
	height?: string;
}
