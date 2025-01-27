//  Импорт

import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { openPopup, closePopup } from './components/modal.js';
import { createCard, deleteCard, likeCard } from './components/card.js';

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');
const fullImage = document.querySelector('.popup__image');
const popupImage = document.querySelector('.popup_type_image');
const popupImageCaption = document.querySelector('.popup__caption');
const profileFormElement = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector(
	'.popup__input_type_description'
);
const buttonOpenProfileEdit = document.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const buttonsCloseProfileEdit = document.querySelectorAll('.popup__close');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const newCard = document.querySelector('.popup_type_new-card');
const formAdd = newCard.querySelector('.popup__form');
const inputTypeName = newCard.querySelector('.popup__input_type_card-name');
const inputTypeLink = newCard.querySelector('.popup__input_type_url');
const nameInputProfile = profileFormElement.elements.name;
const jobInputProfile = profileFormElement.elements.description;

function renderCard(title, link, deleteCard, openFullImage, likeCard) {
	const card = createCard(title, link, deleteCard, openFullImage, likeCard);
	placesList.append(card);
}

// @todo: Вывести карточки на страницу

if (initialCards) {
	initialCards.forEach(function (item) {
		renderCard(item.name, item.link, deleteCard, openFullImage, likeCard);
	});
}

// Открытие полного изображения

function openFullImage(evt) {
	openPopup(popupImage);
	fullImage.src = evt.target.closest('.card__image').src;
	fullImage.alt = evt.target.closest('.card__image').alt;
	popupImageCaption.textContent = evt.target.closest('.card__image').alt;
}

// Открытие попап

buttonOpenProfileEdit.addEventListener('click', () => {
	nameInputProfile.value = profileTitle.textContent;
	jobInputProfile.value = profileDescription.textContent;
	openPopup(popupProfileEdit);
});

// Закрытие попап на крестик, оверлей

buttonsCloseProfileEdit.forEach(button => {
	button.addEventListener('click', evt => {
		const popup = evt.target.closest('.popup');
		closePopup(popup);
	});
});

// Редактирование информации jobInput и nameInput

function handleFormProfileSubmit(evt) {
	evt.preventDefault();
	profileTitle.textContent = nameInput.value;
	profileDescription.textContent = jobInput.value;
	closePopup(popupProfileEdit);
}

profileFormElement.addEventListener('submit', handleFormProfileSubmit);

// Добавление карточки "+"

buttonAddNewCard.addEventListener('click', () => {
	openPopup(popupAddNewCard);
});

// Функция добавления карточки в начало контейнера

function createNewCard(evt) {
	evt.preventDefault();

	const newCardName = inputTypeName.value;
	const newCardLink = inputTypeLink.value;

	const newCardData = createCard(
		newCardName,
		newCardLink,
		deleteCard,
		openFullImage,
		likeCard
	);

	placesList.prepend(newCardData);

	closePopup(newCard);

	formAdd.reset();
}

formAdd.addEventListener('submit', createNewCard);
