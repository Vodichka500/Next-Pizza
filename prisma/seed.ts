import {prisma} from "./prisma-client";
import {categories, ingredients, products} from "./constants"
import {hashSync} from "bcrypt";
import {OrderStatus} from "@prisma/client";


const randomDecimalNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min * 10) / 10;
}
const generateProductVariation = (productId: number, pizzaType?: 1 | 2, size?: 20 | 30 | 40) => {
    return {
        productId,
        price: randomDecimalNumber(190, 600),
        pizzaType,
        size,
    }
}

async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullname: "Uladzislau Kamisarau",
                email: "u.kamisarau@gmail.com",
                password: hashSync("password", 10),
                verified: new Date,
                role: 'ADMIN'
            },
            {
                fullname: "Yana Vasileuskaya",
                email: "ya.vasileuskaya@gmail.com",
                password: hashSync("vasileuskaya2003", 10),
                verified: new Date,
                role: 'USER'
            },
            {
                fullname: "Padlo Berniak",
                email: "p.bydlo@gmail.com",
                password: hashSync("bydlo2004", 10),
                verified: new Date,
                role: 'USER'
            }
        ]
    })
    await prisma.category.createMany({
        data: categories
    })
    await prisma.ingridient.createMany({
        data: ingredients
    })
    await prisma.product.createMany({
        data: products
    })

    const pizza1 = await prisma.product.create({
        data: {
            id: products.length + 1,
            name: "Пепперони фреш",
            imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.avif",
            categoryId: 1,
            ingridients: {
                connect: [
                    {id: 3},
                    {id: 12},
                    {id: 9},
                ]
            }
        }
    })
    const pizza2 = await prisma.product.create({
        data: {
            id: products.length + 2,
            name: "Сырная 🌱👶",
            imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
            categoryId: 1,
            ingridients: {
                connect: [
                    {id: 3},
                    {id: 4},
                ]
            }
        }
    })
    const pizza3 = await prisma.product.create({
        data: {
            id: products.length + 3,
            name: "Чоризо фреш",
            imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D61706D472F9A5D71EB94149304.avif",
            categoryId: 1,
            ingridients: {
                connect: [
                    {id: 3},
                    {id: 9},
                    {id: 16},
                    {id: 13},
                ]
            }
        }
    })

    const pizza4 = await prisma.product.create({
        data: {
            id: products.length + 4,
            name: 'Овощи и грибы',
            imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee7d61546d8483a61a0bbaa7adcc78.avif',
            categoryId: 1,
            ingridients: {
                connect: [
                    {id: 16},
                    {id: 13},
                    {id: 12},
                    {id: 11},
                ]
            }
        }
    })

    const pizza5 = await prisma.product.create({
        data: {
            id: products.length + 5,
            name: 'Двойная пепперони',
            imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef8537f2244e8caeb7c69e644d0537.avif',
            categoryId: 1,
            ingridients: {
                connect: [
                    {id: 3},
                    {id: 9},
                ]
            }
        }
    })

    const pizza6 = await prisma.product.create({
        data: {
            id: products.length + 6,
            name: 'Гавайская',
            imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee7d617e9339cfb185921a343ad8fd.avif',
            categoryId: 1,
            ingridients: {
                connect: [
                    {id: 3},
                    {id: 6},
                    {id: 14},
                ]
            }
        }
    })

    const pizza7 = await prisma.product.create({
        data: {
            id: products.length + 7,
            name: 'Ветчина и грибы',
            imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef5b10b39bbbbda9f8c4e4ff1b067c.avif',
            categoryId: 1,
            ingridients: {
                connect: [
                    {id: 3},
                    {id: 8},
                ]
            }
        }
    })

    const pizza8 = await prisma.product.create({
        data: {
            id: products.length + 8,
            name: 'Ветчина и сыр ',
            imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee7d60fda22358ac33c6a44eb093a2.avif',
            categoryId: 1,
            ingridients: {
                connect: [
                    {id: 3},
                    {id: 8},
                ]
            }
        }
    })

    const pizza9 = await prisma.product.create({
        data: {
            id: products.length + 9,
            name: 'Мясная ',
            imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee7d6108e3a1c9952cd3a7f39a4d02.avif',
            categoryId: 1,
            ingridients: {
                connect: [
                    {id: 3},
                    {id: 8},
                    {id: 15},
                    {id: 6},
                ]
            }
        }
    })

    const pizza10 = await prisma.product.create({
        data: {
            id: products.length + 10,
            name: 'Четыре сезона',
            imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee7d611adf5aad898b8b651186e023.avif',
            categoryId: 1,
            ingridients: {
                connect: [
                    {id: 3},
                    {id: 7},
                    {id: 8},
                    {id: 10},
                    {id: 15},
                ]
            }
        }
    })

    const pizza11 = await prisma.product.create({
        data: {
            id: products.length + 11,
            name: 'Бургер-пицца',
            imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee7d61698827ee9b8db6d0aec53410.avif',
            categoryId: 1,
            ingridients: {
                connect: [
                    {id: 3},
                    {id: 7},
                    {id: 8},
                    {id: 10},
                    {id: 11},
                    {id: 12},
                ]
            }
        }
    })

    const pizza12 = await prisma.product.create({
        data: {
            id: products.length + 12,
            name: 'Цыпленок Ранч',
            imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef4feddf588b4ea7493ba40fdf934c.avif',
            categoryId: 1,
            ingridients: {
                connect: [
                    {id: 3},
                    {id: 10},
                    {id: 6},
                ]
            }
        }
    })

    await prisma.productVariation.createMany({
        data: [
            //Остальные продукты
            ...products.map(product => generateProductVariation(product.id)),

            //Пепперони фреш
            generateProductVariation(pizza1.id, 1, 20),
            generateProductVariation(pizza1.id, 1, 30),
            generateProductVariation(pizza1.id, 2, 20),
            generateProductVariation(pizza1.id, 2, 30),

            //Сырная
            generateProductVariation(pizza2.id, 1, 20),
            generateProductVariation(pizza2.id, 1, 30),
            generateProductVariation(pizza2.id, 1, 40),
            generateProductVariation(pizza2.id, 2, 20),
            generateProductVariation(pizza2.id, 2, 30),
            generateProductVariation(pizza2.id, 2, 40),

            //Чоризо фреш
            generateProductVariation(pizza3.id, 1, 20),
            generateProductVariation(pizza3.id, 1, 30),
            generateProductVariation(pizza3.id, 1, 40),
            generateProductVariation(pizza3.id, 2, 20),
            generateProductVariation(pizza3.id, 2, 30),
            generateProductVariation(pizza3.id, 2, 40),

            //Овощи и грибы
            generateProductVariation(pizza4.id, 1, 20),
            generateProductVariation(pizza4.id, 1, 30),
            generateProductVariation(pizza4.id, 1, 40),
            generateProductVariation(pizza4.id, 2, 20),
            generateProductVariation(pizza4.id, 2, 30),
            generateProductVariation(pizza4.id, 2, 40),

            //Двойная пепперони
            generateProductVariation(pizza5.id, 1, 20),
            generateProductVariation(pizza5.id, 1, 30),
            generateProductVariation(pizza5.id, 1, 40),
            generateProductVariation(pizza5.id, 2, 20),
            generateProductVariation(pizza5.id, 2, 30),
            generateProductVariation(pizza5.id, 2, 40),

            //Гавайская
            generateProductVariation(pizza6.id, 1, 20),
            generateProductVariation(pizza6.id, 1, 30),
            generateProductVariation(pizza6.id, 1, 40),
            generateProductVariation(pizza6.id, 2, 20),
            generateProductVariation(pizza6.id, 2, 30),
            generateProductVariation(pizza6.id, 2, 40),

            //Ветчина и грибы
            generateProductVariation(pizza7.id, 1, 20),
            generateProductVariation(pizza7.id, 1, 30),
            generateProductVariation(pizza7.id, 1, 40),
            generateProductVariation(pizza7.id, 2, 20),
            generateProductVariation(pizza7.id, 2, 30),
            generateProductVariation(pizza7.id, 2, 40),

            //Ветчина и сыр
            generateProductVariation(pizza8.id, 1, 20),
            generateProductVariation(pizza8.id, 1, 30),
            generateProductVariation(pizza8.id, 1, 40),
            generateProductVariation(pizza8.id, 2, 20),
            generateProductVariation(pizza8.id, 2, 30),
            generateProductVariation(pizza8.id, 2, 40),

            //Мясная
            generateProductVariation(pizza9.id, 1, 20),
            generateProductVariation(pizza9.id, 1, 30),
            generateProductVariation(pizza9.id, 1, 40),
            generateProductVariation(pizza9.id, 2, 20),
            generateProductVariation(pizza9.id, 2, 30),
            generateProductVariation(pizza9.id, 2, 40),

            //Бургер-пицца
            generateProductVariation(pizza10.id, 1, 20),
            generateProductVariation(pizza10.id, 1, 30),
            generateProductVariation(pizza10.id, 1, 40),
            generateProductVariation(pizza10.id, 2, 20),
            generateProductVariation(pizza10.id, 2, 30),
            generateProductVariation(pizza10.id, 2, 40),

            //Цыпленок Ранч
            generateProductVariation(pizza11.id, 1, 20),
            generateProductVariation(pizza11.id, 1, 30),
            generateProductVariation(pizza11.id, 1, 40),
            generateProductVariation(pizza11.id, 2, 20),
            generateProductVariation(pizza11.id, 2, 30),
            generateProductVariation(pizza11.id, 2, 40),

            generateProductVariation(pizza12.id, 1, 20),
            generateProductVariation(pizza12.id, 1, 30),
            generateProductVariation(pizza12.id, 1, 40),
            generateProductVariation(pizza12.id, 2, 20),
            generateProductVariation(pizza12.id, 2, 30),
            generateProductVariation(pizza12.id, 2, 40),
        ]
    })
    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                token: "b02308d1-fdb0-4ce7-a1ca-81f658dce00e",
                totalAmount: 568,
            },
            {
                userId: 2,
                token: "b02308d1-fdb0-4ce7-a1ca-81f658dce00a",
                totalAmount: 1024,
            },
        ]
    })
    await prisma.cartItem.create({
        data: {
            productVariationId: 1,
            cartId: 1,
            quantity: 2,
            ingridients: {
                connect: [{id: 1}, {id: 2}, {id: 3}, {id: 4},]
            }
        }
    })
    await prisma.order.create({
        data: {
            cartId: 1,
            totalAmount: 500,
            items: JSON.stringify([{id: 1, quantity: 2, cartId: 1, productVariationId: 1}, {
                id: 1,
                quantity: 2,
                cartId: 1,
                productVariationId: 1
            }]),
            fulname: "Uladzislau Kamisarau",
            address: "Poland",
            email: "u.kamisarau@gmail.com",
            comment: "",
            status: OrderStatus.SUCCEDED,
            paymentIntentId: "INV-UZ8APBAT",
            userId: 1
        }
    })
    await prisma.story.createMany({
        data: [
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496',
            },
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/tx5/by7/w9t/ooaoo8ymussqnsbu1tnysky/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAEAQ&v=2809026799',
            },
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/pti/jga/d9j/fq9upd4i3vbemjhpdtt8qtw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAEAQ&v=1339936796',
            },
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/1mg/mer/hap/vkpfk2vnttbas5iecpcexng/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAEAQ&v=230359580',
            },
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/zj8/f0f/ogu/x4jnqqfmxzfpuiuteli0oey/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAEAQ&v=2063215773',
            },
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/hn9/qu4/wkc/xki4dxznky4zxvcn8et436h/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAEAQ&v=1479088667',
            },
        ],
    });

    await prisma.storyItem.createMany({
        data: [
            {
                storyId: 1,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 2,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/z2/ml/0a/djxj9jvwtlevinrnoy8pfyisyp.webp?k=IgAAAAAAAAAEAQ&quot',
            },
            {
                storyId: 2,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/iw/qr/li/w2novihodmljy4fxlusyvr1ihr.webp?k=IgAAAAAAAAAEAQ&quot',
            },
            {
                storyId: 3,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/ge/mr/vs/wzt7dkpesqiel3zijz9x7kxcrq.webp?k=IgAAAAAAAAAEAQ&quot',
            },
            {
                storyId: 3,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/tx/o2/lg/mki7dgrfa1gqsmr6nddbehqyl6.webp?k=IgAAAAAAAAAEAQ&quot',
            },
            {
                storyId: 4,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/i4/ea/t6/yckpcqkb1z727ew0lmdbm86ysu.webp?k=IgAAAAAAAAAEAQ&quot',
            },
            {
                storyId: 4,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/wb/fz/el/rx95gmtqpgbymfolxl5dxtd5cs.webp?k=IgAAAAAAAAAEAQ&quot',
            },
            {
                storyId: 5,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/ri/sm/cy/xalbm0uvkesbvmleyapov5qmgq.webp?k=IgAAAAAAAAAEAQ&quot',
            },
            {
                storyId: 5,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/rh/hz/qk/wa7pok3fm6uoepizwndimpncgj.webp?k=IgAAAAAAAAAEAQ&quot',
            },
            {
                storyId: 6,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/xu/vr/in/vme06zi0ghupju8uhaz7ccuv9w.webp?k=IgAAAAAAAAAEAQ&quot',
            },
            {
                storyId: 6,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/ht/cn/sa/1xwumzq5qqohpl3gs2918barqu.webp?k=IgAAAAAAAAAEAQ&quot',
            },


        ],
    });
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "ProductVariation" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Ingridient" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`
}

async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e)
    }
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})