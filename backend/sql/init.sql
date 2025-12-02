-- Active: 1760138508635@@127.0.0.1@5432
CREATE TABLE Vendor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL DEFAULT '',
    email VARCHAR(100) NOT NULL DEFAULT '',
    description VARCHAR(500) NOT NULL DEFAULT '',
    owner VARCHAR(100) NOT NULL DEFAULT '',
    logo BLOB
);

CREATE TABLE IF NOT EXISTS vendor_auth (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vendor_id INT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (vendor_id) REFERENCES vendor(id)
);

CREATE TABLE Product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(500) NOT NULL DEFAULT '',
    count DECIMAL(10, 2),
    price DECIMAL(10, 2) NOT NULL,
    image BLOB,
    vid INT NOT NULL,
    FOREIGN KEY (vid) REFERENCES Vendor(id) ON DELETE CASCADE
);

CREATE TABLE Sale (
    id INT AUTO_INCREMENT PRIMARY KEY,
    discount DECIMAL(10, 2) NOT NULL,
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE SaleItem (
    pid INT NOT NULL,
    sid INT NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (sid) REFERENCES Sale(id) ON DELETE CASCADE,
    FOREIGN KEY (pid) REFERENCES Product(id) ON DELETE CASCADE,
    PRIMARY KEY (sid, pid)
);

CREATE TABLE Booth (
    id INT AUTO_INCREMENT PRIMARY KEY,
    xcor DECIMAL(10, 2) NOT NULL,
    ycor DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Reservation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vid INT NOT NULL,
    bid INT NOT NULL,
    date DATETIME NOT NULL,
    duration INT NOT NULL,
    FOREIGN KEY (bid) REFERENCES Booth(id) ON DELETE CASCADE,
    FOREIGN KEY (vid) REFERENCES Vendor(id) ON DELETE CASCADE
);

insert into Vendor (id, name, phone, email, description, owner) values (1, 'Paucek, Kohler and Osinski', '742-184-6683', 'jdance0@slashdot.org', 'Set of three aromatic candles with various scents.', 'Job Dance');
insert into Vendor (name, phone, email, description, owner) values ('Luettgen, Corkery and Becker', '565-651-1983', 'azohrer1@deliciousdays.com', 'Lightweight, expandable hoses for easy handling.', 'Adriano Zohrer');
insert into Vendor (name, phone, email, description, owner) values ('Roberts, Schimmel and Beier', '194-316-0602', 'gloft2@newsvine.com', 'Charcoal kettle grill perfect for backyard barbecues.', 'Giulietta Loft');
insert into Vendor (name, phone, email, description, owner) values ('Denesik, Langosh and Goldner', '983-717-5708', 'galtham3@google.nl', 'Heavy-duty grill pan for indoor grilling.', 'Guy Altham');
insert into Vendor (name, phone, email, description, owner) values ('Bruen, Walsh and Walker', '937-685-9630', 'gmccardle4@friendfeed.com', 'Flavorful rice mix with saffron and spices.', 'Grant McCardle');
insert into Vendor (name, phone, email, description, owner) values ('Crona, Bernhard and Heaney', '787-865-9480', 'ejannequin5@google.ru', 'Secure phone mount for your vehicle''s dashboard.', 'Electra Jannequin');
insert into Vendor (name, phone, email, description, owner) values ('Powlowski-Windler', '361-517-8010', 'nthomke6@sina.com.cn', 'Cordless electric screwdriver for home projects.', 'Nilson Thomke');
insert into Vendor (name, phone, email, description, owner) values ('Jerde, Quigley and Dickinson', '555-149-5342', 'lgeere7@altervista.org', 'Hearty lentil soup for a quick meal.', 'Lezley Geere');
insert into Vendor (name, phone, email, description, owner) values ('Christiansen, Waters and Johnson', '838-487-7953', 'mpartkya8@biglobe.ne.jp', 'A rich coconut curry sauce perfect for simmering vegetables or meats.', 'Myrilla Partkya');
insert into Vendor (name, phone, email, description, owner) values ('Frami, Predovic and Hoeger', '491-773-7072', 'bmatantsev9@live.com', 'Easy-to-make falafel mix for a tasty vegetarian meal.', 'Bendite Matantsev');
insert into Vendor (name, phone, email, description, owner) values ('Hintz Group', '681-654-3260', 'dduffina@dmoz.org', 'Stylish desk set to keep your workspace tidy and organized.', 'Druci Duffin');
insert into Vendor (name, phone, email, description, owner) values ('Rice-Lindgren', '310-540-3928', 'mswinfordb@de.vu', 'A delicious salad with quinoa, nuts, and cranberries.', 'Mano Swinford');
insert into Vendor (name, phone, email, description, owner) values ('Pouros-Torphy', '527-675-3254', 'mschollerc@springer.com', 'Stylish dish soap dispenser with sponge holder.', 'Mellicent Scholler');
insert into Vendor (name, phone, email, description, owner) values ('Barrows Group', '954-907-4217', 'yizzettd@yellowpages.com', 'Compact coffee grinder for fresh ground coffee beans.', 'Yevette Izzett');
insert into Vendor (name, phone, email, description, owner) values ('Rowe, Medhurst and Beahan', '449-917-4891', 'mwoolliamse@artisteer.com', 'All-in-one art set for kids to unleash creativity.', 'Muffin Woolliams');
insert into Vendor (name, phone, email, description, owner) values ('Mertz LLC', '843-877-9955', 'asalsburyf@xing.com', 'Roasted almonds coated in a sweet maple and cinnamon mixture.', 'Alberto Salsbury');
insert into Vendor (name, phone, email, description, owner) values ('Kuphal LLC', '253-115-5276', 'lallertong@sun.com', 'Gluten-free biscuits made with almond flour.', 'Lynnelle Allerton');
insert into Vendor (name, phone, email, description, owner) values ('Grimes, Medhurst and Ullrich', '225-960-8615', 'hloughneyh@fda.gov', 'Durable apron to keep clothes clean while cooking.', 'Hobie Loughney');
insert into Vendor (name, phone, email, description, owner) values ('Auer, Raynor and Hamill', '750-169-2396', 'cconradi@omniture.com', 'Adjustable shower head for a luxurious shower experience.', 'Colline Conrad');
insert into Vendor (name, phone, email, description, owner) values ('Runolfsdottir, Harvey and Ledner', '157-429-0748', 'gmessengerj@soup.io', 'Deliciously rich brownies made with almond flour.', 'Guilbert Messenger');
insert into Vendor (name, phone, email, description, owner) values ('Rice-Bernier', '647-315-9812', 'oninnottik@oaic.gov.au', 'Steamed edamame tossed in a spicy garlic sauce, great for snacking.', 'Omar Ninnotti');
insert into Vendor (name, phone, email, description, owner) values ('Bernier Group', '743-312-7668', 'khallifaxl@google.it', 'Ready-to-eat salad with kale, lemon, and cheese.', 'Keene Hallifax');
insert into Vendor (name, phone, email, description, owner) values ('Lemke, Davis and Schmidt', '141-367-9229', 'ccreenanm@parallels.com', 'Eco-friendly reusable bags for snacks.', 'Chase Creenan');
insert into Vendor (name, phone, email, description, owner) values ('Ritchie, Koss and Ankunding', '752-208-9569', 'hmattosoffn@amazon.co.uk', 'Refreshing sparkling water with lemon and lime flavor', 'Hercules Mattosoff');
insert into Vendor (name, phone, email, description, owner) values ('Sawayn-Grant', '638-354-7191', 'fskillerno@ucoz.com', 'Instant mix for delicious pumpkin spice lattes at home.', 'Fedora Skillern');
insert into Vendor (name, phone, email, description, owner) values ('Aufderhar LLC', '100-377-5035', 'llindellp@diigo.com', 'Non-stick surface for easy cooking and cleaning.', 'Locke Lindell');
insert into Vendor (name, phone, email, description, owner) values ('Berge, Will and Hickle', '317-144-2655', 'qmaccrackenq@dyndns.org', 'Reusable whiteboard for notes and reminders with magnetic backing.', 'Quintus MacCracken');
insert into Vendor (name, phone, email, description, owner) values ('Schuster Group', '936-189-7150', 'mmcr@theguardian.com', 'Creamy almond butter made from roasted almonds.', 'Maximilianus Mc Cahey');
insert into Vendor (name, phone, email, description, owner) values ('Nader-Ward', '270-867-5039', 'wsherebrooks@foxnews.com', 'All ingredients included for delicious chicken fajitas.', 'Westbrook Sherebrook');
insert into Vendor (name, phone, email, description, owner) values ('Keebler, Wilderman and Hessel', '621-974-9506', 'pbrundlet@who.int', 'Dairy-free yogurt made from coconut milk.', 'Peirce Brundle');
insert into Vendor (name, phone, email, description, owner) values ('Macejkovic Group', '909-240-1901', 'jaytonu@ucla.edu', 'Instant pressure cooker with multiple cooking settings.', 'Janeen Ayton');
insert into Vendor (name, phone, email, description, owner) values ('Harvey and Sons', '539-329-0930', 'hdoolev@blogs.com', 'Fiery hot sauce made with fresh habaneros and spices.', 'Hazel Doole');
insert into Vendor (name, phone, email, description, owner) values ('Tillman Group', '565-712-4339', 'tcubbitw@squarespace.com', 'Adjustable phone mount for car dashboard.', 'Templeton Cubbit');
insert into Vendor (name, phone, email, description, owner) values ('Lehner, Renner and Herzog', '933-703-2927', 'mmelax@slideshare.net', 'Storage organizer for art supplies and tools.', 'Miof mela Tumility');
insert into Vendor (name, phone, email, description, owner) values ('Hammes, Roob and Champlin', '804-979-8904', 'ehardmany@usda.gov', 'A tangy sauce made with cranberries and citrus zest, perfect for turkey and chicken dishes.', 'Eada Hardman');
insert into Vendor (name, phone, email, description, owner) values ('Brekke, Kuvalis and Powlowski', '883-689-7456', 'bbillaniez@auda.org.au', 'Soft and chewy bar packed with protein and cinnamon flavors.', 'Bobbie Billanie');
insert into Vendor (name, phone, email, description, owner) values ('Pollich-Mosciski', '951-927-2128', 'gwesthofer10@opera.com', 'Chewy granola bars made with honey and almonds.', 'Galven Westhofer');
insert into Vendor (name, phone, email, description, owner) values ('Lubowitz-McLaughlin', '971-698-8995', 'rpetrovic11@patch.com', 'Crunchy granola clusters, perfect for snacking or topping yogurt.', 'Redford Petrovic');
insert into Vendor (name, phone, email, description, owner) values ('Grimes Inc', '544-189-9655', 'hskellen12@themeforest.net', 'Stylish ripped boyfriend jeans for a relaxed, effortlessly cool vibe.', 'Hart Skellen');
insert into Vendor (name, phone, email, description, owner) values ('Flatley, Sanford and Bechtelar', '599-470-8938', 'bbogart13@stanford.edu', 'Universal mount for smartphones on motorcycles.', 'Billy Bogart');

INSERT INTO vendor_auth (vendor_id, email, password)
SELECT 
    id AS vendor_id,
    email,
    '$2b$10$07UeewLkgDjVTkTJCTU1VONAUR/2XdPYZwBt/..PXaRC0UMjme8lu' AS password
FROM Vendor;

insert into Product (name, description, count, price, vid) values ('Smartphone Tripod', 'Adjustable tripod for smartphones and cameras.', 46, 29.99, 5);
insert into Product (name, description, count, price, vid) values ('Bock Beer Mustard', 'Flavorful mustard with a tangy kick, perfect for hot dogs and sandwiches.', 81, 2.29, 15);
insert into Product (name, description, count, price, vid) values ('Winter Insulated Jacket', 'Warm and stylish jacket for cold weather.', 55, 89.99, 21);
insert into Product (name, description, count, price, vid) values ('Fitness Resistance Bands', 'Set of resistance bands for home workouts.', 38, 29.99, 34);
insert into Product (name, description, count, price, vid) values ('Mini Waffle Maker', 'Compact waffle maker for perfect small waffles.', 51, 24.99, 1);
insert into Product (name, description, count, price, vid) values ('Graphic Tee', 'Soft cotton graphic tee available in various designs.', 58, 19.99, 9);
insert into Product (name, description, count, price, vid) values ('Foam Roller for Muscle Recovery', 'Use this foam roller for effective post-workout recovery.', 33, 29.99, 25);
insert into Product (name, description, count, price, vid) values ('Vegan Mayonnaise', 'Plant-based mayonnaise for a creamy taste.', 83, 4.49, 2);
insert into Product (name, description, count, price, vid) values ('Blackberry Compote', 'Sweet blackberry compote, perfect for topping desserts.', 38, 5.29, 39);
insert into Product (name, description, count, price, vid) values ('Foldable Electric Scooter', 'Compact electric scooter for commuting and short trips.', 96, 349.99, 4);
insert into Product (name, description, count, price, vid) values ('Peanut Butter Banana Smoothie', 'Smooth and creamy smoothie made with peanut butter and banana.', 99, 3.99, 8);
insert into Product (name, description, count, price, vid) values ('Blackberry Compote', 'Sweet blackberry compote, perfect for topping desserts.', 65, 5.29, 35);
insert into Product (name, description, count, price, vid) values ('Lentil Pasta', 'Gluten-free pasta made from lentils, high in protein.', 61, 4.99, 22);
insert into Product (name, description, count, price, vid) values ('Bluetooth Tracker', 'Smart tracker to locate keys or other items via app.', 26, 19.99, 27);
insert into Product (name, description, count, price, vid) values ('Stuffed Bell Peppers', 'Bell peppers stuffed with rice and vegetables', 25, 5.99, 27);
insert into Product (name, description, count, price, vid) values ('Caramelized Onion Dip Mix', 'A mix to create a delicious onion dip for parties or snacking.', 83, 2.29, 2);
insert into Product (name, description, count, price, vid) values ('Canvas Tote Bag', 'Durable canvas tote bag, perfect for everyday use.', 21, 19.99, 1);
insert into Product (name, description, count, price, vid) values ('Rechargeable Laptop Battery Pack', 'Portable battery pack to charge laptops while on the move.', 90, 49.99, 27);
insert into Product (name, description, count, price, vid) values ('Dog Collar', 'Adjustable dog collar with personalized tags.', 40, 15.99, 16);
insert into Product (name, description, count, price, vid) values ('Outdoor Camping Hammock', 'Lightweight and durable hammock for relaxing in nature.', 98, 29.99, 31);
insert into Product (name, description, count, price, vid) values ('Chocolate Covered Pretzels', 'Crunchy pretzels coated in rich chocolate, a sweet treat.', 89, 3.29, 33);
insert into Product (name, description, count, price, vid) values ('Almond Butter Cups', 'Rich chocolate cups filled with almond butter, a delicious treat.', 61, 3.29, 22);
insert into Product (name, description, count, price, vid) values ('Tennis Racket', 'Lightweight tennis racket for beginners and advanced players.', 91, 89.99, 19);
insert into Product (name, description, count, price, vid) values ('Teriyaki Chicken Stir-Fry', 'Frozen stir-fry mix with chicken, veggies, and teriyaki sauce.', 23, 6.99, 10);
insert into Product (name, description, count, price, vid) values ('Handmade Wooden Utensil Set', 'Unique handcrafted utensils for cooking and serving.', 75, 24.99, 23);
insert into Product (name, description, count, price, vid) values ('Quinoa', 'Protein-rich quinoa, a great alternative to rice.', 51, 4.49, 6);
insert into Product (name, description, count, price, vid) values ('Vegetable Fried Rice Mix', 'A quick and easy fried rice mix with colorful veggies and savory seasoning.', 42, 3.99, 36);
insert into Product (name, description, count, price, vid) values ('Matcha Green Tea Powder', 'High-quality matcha for making traditional tea or lattes.', 87, 14.99, 24);
insert into Product (name, description, count, price, vid) values ('Outdoor Adventure Kit', 'Complete outdoor kit for camping and hiking.', 63, 89.99, 7);
insert into Product (name, description, count, price, vid) values ('Vanilla Ice Cream', 'Creamy and rich vanilla ice cream, a classic dessert.', 38, 4.99, 20);
insert into Product (name, description, count, price, vid) values ('Smart Water Bottle with Hydration Reminder', 'Bottle that tracks your water intake and reminds you to drink.', 22, 39.99, 14);
insert into Product (name, description, count, price, vid) values ('Caramel Sauce', 'Rich sauce for desserts and ice cream.', 77, 3.49, 35);
insert into Product (name, description, count, price, vid) values ('Spicy Thai Chili Sauce', 'A sweet and spicy sauce for dipping or cooking.', 47, 3.29, 40);
insert into Product (name, description, count, price, vid) values ('Instant Read Meat Thermometer', 'Fast and accurate thermometer for grilling and cooking.', 96, 24.99, 38);
insert into Product (name, description, count, price, vid) values ('Portable Hammock', 'Lightweight hammock for easy setup anywhere.', 26, 27.99, 13);
insert into Product (name, description, count, price, vid) values ('Foot Massager Machine', 'Electric foot massager for relaxation and relief.', 81, 59.99, 3);
insert into Product (name, description, count, price, vid) values ('Cacao Powder', 'Unsweetened cacao powder for baking and smoothies.', 97, 4.49, 6);
insert into Product (name, description, count, price, vid) values ('Lightweight Rain Jacket', 'Water-resistant jacket ideal for outdoor activities, featuring a packable design.', 90, 79.99, 27);
insert into Product (name, description, count, price, vid) values ('Eco-Friendly Disposable Plates', 'Compostable plates suitable for various occasions.', 36, 22.99, 26);
insert into Product (name, description, count, price, vid) values ('Frozen Salmon Filets', 'Wild-caught salmon filets, perfect for grilling or baking.', 69, 12.99, 6);
insert into Product (name, description, count, price, vid) values ('Multifunctional Baby Bottle Warmer', 'Warmer for heating baby bottles and food jars.', 92, 39.99, 32);
insert into Product (name, description, count, price, vid) values ('Foam Muscle Roller', 'Relieve muscle tension and soreness with this foam roller.', 88, 24.99, 2);
insert into Product (name, description, count, price, vid) values ('Garlic and Herb Cream Cheese', 'Spreadable cream cheese with garlic and herbs.', 48, 3.49, 18);
insert into Product (name, description, count, price, vid) values ('Arcade Game Machine', 'Retro arcade machine for classic gaming.', 28, 299.99, 39);
insert into Product (name, description, count, price, vid) values ('Savory Mushroom Risotto', 'Creamy risotto infused with wild mushrooms.', 90, 6.49, 23);
insert into Product (name, description, count, price, vid) values ('Coffee Maker', 'Single-serve coffee maker with a built-in grinder.', 62, 89.99, 1);
insert into Product (name, description, count, price, vid) values ('Fitness Activity Journal', 'Journal to record workouts and nutrition.', 38, 14.99, 32);
insert into Product (name, description, count, price, vid) values ('Hiking Water Bottle with Filter', '8oz water bottle with built-in filter for clean drinking water.', 48, 29.99, 18);
insert into Product (name, description, count, price, vid) values ('Creamy Coleslaw Mix', 'Shredded cabbage and carrots for coleslaw.', 65, 2.39, 32);
insert into Product (name, description, count, price, vid) values ('Cranberry Citrus Sauce', 'A tangy sauce made with cranberries and citrus zest, perfect for turkey and chicken dishes.', 56, 3.99, 29);
insert into Product (name, description, count, price, vid) values ('Chewy Granola Bars', 'Oats and honey bars with a chewy texture and nutty flavor.', 60, 3.49, 12);
insert into Product (name, description, count, price, vid) values ('Collapsible Storage Crates', 'Space-saving crates for easy organization at home or while traveling.', 91, 18.99, 23);
insert into Product (name, description, count, price, vid) values ('Suede Ankle Booties', 'Chic suede ankle booties, perfect for dressing up or down.', 51, 79.99, 9);
insert into Product (name, description, count, price, vid) values ('Smashed Avocado with Lime', 'A creamy blend of avocados and lime juice, great for spreads or dips.', 65, 2.49, 7);
insert into Product (name, description, count, price, vid) values ('Travel Beach Blanket', 'Sand-resistant and compact for outdoor and beach use.', 66, 29.99, 24);
insert into Product (name, description, count, price, vid) values ('Sliced Cheese', 'Assorted sliced cheese, perfect for sandwiches.', 33, 4.49, 33);
insert into Product (name, description, count, price, vid) values ('Lentil Vegetable Stew', 'Hearty stew made with lentils and mixed vegetables, vegan-friendly.', 50, 4.49, 25);
insert into Product (name, description, count, price, vid) values ('Gaming Headset', 'Comfortable gaming headset with surround sound.', 66, 69.99, 28);
insert into Product (name, description, count, price, vid) values ('Voice-Controlled Speaker', 'Smart speaker with Alexa and music streaming features.', 66, 99.99, 18);
insert into Product (name, description, count, price, vid) values ('Herbal Tea Set', 'Assorted herbal tea bags for relaxation and wellness.', 46, 19.99, 19);
insert into Product (name, description, count, price, vid) values ('Wire Shelving Unit', 'Adjustable shelving unit for home or garage storage.', 69, 69.99, 39);
insert into Product (name, description, count, price, vid) values ('Chocolate Chip Cookie Dough', 'Ready-to-bake cookie dough packed with chocolate chips.', 37, 5.49, 18);
insert into Product (name, description, count, price, vid) values ('Comfortable Jogger Pants', 'Relaxed fit joggers made from soft fleece, ideal for lounging or workouts.', 38, 29.99, 12);
insert into Product (name, description, count, price, vid) values ('Wireless Earbuds', 'True wireless earbuds with touch control.', 41, 69.99, 39);
insert into Product (name, description, count, price, vid) values ('Black Bean Spaghetti', 'High-protein pasta made from black beans, gluten-free.', 21, 3.99, 16);
insert into Product (name, description, count, price, vid) values ('Mini Electric Kettle', 'Quick boiling kettle for small kitchens and dorms.', 41, 29.99, 20);
insert into Product (name, description, count, price, vid) values ('Buttermilk Pancakes', 'Fluffy pancakes with buttermilk flavor.', 74, 3.99, 39);
insert into Product (name, description, count, price, vid) values ('Customizable Name Puzzle', 'Personalized wooden puzzles for children that encourage learning.', 51, 29.99, 37);
insert into Product (name, description, count, price, vid) values ('Kids'' Trampoline', 'Safe and fun trampoline for children.', 56, 139.99, 18);
insert into Product (name, description, count, price, vid) values ('Pasta Sauce Mix', 'Just add water for a quick pasta sauce.', 93, 1.29, 39);
insert into Product (name, description, count, price, vid) values ('Pesto Pasta Salad', 'Cold pasta salad tossed with pesto and fresh vegetables.', 68, 4.99, 9);
insert into Product (name, description, count, price, vid) values ('Vegan Taco Seasoning', 'Spice blend for creating flavorful vegan taco filling.', 38, 2.49, 29);
insert into Product (name, description, count, price, vid) values ('Stainless Steel Water Pitcher', 'Insulated pitcher to keep beverages cold or hot.', 57, 39.99, 19);
insert into Product (name, description, count, price, vid) values ('Tattoo Kit', 'Complete tattoo kit for beginners and professionals.', 96, 99.99, 12);
insert into Product (name, description, count, price, vid) values ('Lemon Herb Grilled Chicken', 'Tender grilled chicken marinated in lemon herbs.', 31, 9.99, 17);
insert into Product (name, description, count, price, vid) values ('Pine Nuts', 'Nutty flavor perfect for pesto and salads.', 61, 7.99, 14);
insert into Product (name, description, count, price, vid) values ('Magnetic Whiteboard', 'Reusable whiteboard for notes and reminders with magnetic backing.', 64, 34.99, 14);
insert into Product (name, description, count, price, vid) values ('Almond Flour Cookies', 'Delicious cookies made with almond flour for a gluten-free treat.', 34, 4.99, 5);
insert into Product (name, description, count, price, vid) values ('Stainless Steel Straws', 'Set of reusable stainless steel straws for drinks.', 90, 12.99, 19);
insert into Product (name, description, count, price, vid) values ('Peach Preserves', 'Sweet and fruity peach preserves, perfect for spreading on toast.', 26, 3.79, 9);
insert into Product (name, description, count, price, vid) values ('Lentil Vegetable Stew', 'Hearty stew made with lentils and mixed vegetables, vegan-friendly.', 54, 4.49, 11);
insert into Product (name, description, count, price, vid) values ('Organic Spinach', 'Fresh organic spinach, great for salads or cooking.', 37, 2.99, 8);
insert into Product (name, description, count, price, vid) values ('Luxury Bath Salts', 'Scented bath salts for relaxation and self-care.', 89, 19.99, 13);
insert into Product (name, description, count, price, vid) values ('Indian Curry Sauce', 'Authentic Indian curry sauce for quick meals.', 72, 3.69, 11);
insert into Product (name, description, count, price, vid) values ('Casual Long Cardigan', 'A cozy long cardigan designed for layering in any season.', 89, 45.99, 4);
insert into Product (name, description, count, price, vid) values ('Vanilla Bean Greek Yogurt', 'Smooth Greek yogurt infused with vanilla bean flavor.', 79, 1.99, 39);
insert into Product (name, description, count, price, vid) values ('Canned Sardines', 'Savory sardines packed in olive oil.', 32, 3.29, 4);
insert into Product (name, description, count, price, vid) values ('Insulated Cooler', 'Leak-proof cooler bag ideal for picnics and camping.', 62, 39.99, 17);
insert into Product (name, description, count, price, vid) values ('Chili Lime Corn Chips', 'Crunchy corn chips flavored with chili and lime for a zesty kick.', 73, 2.79, 21);
insert into Product (name, description, count, price, vid) values ('Kettle BBQ Grill', 'Charcoal kettle grill perfect for backyard barbecues.', 32, 99.99, 30);
insert into Product (name, description, count, price, vid) values ('Pet Water Fountain', 'Automatic water fountain for pets with filtration.', 84, 39.99, 1);
insert into Product (name, description, count, price, vid) values ('Wooden Children''s Play Kitchen', 'Interactive kitchen set for imaginative play.', 25, 129.99, 3);
insert into Product (name, description, count, price, vid) values ('Decorative LED Neon Sign', 'Bright, vibrant sign to add flair to any space.', 92, 45.99, 35);
insert into Product (name, description, count, price, vid) values ('Thai Green Curry Paste', 'A rich curry paste for making authentic Thai green curry at home.', 29, 2.49, 30);
insert into Product (name, description, count, price, vid) values ('Pet Camera with Treat Dispenser', 'Monitor and interact with your pet remotely with this camera.', 46, 149.99, 22);
insert into Product (name, description, count, price, vid) values ('Personal Blender with Travel Cup', 'Blender for smoothies with a portable cup.', 97, 39.99, 38);
insert into Product (name, description, count, price, vid) values ('Digital Bullet Journal', 'Stylish digital journaling app for notes and organizing tasks.', 96, 24.99, 14);
insert into Product (name, description, count, price, vid) values ('Raspberry Lemonade Mix', 'A refreshing drink mix that combines sweet raspberries and tart lemons, perfect for summer.', 83, 3.99, 18);
insert into Product (name, description, count, price, vid) values ('Fitness Jump Box', 'Durable and adjustable jump box for effective workouts.', 42, 69.99, 4);
insert into Product (name, description, count, price, vid) values ('High-Quality Yoga Block', 'Foam yoga block for enhancing poses and stability.', 66, 12.99, 1);
insert into Product (name, description, count, price, vid) values ('Honey Roasted Peanuts', 'Crunchy peanuts coated in honey, perfect for snacking.', 95, 3.19, 12);
insert into Product (name, description, count, price, vid) values ('Noise-Canceling Headphones', 'High-quality headphones that block out external noise for immersive listening.', 62, 119.99, 31);
insert into Product (name, description, count, price, vid) values ('Smart Scale', 'Wi-Fi smart scale for tracking weight and BMI.', 48, 59.99, 33);
insert into Product (name, description, count, price, vid) values ('Coconut Rice', 'Fluffy rice cooked with coconut milk for a tropical twist.', 72, 2.29, 12);
insert into Product (name, description, count, price, vid) values ('Electric Toothbrush Holder', 'Sanitary holder that ensures your toothbrush stays clean.', 51, 14.99, 17);
insert into Product (name, description, count, price, vid) values ('Cheesy Cauliflower Bake', 'A frozen cheesy bake made with cauliflower, great as a side dish or a vegetarian meal.', 50, 5.49, 32);
insert into Product (name, description, count, price, vid) values ('Spinach and Feta Wraps', 'Whole wheat wraps filled with spinach and feta cheese.', 49, 4.99, 34);
insert into Product (name, description, count, price, vid) values ('Casual Long Cardigan', 'A cozy long cardigan designed for layering in any season.', 68, 45.99, 8);
insert into Product (name, description, count, price, vid) values ('Teriyaki Sauce', 'Sweet and savory sauce for marinating and glazing meats or vegetables.', 72, 2.99, 21);
insert into Product (name, description, count, price, vid) values ('Blueberry Chia Jam', 'Homemade jam made with blueberries and chia seeds, no added sugar.', 53, 4.99, 22);
insert into Product (name, description, count, price, vid) values ('Nutritional Yeast', 'A healthy vegan cheese alternative packed with nutrients and flavor.', 94, 3.59, 15);
insert into Product (name, description, count, price, vid) values ('Lemon Garlic Shrimp', 'Marinated shrimp in a garlic and lemon sauce, perfect for grilling.', 99, 8.99, 37);
insert into Product (name, description, count, price, vid) values ('Basic V-Neck T-Shirt', 'A staple v-neck t-shirt that pairs well with anything.', 97, 19.99, 28);
insert into Product (name, description, count, price, vid) values ('Handcrafted Wooden Coasters', 'Set of unique wooden coasters for drinks and decor.', 55, 19.99, 2);
insert into Product (name, description, count, price, vid) values ('Adjustable Standing Desk', 'Ergonomic desk that adjusts height for standing or sitting.', 82, 299.99, 24);
insert into Product (name, description, count, price, vid) values ('Cream Cheese', 'Smooth and creamy, ideal for spreads or baking.', 48, 2.69, 6);
insert into Product (name, description, count, price, vid) values ('Cotton Tote Bag Set', 'Reusable tote bags for shopping and eco-friendly living.', 54, 29.99, 35);
insert into Product (name, description, count, price, vid) values ('Cotton Quilted Throw Blanket', 'Cozy throw blanket perfect for adding warmth to your home.', 83, 39.99, 25);
insert into Product (name, description, count, price, vid) values ('Lentil Vegetable Curry', 'A flavorful lentil curry cooked with vegetables and spices.', 27, 4.49, 4);
insert into Product (name, description, count, price, vid) values ('Pepperoni Pizza Roll-Ups', 'Savory pizza filled with pepperoni and cheese, ready to microwave.', 48, 5.99, 27);
insert into Product (name, description, count, price, vid) values ('Eco-Friendly Notepad', 'Notepad made from recycled paper for sustainable note-taking.', 82, 8.99, 27);
insert into Product (name, description, count, price, vid) values ('Luminous Night Light', 'Soft glow night light for children''s rooms or bedside.', 58, 15.99, 11);
insert into Product (name, description, count, price, vid) values ('Banana Chips', 'Crunchy and sweet banana chips, a great on-the-go snack.', 76, 1.99, 2);
insert into Product (name, description, count, price, vid) values ('Honey mustard chicken tenders', 'Golden crispy chicken tenders coated with honey mustard flavor.', 69, 7.99, 40);
insert into Product (name, description, count, price, vid) values ('Coconut Lime Rice', 'Flavorful rice mixed with coconut and lime, a tropical side dish.', 99, 2.99, 6);
insert into Product (name, description, count, price, vid) values ('Cheese Stuffed Jalapenos', 'Spicy jalapenos stuffed with cheese, ideal for appetizers.', 21, 5.99, 9);
insert into Product (name, description, count, price, vid) values ('Chocolate Covered Pretzels', 'Crunchy pretzels coated in rich chocolate, a sweet treat.', 31, 3.29, 27);
insert into Product (name, description, count, price, vid) values ('Coconut Oil Spray', 'A zero-calorie coconut oil spray for cooking and baking.', 59, 4.99, 23);
insert into Product (name, description, count, price, vid) values ('Tuscan Bean Soup', 'A hearty mix of beans in a flavorful tomato broth.', 30, 2.49, 32);
insert into Product (name, description, count, price, vid) values ('Handmade Leather Wallet', 'High-quality leather wallet with multiple compartments.', 41, 49.99, 20);
insert into Product (name, description, count, price, vid) values ('Rice Cakes', 'Light and crispy rice cakes, a perfect low-calorie snack.', 23, 2.29, 14);
insert into Product (name, description, count, price, vid) values ('Folding Exercise Bike', 'Space-saving bike for indoor workouts.', 77, 199.99, 21);
insert into Product (name, description, count, price, vid) values ('Car Phone Mount', 'Adjustable phone mount for car dashboard.', 51, 15.99, 22);
insert into Product (name, description, count, price, vid) values ('Acoustic Guitar', 'Beginner-friendly acoustic guitar with natural finish.', 42, 199.99, 20);
insert into Product (name, description, count, price, vid) values ('Window Bird Feeder with Suction Cups', 'Clear feeder that attaches to windows for bird watching.', 56, 28.99, 22);
insert into Product (name, description, count, price, vid) values ('Gingerbread House Kit', 'Everything you need to build a festive gingerbread house.', 86, 6.99, 1);
insert into Product (name, description, count, price, vid) values ('Crispy Chickpeas', 'Roasted chickpeas seasoned for a crunchy snack.', 60, 2.99, 7);
insert into Product (name, description, count, price, vid) values ('Toilet Paper (12 rolls)', 'Soft and strong toilet paper for everyday use.', 33, 8.99, 13);
insert into Product (name, description, count, price, vid) values ('Caramel Sauce', 'Rich sauce for desserts and ice cream.', 87, 3.49, 2);
insert into Product (name, description, count, price, vid) values ('Indestructible Dog Toy', 'Durable toy designed for heavy chewers.', 51, 15.99, 16);
insert into Product (name, description, count, price, vid) values ('Kids'' Science Experiment Kit', 'Engaging kit with science experiments for children.', 50, 29.99, 7);
insert into Product (name, description, count, price, vid) values ('Portable Bluetooth Keyboard', 'Compact keyboard for tablets and smartphones.', 75, 39.99, 35);
insert into Product (name, description, count, price, vid) values ('Cranberry Lime Sparkling Water', 'Refreshing sparkling water infused with cranberry and lime flavors.', 80, 1.5, 30);
insert into Product (name, description, count, price, vid) values ('Chicken Sausage', 'Flavorful chicken sausage, low in fat and fully cooked.', 95, 6.99, 18);
insert into Product (name, description, count, price, vid) values ('Weighted Blanket', 'Therapeutic weighted blanket for better sleep.', 49, 79.99, 29);
insert into Product (name, description, count, price, vid) values ('Corn Tortillas', 'Soft and warm corn tortillas, perfect for tacos and burritos.', 26, 2.49, 9);
insert into Product (name, description, count, price, vid) values ('Raspberry Vanilla Greek Yogurt', 'Creamy Greek yogurt infused with raspberry and vanilla flavors.', 38, 3.49, 19);
insert into Product (name, description, count, price, vid) values ('Chocolate Raspberry Tart', 'Rich tart filled with chocolate and raspberry, a gourmet dessert.', 55, 9.99, 1);
insert into Product (name, description, count, price, vid) values ('Garlic and Herb Rub', 'A seasoning blend of garlic and herbs to enhance any dish.', 33, 2.29, 8);
insert into Product (name, description, count, price, vid) values ('Elegant Maxi Skirt', 'Float through the day in this beautiful floor-length skirt.', 98, 44.99, 12);
insert into Product (name, description, count, price, vid) values ('Adjustable Pet Feeder', 'Convenient feeder that adjusts to your pet''s height.', 64, 39.99, 21);
insert into Product (name, description, count, price, vid) values ('Lentil Pasta', 'Gluten-free pasta made from lentils, high in protein.', 72, 4.99, 18);
insert into Product (name, description, count, price, vid) values ('Watercolor Brush Pens', 'Set of brush pens for colorful and creative painting.', 25, 19.99, 37);
insert into Product (name, description, count, price, vid) values ('Coconut Cream Pie', 'Delicious pie filled with coconut cream and topped with whipped cream.', 69, 9.49, 3);
insert into Product (name, description, count, price, vid) values ('Cinnamon Sugar Tortilla Chips', 'Crispy chips with a sweet twist, perfect for dipping.', 57, 3.29, 1);
insert into Product (name, description, count, price, vid) values ('Adjustable Laptop Desk', 'Portable desk that can be adjusted for sitting or standing.', 95, 59.99, 24);
insert into Product (name, description, count, price, vid) values ('Smart LED Desk Lamp', 'Adjustable lamp with multiple brightness levels and colors.', 85, 39.99, 35);
insert into Product (name, description, count, price, vid) values ('Floral Summer Dress', 'Light and breezy dress perfect for summer outings with a vibrant floral pattern.', 79, 39.99, 36);
insert into Product (name, description, count, price, vid) values ('Marinara Sauce', 'Classic marinara sauce for all pasta dishes.', 60, 3.49, 30);
insert into Product (name, description, count, price, vid) values ('Almond Milk Yogurt', 'Creamy yogurt made from almond milk, vegan-friendly.', 69, 1.99, 10);
insert into Product (name, description, count, price, vid) values ('Raspberry Lemonade Mix', 'A refreshing drink mix that combines sweet raspberries and tart lemons, perfect for summer.', 64, 3.99, 35);
insert into Product (name, description, count, price, vid) values ('Ready-to-Eat Chili', 'Spicy chili in a can, ready to eat for a filling meal.', 27, 2.99, 39);
insert into Product (name, description, count, price, vid) values ('Tomato Paste', 'Concentrated tomato paste, great for sauces.', 21, 1.29, 25);
insert into Product (name, description, count, price, vid) values ('Sweet Chili Sauce', 'A sweet and spicy sauce, great for dipping or cooking.', 88, 2.99, 36);
insert into Product (name, description, count, price, vid) values ('Chocolate Peanut Butter Cups', 'Delicious dark chocolate cups filled with creamy peanut butter.', 35, 2.29, 40);
insert into Product (name, description, count, price, vid) values ('Portable Pet Bathing Tool', 'Handheld sprayer designed for washing pets easily.', 60, 29.99, 25);
insert into Product (name, description, count, price, vid) values ('Slim Wallet', 'RFID-blocking slim wallet for cards and cash.', 29, 24.99, 24);
insert into Product (name, description, count, price, vid) values ('Oatmeal Raisin Cookies', 'Delicious cookies packed with oats and raisins.', 83, 3.49, 40);
insert into Product (name, description, count, price, vid) values ('Buffalo Chicken Dip', 'Spicy and creamy dip made with shredded chicken, perfect for parties.', 100, 5.99, 13);
insert into Product (name, description, count, price, vid) values ('Sushi Roll Kit', 'All ingredients needed to make your own sushi', 73, 9.99, 23);
insert into Product (name, description, count, price, vid) values ('Wireless Security System', 'Comprehensive camera and alert system for home security.', 64, 299.99, 16);
insert into Product (name, description, count, price, vid) values ('Peach Slices in Syrup', 'Sweet and tender peach slices preserved in syrup, great for desserts.', 99, 2.59, 12);
insert into Product (name, description, count, price, vid) values ('Laptop Sleeve', 'Padded laptop sleeve for protection against scratches.', 21, 24.99, 2);
insert into Product (name, description, count, price, vid) values ('Peanut Butter Chocolate Chip Bars', 'Chewy bars made with peanut butter and chocolate chips.', 91, 4.59, 38);
insert into Product (name, description, count, price, vid) values ('Vegan Chickpea Salad', 'Healthy salad made with chickpeas, vegetables, and a lemon dressing.', 55, 3.99, 31);
insert into Product (name, description, count, price, vid) values ('Cable Knit Cardigan', 'Cozy cable knit cardigan to layer during chilly evenings.', 62, 49.99, 25);
insert into Product (name, description, count, price, vid) values ('Portable Water Filter', 'Lightweight water filter for outdoor adventures.', 86, 29.99, 22);
insert into Product (name, description, count, price, vid) values ('Camping Tent', 'Spacious 2-person camping tent with waterproof cover.', 85, 79.99, 4);
insert into Product (name, description, count, price, vid) values ('Cat Tree', 'Multi-level cat tree for climbing and scratching.', 100, 99.99, 38);
insert into Product (name, description, count, price, vid) values ('Sushi Rice', 'Short-grain sushi rice for perfect rolls.', 81, 3.99, 5);

insert into Sale (id, discount) values (1, 6.27);
insert into Sale (id, discount) values (2, 15.27);
insert into Sale (id, discount) values (3, 8.38);
insert into Sale (id, discount) values (4, 7.11);
insert into Sale (id, discount) values (5, 8.18);
insert into Sale (id, discount) values (6, 12.06);
insert into Sale (id, discount) values (7, 10.97);
insert into Sale (id, discount) values (8, 11.75);
insert into Sale (id, discount) values (9, 19.62);
insert into Sale (id, discount) values (10, 17.52);
insert into Sale (id, discount) values (11, 16.23);
insert into Sale (id, discount) values (12, 7.69);
insert into Sale (id, discount) values (13, 18.83);
insert into Sale (id, discount) values (14, 5.2);
insert into Sale (id, discount) values (15, 17.85);
insert into Sale (id, discount) values (16, 15.85);
insert into Sale (id, discount) values (17, 17.52);
insert into Sale (id, discount) values (18, 4.95);
insert into Sale (id, discount) values (19, 16.65);
insert into Sale (id, discount) values (20, 17.59);
insert into Sale (id, discount) values (21, 8.8);
insert into Sale (id, discount) values (22, 16.99);
insert into Sale (id, discount) values (23, 6.82);
insert into Sale (id, discount) values (24, 10.11);
insert into Sale (id, discount) values (25, 7.86);
insert into Sale (id, discount) values (26, 8.48);
insert into Sale (id, discount) values (27, 17.88);
insert into Sale (id, discount) values (28, 3.4);
insert into Sale (id, discount) values (29, 4.26);
insert into Sale (id, discount) values (30, 16.25);
insert into Sale (id, discount) values (31, 12.03);
insert into Sale (id, discount) values (32, 2.62);
insert into Sale (id, discount) values (33, 18.6);
insert into Sale (id, discount) values (34, 2.68);
insert into Sale (id, discount) values (35, 17.64);
insert into Sale (id, discount) values (36, 8.94);
insert into Sale (id, discount) values (37, 18.04);
insert into Sale (id, discount) values (38, 7.18);
insert into Sale (id, discount) values (39, 4.26);
insert into Sale (id, discount) values (40, 12.17);
insert into Sale (id, discount) values (41, 18.98);
insert into Sale (id, discount) values (42, 16.68);
insert into Sale (id, discount) values (43, 16.49);
insert into Sale (id, discount) values (44, 10.33);
insert into Sale (id, discount) values (45, 2.4);
insert into Sale (id, discount) values (46, 17.68);
insert into Sale (id, discount) values (47, 14.14);
insert into Sale (id, discount) values (48, 3.05);
insert into Sale (id, discount) values (49, 6.58);
insert into Sale (id, discount) values (50, 18.97);
insert into Sale (id, discount) values (51, 10.2);
insert into Sale (id, discount) values (52, 19.25);
insert into Sale (id, discount) values (53, 18.34);
insert into Sale (id, discount) values (54, 13.1);
insert into Sale (id, discount) values (55, 9.33);
insert into Sale (id, discount) values (56, 9.03);
insert into Sale (id, discount) values (57, 5.35);
insert into Sale (id, discount) values (58, 15.83);
insert into Sale (id, discount) values (59, 13.1);
insert into Sale (id, discount) values (60, 16.08);
insert into Sale (id, discount) values (61, 14.59);
insert into Sale (id, discount) values (62, 19.92);
insert into Sale (id, discount) values (63, 10.13);
insert into Sale (id, discount) values (64, 19.65);
insert into Sale (id, discount) values (65, 1.87);
insert into Sale (id, discount) values (66, 15.5);
insert into Sale (id, discount) values (67, 19.69);
insert into Sale (id, discount) values (68, 15.94);
insert into Sale (id, discount) values (69, 8.32);
insert into Sale (id, discount) values (70, 10.43);
insert into Sale (id, discount) values (71, 6.36);
insert into Sale (id, discount) values (72, 8.92);
insert into Sale (id, discount) values (73, 4.38);
insert into Sale (id, discount) values (74, 19.88);
insert into Sale (id, discount) values (75, 11.8);
insert into Sale (id, discount) values (76, 19.86);
insert into Sale (id, discount) values (77, 7.28);
insert into Sale (id, discount) values (78, 1.95);
insert into Sale (id, discount) values (79, 8.48);
insert into Sale (id, discount) values (80, 8.04);
insert into Sale (id, discount) values (81, 17.99);
insert into Sale (id, discount) values (82, 5.48);
insert into Sale (id, discount) values (83, 15.59);
insert into Sale (id, discount) values (84, 11.56);
insert into Sale (id, discount) values (85, 6.84);
insert into Sale (id, discount) values (86, 2.77);
insert into Sale (id, discount) values (87, 14.82);
insert into Sale (id, discount) values (88, 5.84);
insert into Sale (id, discount) values (89, 2.66);
insert into Sale (id, discount) values (90, 4.44);
insert into Sale (id, discount) values (91, 7.72);
insert into Sale (id, discount) values (92, 3.67);
insert into Sale (id, discount) values (93, 12.4);
insert into Sale (id, discount) values (94, 13.75);
insert into Sale (id, discount) values (95, 12.04);
insert into Sale (id, discount) values (96, 19.71);
insert into Sale (id, discount) values (97, 2.7);
insert into Sale (id, discount) values (98, 17.1);
insert into Sale (id, discount) values (99, 16.96);
insert into Sale (id, discount) values (100, 4.5);

insert into SaleItem (pid, sid, quantity) values (51, 63, 2);
insert into SaleItem (pid, sid, quantity) values (32, 77, 4);
insert into SaleItem (pid, sid, quantity) values (8, 54, 8);
insert into SaleItem (pid, sid, quantity) values (144, 82, 4);
insert into SaleItem (pid, sid, quantity) values (98, 50, 10);
insert into SaleItem (pid, sid, quantity) values (76, 53, 6);
insert into SaleItem (pid, sid, quantity) values (172, 42, 9);
insert into SaleItem (pid, sid, quantity) values (12, 91, 7);
insert into SaleItem (pid, sid, quantity) values (110, 67, 8);
insert into SaleItem (pid, sid, quantity) values (19, 79, 2);
insert into SaleItem (pid, sid, quantity) values (43, 79, 8);
insert into SaleItem (pid, sid, quantity) values (169, 53, 3);
insert into SaleItem (pid, sid, quantity) values (120, 67, 10);
insert into SaleItem (pid, sid, quantity) values (64, 60, 3);
insert into SaleItem (pid, sid, quantity) values (111, 18, 2);
insert into SaleItem (pid, sid, quantity) values (25, 62, 9);
insert into SaleItem (pid, sid, quantity) values (118, 14, 3);
insert into SaleItem (pid, sid, quantity) values (130, 78, 6);
insert into SaleItem (pid, sid, quantity) values (17, 61, 10);
insert into SaleItem (pid, sid, quantity) values (123, 99, 1);
insert into SaleItem (pid, sid, quantity) values (71, 88, 3);
insert into SaleItem (pid, sid, quantity) values (26, 38, 8);
insert into SaleItem (pid, sid, quantity) values (7, 81, 3);
insert into SaleItem (pid, sid, quantity) values (51, 25, 3);
insert into SaleItem (pid, sid, quantity) values (101, 79, 10);
insert into SaleItem (pid, sid, quantity) values (174, 57, 2);
insert into SaleItem (pid, sid, quantity) values (49, 30, 6);
insert into SaleItem (pid, sid, quantity) values (74, 8, 9);
insert into SaleItem (pid, sid, quantity) values (116, 64, 6);
insert into SaleItem (pid, sid, quantity) values (161, 51, 1);
insert into SaleItem (pid, sid, quantity) values (112, 98, 6);
insert into SaleItem (pid, sid, quantity) values (14, 43, 5);
insert into SaleItem (pid, sid, quantity) values (61, 47, 4);
insert into SaleItem (pid, sid, quantity) values (52, 81, 9);
insert into SaleItem (pid, sid, quantity) values (132, 99, 5);
insert into SaleItem (pid, sid, quantity) values (154, 55, 8);
insert into SaleItem (pid, sid, quantity) values (86, 82, 9);
insert into SaleItem (pid, sid, quantity) values (10, 14, 5);
insert into SaleItem (pid, sid, quantity) values (143, 33, 3);
insert into SaleItem (pid, sid, quantity) values (137, 9, 9);
insert into SaleItem (pid, sid, quantity) values (80, 59, 5);
insert into SaleItem (pid, sid, quantity) values (169, 39, 1);
insert into SaleItem (pid, sid, quantity) values (103, 3, 4);
insert into SaleItem (pid, sid, quantity) values (50, 3, 10);
insert into SaleItem (pid, sid, quantity) values (24, 33, 4);
insert into SaleItem (pid, sid, quantity) values (15, 9, 6);
insert into SaleItem (pid, sid, quantity) values (65, 27, 7);
insert into SaleItem (pid, sid, quantity) values (6, 95, 5);
insert into SaleItem (pid, sid, quantity) values (111, 29, 10);
insert into SaleItem (pid, sid, quantity) values (72, 20, 7);
insert into SaleItem (pid, sid, quantity) values (129, 6, 9);
insert into SaleItem (pid, sid, quantity) values (71, 17, 5);
insert into SaleItem (pid, sid, quantity) values (40, 77, 4);
insert into SaleItem (pid, sid, quantity) values (166, 10, 9);
insert into SaleItem (pid, sid, quantity) values (53, 19, 9);
insert into SaleItem (pid, sid, quantity) values (33, 38, 8);
insert into SaleItem (pid, sid, quantity) values (77, 98, 6);
insert into SaleItem (pid, sid, quantity) values (136, 24, 5);
insert into SaleItem (pid, sid, quantity) values (129, 80, 6);
insert into SaleItem (pid, sid, quantity) values (26, 22, 9);
insert into SaleItem (pid, sid, quantity) values (23, 68, 9);
insert into SaleItem (pid, sid, quantity) values (136, 52, 9);
insert into SaleItem (pid, sid, quantity) values (105, 83, 8);
insert into SaleItem (pid, sid, quantity) values (129, 59, 9);
insert into SaleItem (pid, sid, quantity) values (7, 56, 7);
insert into SaleItem (pid, sid, quantity) values (45, 49, 2);
insert into SaleItem (pid, sid, quantity) values (57, 16, 9);
insert into SaleItem (pid, sid, quantity) values (70, 23, 1);
insert into SaleItem (pid, sid, quantity) values (176, 80, 3);
insert into SaleItem (pid, sid, quantity) values (16, 84, 2);
insert into SaleItem (pid, sid, quantity) values (170, 7, 8);
insert into SaleItem (pid, sid, quantity) values (88, 36, 3);
insert into SaleItem (pid, sid, quantity) values (105, 70, 2);
insert into SaleItem (pid, sid, quantity) values (4, 79, 10);
insert into SaleItem (pid, sid, quantity) values (180, 29, 6);
insert into SaleItem (pid, sid, quantity) values (158, 79, 4);
insert into SaleItem (pid, sid, quantity) values (151, 26, 9);
insert into SaleItem (pid, sid, quantity) values (2, 22, 4);
insert into SaleItem (pid, sid, quantity) values (35, 16, 4);
insert into SaleItem (pid, sid, quantity) values (37, 59, 9);
insert into SaleItem (pid, sid, quantity) values (107, 11, 7);
insert into SaleItem (pid, sid, quantity) values (148, 48, 5);
insert into SaleItem (pid, sid, quantity) values (24, 1, 9);
insert into SaleItem (pid, sid, quantity) values (3, 89, 10);
insert into SaleItem (pid, sid, quantity) values (62, 41, 7);
insert into SaleItem (pid, sid, quantity) values (172, 59, 4);
insert into SaleItem (pid, sid, quantity) values (114, 78, 2);
insert into SaleItem (pid, sid, quantity) values (162, 32, 9);
insert into SaleItem (pid, sid, quantity) values (77, 10, 10);
insert into SaleItem (pid, sid, quantity) values (23, 8, 5);
insert into SaleItem (pid, sid, quantity) values (150, 94, 5);
insert into SaleItem (pid, sid, quantity) values (12, 12, 6);
insert into SaleItem (pid, sid, quantity) values (72, 64, 8);
insert into SaleItem (pid, sid, quantity) values (45, 88, 6);
insert into SaleItem (pid, sid, quantity) values (109, 29, 4);
insert into SaleItem (pid, sid, quantity) values (132, 55, 7);
insert into SaleItem (pid, sid, quantity) values (40, 57, 2);
insert into SaleItem (pid, sid, quantity) values (127, 100, 2);
insert into SaleItem (pid, sid, quantity) values (14, 30, 6);
insert into SaleItem (pid, sid, quantity) values (120, 78, 7);
insert into SaleItem (pid, sid, quantity) values (58, 95, 5);
insert into SaleItem (pid, sid, quantity) values (22, 26, 8);
insert into SaleItem (pid, sid, quantity) values (15, 41, 10);
insert into SaleItem (pid, sid, quantity) values (35, 70, 3);
insert into SaleItem (pid, sid, quantity) values (127, 87, 10);
insert into SaleItem (pid, sid, quantity) values (124, 7, 3);
insert into SaleItem (pid, sid, quantity) values (57, 57, 6);
insert into SaleItem (pid, sid, quantity) values (50, 34, 10);
insert into SaleItem (pid, sid, quantity) values (16, 80, 5);
insert into SaleItem (pid, sid, quantity) values (98, 38, 9);
insert into SaleItem (pid, sid, quantity) values (132, 30, 5);
insert into SaleItem (pid, sid, quantity) values (16, 28, 10);
insert into SaleItem (pid, sid, quantity) values (124, 25, 6);
insert into SaleItem (pid, sid, quantity) values (33, 72, 1);
insert into SaleItem (pid, sid, quantity) values (133, 22, 1);
insert into SaleItem (pid, sid, quantity) values (120, 65, 5);
insert into SaleItem (pid, sid, quantity) values (12, 30, 2);
insert into SaleItem (pid, sid, quantity) values (156, 73, 2);
insert into SaleItem (pid, sid, quantity) values (131, 19, 1);
insert into SaleItem (pid, sid, quantity) values (99, 12, 7);
insert into SaleItem (pid, sid, quantity) values (87, 77, 4);
insert into SaleItem (pid, sid, quantity) values (50, 99, 5);
insert into SaleItem (pid, sid, quantity) values (120, 8, 8);
insert into SaleItem (pid, sid, quantity) values (45, 72, 6);
insert into SaleItem (pid, sid, quantity) values (169, 27, 2);
insert into SaleItem (pid, sid, quantity) values (174, 26, 5);
insert into SaleItem (pid, sid, quantity) values (125, 15, 3);
insert into SaleItem (pid, sid, quantity) values (173, 26, 5);
insert into SaleItem (pid, sid, quantity) values (129, 46, 7);
insert into SaleItem (pid, sid, quantity) values (70, 4, 8);
insert into SaleItem (pid, sid, quantity) values (65, 85, 6);
insert into SaleItem (pid, sid, quantity) values (114, 62, 2);
insert into SaleItem (pid, sid, quantity) values (58, 90, 8);
insert into SaleItem (pid, sid, quantity) values (159, 69, 3);
insert into SaleItem (pid, sid, quantity) values (115, 4, 4);
insert into SaleItem (pid, sid, quantity) values (15, 45, 8);
insert into SaleItem (pid, sid, quantity) values (33, 68, 6);
insert into SaleItem (pid, sid, quantity) values (9, 73, 10);
insert into SaleItem (pid, sid, quantity) values (97, 19, 1);
insert into SaleItem (pid, sid, quantity) values (59, 52, 1);
insert into SaleItem (pid, sid, quantity) values (118, 45, 1);
insert into SaleItem (pid, sid, quantity) values (100, 98, 10);
insert into SaleItem (pid, sid, quantity) values (107, 36, 4);
insert into SaleItem (pid, sid, quantity) values (151, 46, 2);
insert into SaleItem (pid, sid, quantity) values (8, 19, 3);
insert into SaleItem (pid, sid, quantity) values (36, 80, 1);
insert into SaleItem (pid, sid, quantity) values (96, 20, 1);
insert into SaleItem (pid, sid, quantity) values (112, 65, 6);
insert into SaleItem (pid, sid, quantity) values (137, 82, 2);
insert into SaleItem (pid, sid, quantity) values (95, 54, 6);
insert into SaleItem (pid, sid, quantity) values (135, 93, 6);
insert into SaleItem (pid, sid, quantity) values (89, 63, 1);
insert into SaleItem (pid, sid, quantity) values (5, 97, 10);
insert into SaleItem (pid, sid, quantity) values (76, 24, 8);
insert into SaleItem (pid, sid, quantity) values (72, 67, 3);
insert into SaleItem (pid, sid, quantity) values (96, 81, 4);
insert into SaleItem (pid, sid, quantity) values (77, 4, 10);
insert into SaleItem (pid, sid, quantity) values (135, 5, 7);
insert into SaleItem (pid, sid, quantity) values (175, 98, 8);
insert into SaleItem (pid, sid, quantity) values (177, 33, 8);
insert into SaleItem (pid, sid, quantity) values (25, 39, 6);
insert into SaleItem (pid, sid, quantity) values (33, 35, 5);
insert into SaleItem (pid, sid, quantity) values (19, 64, 2);
insert into SaleItem (pid, sid, quantity) values (177, 52, 4);
insert into SaleItem (pid, sid, quantity) values (26, 75, 5);
insert into SaleItem (pid, sid, quantity) values (136, 81, 5);
insert into SaleItem (pid, sid, quantity) values (61, 67, 8);
insert into SaleItem (pid, sid, quantity) values (150, 48, 5);
insert into SaleItem (pid, sid, quantity) values (28, 62, 7);
insert into SaleItem (pid, sid, quantity) values (66, 2, 3);
insert into SaleItem (pid, sid, quantity) values (52, 65, 5);
insert into SaleItem (pid, sid, quantity) values (146, 93, 10);
insert into SaleItem (pid, sid, quantity) values (129, 76, 4);
insert into SaleItem (pid, sid, quantity) values (55, 7, 10);
insert into SaleItem (pid, sid, quantity) values (21, 36, 1);
insert into SaleItem (pid, sid, quantity) values (134, 15, 2);
insert into SaleItem (pid, sid, quantity) values (59, 55, 2);
insert into SaleItem (pid, sid, quantity) values (56, 50, 6);
insert into SaleItem (pid, sid, quantity) values (154, 58, 3);
insert into SaleItem (pid, sid, quantity) values (176, 99, 7);
insert into SaleItem (pid, sid, quantity) values (75, 2, 8);
insert into SaleItem (pid, sid, quantity) values (55, 23, 10);
insert into SaleItem (pid, sid, quantity) values (104, 92, 9);
insert into SaleItem (pid, sid, quantity) values (57, 32, 1);
insert into SaleItem (pid, sid, quantity) values (49, 90, 8);
insert into SaleItem (pid, sid, quantity) values (54, 37, 7);
insert into SaleItem (pid, sid, quantity) values (178, 88, 2);
insert into SaleItem (pid, sid, quantity) values (9, 56, 3);
insert into SaleItem (pid, sid, quantity) values (179, 38, 1);
insert into SaleItem (pid, sid, quantity) values (175, 56, 5);
insert into SaleItem (pid, sid, quantity) values (170, 56, 1);
insert into SaleItem (pid, sid, quantity) values (75, 51, 9);
insert into SaleItem (pid, sid, quantity) values (25, 10, 8);
insert into SaleItem (pid, sid, quantity) values (115, 33, 5);
insert into SaleItem (pid, sid, quantity) values (34, 75, 6);
insert into SaleItem (pid, sid, quantity) values (17, 69, 2);
insert into SaleItem (pid, sid, quantity) values (166, 44, 6);
insert into SaleItem (pid, sid, quantity) values (126, 60, 2);
insert into SaleItem (pid, sid, quantity) values (35, 24, 5);
insert into SaleItem (pid, sid, quantity) values (166, 72, 8);



INSERT INTO Booth (id, xcor, ycor) VALUES
(1, 10.00, 10.00),
(2, 15.00, 10.00),
(3, 20.00, 10.00),
(4, 10.00, 15.00),
(5, 15.00, 15.00),
(6, 20.00, 15.00),
(7, 10.00, 20.00),
(8, 15.00, 20.00),
(9, 20.00, 20.00);


insert into Reservation (vid, bid, date, duration) values (7, 8, '2025-12-09 11:00:00', 3);
insert into Reservation (vid, bid, date, duration) values (2, 3, '2025-12-18 11:00:00', 5);
insert into Reservation (vid, bid, date, duration) values (5, 5, '2025-12-06 13:00:00', 3);
insert into Reservation (vid, bid, date, duration) values (28, 9, '2025-12-08 08:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (37, 8, '2025-12-29 12:00:00', 4);
insert into Reservation (vid, bid, date, duration) values (18, 1, '2025-12-22 12:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (8, 6, '2025-12-09 07:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (33, 9, '2025-12-25 09:00:00', 3);
insert into Reservation (vid, bid, date, duration) values (10, 7, '2025-12-20 08:00:00', 3);
insert into Reservation (vid, bid, date, duration) values (34, 5, '2025-12-19 14:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (20, 4, '2025-12-15 07:00:00', 5);
insert into Reservation (vid, bid, date, duration) values (2, 9, '2025-12-16 10:00:00', 3);
insert into Reservation (vid, bid, date, duration) values (36, 6, '2025-12-06 12:00:00', 4);
insert into Reservation (vid, bid, date, duration) values (35, 3, '2025-12-23 10:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (36, 9, '2025-12-26 07:00:00', 3);
insert into Reservation (vid, bid, date, duration) values (39, 8, '2025-12-30 7:00:00', 5);
insert into Reservation (vid, bid, date, duration) values (2, 9, '2025-12-16 14:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (18, 4, '2025-12-16 14:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (33, 2, '2025-12-03 10:00:00', 5);
insert into Reservation (vid, bid, date, duration) values (17, 8, '2025-12-17 10:00:00', 5);
insert into Reservation (vid, bid, date, duration) values (17, 3, '2025-12-23 12:00:00', 4);
insert into Reservation (vid, bid, date, duration) values (21, 7, '2025-12-28 13:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (21, 5, '2025-12-17 11:00:00', 4);
insert into Reservation (vid, bid, date, duration) values (27, 3, '2025-12-30 09:00:00', 6);
insert into Reservation (vid, bid, date, duration) values (11, 7, '2025-12-15 13:00:00', 3);
insert into Reservation (vid, bid, date, duration) values (11, 9, '2025-12-12 08:00:00', 5);
insert into Reservation (vid, bid, date, duration) values (35, 9, '2025-12-21 13:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (14, 6, '2025-12-11 11:00:00', 5);
insert into Reservation (vid, bid, date, duration) values (21, 6, '2025-12-30 09:00:00', 6);
insert into Reservation (vid, bid, date, duration) values (25, 8, '2025-12-27 09:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (39, 9, '2025-12-13 09:00:00', 6);
insert into Reservation (vid, bid, date, duration) values (9, 9, '2025-12-17 08:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (8, 4, '2025-12-18 11:00:00', 5);
insert into Reservation (vid, bid, date, duration) values (27, 6, '2025-12-11 08:00:00', 3);
insert into Reservation (vid, bid, date, duration) values (34, 3, '2025-12-20 07:00:00', 6);
insert into Reservation (vid, bid, date, duration) values (35, 3, '2025-12-21 07:00:00', 4);
insert into Reservation (vid, bid, date, duration) values (20, 3, '2025-12-14 07:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (6, 3, '2025-12-11 07:00:00', 6);
insert into Reservation (vid, bid, date, duration) values (18, 4, '2025-12-27 07:00:00', 4);
insert into Reservation (vid, bid, date, duration) values (14, 1, '2025-12-20 08:00:00', 6);
insert into Reservation (vid, bid, date, duration) values (28, 6, '2025-12-24 08:00:00', 3);
insert into Reservation (vid, bid, date, duration) values (7, 2, '2025-12-11 09:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (7, 2, '2025-12-21 09:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (3, 9, '2025-12-24 09:00:00', 5);
insert into Reservation (vid, bid, date, duration) values (35, 3, '2025-12-15 09:00:00', 3);
insert into Reservation (vid, bid, date, duration) values (16, 3, '2025-12-08 09:00:00', 5);
insert into Reservation (vid, bid, date, duration) values (6, 5, '2025-12-24 09:00:00', 4);
insert into Reservation (vid, bid, date, duration) values (33, 7, '2025-12-04 09:00:00', 4);
insert into Reservation (vid, bid, date, duration) values (14, 7, '2025-12-29 12:00:00', 4);
insert into Reservation (vid, bid, date, duration) values (18, 3, '2025-12-07 13:00:00', 3);
insert into Reservation (vid, bid, date, duration) values (37, 7, '2025-12-14 10:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (36, 8, '2025-12-17 07:00:00', 3);
insert into Reservation (vid, bid, date, duration) values (21, 4, '2025-12-03 10:00:00', 5);
insert into Reservation (vid, bid, date, duration) values (12, 7, '2025-12-21 08:00:00', 4);
insert into Reservation (vid, bid, date, duration) values (31, 7, '2025-12-13 08:00:00', 5);
insert into Reservation (vid, bid, date, duration) values (11, 5, '2025-12-15 08:00:00', 4);
insert into Reservation (vid, bid, date, duration) values (37, 9, '2025-12-14 08:00:00', 6);
insert into Reservation (vid, bid, date, duration) values (11, 8, '2025-12-28 09:00:00', 5);
insert into Reservation (vid, bid, date, duration) values (35, 4, '2025-12-17 09:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (33, 4, '2025-12-16 09:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (21, 3, '2025-12-27 09:00:00', 5);
insert into Reservation (vid, bid, date, duration) values (12, 2, '2025-12-17 10:00:00', 5);
insert into Reservation (vid, bid, date, duration) values (6, 3, '2025-12-07 10:00:00', 3);
insert into Reservation (vid, bid, date, duration) values (8, 9, '2025-12-13 15:00:00', 1);
insert into Reservation (vid, bid, date, duration) values (2, 2, '2025-12-02 10:00:00', 6);
insert into Reservation (vid, bid, date, duration) values (5, 9, '2025-12-12 13:00:00', 3);
insert into Reservation (vid, bid, date, duration) values (7, 4, '2025-12-04 11:00:00', 4);
insert into Reservation (vid, bid, date, duration) values (15, 5, '2025-12-05 11:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (1, 5, '2025-12-20 11:00:00', 3);
insert into Reservation (vid, bid, date, duration) values (24, 8, '2025-12-30 12:00:00', 4);
insert into Reservation (vid, bid, date, duration) values (27, 1, '2025-12-25 11:00:00', 3);
insert into Reservation (vid, bid, date, duration) values (9, 9, '2025-12-26 11:00:00', 5);
insert into Reservation (vid, bid, date, duration) values (9, 6, '2025-12-10 11:00:00', 3);
insert into Reservation (vid, bid, date, duration) values (15, 9, '2025-12-10 11:00:00', 3);
insert into Reservation (vid, bid, date, duration) values (36, 7, '2025-12-14 12:00:00', 3);
insert into Reservation (vid, bid, date, duration) values (7, 2, '2025-12-14 10:00:00', 1);
insert into Reservation (vid, bid, date, duration) values (2, 9, '2025-12-07 14:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (38, 8, '2025-12-19 14:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (14, 4, '2025-12-07 14:00:00', 1);
insert into Reservation (vid, bid, date, duration) values (3, 8, '2025-12-06 13:00:00', 3);
insert into Reservation (vid, bid, date, duration) values (21, 6, '2025-12-28 13:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (26, 9, '2025-12-21 08:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (9, 4, '2025-12-18 07:00:00', 3);
insert into Reservation (vid, bid, date, duration) values (29, 3, '2025-12-06 07:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (38, 2, '2025-12-07 07:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (10, 3, '2025-12-30 07:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (18, 5, '2025-12-12 07:00:00', 5);
insert into Reservation (vid, bid, date, duration) values (30, 1, '2025-12-24 07:00:00', 6);
insert into Reservation (vid, bid, date, duration) values (18, 9, '2025-12-03 07:00:00', 4);
insert into Reservation (vid, bid, date, duration) values (38, 1, '2025-12-30 08:00:00', 4);
insert into Reservation (vid, bid, date, duration) values (24, 2, '2025-12-16 08:00:00', 6);
insert into Reservation (vid, bid, date, duration) values (4, 5, '2025-12-08 08:00:00', 4);
insert into Reservation (vid, bid, date, duration) values (38, 1, '2025-12-18 08:00:00', 6);
insert into Reservation (vid, bid, date, duration) values (38, 2, '2025-12-25 08:00:00', 5);
insert into Reservation (vid, bid, date, duration) values (3, 6, '2025-12-29 09:00:00', 5);
insert into Reservation (vid, bid, date, duration) values (4, 8, '2025-12-23 09:00:00', 5);
insert into Reservation (vid, bid, date, duration) values (22, 2, '2025-12-07 09:00:00', 4);
insert into Reservation (vid, bid, date, duration) values (35, 5, '2025-12-28 09:00:00', 2);
insert into Reservation (vid, bid, date, duration) values (23, 7, '2025-12-02 09:00:00', 5);
insert into Reservation (vid, bid, date, duration) values (36, 3, '2025-12-29 09:00:00', 6);
