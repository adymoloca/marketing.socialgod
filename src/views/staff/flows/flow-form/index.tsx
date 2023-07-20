import React, { FC, useContext, useEffect, useState } from 'react';
import { TextField, Paper, Box, Grid, Typography, CircularProgress, BoxProps, styled } from '@mui/material';
import { Flex, ButtonSG } from 'components/common';
import { useNavigate } from 'react-router';
import { Copyright } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { uuid } from 'utils/functions';
import FlowsContext from '../flows-context';

export interface IFLowObject {
	name: string;
	typeDescriptions: string[];
	_id?: string | undefined;
}

export interface ISendData {
	flows: IFLowObject[];
}

export interface IMyFlow {
	newFlow: {
		name: string;
		typeDescription: string[];
	}[];
}

export interface IProps {
	type: string;
	myFlow: IFLowObject[];
	serviceId: string;
	setType: React.Dispatch<React.SetStateAction<string>>;
	platform: string;
}

const FlowForm: FC<IProps> = ({ type, myFlow, serviceId, setType, platform }) => {
	const navigate = useNavigate();
	const [flow, setFlow] = useState<ISendData>({ flows: [] });
	const [typeDescriptions, setTypeDescriptions] = useState('');
	const updateFlow = flow?.flows[0];
	const name = flow?.flows[0]?.name;
	const [myFlowLength, setMyFlowLength] = useState(0);
	const { postFlow, update, loadingFlow } = useContext(FlowsContext);

	const Wrapper: FC<BoxProps> = styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'column',
		maxWidth: '500px',
		borderRadius: 15,
		width: '100%',
		border: `1px solid ${theme.palette.divider}`,
		padding: '25px',
	}));

	const handleAdd = (): void => {
		const temp = flow?.flows[0]?.typeDescriptions;
		temp.push(typeDescriptions);
		setFlow((prev) => ({
			flows: [{ ...prev?.flows?.[0], typeDescriptions: [...temp] }],
		}));
		setMyFlowLength(0);
		setTypeDescriptions('');
	};

	const handleUpdate = (): void => {
		myFlow[0]._id && update(updateFlow, serviceId, myFlow[0]._id, platform);
		setType('Add_flow');
		navigate('/staff/flows');
	};

	const handleCreateEdit = (): void => {
		if (type === 'Add_flow') postFlow(flow, serviceId, platform);
		else handleUpdate();
		setFlow({ flows: [{ name: '', typeDescriptions: [] }] });
	};

	const handleDelete = (typeDescription: string): void => {
		const temp = flow?.flows[0]?.typeDescriptions;
		const findIndex = temp.indexOf(typeDescription);
		if (findIndex !== -1) temp.splice(findIndex, 1);
		setFlow((prev) => ({
			flows: [{ ...prev?.flows?.[0], typeDescriptions: [...temp] }],
		}));
	};

	const submitButtonTitle = type === 'Add_flow' ? 'Create' : 'Update';

	useEffect(() => {
		const newFlow = [{ name: myFlow[0]?.name, typeDescriptions: myFlow[0]?.typeDescriptions }];
		if (myFlow?.length === 0) {
			setFlow({ flows: [] });
		} else {
			setFlow({ flows: newFlow });
			setMyFlowLength(newFlow[0]?.typeDescriptions?.length);
		}
	}, [myFlow]);

	return (
		<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
			<Box
				sx={{
					my: 8,
					mx: 4,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Typography component='h1' variant='h5' sx={{ m: 1 }}>
					{type}
				</Typography>
				<Box sx={{ mt: 1, textAlign: 'left' }}>
					<Box sx={{ display: 'flex' }}>
						<TextField
							value={`${name}`}
							onChange={(event): void =>
								setFlow((prev) => ({ flows: [{ ...prev?.flows[0], name: event?.target?.value }] }))
							}
							margin='normal'
							required
							fullWidth
							id='flow_name'
							label='Flow_name'
							name='flow_name'
							autoFocus
						/>
						<TextField
							value={typeDescriptions}
							onChange={(event): void => setTypeDescriptions(event?.target?.value)}
							margin='normal'
							required
							fullWidth
							id='type-description'
							label='Type_description'
							name='type-description'
							autoFocus
						/>
						<ButtonSG
							type='submit'
							sx={{ mt: 2, mb: 1 }}
							onClick={handleAdd}
							disabled={typeDescriptions === ''}>
							Add
						</ButtonSG>
					</Box>
					{flow?.flows[0]?.typeDescriptions?.length > 0 && (
						<Wrapper>
							<Flex justifyCenter pb={3}>
								<Typography align='left' variant='h4'>
									{flow?.flows[0]?.name}:
								</Typography>
								{flow?.flows[0]?.typeDescriptions?.map((item) => (
									<Wrapper
										key={`${item}-${uuid()}`}
										sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
										{item}
										<DeleteIcon onClick={(): void => handleDelete(item)} />
									</Wrapper>
								))}
							</Flex>
						</Wrapper>
					)}
					<ButtonSG
						type='submit'
						fullWidth
						sx={{ mt: 3, mb: 2 }}
						onClick={handleCreateEdit}
						disabled={
							flow?.flows[0]?.name === '' ||
							flow?.flows[0]?.typeDescriptions?.length === 0 ||
							(myFlowLength === flow?.flows[0]?.typeDescriptions?.length &&
								myFlow[0]?.name === flow?.flows[0]?.name)
						}>
						{loadingFlow === 'post-update-flow' ? <CircularProgress size={20} /> : submitButtonTitle}
					</ButtonSG>
					<Copyright sx={{ mt: 5 }} />
				</Box>
			</Box>
		</Grid>
	);
};

export default FlowForm;
