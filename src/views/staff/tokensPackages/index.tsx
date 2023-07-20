import { Flex, Heading } from 'components/common';
import { useTranslation } from 'react-i18next';
import AddPackageForm from './components/AddPackageForm';

const AddProxy = (): JSX.Element => {
	const { t } = useTranslation();

	return (
		<Flex>
			<Heading>{t('add_tokens_packages')}</Heading>
			<AddPackageForm />
		</Flex>
	);
};

export default AddProxy;
