const { gql } = require("apollo-server");

module.exports = gql`
    type Recipe {
        id: Int,
        name: String,
        discription: String,
        created_At: String,
        thumps_Up: Int,
        thumps_Down: Int
    }

    input RecipeInput {
        name: String,
        discription: String,
    }

    type Query {
        recipe(ID: ID!): [Recipe]!
        getRecipes(limit: Int, offset: Int): [Recipe]
    }

    type Mutation {
        createRecipe(recipeInput: RecipeInput): [Recipe]
        deleteRecipe(ID: ID!): [Recipe]
        editRecipe(ID: ID!, recipeInput: RecipeInput): [Recipe]
    }
`;