import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { IApp, IAppReview } from "@/ts/interfaces/apps.interfaces";
import styles from "./ReviewModal.module.scss";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Button from "@/components/Button/Button";
import moment from "moment";

type Props = {
	reviews: IAppReview[];
	opened: boolean;
	closeHandler: () => void;
};

const ReviewModal = ({ reviews, opened, closeHandler }: Props) => {
	const [score, setScore] = useState(0);
	const [review, setReview] = useState("");
	useEffect(() => {
		if (opened) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [opened]);
	const _reviews: IAppReview[] = [
		{ date: 1701465869, review: "Old" },
		{ date: 1701548669, review: "New" },
	].sort((a, b) => b.date - a.date);

	const onSubmit = () => {};
	return (
		<div
			className={[
				styles.container,
				opened ? styles.opened : styles.closed,
			].join(" ")}
			onClick={closeHandler}
		>
			<div className={styles.content} onClick={(e) => e.stopPropagation()}>
				<div>
					<textarea
						placeholder="Write down your review here..."
						onChange={(e) => setReview(e.target.value)}
						value={review}
					/>
					<div>
						<Rating
							value={score}
							size="small"
							emptyIcon={
								<StarIcon style={{ color: "var(--grey)" }} fontSize="inherit" />
							}
							onChange={(_, newValue) => setScore(newValue || 0)}
						/>
						<div>
							<Button
								variant={"primary"}
								styles={{ fontSize: "14px" }}
								onClick={onSubmit}
							>
								Submit Review
							</Button>
							<Button
								variant={"secondary"}
								styles={{ fontSize: "14px" }}
								onClick={closeHandler}
							>
								Cancel
							</Button>
						</div>
					</div>
				</div>
				<div className={styles.reviews}>
					{_reviews.map((review) => (
						<div className={styles.review}>
							<div className={styles.date}>
								{moment.unix(review.date).format("D MMM YYYY | HH:MM")}
							</div>
							<p>{review.review}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ReviewModal;
