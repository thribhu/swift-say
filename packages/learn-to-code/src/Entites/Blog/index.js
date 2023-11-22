import { formatUiDate } from "../../utils/date";
import BlogSchema from "./blog.schema";

/**
 * @typedef {Object} Owner User who owns the blog
 * @property {string} name User's valid username
 * @property {string} uid User's id attribute
 * @property {string} avatar User's avatar URI
 */
/**
 * @class Blog - Instance of a blog with helper methods like comment, share
 */
export default class Blog extends BlogSchema {
  /**
   * @constructor
   * @param {Object} blog - blog object
   * @param {string} blog.id - UUID for the blog record
   * @param {string} blog.title - 255 limit characters uti8 string
   * @param {string} blog.content - Content with support to rich text
   * @param {string} blog.slug - url friendly slug
   * @param {string[]} blog.media - image or videos for the blog
   * @param {Owner} blog.owner - UUID for the owner
   * @param {Date} blog.createdAt - created date
   * @param {Date} blog.updatedAt - Last updated date
   * @param {number} blog.comments - Total nuber of comment engagement
   */
  constructor(blog) {
    super();
    const blogEntries = Object.entries(blog);
    this.setup();
    blogEntries.forEach((key, value) => (this[key] = value));
    this.mediaCount = this.media.length;
  }
  async setup(blog) {
    try {
      const validation = await this.validate(blog);
      return validation;
    } catch (err) {
      throw err;
    }
  }
  /**
   * @description Generates title helper function to render blog inside a grid
   * @returns string
   */
  getStats() {
    let help = "";
    if (!this.createdAt) {
      return null;
    } else {
      help = formatUiDate(this.createdAt);
      if (this.comments >= 1) {
        help = help + ` | Comments: ${this.comments}`;
      }
      return help;
    }
  }
  /**
   * @description Returns the first uri of the media
   * @returns null | first entry of the media list (video | image)
   */
  getHeroImage() {
    if (!this.media || !this.media.length) {
      return null;
    } else return this.media[0];
  }
}
