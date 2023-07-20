import { useState, useEffect, useCallback, ChangeEvent, ReactNode, ReactElement, FC } from 'react';
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	Avatar,
	TablePagination,
	Typography,
	useMediaQuery,
	Box,
	capitalize,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled, useTheme } from '@mui/material/styles';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import { useTranslation } from 'react-i18next';
import { uuid } from 'utils/functions';
import { loadingCol, skeletonTable } from './LoadingData';

const StyledTableCell = styled(TableCell)(() => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: '#fff',
		color: '#616161',
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(() => ({
	'&:nth-of-type(odd)': {
		background: '#F9F9FC',
	},
	'&:nth-of-type(even)': {
		background: '#fff',
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 2,
	},
}));

type ITypeAlign = 'left' | 'right' | 'center';

export interface IColumn {
	key: string;
	width: string | number;
	label: string;
	align: ITypeAlign;
}

interface ITable {
	rows: any;
	columns: IColumn[];
}

type ChildType = JSX.Element | ReactNode | ReactElement;

interface IProps {
	data?: ITable;
	loading?: boolean;
	pagination?: boolean;
	noContentMessage?: string;
	searchTable?: boolean;
	customPagination?: ChildType;
}

const CustomTable: FC<IProps> = (props: IProps) => {
	const {
		data,
		loading = false,
		pagination = false,
		noContentMessage,
		searchTable = false,
		customPagination,
	} = props;
	const theme = useTheme();
	const { t } = useTranslation();
	const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
	const [columns, setColumns] = useState<IColumn[]>([]);
	const [rows, setRows] = useState([]);
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);
	const [page, setPage] = useState<number>(0);

	const handlerRows = useCallback(() => {
		const thisData = loading === true ? Array(5).fill(skeletonTable) : data?.rows;
		setRows(thisData);
	}, [data, loading]);

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
		setRowsPerPage(parseInt(event.target.value));
		setPage(0);
	};

	useEffect(() => {
		data?.columns && setColumns(data?.columns);
		handlerRows();
	}, [data, handlerRows]);

	useEffect(() => {
		loading && setPage(0);
	}, [loading]);

	const renderCol = loading ? loadingCol : columns;

	return (
		<Box
			sx={{
				width: '100%',
				m: 0,
				border: '1px solid #9e9e9e',
				borderTopRightRadius: '14px',
				borderTopLeftRadius: '14px',
				boxShadow: '-3px 7px 7px -2px #696969',
			}}>
			<TableContainer sx={{ borderTopRightRadius: '14px', borderTopLeftRadius: '14px' }}>
				<Table>
					<TableHead>
						<TableRow>
							{renderCol?.map((item, index) => (
								<StyledTableCell
									sx={{
										width: item.width,
										borderRadius: `${
											searchTable && index === 0 ? '0px' : (index === 0 && '10px') || '0px'
										} ${index === renderCol.length - 1 ? '10px' : '0px'} 0px 0px`,
									}}
									align={item.align}
									key={`table-header-cell-${uuid()}`}>
									{t(item.label).toUpperCase()}
								</StyledTableCell>
							))}
						</TableRow>
					</TableHead>
					{loading === false && data?.rows?.length < 1 ? (
						<TableBody>
							<StyledTableRow>
								<TableCell
									colSpan={renderCol?.length}
									align='center'
									sx={{ background: '#fff', height: '300px' }}>
									<CloudDoneIcon fontSize='large' sx={{ color: `${theme.palette.primary.main}` }} />
									<Typography variant='body1' fontSize='1.6em'>
										{' '}
										{noContentMessage} ...
									</Typography>
								</TableCell>
							</StyledTableRow>
						</TableBody>
					) : (
						<TableBody>
							{rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
								<StyledTableRow key={`table-body-row-${uuid()}`}>
									{renderCol?.map((column) => {
										if (column.key === 'avatar')
											return (
												<StyledTableCell
													sx={{ width: column.width, paddingLeft: 5 }}
													align={column.align}
													key={`table-body-avatar-cell-${uuid()}`}>
													<Avatar src={row[column.key]} />
												</StyledTableCell>
											);
										return (
											<StyledTableCell
												sx={{ width: column.width }}
												align={column.align}
												key={`table-body-cell-${uuid()}`}>
												{row[column.key]}
											</StyledTableCell>
										);
									})}
								</StyledTableRow>
							))}
							<TableRow>
								{pagination && !customPagination && (
									<TablePagination
										labelRowsPerPage={capitalize(t('rows_pre_page'))}
										rowsPerPage={rowsPerPage}
										rowsPerPageOptions={matchDownSM ? [5] : [5, 10, 15]}
										count={rows?.length || 0}
										page={page}
										onPageChange={(e, newPage): void => setPage(newPage)}
										onRowsPerPageChange={handleChangeRowsPerPage}
										sx={{ backgroundColor: '#fff', width: '100%' }}
									/>
								)}
								{customPagination && (
									<TableCell sx={{ p: 0, m: 0 }} colSpan={renderCol?.length}>
										{customPagination}
									</TableCell>
								)}
							</TableRow>
						</TableBody>
					)}
				</Table>
			</TableContainer>
		</Box>
	);
};

CustomTable.defaultProps = {
	data: {
		rows: [],
		columns: [],
	},
	loading: false,
	pagination: false,
	noContentMessage: 'No content',
	searchTable: false,
	customPagination: '',
};

export default CustomTable;
