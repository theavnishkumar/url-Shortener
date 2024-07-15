import shortid from "shortid";
import { urls } from "../models/url.js";

async function handleGenerateUrl(req, res) {
    console.log(req.user);
    const body = req.body;
    if (!body.url) return res.status(400).send("URL is required");
    let inputUrlValidate = body.url.trim();
    if (!/^https?:\/\//i.test(inputUrlValidate)) {
        inputUrlValidate = "https://" + inputUrlValidate;
    }
    const shortID = shortid.generate();
    await urls.create({
        url: inputUrlValidate,
        shortUrl: shortID,
        clicks: [],
        createdBy: req.user._id
    });
    return res.redirect('/');
}

async function handleDeleteUrl(req, res) {
    try {
        const id = req.params.id;
        await urls.findOneAndDelete({ shortUrl: id });
        return res.status(204).redirect('/');

    } catch (error) {
        console.log(error);
    }
}

export { handleGenerateUrl, handleDeleteUrl };