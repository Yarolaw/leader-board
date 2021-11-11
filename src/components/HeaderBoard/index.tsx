import { FC } from 'react';
import { useSelector } from 'react-redux';
import s from './HeaderBoard.module.scss';
import { StoreType } from '../../redux/store';

// images
import Lion from '../../images/Lion.png';
import People from '../../images/business-people.svg';

const HeaderBoard: FC = () => {
	const bestLeadersArr = useSelector((state: StoreType) => state.leadersReducer.bestLeaders);

	return (
		<div className={s.header}>
			<h2 className={s.header__title}>All time Highest Scorers</h2>
			<div className={s.header__flexblock}>
				<div>
					<ul className={s.header__list}>
						{bestLeadersArr.map(leader => (
							<li key={leader.id} className={s.header__item}>
								<img src={Lion} alt={leader.name} />
								<h3 className={s.header__imageTitle}>{leader.name}</h3>
								<span className={s.header__score}>{leader.score}</span>
							</li>
						))}
					</ul>
				</div>
				<div>
					<img className={s.header__image_absolute} width="390px" src={People} alt="business-people" />
				</div>
			</div>
		</div>
	);
};

export default HeaderBoard;
