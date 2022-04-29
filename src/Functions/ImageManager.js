import axios from "axios";
const apiKey = process.env.REACT_APP_PIXABAY_KEY;

export async function getImageById(id) {
    let result;

    await axios
        .get(`https://pixabay.com/api/?id=${id}&key=${apiKey}`)
        .then((r) => {
            result = r.data.hits[0].largeImageURL;
        })
        .catch((e) => console.log(e));
    return result;
}

export async function getImagesByQuery(query) {
    let result;
    await axios
        .get(`https://pixabay.com/api/?q=${query}&key=${apiKey}`)
        .then((r) => {
            result = r.data.hits;
        })
        .catch((e) => console.log(e));
    return result;
}
