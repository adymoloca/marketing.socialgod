import React, { FC, useEffect } from 'react';
import { HeartContainer, HeartSvg } from './index.styled';

const AnimatedHeart: FC = () => {
	useEffect(() => {
		const likeUnlikePost = (): void => {
			const heart = document.getElementById('heart-svg');
			if (heart?.classList.contains('like')) {
				heart.classList.remove('like');
				heart.classList.add('unlike');
			} else {
				heart?.classList.remove('unlike');
				heart?.classList.add('like');
			}
		};

		const heart = document.getElementById('heart-svg');
		heart?.addEventListener('click', likeUnlikePost);

		return () => {
			heart?.removeEventListener('click', likeUnlikePost);
		};
	}, []);

	return (
		<HeartContainer id='heart-container'>
			<div>
				<HeartSvg xmlns='http://www.w3.org/2000/svg' id='heart-svg' viewBox='0 0 24 24'>
					<path
						d={`
							M4.318 6.318a4.5 4.5 0 000
							6.364L12 20.364l7.682-7.682a4.5
							4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5
							4.5 0 00-6.364 0z
						`}
					/>
				</HeartSvg>
			</div>
		</HeartContainer>
	);
};

export default AnimatedHeart;
