import { Post } from "../models/post.model.js";

//create a post 

const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;

        if (!name || !description || !age) {
            return res.status(400).json({
                message: "all the fiels are required"
            });
        }
        const post = await Post.create({ name, description, age });
        res.status(201).json({
            message: "post created successfully", post
        });


    } catch (error) {
        res.status(500).json({
            message: " internal server error", error
        })

    }
}

// to get all the post
const getPosts = async (req, res) => {
    try {
        const post = await Post.find();
        if (post.length === 0) {
            return res.status(404).json({
                message: "no post available"
            })
        }
        return res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ message: "internal server error", error: error.message })

    }

}

const updatePost = async (req, res) => {
    try {
        //basic validation for to check if the body is empty
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "no data provided for update"
            });
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!post) return res.status(404).json({
            message: "post not found"
        });

        return res.status(200).json({
            message: "post updated sucessfully", post
        });
    } catch (error) {
        res.status(500).json({ message: "internal server error", error: error.message })
    }
}

const deletePost = async (req, res) => {
    try {

        const deleted = await Post.findByIdAndDelete(req.params.id,);

        if (!deleted) return res.status(404).json({
            message: "cannot delete post"
        });

        return res.status(200).json({
            message: "post deleted sucessfully", deleted
        });
    } catch (error) {
        res.status(500).json({ message: "internal server error", error: error.message })
    }

}



export { createPost, getPosts, updatePost, deletePost };