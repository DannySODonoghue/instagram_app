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

    const values = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: 'https://instaunfollowers-dc8e3299f8e9.herokuapp.com/user/auth/',
        code
    }
    
    
    const url = "https://api.instagram.com/oauth/access_token";
    
    try {
        console.log('in try block');
        const response = await axios.post({
            url,
            data : {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: 'https://instaunfollowers-dc8e3299f8e9.herokuapp.com/user/auth/',
                code
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