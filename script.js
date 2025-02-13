// анимация движения персонажа
const college = document.querySelector('.college');
const player = document.querySelector('.player');
let currentPoint = 1;

// точки с координатами
const points = {
    1: [{x: 422, y: 480}],
    2: [{x: 395, y: 470}, {x: 385, y: 455}, {x: 365, y: 445}, {x: 355, y: 443}, {x: 335, y: 458}],
    3: [{x: 255, y: 503}],
    4: [{x: 170, y: 521}],
    5: [{x: 105, y: 500}]
};

// функция для перемещения игрока
function movePlayer() {
    if (currentPoint < Object.keys(points).length) {
        const arrayPoints = points[currentPoint + 1];
        const totalDuration = .7;

        const durationPerPoint = totalDuration / arrayPoints.length;

        player.style.transition = `left ${durationPerPoint}s linear, top ${durationPerPoint}s linear`;

        // выключаем анимацию курса
        if (currentPoint === 1) {
            const firstCourse = document.querySelector('.first__course');
            firstCourse.classList.add('deactivated');
        }

        // проходим по точкам
        arrayPoints.forEach((point, index) => {
            setTimeout(() => {
                player.style.left = `${point.x}px`;
                player.style.top = `${point.y - 50}px`;
            }, durationPerPoint * index * 1000);
        });
    }
}

// обработчик кликов на точки
college.addEventListener('click', () => {
    if (Object.keys(points).length > currentPoint) {
        movePlayer();
        currentPoint++;
    }
});

// слайдер
const swiper = new Swiper('.swiper-container', {
    slidesPerView: '8',
    spaceBetween: 0,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

const openRating = document.querySelector('.rate');
const modalRating = document.querySelector('.modal__rating');
const overlay = document.querySelector('.overlay');

// открытие рейтинга
openRating.addEventListener('click', () => {
    modalRating.classList.add('active');
    overlay.classList.add('active');
});

// закрытие рейтинга
const closeRating = () => {
    modalRating.classList.remove('active');
    overlay.classList.remove('active');
};

// рейтинг
const ratingList = document.querySelector('.rating__list');

// создаем массив ID друзей
const friendsIds = new Set(data.friends.map(friend => friend.id));

data.rating.forEach((person, index) => {
    const personInfo = document.createElement('div');
    personInfo.classList.add('rating__person__block');

    if (friendsIds.has(person.id)) {
        personInfo.classList.add('friend');
    }

    // создаём элементы
    const indexSpan = document.createElement('span');
    indexSpan.textContent = `${index + 1}`;

    const personAvatar = document.createElement('img');
    personAvatar.src = 'img/avatar_mini.png';

    const personName = document.createElement('span');
    personName.textContent = `${person.name} ${person.lastName}`;

    const personRating = document.createElement('span');
    personRating.textContent = `${person.points}`;

    // добавляем все в personInfo
    personInfo.append(indexSpan, personAvatar, personName, personRating);

    // добавляем personInfo в ratingList
    ratingList.appendChild(personInfo);
});