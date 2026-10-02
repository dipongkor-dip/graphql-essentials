import products from "../data/products.json" with { type: "json" };
import categories from "../data/categories.json" with { type: "json" };
import reviews from "../data/reviews.json" with { type: "json" };

export const db = { products, categories, reviews };
