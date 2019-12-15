export class Question {
    public id: string;
    public title: string;
    public artist: string;
    public albumArt: string;

    constructor (id: string, title: string, artist: string, albumArt: string) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.albumArt = albumArt;
    } 
};
