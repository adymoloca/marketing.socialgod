interface IModalData {
    icon: string
    url: string
    title: string
    subtitle: string
}

export const modalData: IModalData[] = [
	{
		icon: 'sync_problem',
		url: '/',
		title: 'Report a bug',
		subtitle: 'Let us know if something isn\'t working',
	},
	{
		icon: 'rate_review',
		url: '/',
		title: 'General feedback',
		subtitle: 'Give a feedback about the platform',
	},
	{
		icon: 'list_alt',
		url: '/',
		title: 'View existing feedback',
		subtitle: 'See the existing feedback',
	},
	{
		icon: 'featured_play_list',
		url: '/',
		title: 'Request a new feature',
		subtitle: 'Let us know if you want a new feature',
	},
];