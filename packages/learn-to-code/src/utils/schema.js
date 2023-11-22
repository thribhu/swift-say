import * as yup from "yup";

/**
 * @param {'video' | 'image'} type - media type should be either video or image
 * @param {number} mSize - maximum size for the file
 * @returns
 */
export const mediaSchema = (type, mSize) => {
  return yup
    .mixed()
    .test("fileType", `Invalid file type. Only ${type} is allowed`, (value) => {
      if (!value) return true;
      return value && value.type.startsWith(`${type}/`);
    })
    .when(type, {
      is: (value) => {
        if (value && value.size > 0) {
          if (mSize && mSize !== undefined) {
            return true;
          }
        } else return false;
      },
      then: yup
        .mixed()
        .test(
          "fileSize",
          `Maximum allowed ${type} size is ${sizeInMB(mSize)} MB`,
          (value) => {
            if (!value) return true;
            return value && value.size <= mSize * 1024 * 1024;
          }
        ),
    });
};

/**
 *
 * @param {number} size
 * @return {number} Returns the memory size converted to MB
 */
const sizeInMB = (size) => size * 1024 * 1024;
