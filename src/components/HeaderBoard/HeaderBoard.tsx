import { FC } from 'react';
import s from './HeaderBoard.module.scss';

// images
import Lion from '../../images/Lion.png';
import Aisla from '../../images/Aislaa.png';
import Bobbo from '../../images/Bobbo.png';
import People from '../../images/business-people.svg';

const HeaderBoard: FC = () => {
	return (
		<div className={s.header}>
			<h2 className={s.header__title}>All time Highest Scorers</h2>
			<div className={s.header__flexblock}>
				<div>
					<ul className={s.header__list}>
						<li className={s.header__item}>
							<img src={Lion} alt="Lion El Johnson" />
							<h3 className={s.header__imageTitle}>Lion El Johnson</h3>
							<span className={s.header__score}>402</span>
						</li>
						<li className={s.header__item}>
							<img src={Aisla} alt="Lion El Johnson" />
							<h3 className={s.header__imageTitle}>Aisla Pindoria</h3>
							<span className={s.header__score}>390</span>
						</li>
						<li className={s.header__item}>
							<img src={Bobbo} alt="Lion El Johnson" />
							<h3 className={s.header__imageTitle}>Robot Guliman</h3>
							<span className={s.header__score}>380</span>
						</li>
						<li className={s.header__item}>
							<img src={Bobbo} alt="Lion El Johnson" />
							<h3 className={s.header__imageTitle}>Bobbo Smith</h3>
							<span className={s.header__score}>300</span>
						</li>
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
