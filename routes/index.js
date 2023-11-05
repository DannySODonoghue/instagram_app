const axios = require("axios");
const qs = require("qs");
const url = require('url');
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

    const instaForm = new URLSearchParams();
    instaForm.append('client_id', CLIENT_ID);
    instaForm.append('client_secret', CLIENT_SECRET);
    instaForm.append('grant_type', 'authorization_code');
    instaForm.append('redirect_uri', 'https://instaunfollowers-dc8e3299f8e9.herokuapp.com/user/auth/');
    instaForm.append('code', code);

    const url = "https://api.instagram.com/oauth/access_token";
    
    try {
        console.log('in try block');
        const response = await axios.post(url, instaForm, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        console.log('here');
        const user_id = response.data.user_id;
        const access_token = response.data.access_token;

        res.redirect(url.format({
            pathname:`https://instaunfollowers-dc8e3299f8e9.herokuapp.com/userInfo`,
            query: {
               user_id,
               access_token
            }
        }));

    } catch (error) {
        console.error(error);
        res.send({in: "error"});
    }
})

router.get('/userInfo', async (req, res, next) => {
    console.log('here5');
    const user_id = req.query.user_id;
    const access_token = req.query.access_token;
    const url = `https://graph.instagram.com/${user_id}?fields=id,username,media_count&access_token=${access_token}`;

    try {
        const response = await axios.post(url);
        res.send(response.data);
    } catch (err) {
        console.error(err);
        res.send({second: "error"});
    }

})


module.exports = router;