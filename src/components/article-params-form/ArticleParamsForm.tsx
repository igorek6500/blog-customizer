import {ArrowButton} from 'components/arrow-button';
import {Button} from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import {FormEvent, useEffect, useRef, useState} from 'react';
import {RadioGroup} from 'components/radio-group';
import {Select} from 'components/select';
import {Separator} from 'components/separator';

type ArticleParamsProps = {
	setArticleState: (states: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
									  setArticleState,
								  }: ArticleParamsProps): JSX.Element => {
	//States
	const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
	const [selectedFont, setSelectedFont] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	//Ref
	const formRef = useRef<HTMLDivElement>(null);

	const openSideMenu = (): void => {
		setIsSideMenuOpen((prevState) => !prevState);
	};

	//Text Customization Handlers
	const handleFontFamilyChange = (
		fontFamily: typeof defaultArticleState.fontFamilyOption
	): void => {
		setSelectedFont(fontFamily);
		console.log(`Вы выбрали шрифт: ${fontFamily.title}`);
	};
	const handleFontSizeChange = (
		size: typeof defaultArticleState.fontSizeOption
	): void => {
		setSelectedFontSize(size);
		console.log(`Font size is: ${size.title}`);
	};
	const handleFontColorChange = (
		color: typeof defaultArticleState.fontColor
	): void => {
		setSelectedFontColor(color);
		console.log(`Font color is: ${color.title}`);
	};
	const handleBackgroundColorChange = (
		bgColor: typeof defaultArticleState.backgroundColor
	): void => {
		setSelectedBackgroundColor(bgColor);
		console.log(`Background color is: ${bgColor.title}`);
	};
	const handleContentWidthChange = (
		width: typeof defaultArticleState.contentWidth
	): void => {
		setSelectedContentWidth(width);
		console.log(`Content width is: ${width.title}`);
	};

	//Form Events Handlers

	const formResetHandler = () => {
		setArticleState(defaultArticleState);
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
		setIsSideMenuOpen(false);
	};

	const formSubmitHandler = (e: FormEvent) => {
		e.preventDefault();
		setArticleState({
			fontFamilyOption: selectedFont,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
		});
		setIsSideMenuOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsSideMenuOpen(false);
			}
		};

		const handleEscDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsSideMenuOpen(false);
			}
		};

		if (isSideMenuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			document.addEventListener('keydown', handleEscDown);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscDown);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isSideMenuOpen]);

	return (
		<>
			<ArrowButton isOpen={isSideMenuOpen} toggleArrow={openSideMenu}/>
			<aside
				ref={formRef}
				className={`${styles.container} ${
					isSideMenuOpen ? styles.container_open : ''
				}`}
				style={{backgroundColor: selectedFontColor.value}}>
				<form className={styles.form} onSubmit={formSubmitHandler}>
					<h2 className={styles.formHeading}>Задайте параметры</h2>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={selectedFont}
						placeholder='Выберите шрифт'
						onChange={(selected) =>
							selected && handleFontFamilyChange(selected)
						}
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={handleFontSizeChange}
						title='Размер шрифта'
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={selectedFontColor}
						placeholder='Выберите цвет шрифта'
						onChange={(selected) => selected && handleFontColorChange(selected)}
					/>
					<Separator/>
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={selectedBackgroundColor}
						placeholder='Выберите цвет фона'
						onChange={(selected) =>
							selected && handleBackgroundColorChange(selected)
						}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={selectedContentWidth}
						placeholder='Выберите ширину контента'
						onChange={(selected) =>
							selected && handleContentWidthChange(selected)
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={formResetHandler}/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
