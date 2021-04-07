const pinataApiKey = "ef784c45bfd02291835f";
const pinataSecretApiKey = "ad75a768c3c7f0a6d6d93e0503efd7f567338187fc9bd9bcacd0b9d16ee6d68d";
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const pinFileToIPFS = async () => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let data = new FormData();

    data.append("file", 
    fs.createReadStream("C:\Users\ladfasdfa\Pictures"));

    const res = await axios.post(url, data, {
        maxContentLength: "Infinity",
        headers: {
            "Content-Type": `multipart/form-data;
            boundary=${data._boundary}`,
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
        },
    });

    console.log(res.data);
};
