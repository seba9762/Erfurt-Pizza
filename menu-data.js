// Menu Database for Erfurt Pizza
const menuData = [
    // ===== PIZZA =====
    {
        id: 1,
        name: "Pizza Margherita",
        category: "pizza",
        tags: ["pizza", "vegetarian", "all"],
        description: "Tomatensauce, Mozzarella, frisches Basilikum",
        image: "assets/menu/pizza-margherita.jpg",
        sizes: [
            { size: "26cm", price: 6.50 },
            { size: "30cm", price: 9.00 },
            { size: "40cm", price: 12.00 }
        ],
        isVegetarian: true,
        badge: null
    },
    {
        id: 2,
        name: "Pizza Salami",
        category: "pizza",
        tags: ["pizza", "all"],
        description: "Tomatensauce, Mozzarella, Salami",
        image: "assets/menu/pizza-salami.jpg",
        sizes: [
            { size: "26cm", price: 7.50 },
            { size: "30cm", price: 10.00 },
            { size: "40cm", price: 14.00 }
        ],
        isVegetarian: false,
        badge: null
    },
    {
        id: 3,
        name: "Pizza Funghi",
        category: "pizza",
        tags: ["pizza", "vegetarian", "all"],
        description: "Tomatensauce, Mozzarella, frische Champignons",
        image: "assets/menu/pizza-funghi.jpg",
        sizes: [
            { size: "26cm", price: 7.00 },
            { size: "30cm", price: 9.50 },
            { size: "40cm", price: 13.00 }
        ],
        isVegetarian: true,
        badge: null
    },
    {
        id: 4,
        name: "Pizza Prosciutto",
        category: "pizza",
        tags: ["pizza", "all"],
        description: "Tomatensauce, Mozzarella, Schinken",
        image: "assets/menu/pizza-prosciutto.jpg",
        sizes: [
            { size: "26cm", price: 7.50 },
            { size: "30cm", price: 10.00 },
            { size: "40cm", price: 14.00 }
        ],
        isVegetarian: false,
        badge: null
    },
    {
        id: 5,
        name: "Pizza Tonno",
        category: "pizza",
        tags: ["pizza", "all"],
        description: "Tomatensauce, Mozzarella, Thunfisch, Zwiebeln",
        image: "assets/menu/pizza-tonno.jpg",
        sizes: [
            { size: "26cm", price: 8.00 },
            { size: "30cm", price: 10.50 },
            { size: "40cm", price: 14.50 }
        ],
        isVegetarian: false,
        badge: null
    },
    {
        id: 6,
        name: "Pizza Hawaii",
        category: "pizza",
        tags: ["pizza", "all"],
        description: "Tomatensauce, Mozzarella, Schinken, Ananas",
        image: "assets/menu/pizza-hawaii.jpg",
        sizes: [
            { size: "26cm", price: 8.00 },
            { size: "30cm", price: 10.50 },
            { size: "40cm", price: 14.50 }
        ],
        isVegetarian: false,
        badge: null
    },
    {
        id: 7,
        name: "Pizza Quattro Formaggi",
        category: "pizza",
        tags: ["pizza", "vegetarian", "all"],
        description: "Vier verschiedene Käsesorten, ohne Tomatensauce",
        image: "assets/menu/pizza-quattro-formaggi.jpg",
        sizes: [
            { size: "26cm", price: 8.50 },
            { size: "30cm", price: 11.00 },
            { size: "40cm", price: 15.00 }
        ],
        isVegetarian: true,
        badge: "new"
    },
    {
        id: 8,
        name: "Pizza Diavola",
        category: "pizza",
        tags: ["pizza", "all"],
        description: "Tomatensauce, Mozzarella, scharfe Salami, Peperoni",
        image: "assets/menu/pizza-diavola.jpg",
        sizes: [
            { size: "26cm", price: 8.50 },
            { size: "30cm", price: 11.00 },
            { size: "40cm", price: 15.00 }
        ],
        isVegetarian: false,
        badge: "hot"
    },
    {
        id: 9,
        name: "Pizza Vegetaria",
        category: "pizza",
        tags: ["pizza", "vegetarian", "all"],
        description: "Tomatensauce, Mozzarella, Paprika, Zwiebeln, Champignons, Oliven",
        image: "assets/menu/pizza-vegetaria.jpg",
        sizes: [
            { size: "26cm", price: 8.50 },
            { size: "30cm", price: 11.00 },
            { size: "40cm", price: 15.00 }
        ],
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 10,
        name: "Pizza Americana",
        category: "pizza",
        tags: ["pizza", "all"],
        description: "Tomatensauce, Mozzarella, Salami, Schinken, Champignons, Paprika",
        image: "assets/menu/pizza-americana.jpg",
        sizes: [
            { size: "26cm", price: 9.00 },
            { size: "30cm", price: 12.00 },
            { size: "40cm", price: 16.00 }
        ],
        isVegetarian: false,
        badge: null
    },
    {
        id: 11,
        name: "Pizza Tandoori Chicken",
        category: "pizza",
        tags: ["pizza", "indian", "all"],
        description: "Tandoori Chicken, Mozzarella, Zwiebeln, Paprika, Curry-Sauce",
        image: "assets/menu/pizza-tandoori.jpg",
        sizes: [
            { size: "26cm", price: 9.50 },
            { size: "30cm", price: 12.50 },
            { size: "40cm", price: 17.00 }
        ],
        isVegetarian: false,
        badge: "new"
    },
    {
        id: 12,
        name: "Pizza Paneer Tikka",
        category: "pizza",
        tags: ["pizza", "indian", "vegetarian", "all"],
        description: "Paneer (indischer Käse), Paprika, Zwiebeln, Tikka-Sauce",
        image: "assets/menu/pizza-paneer.jpg",
        sizes: [
            { size: "26cm", price: 9.50 },
            { size: "30cm", price: 12.50 },
            { size: "40cm", price: 17.00 }
        ],
        isVegetarian: true,
        badge: "vegetarian"
    },

    // ===== BURGER =====
    {
        id: 20,
        name: "Classic Burger",
        category: "burger",
        tags: ["burger", "all"],
        description: "Rindfleisch-Patty, Salat, Tomate, Zwiebeln, Gurke, Burger-Sauce",
        image: "assets/menu/burger-classic.jpg",
        price: 7.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 21,
        name: "Cheeseburger",
        category: "burger",
        tags: ["burger", "all"],
        description: "Rindfleisch-Patty, Cheddar-Käse, Salat, Tomate, Zwiebeln, Sauce",
        image: "assets/menu/burger-cheese.jpg",
        price: 8.00,
        isVegetarian: false,
        badge: null
    },
    {
        id: 22,
        name: "Bacon Burger",
        category: "burger",
        tags: ["burger", "all"],
        description: "Rindfleisch-Patty, knuspriger Bacon, Cheddar, BBQ-Sauce",
        image: "assets/menu/burger-bacon.jpg",
        price: 9.00,
        isVegetarian: false,
        badge: null
    },
    {
        id: 23,
        name: "Chicken Burger",
        category: "burger",
        tags: ["burger", "all"],
        description: "Knuspriges Hähnchen, Salat, Tomate, Mayo",
        image: "assets/menu/burger-chicken.jpg",
        price: 8.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 24,
        name: "Veggie Burger",
        category: "burger",
        tags: ["burger", "vegetarian", "all"],
        description: "Veggie-Patty, Salat, Tomate, Avocado, Spezial-Sauce",
        image: "assets/menu/burger-veggie.jpg",
        price: 8.50,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 25,
        name: "Double Burger",
        category: "burger",
        tags: ["burger", "all"],
        description: "Doppeltes Rindfleisch-Patty, doppelt Käse, Spezial-Sauce",
        image: "assets/menu/burger-double.jpg",
        price: 10.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 26,
        name: "Spicy Chicken Burger",
        category: "burger",
        tags: ["burger", "all"],
        description: "Scharfes Hähnchen, Jalapeños, Chipotle-Mayo",
        image: "assets/menu/burger-spicy-chicken.jpg",
        price: 9.00,
        isVegetarian: false,
        badge: "hot"
    },

    // ===== INDIAN SPECIALTIES =====
    {
        id: 30,
        name: "Chicken Curry",
        category: "indian",
        tags: ["indian", "all"],
        description: "Zartes Hähnchen in cremiger Curry-Sauce, serviert mit Basmati Reis",
        image: "assets/menu/chicken-curry.jpg",
        price: 11.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 31,
        name: "Butter Chicken",
        category: "indian",
        tags: ["indian", "all"],
        description: "Tandoori-Hähnchen in cremiger Tomaten-Butter-Sauce, mit Reis",
        image: "assets/menu/butter-chicken.jpg",
        price: 12.50,
        isVegetarian: false,
        badge: "new"
    },
    {
        id: 32,
        name: "Chicken Tikka Masala",
        category: "indian",
        tags: ["indian", "all"],
        description: "Gegrillte Hähnchenstücke in würziger Masala-Sauce, mit Reis",
        image: "assets/menu/tikka-masala.jpg",
        price: 12.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 33,
        name: "Chicken Korma",
        category: "indian",
        tags: ["indian", "all"],
        description: "Hähnchen in milder, cremiger Nuss-Sauce, mit Reis",
        image: "assets/menu/chicken-korma.jpg",
        price: 11.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 34,
        name: "Chicken Vindaloo",
        category: "indian",
        tags: ["indian", "all"],
        description: "Sehr scharfes Hähnchen-Curry mit Kartoffeln, mit Reis",
        image: "assets/menu/chicken-vindaloo.jpg",
        price: 11.50,
        isVegetarian: false,
        badge: "hot"
    },
    {
        id: 35,
        name: "Palak Paneer",
        category: "indian",
        tags: ["indian", "vegetarian", "all"],
        description: "Indischer Käse in cremiger Spinat-Sauce, mit Reis",
        image: "assets/menu/palak-paneer.jpg",
        price: 10.50,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 36,
        name: "Paneer Tikka Masala",
        category: "indian",
        tags: ["indian", "vegetarian", "all"],
        description: "Gegrillter indischer Käse in würziger Masala-Sauce, mit Reis",
        image: "assets/menu/paneer-tikka-masala.jpg",
        price: 10.50,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 37,
        name: "Chana Masala",
        category: "indian",
        tags: ["indian", "vegetarian", "all"],
        description: "Kichererbsen in würziger Tomaten-Sauce, mit Reis",
        image: "assets/menu/chana-masala.jpg",
        price: 9.50,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 38,
        name: "Dal Makhani",
        category: "indian",
        tags: ["indian", "vegetarian", "all"],
        description: "Schwarze Linsen in cremiger Butter-Sauce, mit Reis",
        image: "assets/menu/dal-makhani.jpg",
        price: 9.50,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 39,
        name: "Vegetable Biryani",
        category: "indian",
        tags: ["indian", "vegetarian", "all"],
        description: "Würziger Basmati-Reis mit Gemüse und Gewürzen",
        image: "assets/menu/veg-biryani.jpg",
        price: 10.50,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 40,
        name: "Chicken Biryani",
        category: "indian",
        tags: ["indian", "all"],
        description: "Würziger Basmati-Reis mit mariniertem Hähnchen",
        image: "assets/menu/chicken-biryani.jpg",
        price: 12.00,
        isVegetarian: false,
        badge: null
    },
    {
        id: 41,
        name: "Lamb Curry",
        category: "indian",
        tags: ["indian", "all"],
        description: "Zartes Lammfleisch in aromatischer Curry-Sauce, mit Reis",
        image: "assets/menu/lamb-curry.jpg",
        price: 13.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 42,
        name: "Naan Brot",
        category: "indian",
        tags: ["indian", "vegetarian", "all"],
        description: "Traditionelles indisches Fladenbrot aus dem Tandoor",
        image: "assets/menu/naan.jpg",
        price: 2.50,
        isVegetarian: true,
        badge: null
    },
    {
        id: 43,
        name: "Knoblauch Naan",
        category: "indian",
        tags: ["indian", "vegetarian", "all"],
        description: "Naan-Brot mit frischem Knoblauch und Butter",
        image: "assets/menu/garlic-naan.jpg",
        price: 3.00,
        isVegetarian: true,
        badge: null
    },

    // ===== SALADS =====
    {
        id: 50,
        name: "Gemischter Salat",
        category: "salad",
        tags: ["salad", "vegetarian", "all"],
        description: "Frischer grüner Salat, Tomaten, Gurken, Karotten, Hausdressing",
        image: "assets/menu/salad-mixed.jpg",
        price: 6.50,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 51,
        name: "Caesar Salad",
        category: "salad",
        tags: ["salad", "all"],
        description: "Römersalat, Croutons, Parmesan, Caesar-Dressing",
        image: "assets/menu/salad-caesar.jpg",
        price: 7.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 52,
        name: "Chicken Salad",
        category: "salad",
        tags: ["salad", "all"],
        description: "Grüner Salat, gegrilltes Hähnchen, Tomaten, Gurken, Balsamico",
        image: "assets/menu/salad-chicken.jpg",
        price: 9.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 53,
        name: "Mozzarella Salad",
        category: "salad",
        tags: ["salad", "vegetarian", "all"],
        description: "Tomaten, Mozzarella, frisches Basilikum, Olivenöl",
        image: "assets/menu/salad-mozzarella.jpg",
        price: 8.50,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 54,
        name: "Thunfisch Salad",
        category: "salad",
        tags: ["salad", "all"],
        description: "Grüner Salat, Thunfisch, Ei, Oliven, Zwiebeln",
        image: "assets/menu/salad-tuna.jpg",
        price: 9.00,
        isVegetarian: false,
        badge: null
    },

    // ===== SCHNITZEL =====
    {
        id: 60,
        name: "Wiener Schnitzel",
        category: "schnitzel",
        tags: ["schnitzel", "all"],
        description: "Paniertes Kalbsschnitzel, serviert mit Pommes und Salat",
        image: "assets/menu/schnitzel-wiener.jpg",
        price: 12.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 61,
        name: "Jägerschnitzel",
        category: "schnitzel",
        tags: ["schnitzel", "all"],
        description: "Schnitzel mit Champignon-Rahmsauce, Pommes und Salat",
        image: "assets/menu/schnitzel-jaeger.jpg",
        price: 13.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 62,
        name: "Zigeunerschnitzel",
        category: "schnitzel",
        tags: ["schnitzel", "all"],
        description: "Schnitzel mit Paprika-Sauce, Pommes und Salat",
        image: "assets/menu/schnitzel-zigeuner.jpg",
        price: 13.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 63,
        name: "Schnitzel Hawaii",
        category: "schnitzel",
        tags: ["schnitzel", "all"],
        description: "Schnitzel mit Schinken, Ananas und Käse überbacken, Pommes",
        image: "assets/menu/schnitzel-hawaii.jpg",
        price: 14.00,
        isVegetarian: false,
        badge: null
    }
];

// Extra items and add-ons
const extras = [
    { name: "Extra Käse", price: 1.50 },
    { name: "Extra Salami", price: 2.00 },
    { name: "Extra Schinken", price: 2.00 },
    { name: "Extra Champignons", price: 1.50 },
    { name: "Extra Paprika", price: 1.50 },
    { name: "Extra Oliven", price: 1.50 },
    { name: "Extra scharf", price: 0.00 },
    { name: "Pommes Frites", price: 3.50 },
    { name: "Reis", price: 3.00 },
    { name: "Naan Brot", price: 2.50 }
];

// Delivery information
const deliveryInfo = {
    fee: 2.00,
    pickupDiscount: 0.20, // 20% discount
    minOrder: 10.00,
    freeDeliveryFrom: 25.00
};
