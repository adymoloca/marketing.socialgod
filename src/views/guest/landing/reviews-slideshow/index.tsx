import { Flex } from 'components/common';
import useReview, { IReview } from 'hooks/fetch-hooks/use-review';
import ReviewCard from 'components/guests/review-card';
import { SliderList } from '../components/slide-show/SliderList';
import { ReviewsSlideshowContainer } from './index.styled';

const ReviewsSlideshow: React.FC = (): JSX.Element  => {

	const {data: reviews} = useReview('guest');

	const reviewsHalf: number | null = reviews &&  Math.ceil(reviews.length / 2);
	const upperReviews: IReview[] = reviews && reviewsHalf ?  reviews?.slice(0, reviewsHalf) : [];
	const lowerReviews: IReview[] = reviews && reviewsHalf ?  reviews?.slice(reviewsHalf) : [];

	return (
		<Flex column justifyCenter alignItems='center'>
			<ReviewsSlideshowContainer>
				<SliderList direction='right' duration={50}
					sx={{ width: `${700 * (upperReviews?.length ?? 0)}px!important` }}>
					{[...upperReviews, ...upperReviews].map((review: IReview): JSX.Element => (
						<ReviewCard key={`upper-review-${review.reviewer}`} {...review}/>
					))}
				</SliderList>
			</ReviewsSlideshowContainer>
			<ReviewsSlideshowContainer>
				<SliderList direction='left' duration={50}
					sx={{ width: `${700 * (lowerReviews?.length ?? 0)}px!important` }}>
					{[...lowerReviews, ...lowerReviews].map((review: IReview): JSX.Element => (
						<ReviewCard key={`lower-review-${review.reviewer}`} {...review}/>
					))}
				</SliderList>
			</ReviewsSlideshowContainer>
		</Flex>
	);
};

export default ReviewsSlideshow;