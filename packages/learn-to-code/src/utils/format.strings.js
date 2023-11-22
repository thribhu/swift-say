import { remark } from "remark";
import remarkMdx from "remark-mdx";
export function isUrl(str) {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlRegex.test(str);
}

/**
 * @description
 * @param {string} richContent
 * @returns {string | null} Converts markdown to js compa
 */
export async function richText(richContent) {
  try {
    const formatted = await remark.use(remarkMdx).process(richContent);
    return formatted;
  } catch (err) {
    console.log(err);
    return null;
  }
}
