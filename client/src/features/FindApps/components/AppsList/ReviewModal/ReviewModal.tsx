"use client";
import { StoreType } from "@/api/apps";
import { addAppReview } from "@/api/reviews";
import Button from "@/components/Button/Button";
import { IApp, IAppReview } from "@/ts/interfaces/apps.interfaces";
import { titlize } from "@/utils/utils";
import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./ReviewModal.module.scss";
import { toast } from "react-toastify";

type Props = {
	reviews: IAppReview[];
	opened: boolean;
	closeHandler: () => void;
	appId: string;
	updateApp: (app: Partial<IApp>) => void;
};

const ReviewModal = ({
	reviews,
	opened,
	closeHandler,
	appId,
	updateApp,
}: Props) => {
	const params = useParams();
	const [score, setScore] = useState(0);
	const [review, setReview] = useState("");
	useEffect(() => {
		if (opened) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [opened]);

	const onSubmit = () => {
		const { store: _store } = params as { store: string };
		const store = titlize(_store) as StoreType;
		toast.promise(
			addAppReview(store, appId, { score, review }).then((res) => {
				setScore(0);
				setReview("");

				updateApp({
					reviews: [res.data.review, ...reviews],
					score: res.data.score,
				});
			}),
			{
				pending: "Adding Review...",
				success: "Review Added",
				error: "Something went wrong, try again later...",
			}
		);
	};
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
					{reviews &&
						reviews
							.sort((a, b) => b.date - a.date)
							.map((review, i) => (
								<div
									className={styles.review}
									key={review.date + review.score + review.review + i}
								>
									<div className={styles.date}>
										{moment.unix(review.date).format("D MMM YYYY | hh:mm")}
									</div>
									<Rating
										value={review.score}
										readOnly
										size="small"
										emptyIcon={
											<StarIcon
												style={{ color: "var(--grey)" }}
												fontSize="inherit"
											/>
										}
									/>
									<p>{review.review}</p>
								</div>
							))}
				</div>
			</div>
		</div>
	);
};

export default ReviewModal;
