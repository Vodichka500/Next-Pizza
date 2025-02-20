export const categories = [
    {
        name: "Пиццы"
    },
    {
        name: "Завтраки"
    },
    {
        name: "Закуски"
    },
    {
        name: "Напитки"
    },
    {
        name: "Десерты"
    }
];

export const ingredients = [
    {
        name: 'Сырный бортик', //1
        price: 179,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
    },
    {
        name: 'Пряная говядина', //2
        price: 139,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/11ef5ed5f8f64595a6d6a99c1fe6f7f0.png',
    },
    {
        name: 'Моцарелла', //3
        price: 99,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
    },
    {
        name: 'Сыры чеддер и пармезан', //4
        price: 79,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
    },
    {
        name: 'Острый перец халапеньо', //5
        price: 59,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
    },
    {
        name: 'Нежный цыпленок',   //6
        price: 79,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
    },
    {
        name: 'Шампиньоны', //7
        price: 59,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
    },
    {
        name: 'Ветчина', //8
        price: 79,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
    },
    {
        name: 'Пикантная пепперони', //9
        price: 79,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
    },
    {
        name: 'Острая чоризо', //10
        price: 79,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
    },
    {
        name: 'Маринованные огурчики', //11
        price: 59,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
    },
    {
        name: 'Свежие томаты', //12
        price: 59,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
    },
    {
        name: 'Красный лук', //13
        price: 59,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
    },
    {
        name: 'Сочные ананасы', //14
        price: 59,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
    },
    {
        name: 'Итальянские травы', //15
        price: 39,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
    },
    {
        name: 'Сладкий перец', //16
        price: 59,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
    },
    {
        name: 'Кубики брынзы', //17
        price: 79,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
    },
    {
        name: 'Митболы', //18
        price: 79,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
    },
].map((item, i) => ( {...item, id: i + 1} ) );

export const products = [
    {
        name: 'Омлет с ветчиной и грибами',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp',
        categoryId: 2,
    },
    {
        name: 'Омлет с пепперони',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp',
        categoryId: 2,
    },
    {
        name: 'Сырники со сгущенным молоком',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef90613992fbc69c3dd4772681c783.avif',
        categoryId: 2,
    },
    {
        name: 'Сырники с малиновым вареньем 👶',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef9060f35d7c26bf41590b9079febe.avif',
        categoryId: 2,
    },
    {
        name: 'Сырники',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef9060dd723610942e8f368b03540a.avif',
        categoryId: 2,
    },
    {
        name: 'Завтрак на двоих',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef112c05b1b9c193648449783c1a82.avif',
        categoryId: 2,
    },
    {
        name: 'Кофе Американо',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee7d61b02b810b8767d5ff70d15897.avif',
        categoryId: 2,
    },
    {
        name: 'Кофе Капучино',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee7d61ae1813b4ab42d8927d061035.avif',
        categoryId: 2,
    },
    {
        name: 'Кофе Латте',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee7d61b0c26a3f85d97a78feee00ad.avif',
        categoryId: 2,
    },
    {
        name: 'Дэнвич ветчина и сыр',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.webp',
        categoryId: 3,
    },
    {
        name: 'Куриные наггетсы',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D618B5C7EC29350069AE9532C6E.webp',
        categoryId: 3,
    },
    {
        name: 'Картофель из печи с соусом 🌱',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EED646A9CD324C962C6BEA78124F19.webp',
        categoryId: 3,
    },
    {
        name: 'Додстер',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE796F96D11392A2F6DD73599921B9.webp',
        categoryId: 3,
    },
    {
        name: 'Острый Додстер 🌶️🌶️',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE796FD3B594068F7A752DF8161D04.webp',
        categoryId: 3,
    },
    {
        name: 'Паста с креветками',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/0194d50285347992955d7c7f3b9a0621.avif',
        categoryId: 3,
    },
    {
        name: 'Грибной Стартер',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11efa1f49b7fec658a18b8e8c3b8c6c5.avif',
        categoryId: 3,
    },
    {
        name: 'Салат Цезарь',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef8d3bc9e84fb7b5cfb7f47c6fb334.avif',
        categoryId: 3,
    },
    {
        name: 'Ланчбокс с куриными крыльями ',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee796fc8be09ca8ab2dc9e77bde64a.avif',
        categoryId: 3,
    },
    {
        name: 'Банановый молочный коктейль',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EEE20B8772A72A9B60CFB20012C185.webp',
        categoryId: 4,
    },
    {
        name: 'Карамельное яблоко молочный коктейль',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE79702E2A22E693D96133906FB1B8.webp',
        categoryId: 4,
    },
    {
        name: 'Молочный коктейль с печеньем Орео',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.webp',
        categoryId: 4,
    },
    {
        name: 'Классический молочный коктейль 👶',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE796F93FB126693F96CB1D3E403FB.webp',
        categoryId: 4,
    },
    {
        name: 'Ирландский Капучино',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61999EBDA59C10E216430A6093.webp',
        categoryId: 4,
    },
    {
        name: 'Кофе Карамельный капучино',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp',
        categoryId: 4,
    },
    {
        name: 'Кофе Кокосовый латте',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61B19FA07090EE88B0ED347F42.webp',
        categoryId: 4,
    },
    {
        name: 'Кофе Американо',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.webp',
        categoryId: 4,
    },
    {
        name: 'Кофе Латте',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
        categoryId: 4,
    },
    {
        name: 'Лимонад Арбузный лайм',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee8f6b54e7d91994d7806bc60e29c9.avif',
        categoryId: 4,
    },
    {
        name: 'Тирамису',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11eea6acb6afc716a124eaaa1c5b1697.avif',
        categoryId: 5,
    },
    {
        name: 'Додобоны',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/0194d50911687930bd2950d169464c7f.avif',
        categoryId: 5,
    },
    {
        name: 'Бруслетики',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/0194d50aa35674f2b55fe90c424a9e71.avif',
        categoryId: 5,
    },
    {
        name: 'Чизкейк Нью-Йорк',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11eee20b6b6ec471ab74ab8f8885775b.avif',
        categoryId: 5,
    },
    {
        name: 'Макарон манго-маракуйя',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef8c97600099aabe2eab81a37c62d1.avif',
        categoryId: 5,
    },
    {
        name: 'Чизкейк Банановый с шоколадным печеньем',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/019512d89ab67365a76a19cf045163aa.avif',
        categoryId: 5,
    },
    {
        name: 'Эклеры-мини с заварным кремом',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef8c972951d9a193b3f3901197b8da.avif',
        categoryId: 5,
    },
    {
        name: 'Шоколадный кукис',
        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee7970210a7a54aff74b239ea3d66f.avif',
        categoryId: 5,
    },

].map((item, i) => ( {...item, id: i + 1} ) );