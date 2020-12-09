let accessToken = ''
const client_id = '3b785c53963047458c2ad59bdeab3b0c'
const redirect_uri = 'http://localhost:3000/'
let searchTracks = []

const Spotify = {
        getAccessToken: function () {
                if (!accessToken) {
                        if (window.location.href.match(/access_token=([^&]*)/)) {
                                accessToken = window.location.href.match(/access_token=([^&]*)/)
                                const expiresIn = window.location.href.match(/expires_in=([^&]*)/)
                                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                                window.history.pushState('Access Token', null, '/');
                        }
                        else {
                                window.location.assign(`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`)
                        }
                }
                else {
                        return accessToken
                }
        },

        search: async function (term) {
                await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{headers:{'Authorization': `Bearer ${accessToken}`}})
                        .then(response => {return response.json()})
                        .then(jsonResponse => {
                                // console.log(jsonResponse)
                                // console.log(jsonResponse.tracks.items)
                                searchTracks = jsonResponse.tracks.items.map(track => (
                                        {id: track.id, 
                                        name: track.name, 
                                        artist: track.artists[0].name, 
                                        album: track.album.name, 
                                        uri: track.uri}
                                ))
                        })
                // console.log(searchTracks)
                return searchTracks
        },

        savePlaylist: async function (playListName, trackURI) {
                let userID = ''
                let playlistID = ''
                if ((!playListName) && (!trackURI)){
                        return
                }
                await fetch(`https://api.spotify.com/v1/me`,{headers: {'Authorization': `Bearer ${accessToken[1]}`}})
                        .then(response => {return response.json()})
                        .then(jsonResponse => {userID = jsonResponse.id})
                
                console.log(userID)

                await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
                        method: 'POST',
                        headers: {
                                'Authorization': `Bearer ${accessToken[1]}`,
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({'name': `${playListName}`})
                })
                        .then(response => {return response.json()})
                        .then(jsonResponse => playlistID = jsonResponse.id)
                
                console.log(playlistID)
                console.log(trackURI)
                await fetch (`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,{
                        method: 'POST',
                        headers: {
                                'Authorization': `Bearer ${accessToken[1]}`,
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({'uris': trackURI})
                }
                )
        }

}

export default Spotify