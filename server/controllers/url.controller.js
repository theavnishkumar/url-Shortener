import { nanoid } from "nanoid";
// import { urls } from "../models/url.js"



export async function handleGenerateUrl(req, res) {
    const {url} = req.body;
    if (!url) return res.status(400).send("URL is Required");
    let inputUrlValidate = url.trim();
    if (!/^https?:\/\//i.test(inputUrlValidate)) {
        inputUrlValidate = "https://" + inputUrlValidate;
    }
    const shortID = nanoid(6);
    res.send(`URL is: ${inputUrlValidate}, Short ID is: ${shortID}`)
}

export async function handleDeleteUrl(req, res) {
    const {ShortId} = req.body;
    console.log("Delete", ShortId);
    res.json({ message: 'Item deleted successfully' });
}