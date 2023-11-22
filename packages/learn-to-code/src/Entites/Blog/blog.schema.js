import * as yup from "yup";
import { mediaSchema } from "../../utils/schema";

class Schema {
  constructor() {
    this.schema = yup.object({
      id: yup.string().uuid().default(null),
      title: yup
        .string()
        .max(255, "Maximum allowed characters for title is 255 chars")
        .required("Title is required.")
        .default(null),
      content: yup.string().default(null),
      slug: yup.string().default(null),
      media: yup
        .array()
        .of(yup.mixed().oneOf([mediaSchema("image"), mediaSchema("video")]))
        .default(null),
      owner: yup
        .object({
          name: yup.string().required("User must have name").default(null),
          uid: yup
            .string()
            .uuid()
            .required("User must have uid string")
            .default(null),
          avatar: yup.string().url().default(null),
        })
        .default(null),
      draft: yup.bool().default(true),
      createdAt: yup.date().default(() => new Date(), "Default created date"),
      updatedAt: yup.date().default(() => new Date(), "Default updated date"),
    });
  }
  /**
   *
   * @param {Object} blog - Blog instance to create on the server
   * @returns
   */
  async validate(blog) {
    return await this.schema.validate(blog);
  }
  async validateAt(property, value) {
    return await this.schema.validateAt(property, value);
  }
}
export default Schema;
