import { formatUiDate } from "../../utils/date";

/**
 * @typedef {Object} Owner User who owns the blog
 * @property {string} name User's valid username  
 * @property {string} uid User's id attribute
 * @property {string} avatar User's avatar URI
 */
/**
 * @class Blog - Instance of a blog with helper methods like comment, share
 */
export default class Blog {
    /**
     * @constructor 
     * @param {string} id 
     * @param {string} title 
     * @param {string} content 
     * @param {string[]} media 
     * @param {number} mediaCount 
     * @param {Owner} owner 
     * @param {Date} createdAt 
     * @param {Date} updatedAt 
     * @param {number} comments
     */
    constructor(id=null,title, content, media, mediaCount, owner, createdAt, updatedAt, comments){
        this.id=id;
        this.title=title;
        this.content=content;
        this.media=media;
        this.mediaCount=mediaCount;
        this.owner = owner;
        this.createdAt=createdAt;
        this.updatedAt=updatedAt;
        this.comments=comments;
    }
    /**
     * @description Generates title helper function to render blog inside a grid 
     * @returns string
     */
    generateTitleHelp(){
        let help=''
        if(!this.createdAt){
            return null;
        }
        else {
            help = formatUiDate(this.createdAt);
            if(this.comments >= 1) {
                help = help + ` | Comments: ${this.comments}`
            }
            return help;
        }
    }
    /**
     * @description Returns the first uri of the media 
     * @returns null | first entry of the media list (video | image)
     */
    getHeroImage(){
        if(!this.media || !this.media.length){
            return null
        }
        else return this.media[0]
    }
}