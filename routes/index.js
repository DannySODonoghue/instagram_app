const axios = require("axios");
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
    console.log('here');
    const code = req.query.code;
    const values = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: 'https://instaunfollowers-dc8e3299f8e9.herokuapp.com/user/auth/',
        code
    }
    // const bodyFormData = new FormData();
    // bodyFormData.append('client_id', CLIENT_ID);
    // bodyFormData.append('client_secret', CLIENT_SECRET);
    // bodyFormData.append('grant_type', 'authorization_code');
    // bodyFormData.append('redirect_uri', 'https://instaunfollowers-dc8e3299f8e9.herokuapp.com/user/auth/');
    // bodyFormData.append('code', code);
    const URL = "https://api.instagram.com/oauth/access_token";
    console.log('here2');
    
    try {
        const response = await axios.post(URL, qs.stringify(values), {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
        });
        res.send(
            { 
                name: "Hello World",
                response
            }
        )
    } catch (error) {
        console.error(error);
        res.send(error);
    }
})


module.exports = router;