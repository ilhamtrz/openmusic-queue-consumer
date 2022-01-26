const { Pool } = require('pg');

class PlaylistsService {
    constructor() {
        this._pool = new Pool();
    }

    async getPlaylist(userId, playlistId) {
        const query = {
            text: 'SELECT id,name FROM playlists WHERE owner = $1',
            values: [userId],
        };
        const query2 = {
            text: `SELECT songs.id, songs.title, songs.performer FROM playlist_songs
            INNER JOIN songs ON playlist_songs.song_id = songs.id
            WHERE playlist_songs.playlist_id = $1`,
            values: [playlistId],
        }
        const result = await this._pool.query(query);
        result.rows[0].songs= (await this._pool.query(query2)).rows;

        const playlist = result.rows[0];
        return playlist;
    }
}

module.exports = PlaylistsService;
