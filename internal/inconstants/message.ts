export default {
  type: {
    text: "text",
    photo: "photo",
    video: "video",
    file: "file",
    room: "room",
    all: ["text", "photo", "video", "file", "room"],
    allFile: ["photo", "video", "file"],
  },
  getContentByType: (type: string): string => {
    switch (type) {
      case "room":
        return "Đã gửi một phòng";
      case "file":
        return "Đã gửi một tệp đính kèm";
      case "video":
        return "Đã gửi một video";
      case "photo":
        return "Đã gửi một hình ảnh";
      default:
        return "Đã gửi một tin nhắn";
    }
  },
};
