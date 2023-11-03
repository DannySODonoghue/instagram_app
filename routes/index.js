const axios = require("axios");
const qs = require("qs");
const { Router } = require("express");
const router = Router();

const CLIENT_ID = process.env.INSTAGRAM_APP_ID;
const CLIENT_SECRET = process.env.INSTAGRAM_APP_SECRET;

function getInstaAuthURL() {
    // const rootURL = "https://api.instagram.com/oauth/authorize";
    return `https://api.instagram.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=https://instaunfollowers-dc8e3299f8e9.herokuapp.com/user/auth/&scope=user_profile,user_media&response_type=code`;
}


router.get('/', (req, res) => {
    const url = getInstaAuthURL();
    res.redirect(url);
    // res.render('index',{
    //     url
    // })
});

router.get('/user/auth/', async (req, res) => {
    const code = req.query.code;

    const instaForm = new URLSearchParams(values);
    instaForm.append('client_id', CLIENT_ID);
    instaForm.append('client_secret', CLIENT_SECRET);
    instaForm.append('grant_type', 'authorization_code');
    instaForm.append('redirect_uri', 'https://instaunfollowers-dc8e3299f8e9.herokuapp.com/user/auth/');
    instaForm.append('code', code);

    const url = "https://api.instagram.com/oauth/access_token";
    
    try {
        console.log('in try block');
        const response = await axios.post({
            url,
            data : instaForm,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        console.log('here');
        res.send({response});
    } catch (error) {
        console.log('here4');
        console.error(error);
        res.send({in: "error"});
    }
})


module.exports = router;