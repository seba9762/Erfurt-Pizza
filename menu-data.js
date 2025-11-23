// Menu Database for Erfurt Pizza - Complete Menu
// Based on official menu cards

// Make menuData global by assigning to window
window.menuData = [
    // ===== PIZZA (Regular) =====
    {
        id: 1,
        name: "Pizza Margherita",
        category: "pizza",
        tags: ["pizza", "vegetarian", "all"],
        description: "Tomatensauce, Mozzarella",
        image: "assets/menu/pizza-margherita.jpg",
        sizes: [
            { size: "26cm", price: 5.00 },
            { size: "30cm", price: 7.00 },
            { size: "40cm", price: 10.00 }
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
            { size: "26cm", price: 6.00 },
            { size: "30cm", price: 8.50 },
            { size: "40cm", price: 12.00 }
        ],
        isVegetarian: false,
        badge: null
    },
    {
        id: 3,
        name: "Pizza Prosciutto",
        category: "pizza",
        tags: ["pizza", "all"],
        description: "Tomatensauce, Mozzarella, Schinken",
        image: "assets/menu/pizza-prosciutto.jpg",
        sizes: [
            { size: "26cm", price: 6.00 },
            { size: "30cm", price: 8.50 },
            { size: "40cm", price: 12.00 }
        ],
        isVegetarian: false,
        badge: null
    },
    {
        id: 4,
        name: "Pizza Funghi",
        category: "pizza",
        tags: ["pizza", "vegetarian", "all"],
        description: "Tomatensauce, Mozzarella, Champignons",
        image: "assets/menu/pizza-funghi.jpg",
        sizes: [
            { size: "26cm", price: 6.00 },
            { size: "30cm", price: 8.50 },
            { size: "40cm", price: 12.00 }
        ],
        isVegetarian: true,
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
            { size: "26cm", price: 6.50 },
            { size: "30cm", price: 9.00 },
            { size: "40cm", price: 12.50 }
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
            { size: "26cm", price: 6.50 },
            { size: "30cm", price: 9.00 },
            { size: "40cm", price: 12.50 }
        ],
        isVegetarian: false,
        badge: null
    },
    {
        id: 7,
        name: "Pizza Vegetaria",
        category: "pizza",
        tags: ["pizza", "vegetarian", "all"],
        description: "Tomatensauce, Mozzarella, frisches Gemüse",
        image: "assets/menu/pizza-vegetaria.jpg",
        sizes: [
            { size: "26cm", price: 6.50 },
            { size: "30cm", price: 9.00 },
            { size: "40cm", price: 12.50 }
        ],
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 8,
        name: "Pizza Capricciosa",
        category: "pizza",
        tags: ["pizza", "all"],
        description: "Tomatensauce, Mozzarella, Schinken, Champignons, Artischocken",
        image: "assets/menu/pizza-capricciosa.jpg",
        sizes: [
            { size: "26cm", price: 7.00 },
            { size: "30cm", price: 9.50 },
            { size: "40cm", price: 13.00 }
        ],
        isVegetarian: false,
        badge: null
    },
    {
        id: 9,
        name: "Pizza Quattro Formaggi",
        category: "pizza",
        tags: ["pizza", "vegetarian", "all"],
        description: "Tomatensauce, 4 Käsesorten",
        image: "assets/menu/pizza-quattro-formaggi.jpg",
        sizes: [
            { size: "26cm", price: 7.00 },
            { size: "30cm", price: 9.50 },
            { size: "40cm", price: 13.00 }
        ],
        isVegetarian: true,
        badge: null
    },
    {
        id: 10,
        name: "Pizza Diavola",
        category: "pizza",
        tags: ["pizza", "all"],
        description: "Tomatensauce, Mozzarella, scharfe Salami, Peperoni",
        image: "assets/menu/pizza-diavola.jpg",
        sizes: [
            { size: "26cm", price: 7.00 },
            { size: "30cm", price: 9.50 },
            { size: "40cm", price: 13.00 }
        ],
        isVegetarian: false,
        badge: "hot"
    },
    {
        id: 11,
        name: "Pizza Napoli",
        category: "pizza",
        tags: ["pizza", "all"],
        description: "Tomatensauce, Mozzarella, Sardellen, Kapern, Oliven",
        image: "assets/menu/pizza-napoli.jpg",
        sizes: [
            { size: "26cm", price: 7.00 },
            { size: "30cm", price: 9.50 },
            { size: "40cm", price: 13.00 }
        ],
        isVegetarian: false,
        badge: null
    },
    {
        id: 12,
        name: "Pizza Roma",
        category: "pizza",
        tags: ["pizza", "all"],
        description: "Tomatensauce, Mozzarella, Thunfisch, Zwiebeln, Sardellen",
        image: "assets/menu/pizza-roma.jpg",
        sizes: [
            { size: "26cm", price: 7.50 },
            { size: "30cm", price: 10.00 },
            { size: "40cm", price: 13.50 }
        ],
        isVegetarian: false,
        badge: null
    },
    {
        id: 13,
        name: "Pizza Frutti di Mare",
        category: "pizza",
        tags: ["pizza", "all"],
        description: "Tomatensauce, Mozzarella, Meeresfrüchte",
        image: "assets/menu/pizza-frutti-di-mare.jpg",
        sizes: [
            { size: "26cm", price: 8.00 },
            { size: "30cm", price: 10.50 },
            { size: "40cm", price: 14.00 }
        ],
        isVegetarian: false,
        badge: null
    },
    {
        id: 14,
        name: "Pizza Scampi",
        category: "pizza",
        tags: ["pizza", "all"],
        description: "Tomatensauce, Mozzarella, Scampi, Knoblauch",
        image: "assets/menu/pizza-scampi.jpg",
        sizes: [
            { size: "26cm", price: 8.50 },
            { size: "30cm", price: 11.00 },
            { size: "40cm", price: 14.50 }
        ],
        isVegetarian: false,
        badge: null
    },
    {
        id: 15,
        name: "Pizza Lachs",
        category: "pizza",
        tags: ["pizza", "all"],
        description: "Tomatensauce, Mozzarella, Lachs, Zwiebeln",
        image: "assets/menu/pizza-lachs.jpg",
        sizes: [
            { size: "26cm", price: 8.50 },
            { size: "30cm", price: 11.00 },
            { size: "40cm", price: 14.50 }
        ],
        isVegetarian: false,
        badge: null
    },
    {
        id: 16,
        name: "Pizza Spinat",
        category: "pizza",
        tags: ["pizza", "vegetarian", "all"],
        description: "Tomatensauce, Mozzarella, Spinat, Knoblauch",
        image: "assets/menu/pizza-spinat.jpg",
        sizes: [
            { size: "26cm", price: 7.00 },
            { size: "30cm", price: 9.50 },
            { size: "40cm", price: 13.00 }
        ],
        isVegetarian: true,
        badge: null
    },
    {
        id: 17,
        name: "Pizza Rucola",
        category: "pizza",
        tags: ["pizza", "all"],
        description: "Tomatensauce, Mozzarella, Rucola, Parmesan, Kirschtomaten",
        image: "assets/menu/pizza-rucola.jpg",
        sizes: [
            { size: "26cm", price: 7.50 },
            { size: "30cm", price: 10.00 },
            { size: "40cm", price: 13.50 }
        ],
        isVegetarian: false,
        badge: null
    },
    {
        id: 18,
        name: "Pizza Gorgonzola",
        category: "pizza",
        tags: ["pizza", "vegetarian", "all"],
        description: "Tomatensauce, Mozzarella, Gorgonzola, Zwiebeln",
        image: "assets/menu/pizza-gorgonzola.jpg",
        sizes: [
            { size: "26cm", price: 7.50 },
            { size: "30cm", price: 10.00 },
            { size: "40cm", price: 13.50 }
        ],
        isVegetarian: true,
        badge: null
    },

    // ===== AMERIKANISCHE PIZZEN (American Pizzas) =====
    {
        id: 30,
        name: "Pizza Americana",
        category: "pizza",
        tags: ["pizza", "american", "all"],
        description: "Tomatensauce, Mozzarella, Salami, Schinken, Champignons, Paprika",
        image: "assets/menu/pizza-americana.jpg",
        sizes: [
            { size: "26cm", price: 7.50 },
            { size: "30cm", price: 10.00 },
            { size: "40cm", price: 13.50 }
        ],
        isVegetarian: false,
        badge: null
    },
    {
        id: 31,
        name: "Pizza BBQ Chicken",
        category: "pizza",
        tags: ["pizza", "american", "all"],
        description: "BBQ-Sauce, Mozzarella, Hähnchen, Zwiebeln, Mais",
        image: "assets/menu/pizza-bbq-chicken.jpg",
        sizes: [
            { size: "26cm", price: 8.00 },
            { size: "30cm", price: 10.50 },
            { size: "40cm", price: 14.00 }
        ],
        isVegetarian: false,
        badge: null
    },
    {
        id: 32,
        name: "Pizza Texas",
        category: "pizza",
        tags: ["pizza", "american", "all"],
        description: "BBQ-Sauce, Mozzarella, Rindfleisch, Bacon, Zwiebeln, Jalapeños",
        image: "assets/menu/pizza-texas.jpg",
        sizes: [
            { size: "26cm", price: 8.50 },
            { size: "30cm", price: 11.00 },
            { size: "40cm", price: 14.50 }
        ],
        isVegetarian: false,
        badge: "hot"
    },

    // ===== INDISCHE SPEZIALITÄTEN (Indian Specialties) =====
    {
        id: 50,
        name: "Chicken Curry",
        category: "indian",
        tags: ["indian", "all"],
        description: "Zartes Hähnchen in cremiger Curry-Sauce, serviert mit Basmati Reis",
        image: "assets/menu/chicken-curry.jpg",
        price: 9.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 51,
        name: "Butter Chicken",
        category: "indian",
        tags: ["indian", "all"],
        description: "Tandoori-Hähnchen in cremiger Tomaten-Butter-Sauce, mit Reis",
        image: "assets/menu/butter-chicken.jpg",
        price: 10.00,
        isVegetarian: false,
        badge: null
    },
    {
        id: 52,
        name: "Chicken Tikka Masala",
        category: "indian",
        tags: ["indian", "all"],
        description: "Gegrillte Hähnchenstücke in würziger Masala-Sauce, mit Reis",
        image: "assets/menu/tikka-masala.jpg",
        price: 10.00,
        isVegetarian: false,
        badge: null
    },
    {
        id: 53,
        name: "Chicken Korma",
        category: "indian",
        tags: ["indian", "all"],
        description: "Hähnchen in milder, cremiger Nuss-Sauce, mit Reis",
        image: "assets/menu/chicken-korma.jpg",
        price: 9.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 54,
        name: "Chicken Vindaloo",
        category: "indian",
        tags: ["indian", "all"],
        description: "Sehr scharfes Hähnchen-Curry mit Kartoffeln, mit Reis",
        image: "assets/menu/chicken-vindaloo.jpg",
        price: 9.50,
        isVegetarian: false,
        badge: "hot"
    },
    {
        id: 55,
        name: "Chicken Madras",
        category: "indian",
        tags: ["indian", "all"],
        description: "Scharfes Hähnchen-Curry, mit Reis",
        image: "assets/menu/chicken-madras.jpg",
        price: 9.50,
        isVegetarian: false,
        badge: "hot"
    },
    {
        id: 56,
        name: "Chicken Jalfrezi",
        category: "indian",
        tags: ["indian", "all"],
        description: "Hähnchen mit Paprika, Zwiebeln, Tomaten, mit Reis",
        image: "assets/menu/chicken-jalfrezi.jpg",
        price: 9.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 57,
        name: "Palak Paneer",
        category: "indian",
        tags: ["indian", "vegetarian", "all"],
        description: "Indischer Käse in cremiger Spinat-Sauce, mit Reis",
        image: "assets/menu/palak-paneer.jpg",
        price: 8.50,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 58,
        name: "Paneer Tikka Masala",
        category: "indian",
        tags: ["indian", "vegetarian", "all"],
        description: "Gegrillter indischer Käse in würziger Masala-Sauce, mit Reis",
        image: "assets/menu/paneer-tikka-masala.jpg",
        price: 8.50,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 59,
        name: "Chana Masala",
        category: "indian",
        tags: ["indian", "vegetarian", "all"],
        description: "Kichererbsen in würziger Tomaten-Sauce, mit Reis",
        image: "assets/menu/chana-masala.jpg",
        price: 8.00,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 60,
        name: "Dal Makhani",
        category: "indian",
        tags: ["indian", "vegetarian", "all"],
        description: "Schwarze Linsen in cremiger Butter-Sauce, mit Reis",
        image: "assets/menu/dal-makhani.jpg",
        price: 8.00,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 61,
        name: "Vegetable Curry",
        category: "indian",
        tags: ["indian", "vegetarian", "all"],
        description: "Gemischtes Gemüse in Curry-Sauce, mit Reis",
        image: "assets/menu/veg-curry.jpg",
        price: 8.00,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 62,
        name: "Chicken Biryani",
        category: "indian",
        tags: ["indian", "all"],
        description: "Würziger Basmati-Reis mit mariniertem Hähnchen",
        image: "assets/menu/chicken-biryani.jpg",
        price: 10.00,
        isVegetarian: false,
        badge: null
    },
    {
        id: 63,
        name: "Vegetable Biryani",
        category: "indian",
        tags: ["indian", "vegetarian", "all"],
        description: "Würziger Basmati-Reis mit Gemüse und Gewürzen",
        image: "assets/menu/veg-biryani.jpg",
        price: 8.50,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 64,
        name: "Lamb Curry",
        category: "indian",
        tags: ["indian", "all"],
        description: "Zartes Lammfleisch in aromatischer Curry-Sauce, mit Reis",
        image: "assets/menu/lamb-curry.jpg",
        price: 11.00,
        isVegetarian: false,
        badge: null
    },
    {
        id: 65,
        name: "Tandoori Chicken",
        category: "indian",
        tags: ["indian", "all"],
        description: "Hähnchen aus dem Tandoor-Ofen, mit Reis",
        image: "assets/menu/tandoori-chicken.jpg",
        price: 10.00,
        isVegetarian: false,
        badge: null
    },

    // ===== INDISCHE NAAN-BROTE (Indian Naan Breads) =====
    {
        id: 80,
        name: "Naan",
        category: "indian",
        tags: ["indian", "vegetarian", "sides", "all"],
        description: "Traditionelles indisches Fladenbrot aus dem Tandoor",
        image: "assets/menu/naan.jpg",
        price: 2.50,
        isVegetarian: true,
        badge: null
    },
    {
        id: 81,
        name: "Knoblauch Naan",
        category: "indian",
        tags: ["indian", "vegetarian", "sides", "all"],
        description: "Naan-Brot mit frischem Knoblauch und Butter",
        image: "assets/menu/garlic-naan.jpg",
        price: 3.00,
        isVegetarian: true,
        badge: null
    },
    {
        id: 82,
        name: "Käse Naan",
        category: "indian",
        tags: ["indian", "vegetarian", "sides", "all"],
        description: "Naan gefüllt mit indischem Käse",
        image: "assets/menu/cheese-naan.jpg",
        price: 3.50,
        isVegetarian: true,
        badge: null
    },
    {
        id: 83,
        name: "Butter Naan",
        category: "indian",
        tags: ["indian", "vegetarian", "sides", "all"],
        description: "Naan mit Butter bestrichen",
        image: "assets/menu/butter-naan.jpg",
        price: 3.00,
        isVegetarian: true,
        badge: null
    },

    // ===== BURGER =====
    {
        id: 100,
        name: "Classic Burger",
        category: "burger",
        tags: ["burger", "all"],
        description: "Rindfleisch-Patty, Salat, Tomate, Zwiebeln, Gurke, Burger-Sauce",
        image: "assets/menu/burger-classic.jpg",
        price: 7.00,
        isVegetarian: false,
        badge: null
    },
    {
        id: 101,
        name: "Cheeseburger",
        category: "burger",
        tags: ["burger", "all"],
        description: "Rindfleisch-Patty, Cheddar-Käse, Salat, Tomate, Zwiebeln, Sauce",
        image: "assets/menu/burger-cheese.jpg",
        price: 7.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 102,
        name: "Bacon Burger",
        category: "burger",
        tags: ["burger", "all"],
        description: "Rindfleisch-Patty, knuspriger Bacon, Cheddar, BBQ-Sauce",
        image: "assets/menu/burger-bacon.jpg",
        price: 8.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 103,
        name: "Double Burger",
        category: "burger",
        tags: ["burger", "all"],
        description: "Doppeltes Rindfleisch-Patty, doppelt Käse, Spezial-Sauce",
        image: "assets/menu/burger-double.jpg",
        price: 9.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 104,
        name: "Chicken Burger",
        category: "burger",
        tags: ["burger", "all"],
        description: "Knuspriges Hähnchen, Salat, Tomate, Mayo",
        image: "assets/menu/burger-chicken.jpg",
        price: 7.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 105,
        name: "Crispy Chicken Burger",
        category: "burger",
        tags: ["burger", "all"],
        description: "Paniertes Hähnchen, Salat, Tomate, Spezial-Sauce",
        image: "assets/menu/burger-crispy-chicken.jpg",
        price: 8.00,
        isVegetarian: false,
        badge: null
    },
    {
        id: 106,
        name: "Spicy Chicken Burger",
        category: "burger",
        tags: ["burger", "all"],
        description: "Scharfes Hähnchen, Jalapeños, Chipotle-Mayo",
        image: "assets/menu/burger-spicy-chicken.jpg",
        price: 8.00,
        isVegetarian: false,
        badge: "hot"
    },
    {
        id: 107,
        name: "Veggie Burger",
        category: "burger",
        tags: ["burger", "vegetarian", "all"],
        description: "Veggie-Patty, Salat, Tomate, Avocado, Spezial-Sauce",
        image: "assets/menu/burger-veggie.jpg",
        price: 7.50,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 108,
        name: "Fish Burger",
        category: "burger",
        tags: ["burger", "all"],
        description: "Fisch-Filet, Salat, Remoulade",
        image: "assets/menu/burger-fish.jpg",
        price: 7.50,
        isVegetarian: false,
        badge: null
    },

    // ===== SALATE (Salads) =====
    {
        id: 130,
        name: "Gemischter Salat",
        category: "salad",
        tags: ["salad", "vegetarian", "all"],
        description: "Frischer grüner Salat, Tomaten, Gurken, Karotten, Hausdressing",
        image: "assets/menu/salad-mixed.jpg",
        price: 5.50,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 131,
        name: "Caesar Salad",
        category: "salad",
        tags: ["salad", "all"],
        description: "Römersalat, Croutons, Parmesan, Caesar-Dressing",
        image: "assets/menu/salad-caesar.jpg",
        price: 6.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 132,
        name: "Chicken Salad",
        category: "salad",
        tags: ["salad", "all"],
        description: "Grüner Salat, gegrilltes Hähnchen, Tomaten, Gurken, Balsamico",
        image: "assets/menu/salad-chicken.jpg",
        price: 8.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 133,
        name: "Mozzarella Salad",
        category: "salad",
        tags: ["salad", "vegetarian", "all"],
        description: "Tomaten, Mozzarella, frisches Basilikum, Olivenöl",
        image: "assets/menu/salad-mozzarella.jpg",
        price: 7.50,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 134,
        name: "Thunfisch Salat",
        category: "salad",
        tags: ["salad", "all"],
        description: "Grüner Salat, Thunfisch, Ei, Oliven, Zwiebeln",
        image: "assets/menu/salad-tuna.jpg",
        price: 8.00,
        isVegetarian: false,
        badge: null
    },
    {
        id: 135,
        name: "Greek Salad",
        category: "salad",
        tags: ["salad", "vegetarian", "all"],
        description: "Tomaten, Gurken, Oliven, Feta-Käse, Zwiebeln",
        image: "assets/menu/salad-greek.jpg",
        price: 7.50,
        isVegetarian: true,
        badge: "vegetarian"
    },

    // ===== SCHNITZEL =====
    {
        id: 150,
        name: "Wiener Schnitzel",
        category: "schnitzel",
        tags: ["schnitzel", "all"],
        description: "Paniertes Kalbsschnitzel, serviert mit Pommes und Salat",
        image: "assets/menu/schnitzel-wiener.jpg",
        price: 11.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 151,
        name: "Schnitzel Wiener Art",
        category: "schnitzel",
        tags: ["schnitzel", "all"],
        description: "Paniertes Schweineschnitzel, serviert mit Pommes und Salat",
        image: "assets/menu/schnitzel-wiener-art.jpg",
        price: 9.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 152,
        name: "Jägerschnitzel",
        category: "schnitzel",
        tags: ["schnitzel", "all"],
        description: "Schnitzel mit Champignon-Rahmsauce, Pommes und Salat",
        image: "assets/menu/schnitzel-jaeger.jpg",
        price: 10.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 153,
        name: "Zigeunerschnitzel",
        category: "schnitzel",
        tags: ["schnitzel", "all"],
        description: "Schnitzel mit Paprika-Sauce, Pommes und Salat",
        image: "assets/menu/schnitzel-zigeuner.jpg",
        price: 10.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 154,
        name: "Schnitzel Hawaii",
        category: "schnitzel",
        tags: ["schnitzel", "all"],
        description: "Schnitzel mit Schinken, Ananas und Käse überbacken, Pommes",
        image: "assets/menu/schnitzel-hawaii.jpg",
        price: 11.00,
        isVegetarian: false,
        badge: null
    },
    {
        id: 155,
        name: "Rahmschnitzel",
        category: "schnitzel",
        tags: ["schnitzel", "all"],
        description: "Schnitzel mit Rahmsauce, Pommes und Salat",
        image: "assets/menu/schnitzel-rahm.jpg",
        price: 10.50,
        isVegetarian: false,
        badge: null
    },

    // ===== AUFLÄUFE (Casseroles) =====
    {
        id: 170,
        name: "Lasagne Bolognese",
        category: "casserole",
        tags: ["casserole", "all"],
        description: "Klassische Lasagne mit Hackfleisch-Sauce",
        image: "assets/menu/lasagne-bolognese.jpg",
        price: 9.00,
        isVegetarian: false,
        badge: null
    },
    {
        id: 171,
        name: "Lasagne Vegetarisch",
        category: "casserole",
        tags: ["casserole", "vegetarian", "all"],
        description: "Lasagne mit Gemüse und Béchamelsauce",
        image: "assets/menu/lasagne-veggie.jpg",
        price: 8.50,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 172,
        name: "Gyros Auflauf",
        category: "casserole",
        tags: ["casserole", "all"],
        description: "Gyros mit Metaxasauce, Käse überbacken",
        image: "assets/menu/gyros-auflauf.jpg",
        price: 9.50,
        isVegetarian: false,
        badge: null
    },

    // ===== PASTA / SPAGHETTI =====
    {
        id: 190,
        name: "Spaghetti Bolognese",
        category: "pasta",
        tags: ["pasta", "all"],
        description: "Spaghetti mit Hackfleisch-Tomatensauce",
        image: "assets/menu/spaghetti-bolognese.jpg",
        price: 7.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 191,
        name: "Spaghetti Carbonara",
        category: "pasta",
        tags: ["pasta", "all"],
        description: "Spaghetti mit Schinken, Ei, Sahne",
        image: "assets/menu/spaghetti-carbonara.jpg",
        price: 8.00,
        isVegetarian: false,
        badge: null
    },
    {
        id: 192,
        name: "Spaghetti Napoli",
        category: "pasta",
        tags: ["pasta", "vegetarian", "all"],
        description: "Spaghetti mit Tomatensauce",
        image: "assets/menu/spaghetti-napoli.jpg",
        price: 6.50,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 193,
        name: "Spaghetti Aglio e Olio",
        category: "pasta",
        tags: ["pasta", "vegetarian", "all"],
        description: "Spaghetti mit Knoblauch, Olivenöl, Chili",
        image: "assets/menu/spaghetti-aglio-olio.jpg",
        price: 7.00,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 194,
        name: "Tortellini",
        category: "pasta",
        tags: ["pasta", "all"],
        description: "Tortellini mit Sahnesauce",
        image: "assets/menu/tortellini.jpg",
        price: 8.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 195,
        name: "Penne Arrabiata",
        category: "pasta",
        tags: ["pasta", "vegetarian", "all"],
        description: "Penne mit scharfer Tomatensauce",
        image: "assets/menu/penne-arrabiata.jpg",
        price: 7.50,
        isVegetarian: true,
        badge: "hot"
    },

    // ===== MEXIKANISCHE SPEZIALITÄTEN (Mexican Specialties) =====
    {
        id: 210,
        name: "Burrito Chicken",
        category: "mexican",
        tags: ["mexican", "all"],
        description: "Weizentortilla gefüllt mit Hähnchen, Reis, Bohnen, Salsa",
        image: "assets/menu/burrito-chicken.jpg",
        price: 8.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 211,
        name: "Burrito Beef",
        category: "mexican",
        tags: ["mexican", "all"],
        description: "Weizentortilla gefüllt mit Rindfleisch, Reis, Bohnen, Salsa",
        image: "assets/menu/burrito-beef.jpg",
        price: 9.00,
        isVegetarian: false,
        badge: null
    },
    {
        id: 212,
        name: "Quesadilla Chicken",
        category: "mexican",
        tags: ["mexican", "all"],
        description: "Gegrillte Tortilla mit Hähnchen, Käse, Paprika",
        image: "assets/menu/quesadilla-chicken.jpg",
        price: 7.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 213,
        name: "Quesadilla Vegetarisch",
        category: "mexican",
        tags: ["mexican", "vegetarian", "all"],
        description: "Gegrillte Tortilla mit Gemüse, Käse",
        image: "assets/menu/quesadilla-veggie.jpg",
        price: 7.00,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 214,
        name: "Nachos",
        category: "mexican",
        tags: ["mexican", "vegetarian", "all"],
        description: "Tortilla-Chips mit Käse, Jalapeños, Salsa, Sour Cream",
        image: "assets/menu/nachos.jpg",
        price: 6.50,
        isVegetarian: true,
        badge: null
    },
    {
        id: 215,
        name: "Tacos (3 Stück)",
        category: "mexican",
        tags: ["mexican", "all"],
        description: "Weiche Tacos mit Hähnchen oder Rindfleisch, Salat, Salsa",
        image: "assets/menu/tacos.jpg",
        price: 8.00,
        isVegetarian: false,
        badge: null
    },

    // ===== VORSPEISEN (Appetizers) =====
    {
        id: 230,
        name: "Bruschetta",
        category: "appetizer",
        tags: ["appetizer", "vegetarian", "all"],
        description: "Geröstetes Brot mit Tomaten, Basilikum, Knoblauch",
        image: "assets/menu/bruschetta.jpg",
        price: 5.50,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 231,
        name: "Chicken Wings (8 Stück)",
        category: "appetizer",
        tags: ["appetizer", "all"],
        description: "Knusprige Chicken Wings mit BBQ-Sauce",
        image: "assets/menu/chicken-wings.jpg",
        price: 7.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 232,
        name: "Chicken Nuggets (8 Stück)",
        category: "appetizer",
        tags: ["appetizer", "all"],
        description: "Panierte Hähnchen-Nuggets",
        image: "assets/menu/chicken-nuggets.jpg",
        price: 6.50,
        isVegetarian: false,
        badge: null
    },
    {
        id: 233,
        name: "Mozzarella Sticks (6 Stück)",
        category: "appetizer",
        tags: ["appetizer", "vegetarian", "all"],
        description: "Panierte Mozzarella-Sticks",
        image: "assets/menu/mozzarella-sticks.jpg",
        price: 6.00,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 234,
        name: "Zwiebelringe",
        category: "appetizer",
        tags: ["appetizer", "vegetarian", "all"],
        description: "Knusprige panierte Zwiebelringe",
        image: "assets/menu/onion-rings.jpg",
        price: 5.00,
        isVegetarian: true,
        badge: "vegetarian"
    },
    {
        id: 235,
        name: "Knoblauchbrot",
        category: "appetizer",
        tags: ["appetizer", "vegetarian", "all"],
        description: "Geröstetes Brot mit Knoblauchbutter",
        image: "assets/menu/garlic-bread.jpg",
        price: 4.00,
        isVegetarian: true,
        badge: "vegetarian"
    },

    // ===== BEILAGEN (Sides) =====
    {
        id: 250,
        name: "Pommes Frites",
        category: "sides",
        tags: ["sides", "vegetarian", "all"],
        description: "Knusprige Pommes Frites",
        image: "assets/menu/fries.jpg",
        price: 3.50,
        isVegetarian: true,
        badge: null
    },
    {
        id: 251,
        name: "Süßkartoffel Pommes",
        category: "sides",
        tags: ["sides", "vegetarian", "all"],
        description: "Knusprige Süßkartoffel-Pommes",
        image: "assets/menu/sweet-potato-fries.jpg",
        price: 4.50,
        isVegetarian: true,
        badge: null
    },
    {
        id: 252,
        name: "Pommes mit Käse",
        category: "sides",
        tags: ["sides", "vegetarian", "all"],
        description: "Pommes mit geschmolzenem Käse",
        image: "assets/menu/cheese-fries.jpg",
        price: 4.50,
        isVegetarian: true,
        badge: null
    },
    {
        id: 253,
        name: "Reis",
        category: "sides",
        tags: ["sides", "vegetarian", "all"],
        description: "Basmati Reis",
        image: "assets/menu/rice.jpg",
        price: 3.00,
        isVegetarian: true,
        badge: null
    },
    {
        id: 254,
        name: "Wedges",
        category: "sides",
        tags: ["sides", "vegetarian", "all"],
        description: "Kartoffel-Wedges",
        image: "assets/menu/wedges.jpg",
        price: 4.00,
        isVegetarian: true,
        badge: null
    },
    {
        id: 255,
        name: "Coleslaw",
        category: "sides",
        tags: ["sides", "vegetarian", "all"],
        description: "Krautsalat",
        image: "assets/menu/coleslaw.jpg",
        price: 3.00,
        isVegetarian: true,
        badge: null
    },

    // ===== DESSERTS =====
    {
        id: 270,
        name: "Tiramisu",
        category: "dessert",
        tags: ["dessert", "vegetarian", "all"],
        description: "Klassisches italienisches Dessert",
        image: "assets/menu/tiramisu.jpg",
        price: 5.00,
        isVegetarian: true,
        badge: null
    },
    {
        id: 271,
        name: "Panna Cotta",
        category: "dessert",
        tags: ["dessert", "vegetarian", "all"],
        description: "Italienisches Sahne-Dessert mit Beerensauce",
        image: "assets/menu/panna-cotta.jpg",
        price: 4.50,
        isVegetarian: true,
        badge: null
    },
    {
        id: 272,
        name: "Schokoladenkuchen",
        category: "dessert",
        tags: ["dessert", "vegetarian", "all"],
        description: "Saftiger Schokoladenkuchen",
        image: "assets/menu/chocolate-cake.jpg",
        price: 4.50,
        isVegetarian: true,
        badge: null
    },
    {
        id: 273,
        name: "Apfelstrudel",
        category: "dessert",
        tags: ["dessert", "vegetarian", "all"],
        description: "Warmer Apfelstrudel mit Vanillesauce",
        image: "assets/menu/apfelstrudel.jpg",
        price: 4.50,
        isVegetarian: true,
        badge: null
    },
    {
        id: 274,
        name: "Eis (3 Kugeln)",
        category: "dessert",
        tags: ["dessert", "vegetarian", "all"],
        description: "Verschiedene Eissorten nach Wahl",
        image: "assets/menu/ice-cream.jpg",
        price: 4.00,
        isVegetarian: true,
        badge: null
    },

    // ===== GETRÄNKE (Drinks) =====
    {
        id: 290,
        name: "Coca Cola (0,33l)",
        category: "drinks",
        tags: ["drinks", "all"],
        description: "Coca Cola",
        image: "assets/menu/coca-cola.jpg",
        price: 2.50,
        isVegetarian: true,
        badge: null
    },
    {
        id: 291,
        name: "Fanta (0,33l)",
        category: "drinks",
        tags: ["drinks", "all"],
        description: "Fanta Orange",
        image: "assets/menu/fanta.jpg",
        price: 2.50,
        isVegetarian: true,
        badge: null
    },
    {
        id: 292,
        name: "Sprite (0,33l)",
        category: "drinks",
        tags: ["drinks", "all"],
        description: "Sprite",
        image: "assets/menu/sprite.jpg",
        price: 2.50,
        isVegetarian: true,
        badge: null
    },
    {
        id: 293,
        name: "Wasser (0,5l)",
        category: "drinks",
        tags: ["drinks", "all"],
        description: "Mineralwasser",
        image: "assets/menu/water.jpg",
        price: 2.00,
        isVegetarian: true,
        badge: null
    },
    {
        id: 294,
        name: "Apfelsaft (0,33l)",
        category: "drinks",
        tags: ["drinks", "all"],
        description: "Apfelsaft",
        image: "assets/menu/apple-juice.jpg",
        price: 2.50,
        isVegetarian: true,
        badge: null
    },
    {
        id: 295,
        name: "Orangensaft (0,33l)",
        category: "drinks",
        tags: ["drinks", "all"],
        description: "Frisch gepresster Orangensaft",
        image: "assets/menu/orange-juice.jpg",
        price: 3.00,
        isVegetarian: true,
        badge: null
    },
    {
        id: 296,
        name: "Bier (0,5l)",
        category: "drinks",
        tags: ["drinks", "all"],
        description: "Bier vom Fass",
        image: "assets/menu/beer.jpg",
        price: 3.50,
        isVegetarian: true,
        badge: null
    }
];

// Extra items and add-ons
window.extras = [
    { name: "Extra Käse", price: 1.50 },
    { name: "Extra Salami", price: 2.00 },
    { name: "Extra Schinken", price: 2.00 },
    { name: "Extra Champignons", price: 1.50 },
    { name: "Extra Paprika", price: 1.50 },
    { name: "Extra Oliven", price: 1.50 },
    { name: "Extra Zwiebeln", price: 1.00 },
    { name: "Extra Thunfisch", price: 2.50 },
    { name: "Extra Ananas", price: 1.50 },
    { name: "Extra scharf", price: 0.00 },
    { name: "Extra Knoblauch", price: 0.50 }
];

// Delivery information
window.deliveryInfo = {
    fee: 2.00,
    pickupDiscount: 0.20, // 20% discount
    minOrder: 10.00,
    freeDeliveryFrom: 25.00
};
