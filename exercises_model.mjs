// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database exercises_db in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb+srv://ayouyi:Zzy19891020@cluster0.dogohuu.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
 * Create a user
 * @param {String} name 
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
 const createExercises = async (name, reps, weight, unit, date) => {
    // Call the constructor to create an instance of the model class exercise
    const excercise = new Exercise({ name: name, reps: reps, weight: weight, unit:unit, date:date });
    // Call save to persist this object as a document in MongoDB
    return excercise.save();
}

/**
 * Retrive exercises based on the filter, projection and limit parameters
 * @param {Object} filter 
 * @param {String} projection 
 * @param {Number} limit 
 * @returns 
 */
 const findExcercises = async (filter, projection, limit) => {
    const query = Exercise.find()
        .select(projection)
        .limit(limit);
    if (filter.length > 0) {
        query.and(filter);
    } 
    return query.exec();
}

/**
 * Replace the all properties of the exercise with the id value provided
 * @param {String} _id 
 * @param {String} name 
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the number of documents modified
 */
const replaceExercise = async(id, name, reps, weight, unit, date) =>{
    const result = await Exercise.replaceOne({_id: id}, {name:name, reps:reps, weight:weight, unit:unit, date:date});
    return result.modifiedCount;
}

/**
 * Delete the exercise with provided id value
 * @param {String} _id 
 * @returns A promise. Resolves to the count of deleted documents
 */
 const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    // Return the count of deleted document. Since we called deleteOne, this will be either 0 or 1.
    return result.deletedCount;
}

export {createExercises, findExcercises, replaceExercise, deleteById}