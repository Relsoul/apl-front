export function getImgBySize(
  imgList: {
    label: string;
    attributes: {
      height: number;
    };
  }[],
  size: 'lg' | 'middle' | 'small' = 'lg',
) {
  /**
   * 数组越界默认取最后
   */
  let len = imgList.length - 1;
  if (size === 'middle') {
    len = imgList.length - 2;
  }
  if (size === 'small') {
    len = imgList.length - 3;
  }
  return imgList[len]['label'];
}
