/**
 * User helper functions.
 */


// User model
const User = require('../models/user.model')

/**
 * Find the last inserted user.
 * @returns The last inserted user.
 */
async function findLastInsertedUser(){
  console.log('Find las inserted user');

  try {
    const result = await User.find({}).sort({_id: -1}).limit(1);
    return result[0];
  } catch (err) {
    console.log("Problem in finding user", err)
    return false
  }
}

// End code
module.exports = { findLastInsertedUser }