// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

//@todo: Функция создания карточки

function createCard(title, link, deleteCard, openFullImage, likeCard) {
	const card = cardTemplate.querySelector('.card').cloneNode(true);
	const cardTitle = card.querySelector('.card__title');
	const cardImage = card.querySelector('.card__image');
	const deleteButton = card.querySelector('.card__delete-button');
	const likeButton = card.querySelector('.card__like-button');
	const cardImg = card.querySelector('.card__image');

	cardImage.src = link;
	cardImage.alt = title;
	cardTitle.textContent = title;

	// Удаление карточки

	deleteButton.addEventListener('click', deleteCard);

	// Лайк карточки

	likeButton.addEventListener('click', likeCard);

	// Попап картинки

	cardImg.addEventListener('click', openFullImage);

	return card;
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
	const eventTarget = evt.target;
	const targetParent = eventTarget.closest('.places__item');
	targetParent.remove();
}

// Функция Ллайка карточки

function likeCard(evt) {
	evt.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeCard };
