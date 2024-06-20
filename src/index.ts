import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

// Use CORS middleware
app.use(cors());
app.use(express.json());

// Get all users with their posts
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
});


// Get all posts with user information
app.get("/posts", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { user: true, reactions: true },
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching posts." });
  }
});

// Create a new post
app.post("/posts", async (req, res) => {
  let { userId, title, body } = req.body;
  try {
    // Ensure userId is an integer
    userId = parseInt(userId, 10);

    // Create the post first
    const newPost = await prisma.post.create({
      data: {
        userId,
        title,
        body,
      },
    });

    // Create the reaction linked to the post
    await prisma.reaction.create({
      data: {
        postId: newPost.id,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the post." });
  }
});

app.put("/posts/:postId/reactions", async (req, res) => {
  const { postId } = req.params;
  const { thumbsUp, wow, heart, rocket, coffee } = req.body;

  try {
    // Ensure postId is an integer
    const id = parseInt(postId, 10);

    // Update the reactions
    const updatedReaction = await prisma.reaction.update({
      where: { postId: id },
      data: {
        thumbsUp,
        wow,
        heart,
        rocket,
        coffee,
      },
    });

    res.status(200).json(updatedReaction);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the reactions." });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
