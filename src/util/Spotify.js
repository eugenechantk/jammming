const accessToken = null
const client_id = '3b785c53963047458c2ad59bdeab3b0c'

const Spotify = {
        getAccessToken: function () {
                if (!accessToken) {
                       fetch(`https://accounts.spotify.com/authorize?client_id=${client_id}redirect_uri=${redirect_uri}&scope=user-read-private%20user-read-email&response_type=token&state=123`) 
                }
                else {
                        return accessToken
                }
        },

}

export default Spotify