import { Users } from "../models/users.js"


export const handleGetUser = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).select("name email avatar");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const handleDeleteUser=async(req,res)=>{
    const id=req.id;
    console.log(id);
    return res.status(200).json({message:"OK"})
}