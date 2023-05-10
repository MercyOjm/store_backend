import { faker } from "@faker-js/faker";
import {User} from "../models/users.model.js";
import {Post} from "../models/posts.model.js";
import {Comment} from "../models/comments.model.js";


export const seedUsers = async (minDocs) => {
    try {
      /* --------------------------- add users -------------------------- */
    let users = [];

    // check the number of current users in db
    const numOfUsersInDB = await User.countDocuments();
    if (minDocs < numOfUsersInDB) {
      return console.log("There are enough User document in DB!");
    }

    // generate sample data
    for (let i = 0; i < minDocs - numOfUsersInDB; i++) {
      const user = {};
      user.name = faker.name.fullName();
      user.email = faker.internet.email();

      users.push(user);
    }

    //insert user documents to db
    await User.create(users);
    console.log("user document added successfully!");

    /* -------------------------- //add posts ------------------------- */
    let posts = [];

    // check the number of current posts in db
    const numOfpostsInDB = await Post.countDocuments();
    if (minDocs < numOfpostsInDB) {
      return console.log("There are enough Post document in DB!");
    }
        const fetchedUsers = await User.find();
        if (fetchedUsers.length) {
            
            // generate sample data
            for (let i = 0; i < (minDocs - numOfpostsInDB); i++) {
              const post = {};
              post.title = faker.lorem.words(5);
              post.content = faker.lorem.paragraph();
              post.author = faker.helpers.arrayElement(fetchedUsers)._id;
              post.likes = faker.datatype.number()
              posts.push(post);
            }
            
            //insert post documents to db
            await Post.create(posts);
            console.log("post documents added successfully!");
        }
      
    /* -------------------------- //add comments ------------------------- */
    let comments = [];

    // check the number of current comments in db
    const numOfcommentsInDB = await Comment.countDocuments();
    if (minDocs < numOfcommentsInDB) {
      return console.log("There are enough Comment document in DB!");
    }
        const fetchedPosts = await Post.find();
        if (fetchedPosts.length) {
            
            // generate sample data
            for (let i = 0; i < (minDocs - numOfcommentsInDB); i++) {
              const comment = {};
              comment.content = faker.lorem.paragraph();
              comment.author = faker.helpers.arrayElement(fetchedUsers)._id;
              comment.post = faker.helpers.arrayElement(fetchedPosts)._id;

              comments.push(comment);
            }
            
            //insert comment documents to db
            await Comment.create(comments);
            console.log("comment documents added successfully!");
        }
      


  } catch (error) {
    console.log(error.message);
  }
};