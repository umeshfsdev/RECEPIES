const Recipe = require("../models/Recipe");

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = {
    Query: {
        async recipe(_, { ID }) {
            try {
                const result = await pool.query(`SELECT * FROM recipes WHERE id = ${ID}`);
                return result.rows;
            } catch (error) {
                console.log(error.message);
                return { message: error.message };
            }
        },

        getRecipes: async (_, { limit, offset }) => {
            try {
                const result = await pool.query(`SELECT * FROM recipes ORDER BY id ASC LIMIT ${limit} OFFSET ${offset}`);
                return result.rows;
            } catch (error) {
                console.log(error.message);
                return { message: error.message };
            }
        },

    },
    Mutation: {
        createRecipe: async (_, { recipeInput: { name, discription } }) => {
            try {
                const result = await pool.query(`INSERT INTO recipes (name, discription, "created_At", "thumps_Up", "thumps_Down") 
                VALUES ('${name}', '${discription}', '${new Date().toISOString()}', 0, 0) RETURNING *`);
                return result.rows;
            } catch (error) {
                console.log(error.message);
                return { message: error.message };
            }
        },

        async deleteRecipe(_, { ID }) {
            try {
                const result = await pool.query(`DELETE FROM recipes WHERE ID = ${ID} RETURNING *`);
                return result.rows;
            } catch (error) {
                console.log(error.message);
                return { message: error.message };
            }
        },

        async editRecipe(_, { ID, recipeInput: { name, discription } }) {
            try {
                const result = await pool.query(`UPDATE recipes SET "discription"= '${discription}', "name"= '${name}' WHERE ID = ${ID} RETURNING *`);
                return result.rows;
            } catch (error) {
                console.log(error.message);
                return { message: error.message };
            }
        }
    }
}