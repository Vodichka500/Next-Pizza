import {prisma} from "./prisma-client";
import {categories, ingredients, products} from "./constants"
import {hashSync} from "bcrypt";


const randomDecimalNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min*10) / 10;
}
const generateProductVariation = (productId: number, pizzaType?: 1 | 2, size?: 20 | 30 | 40) => {
  return {
      productId,
      price: randomDecimalNumber(190, 600),
      pizzaType,
      size,
  }
}

async function up(){
    await  prisma.user.createMany({
        data: [
            {
                fullname: "Uladzislau Kamisarau",
                email: "u.kamisarau@gmail.com",
                password: hashSync("kamisarau2004", 10),
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
            id: 18,
            name: "Пепперони фреш",
            imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.avif",
            categoryId: 1,
            ingridients: {
                connect: [
                    {id: 1},
                    {id: 2},
                    {id: 3},
                    {id: 4},
                    {id: 5},
                ]
            }
        }
    })
    const pizza2 = await prisma.product.create({
        data: {
            id: 19,
            name: "Сырная 🌱👶",
            imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
            categoryId: 1,
            ingridients: {
                connect: [
                    {id: 5},
                    {id: 6},
                    {id: 7},
                    {id: 8},
                    {id: 9},
                ]
            }
        }
    })
    const pizza3 = await prisma.product.create({
        data: {
            id: 20,
            name: "Чоризо фреш",
            imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D61706D472F9A5D71EB94149304.avif",
            categoryId: 1,
            ingridients: {
                connect: ingredients.slice(10, 40),
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
        ]
    })
    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                token: "1234",
                totalAmount: 0,
            },
            {
                userId: 2,
                token: "5678",
                totalAmount: 0,
            },
        ]
    })
    await prisma.cartItem.create({
        data: {
            productVariationId: 1,
            cartId: 1,
            quantity: 2,
            ingridients: {
                connect:[{id: 1}, {id: 2}, {id: 3}, {id: 4},]
            }
        }
    })
}
async function down(){
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "ProductVariation" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Ingridient" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`
}
async function main(){
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