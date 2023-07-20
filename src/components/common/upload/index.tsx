import { ChangeEventHandler, FC, useCallback, useId } from 'react';
import { uuid } from 'utils/functions';
import { FileName, ImageBox, SimpleUploadLabel, RemoveButton } from './idex.styled';
import Flex from '../wrapper/flex';

type ImageTypes = 'image/*' | '.jpg' | '.jpeg' | '.jfif' | '.pjpeg' | '.pjp' | '.png' | '.svg' | '.webp';

export interface UploadProps {
	onChange: (stream: File | FileList) => void;
	onDelete?: (file?: File) => void;
	file?: File | string;
	files?: FileList | string[];
	multiple?: boolean;
	accept?: ImageTypes[];
	label?: string;
	showFile?: boolean;
}

function UploadFunction({
	onChange,
	file,
	files,
	multiple,
	accept,
	label,
	showFile,
	onDelete,
}: UploadProps): JSX.Element {
	const id = useId();
	const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
		(event) => {
			!!event.target?.files?.length &&
				onChange(multiple ? event.target?.files : (event.target?.files as FileList)[0]);
		},
		[multiple, onChange]
	);
	const renderFile = useCallback(
		(namedFile: File | string) => (
			<Flex key={uuid()} column alignItems='center' position='relative'>
				{typeof onDelete !== 'undefined' && (
					<RemoveButton
						onClick={(): void => onDelete(typeof namedFile !== 'string' ? namedFile : undefined)}
					/>
				)}
				<ImageBox file={typeof namedFile === 'string' ? namedFile : URL.createObjectURL(namedFile as Blob)} />
				<FileName>{typeof namedFile !== 'string' ? namedFile.name : namedFile}</FileName>
			</Flex>
		),
		[onDelete]
	);

	return (
		<Flex column alignStart sx={{ px: 3 }}>
			{showFile && file !== undefined
				? renderFile(file)
				: showFile && files !== undefined && <Flex gap={3}>{[...files].map((el) => renderFile(el))}</Flex>}
			<SimpleUploadLabel htmlFor={`${id}-file-input`}>{label}</SimpleUploadLabel>
			<input
				id={`${id}-file-input`}
				type='file'
				accept={accept?.join(',')}
				hidden
				multiple={multiple}
				onChange={handleChange}
			/>
		</Flex>
	);
}

const defaultProps = {
	file: undefined,
	files: undefined,
	multiple: false,
	accept: ['image/*'] as ImageTypes[],
	label: 'Upload',
	showFile: false,
	onDelete: (): void => { },
};

UploadFunction.defaultProps = defaultProps;

const Upload: FC<UploadProps> = UploadFunction;

export default Upload;
